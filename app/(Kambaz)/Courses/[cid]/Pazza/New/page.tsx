'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import PazzaNavBar from '../PazzaNavBar';

export default function NewPostPage({ params }: { params: Promise<{ cid: string }> }) {
  const router = useRouter();
  const { cid } = use(params); // Unwrap the Promise
  
  const [postType, setPostType] = useState<'question' | 'note'>('question');
  const [postTo, setPostTo] = useState<'entire_class' | 'individual'>('entire_class');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<string[]>(['hw1']);
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const availableFolders = ['hw1', 'hw2', 'hw3', 'project', 'exam', 'logistics', 'other', 'office_hours'];
  
  const availableUsers = [
    { id: '1', name: 'Instructors', role: 'instructor' },
    { id: '2', name: 'John Doe', role: 'student' },
    { id: '3', name: 'Jane Smith', role: 'student' },
    { id: '4', name: 'Bob Johnson', role: 'student' }
  ];

  const handleFolderToggle = (folder: string) => {
    if (selectedFolders.includes(folder)) {
      setSelectedFolders(selectedFolders.filter(f => f !== folder));
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  const handleUserToggle = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(u => u !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (summary.length > 100) {
      newErrors.summary = 'Summary must be 100 characters or less';
    }
    
    if (!details.trim()) {
      newErrors.details = 'Details are required';
    }
    
    if (selectedFolders.length === 0) {
      newErrors.folders = 'At least one folder is required';
    }
    
    if (postTo === 'individual' && selectedUsers.length === 0) {
      newErrors.users = 'At least one user must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const postData = {
      courseId: cid, // Use the unwrapped cid
      type: postType,
      summary,
      details,
      visibility: {
        type: postTo,
        visibleTo: postTo === 'individual' ? selectedUsers : []
      },
      folders: selectedFolders
    };

    try {
      // TODO: Send to backend
      // const response = await fetch('http://localhost:4000/api/pazza/posts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(postData)
      // });
      
      console.log('Creating post:', postData);
      
      // Navigate back to main Pazza page
      router.push(`/Kambaz/Courses/${cid}/Pazza`);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCancel = () => {
    router.push(`/Kambaz/Courses/${cid}/Pazza`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%'
    }}>
      <PazzaNavBar courseId={cid} />
      
      {/* ... rest of your JSX stays the same ... */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#f9fafb',
        padding: '32px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px'
          }}>
            Create New Post
          </h2>

          {/* Post Type Tabs */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Post Type
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setPostType('question')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: postType === 'question' ? '#2563eb' : 'white',
                  color: postType === 'question' ? 'white' : '#374151',
                  fontWeight: postType === 'question' ? '600' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Question
              </button>
              <button
                onClick={() => setPostType('note')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: postType === 'note' ? '#2563eb' : 'white',
                  color: postType === 'note' ? 'white' : '#374151',
                  fontWeight: postType === 'note' ? '600' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Note
              </button>
            </div>
          </div>

          {/* Post To */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Post To
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="postTo"
                  checked={postTo === 'entire_class'}
                  onChange={() => setPostTo('entire_class')}
                />
                <span>Entire Class</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="postTo"
                  checked={postTo === 'individual'}
                  onChange={() => setPostTo('individual')}
                />
                <span>Individual Students/Instructors</span>
              </label>
            </div>

            {/* User Selection (only if individual is selected) */}
            {postTo === 'individual' && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '4px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                  Select Users:
                </div>
                {availableUsers.map(user => (
                  <label key={user.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserToggle(user.id)}
                    />
                    <span style={{ fontSize: '14px' }}>
                      {user.name} {user.role === 'instructor' && '(Instructor)'}
                    </span>
                  </label>
                ))}
                {errors.users && (
                  <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                    {errors.users}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Select Folders */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Select Folder(s) *
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '4px',
              border: errors.folders ? '1px solid #dc2626' : '1px solid #e5e7eb'
            }}>
              {availableFolders.map(folder => (
                <button
                  key={folder}
                  onClick={() => handleFolderToggle(folder)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: selectedFolders.includes(folder) ? '#2563eb' : 'white',
                    color: selectedFolders.includes(folder) ? 'white' : '#374151',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {folder}
                </button>
              ))}
            </div>
            {errors.folders && (
              <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                {errors.folders}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              At least one folder is required
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Summary *
            </label>
            <input
              type="text"
              placeholder="Brief summary of your question or note (max 100 characters)"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={100}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.summary ? '1px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px'
            }}>
              {errors.summary ? (
                <div style={{ color: '#dc2626', fontSize: '14px' }}>
                  {errors.summary}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Required
                </div>
              )}
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {summary.length}/100
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Details *
            </label>
            <textarea
              placeholder="Enter the full details of your question or note..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '10px',
                border: errors.details ? '1px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            {errors.details && (
              <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                {errors.details}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#2563eb',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Post My {postType === 'question' ? 'Question' : 'Note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}