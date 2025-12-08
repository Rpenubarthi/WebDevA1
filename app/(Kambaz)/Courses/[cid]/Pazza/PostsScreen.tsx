'use client';

interface PostScreenProps {
  courseId: string;
  selectedPost: any;
  showToggle: boolean;
  onToggle: () => void;
}

export default function PostScreen({ courseId, selectedPost, showToggle, onToggle }: PostScreenProps) {
  
  // If no post selected, show Class at a Glance
  if (!selectedPost) {
    return (
      <div style={{
        flex: 1,
        padding: '32px',
        backgroundColor: '#f9fafb',
        overflowY: 'auto'
      }}>
        {showToggle && (
          <button 
            onClick={onToggle}
            style={{
              marginBottom: '16px',
              color: '#6b7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ▶ Show Posts List
          </button>
        )}
        
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px'
        }}>
          Class at a Glance
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '672px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>0</div>
            <div style={{ color: '#6b7280' }}>Unread posts</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316' }}>0</div>
            <div style={{ color: '#6b7280' }}>Unanswered posts</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>0</div>
            <div style={{ color: '#6b7280' }}>Total posts</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a855f7' }}>0</div>
            <div style={{ color: '#6b7280' }}>Instructor responses</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#14b8a6' }}>0</div>
            <div style={{ color: '#6b7280' }}>Student responses</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6366f1' }}>45</div>
            <div style={{ color: '#6b7280' }}>Students enrolled</div>
          </div>
        </div>
      </div>
    );
  }

  // If post is selected, show the post details
  return (
    <div style={{
      flex: 1,
      padding: '32px',
      backgroundColor: 'white',
      overflowY: 'auto'
    }}>
      {showToggle && (
        <button 
          onClick={onToggle}
          style={{
            marginBottom: '16px',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ▶ Show Posts List
        </button>
      )}
      
      {/* Post Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {selectedPost.summary}
          </h1>
          <button style={{
            color: '#2563eb',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            Edit
          </button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span> 0 views</span>
          <span> {selectedPost.folders || 'hw1'}</span>
          <span> {selectedPost.authorRole}</span>
          <span> {new Date(selectedPost.createdAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Post Content */}
      <div style={{
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      }}>
        <div dangerouslySetInnerHTML={{ __html: selectedPost.details }} />
      </div>

      {/* Student Answers Section */}
      {selectedPost.type === 'question' && (
        <>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Student's Answers
            </h3>
            <div style={{
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              No student answers yet.
            </div>
            
            {/* Answer Input for Students */}
            <div style={{ marginTop: '16px' }}>
              <textarea
                placeholder="Type your answer here..."
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  padding: '12px',
                  minHeight: '128px',
                  fontFamily: 'inherit'
                }}
              />
              <button style={{
                marginTop: '8px',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer'
              }}>
                Post Answer
              </button>
            </div>
          </div>

          {/* Instructor Answers Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Instructor's Answers
            </h3>
            <div style={{
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              No instructor answers yet.
            </div>
          </div>
        </>
      )}

      {/* Follow-up Discussion Section */}
      <div style={{
        marginTop: '32px',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>
          Follow-up Discussion
        </h3>
        <textarea
          placeholder="Start a new follow-up discussion..."
          style={{
            width: '100%',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '12px',
            minHeight: '96px',
            marginBottom: '8px',
            fontFamily: 'inherit'
          }}
        />
        <button style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer'
        }}>
          Post Discussion
        </button>
      </div>
    </div>
  );
}