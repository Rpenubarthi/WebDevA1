'use client';

import { use, useState } from 'react';
import PazzaNavBar from './PazzaNavBar';
import FolderFilters from './FolderFilters';
import PostsList from './CourseNavigationSidebar';
import PostScreen from './PostsScreen';

export default function PazzaPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = use(params); 
  const [selectedFolder, setSelectedFolder] = useState('hw1');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostsList, setShowPostsList] = useState(true);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      {/* Fixed Navigation Bar */}
      <PazzaNavBar courseId={cid} />
      
      {/* Fixed Folder Filters */}
      <FolderFilters 
        selectedFolder={selectedFolder}
        onFolderSelect={setSelectedFolder}
        courseId={cid}
      />
      
      {/* Main Content: Posts List + Post Screen */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden'
      }}>
        {/* Left Sidebar - Posts List */}
        {showPostsList && (
          <PostsList 
            courseId={cid}
            selectedFolder={selectedFolder}
            selectedPost={selectedPost}
            onPostSelect={setSelectedPost}
            onToggle={() => setShowPostsList(false)}
          />
        )}
        
        {/* Right Side - Post Screen */}
        <PostScreen 
          courseId={cid}
          selectedPost={selectedPost}
          showToggle={!showPostsList}
          onToggle={() => setShowPostsList(true)}
        />
      </div>
    </div>
  );
}