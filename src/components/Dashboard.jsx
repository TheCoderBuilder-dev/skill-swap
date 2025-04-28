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

  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsSeeking, setSkillsSeeking] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from API
    const mockStats = {
      activeSwaps: 3,
      completedSwaps: 12,
      skillsOffered: 5,
      skillsSeeking: 2,
      rating: 4.8,
    };

    const mockSkillsOffered = ['JavaScript', 'React', 'Python'];
    const mockSkillsSeeking = ['Node.js', 'CSS'];
    const mockRecentActivity = [
      'Completed a swap with John: React for Node.js',
      'Started a new swap with Sarah: Python for CSS',
    ];

    // Set state with mock data
    setStats(mockStats);
    setSkillsOffered(mockSkillsOffered);
    setSkillsSeeking(mockSkillsSeeking);
    setRecentActivity(mockRecentActivity);

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>; // Add loader for loading state
  }

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
        <div className="skills-section">
          <h2>Skills Offered</h2>
          <ul>
            {skillsOffered.length > 0 ? (
              skillsOffered.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <p>No skills offered yet.</p>
            )}
          </ul>
        </div>

        <div className="skills-section">
          <h2>Skills Seeking</h2>
          <ul>
            {skillsSeeking.length > 0 ? (
              skillsSeeking.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <p>No skills sought yet.</p>
            )}
          </ul>
        </div>

        <div className="recent-activity-section">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))
            ) : (
              <p>No recent activity.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
