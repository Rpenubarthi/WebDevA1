'use client';

import { useState, useEffect } from 'react';




interface FolderFiltersProps {
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
  courseId: string;
}

export default function FolderFilters({ selectedFolder, onFolderSelect, courseId }: FolderFiltersProps) {
  const [folders, setFolders] = useState([
    'hw1', 'hw2', 'hw3', 'project', 'exam', 'logistics', 'other', 'office_hours'
  ]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        // const response = await fetch(`http://localhost:4000/api/pazza/folders/${courseId}`);
        // const data = await response.json();
        // setFolders(data.map((f: any) => f.name));
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };
    // fetchFolders();
  }, [courseId]);

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #d1d5db',
      padding: '12px 16px',
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      position: 'sticky',
      top: '57px',
      zIndex: 40
    }}>
      {folders.map(folder => (
        <button
          key={folder}
          onClick={() => onFolderSelect(folder)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            border: selectedFolder === folder ? 'none' : '1px solid #d1d5db',
            backgroundColor: selectedFolder === folder ? '#2563eb' : 'white',
            color: selectedFolder === folder ? 'white' : '#374151',
            fontWeight: selectedFolder === folder ? '600' : 'normal',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (selectedFolder !== folder) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFolder !== folder) {
              e.currentTarget.style.backgroundColor = 'white';
            }
          }}
        >
          {folder}
        </button>
      ))}
    </div>
  );
}