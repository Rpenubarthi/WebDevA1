interface ClassAtAGlanceProps {
    unreadPosts?: number;
    unansweredPosts?: number;
    totalPosts?: number;
    instructorResponses?: number;
    studentResponses?: number;
    studentsEnrolled?: number;
}

export default function ClassAtAGlance({
    unreadPosts = 0,
    unansweredPosts = 0,
    totalPosts = 0,
    instructorResponses = 0,
    studentResponses = 0,
    studentsEnrolled = 0
}: ClassAtAGlanceProps) {
    const statStyle = { backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '672px' }}>
            <div style={statStyle}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{unreadPosts}</div>
                <div style={{ color: '#6b7280' }}>Unread posts</div>
            </div>
            <div style={statStyle}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316' }}>{unansweredPosts}</div>
                <div style={{ color: '#6b7280' }}>Unanswered posts</div>
            </div>
            <div style={statStyle}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>{totalPosts}</div>
                <div style={{ color: '#6b7280' }}>Total posts</div>
            </div>
            <div style={statStyle}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a855f7' }}>{instructorResponses}</div>
                <div style={{ color: '#6b7280' }}>Instructor responses</div>
            </div>
            <div style={statStyle}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#14b8a6' }}>{studentResponses}</div>
                <div style={{ color: '#6b7280' }}>Student responses</div>
            </div>
            <div style={statStyle}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6366f1' }}>{studentsEnrolled}</div>
                <div style={{ color: '#6b7280' }}>Students enrolled</div>
            </div>
        </div>
    );
}