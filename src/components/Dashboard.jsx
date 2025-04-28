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
          Add New Skill
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Active Swaps</h3>
            <p className="stat-value">{stats.activeSwaps}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-value">{stats.completedSwaps}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Skills Offered</h3>
            <p className="stat-value">{stats.skillsOffered}</p>
          </div>
        </div>

        <div className="stat-card">
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
