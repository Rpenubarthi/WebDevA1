'use client';

import { use, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import PazzaNavBar from './PazzaNavBar';
import FolderFilters from './FolderFilters';
import PostsList from './CourseNavigationSidebar';
import PostScreen from './PostsScreen';
import ManageFolders from './ManageFolders';

export default function PazzaPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = use(params);
  const pathname = usePathname();
  const [selectedFolder, setSelectedFolder] = useState('hw1');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostsList, setShowPostsList] = useState(true);
  const [viewMode, setViewMode] = useState<'qa' | 'manage'>('qa');
  const [manageTab, setManageTab] = useState<string | null>(null);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isInstructor = (currentUser as any)?.role === 'FACULTY';

  useEffect(() => {
    if (pathname === `/Kambaz/Courses/${cid}/Pazza`) {
      setSelectedPost(null);
    }
  }, [pathname, cid]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <PazzaNavBar courseId={cid} viewMode={viewMode} onChangeView={setViewMode} />

      {/* Conditional Tabs - Folder Filters OR Management Tabs */}
      {viewMode === 'qa' ? (
        <FolderFilters
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
          courseId={cid}
        />
      ) : (
        <div style={{
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #d1d5db',
          padding: '12px 16px',
          display: 'flex',
          gap: '12px',
          position: 'sticky',
          top: '57px',
          zIndex: 40
        }}>
          <button disabled style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }}>
            General Settings
          </button>
          <button disabled style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }}>
            Customize Q&A
          </button>
          <button
            onClick={() => setManageTab('folders')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              backgroundColor: manageTab === 'folders' ? '#2563eb' : 'white',
              color: manageTab === 'folders' ? 'white' : '#374151',
              fontWeight: manageTab === 'folders' ? '600' : 'normal',
              border: manageTab === 'folders' ? 'none' : '1px solid #d1d5db',
              cursor: 'pointer'
            }}
          >
            Manage Folders
          </button>
          <button disabled style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }}>
            Manage Enrollment
          </button>
          <button disabled style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }}>
            Create Groups
          </button>
          <button disabled style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }}>
            Customize Course Page
          </button>
          <button disabled style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }}>
            Pazza Network Settings
          </button>
        </div>
      )}

      {/* Main Content - ALWAYS the same layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {showPostsList && (
          <PostsList
            courseId={cid}
            selectedFolder={selectedFolder}
            selectedPost={selectedPost}
            onPostSelect={setSelectedPost}
            onToggle={() => setShowPostsList(false)}
          />
        )}

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