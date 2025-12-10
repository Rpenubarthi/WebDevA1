'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as PazzaClient from './client';

interface Post {
  _id: string;
  type: 'question' | 'note';
  summary: string;
  details: string;
  authorRole: 'student' | 'instructor';
  createdAt: string;
}

interface PostsListProps {
  courseId: string;
  selectedFolder: string;
  selectedPost: any;
  onPostSelect: (post: any) => void;
  onToggle: () => void;
}

export default function PostsList({ 
  courseId, 
  selectedFolder, 
  selectedPost, 
  onPostSelect,
  onToggle 
}: PostsListProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Get current user from auth context
  const currentUser = { id: '1', role: 'student' };

  useEffect(() => {
    console.log('PostsList mounted with courseId:', courseId, 'folder:', selectedFolder);
    fetchPosts();
  }, [courseId, selectedFolder]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching posts for:', {
        courseId,
        userId: currentUser.id,
        userRole: currentUser.role,
        folder: selectedFolder
      });

      const fetchedPosts = await PazzaClient.getPostsForCourse(
        courseId,
        currentUser.id,
        currentUser.role,
        selectedFolder === 'all' ? undefined : selectedFolder,
        searchTerm || undefined
      );
      
      console.log('Fetched posts:', fetchedPosts);
      setPosts(fetchedPosts);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      console.error('Error details:', error.response?.data);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        fetchPosts();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredPosts = searchTerm 
    ? posts 
    : posts.filter(post => 
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.details.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const groupPostsByDate = (posts: Post[]) => {
    const today = new Date();
    const groups: { [key: string]: Post[] } = {
      'Today': [],
      'Yesterday': [],
      'Last Week': []
    };

    posts.forEach(post => {
      const postDate = new Date(post.createdAt);
      const diffDays = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        groups['Today'].push(post);
      } else if (diffDays === 1) {
        groups['Yesterday'].push(post);
      } else if (diffDays <= 7) {
        groups['Last Week'].push(post);
      }
    });

    return groups;
  };

  const groupedPosts = groupPostsByDate(filteredPosts);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div style={{
      width: '320px',
      backgroundColor: 'white',
      borderRight: '1px solid #d1d5db',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with Toggle and Search */}
      <div style={{
        padding: '12px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <button 
            onClick={onToggle}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ◀
          </button>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            Unread | Updated | Unresolved | Following
          </span>
        </div>
        
        <button 
          onClick={() => router.push(`/Kambaz/Courses/${courseId}/Pazza/New`)}
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          + New Post
        </button>
        
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Posts List */}
      <div style={{
        flex: 1,
        overflowY: 'auto'
      }}>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
            Loading posts...
          </div>
        ) : error ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#dc2626' }}>
            Error: {error}
          </div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
            No posts yet. Be the first to post!
          </div>
        ) : (
          Object.entries(groupedPosts).map(([category, categoryPosts]) => (
            categoryPosts.length > 0 && (
              <div key={category} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '8px 12px',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  {category}
                </div>
                {categoryPosts.map(post => (
                  <div
                    key={post._id}
                    onClick={() => onPostSelect(post)}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #f3f4f6',
                      cursor: 'pointer',
                      backgroundColor: selectedPost?._id === post._id ? '#dbeafe' : 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPost?._id !== post._id) {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPost?._id !== post._id) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ 
                      fontWeight: '600', 
                      fontSize: '14px',
                      marginBottom: '4px'
                    }}>
                      {post.summary}
                    </div>
                    
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      marginBottom: '8px'
                    }}>
                      {post.details}
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {formatTime(post.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}