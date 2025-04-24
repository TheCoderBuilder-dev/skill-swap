import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/SkillDetails.css';

function SkillDetails() {
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/skills/${id}`)
      .then(res => res.json())
      .then(data => {
        setSkill(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skill:', err);
        toast.error('Failed to load skill details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="skill-details-container">
        <div className="loading">Loading skill details...</div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="skill-details-container">
        <div className="error-message">Skill not found</div>
      </div>
    );
  }

  return (
    <div className="skill-details-container">
      <div className="skill-details-card">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="skill-details-header">
          <h1>{skill.title}</h1>
          <span className={`skill-type ${skill.skill_type.toLowerCase()}`}>
            {skill.skill_type}
          </span>
        </div>

        <div className="skill-details-content">
          <div className="skill-description-section">
            <h2>Description</h2>
            <p>{skill.description}</p>
          </div>

          <div className="skill-requirements-section">
            <h2>Requirements</h2>
            <ul>
              <li>Time Commitment: {skill.time_commitment || 'Flexible'}</li>
              <li>Experience Level: {skill.experience_level || 'Any'}</li>
              <li>Location: {skill.location || 'Remote'}</li>
            </ul>
          </div>

          <div className="user-profile-section">
            <h2>About the {skill.skill_type === 'OFFERING' ? 'Teacher' : 'Student'}</h2>
            <div className="user-profile-card">
              <div className="user-avatar-large">
                {skill.user_name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info-detailed">
                <h3>{skill.user_name}</h3>
                <p>{skill.user_bio || 'No bio provided'}</p>
                <div className="user-stats">
                  <div className="stat">
                    <span className="stat-value">4.8</span>
                    <span className="stat-label">Rating</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Swaps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="message-button">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Message
          </button>
          <button className="connect-button">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8a1 1 0 011-1h2a1 1 0 011 1zm8-6v14a1 1 0 01-1 1h-2a1 1 0 01-1-1V5a1 1 0 011-1h2a1 1 0 011 1zm8 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011 1z" />
            </svg>
            Propose Swap
          </button>
        </div>
      </div>

      <div className="similar-skills-section">
        <h2>Similar Skills</h2>
        <div className="similar-skills-grid">
        </div>
      </div>
    </div>
  );
}

export default SkillDetails;
