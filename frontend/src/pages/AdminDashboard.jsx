import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [pendingWords, setPendingWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchPendingWords();
  }, [navigate]);

  const fetchPendingWords = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/words/pending/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingWords(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending words:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token expired or invalid
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`/api/words/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage({ type: 'success', text: 'Word approved successfully!' });
      // Remove from pending list
      setPendingWords(pendingWords.filter((word) => word.wordID !== id));

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to approve word.' });
      console.error('Approve error:', error);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this word?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`/api/words/${id}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage({ type: 'success', text: 'Word rejected successfully!' });
      // Remove from pending list
      setPendingWords(pendingWords.filter((word) => word.wordID !== id));

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to reject word.' });
      console.error('Reject error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this word?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/words/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage({ type: 'success', text: 'Word deleted successfully!' });
      // Remove from pending list
      setPendingWords(pendingWords.filter((word) => word.wordID !== id));

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete word.' });
      console.error('Delete error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <a href="/" className="btn-secondary">View Site</a>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{pendingWords.length}</h3>
          <p>Pending Submissions</p>
        </div>
      </div>

      <section className="pending-section">
        <h2>Pending Word Submissions</h2>

        {pendingWords.length === 0 ? (
          <div className="no-pending">
            <p>No pending submissions. Great job!</p>
          </div>
        ) : (
          <div className="pending-words-list">
            {pendingWords.map((word) => (
              <div key={word.wordID} className="pending-word-card">
                <div className="word-info">
                  <h3>{word.wordName}</h3>
                  <p><strong>Meaning:</strong> {word.wordMeaning}</p>
                  <p><strong>Example:</strong> {word.wordSentence}</p>
                  <p className="word-meta">
                    Submitted: {new Date(word.dateCreated).toLocaleString()}
                  </p>
                </div>

                <div className="word-actions">
                  <button
                    onClick={() => handleApprove(word.wordID)}
                    className="btn-approve"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(word.wordID)}
                    className="btn-reject"
                  >
                    ✕ Reject
                  </button>
                  <button
                    onClick={() => handleDelete(word.wordID)}
                    className="btn-delete"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
