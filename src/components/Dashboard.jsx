import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    activeSwaps: 0,
    completedSwaps: 0,
    skillsOffered: 0,
    skillsSeeking: 0,
    rating: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockStats = {
      activeSwaps: 3,
      completedSwaps: 12,
      skillsOffered: 5,
      skillsSeeking: 2,
      rating: 4.8,
    };
    setStats(mockStats);
    setLoading(false);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/add-skill" className="add-skill-button">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Skill
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon active">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Active Swaps</h3>
            <p className="stat-value">{stats.activeSwaps}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-value">{stats.completedSwaps}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon offering">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Skills Offered</h3>
            <p className="stat-value">{stats.skillsOffered}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rating">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Rating</h3>
            <p className="stat-value">{stats.rating}/5.0</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="active-swaps-section">
          <h2>Active Skill Swaps</h2>
        </div>

        <div className="recent-activity-section">
          <h2>Recent Activity</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
