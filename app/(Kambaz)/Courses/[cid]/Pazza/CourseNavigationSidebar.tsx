'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as PazzaClient from './client';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Today', 'Yesterday']));

  const accountState = useSelector((state: RootState) => state.accountReducer);
  const currentUser = {
    id: (accountState as any)?.currentUser?._id || '1',
    role: (accountState as any)?.currentUser?.role === 'FACULTY' ? 'instructor' : 'student'
  };

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

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getWeekRange = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day; // Get Sunday of the week

    const sunday = new Date(date);
    sunday.setDate(diff);
    sunday.setHours(0, 0, 0, 0);

    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    const formatDate = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;

    return `${formatDate(sunday)} - ${formatDate(saturday)}`;
  };

  const groupPostsByDate = (posts: Post[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);

    const groups: { [key: string]: Post[] } = {};
    const groupOrder: string[] = [];

    posts.forEach(post => {
      const postDate = new Date(post.createdAt);
      postDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));

      let categoryName: string;

      if (diffDays === 0) {
        categoryName = 'Today';
      } else if (diffDays === 1) {
        categoryName = 'Yesterday';
      } else if (diffDays <= 7) {
        categoryName = 'Last Week';
      } else {
        categoryName = getWeekRange(postDate);
      }

      if (!groups[categoryName]) {
        groups[categoryName] = [];
        groupOrder.push(categoryName);
      }

      groups[categoryName].push(post);
    });

    const orderedGroups: { [key: string]: Post[] } = {};
    groupOrder.forEach(category => {
      orderedGroups[category] = groups[category];
    });

    return orderedGroups;
  };

  const filteredPosts = searchTerm
    ? posts.filter(post =>
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.details.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : posts;

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
          onClick={() => router.push(`/Courses/${courseId}/Pazza/New`)}
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
                <div
                  onClick={() => toggleCategory(category)}
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: '8px 12px',
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '12px' }}>
                    {expandedCategories.has(category) ? '▼' : '▶'}
                  </span>
                  {category} ({categoryPosts.length})
                </div>

                {expandedCategories.has(category) && categoryPosts.map(post => (
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