import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/SkillDetails.css'

function SkillDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [userSkills, setUserSkills] = useState([])
  const [selectedSkillId, setSelectedSkillId] = useState('')

  useEffect(() => {
    // fake API call
    setTimeout(() => {
      const fetchedSkill = {
        id: id,
        title: "JavaScript Programming",
        description: "Learn JavaScript basics and advanced topics.",
        type: "OFFERING",
        time: "2 hours per week",
        level: "Beginner",
        location: "Online",
        teacher: "John Smith",
        about: "I love helping people learn code."
      }

      setSkill(fetchedSkill)
      setLoading(false)
    }, 1000)
  }, [id])

  useEffect(() => {
    if (showSwapModal) {
      // fake user skills
      const skills = [
        { id: '1', title: 'JavaScript Basics', description: 'Learn JS from scratch' },
        { id: '2', title: 'Guitar Lessons', description: 'Learn to play guitar' },
        { id: '3', title: 'Spanish Language', description: 'Learn basic Spanish' }
      ]

      setUserSkills(skills)
    }
  }, [showSwapModal])

  function handleProposeSwap() {
    if (selectedSkillId === '') {
      toast.error('Please pick a skill first.')
      return
    }

    // pretend to send swap proposal
    setTimeout(() => {
      toast.success('Swap proposal sent!')
      setShowSwapModal(false)
      navigate(`/skills/swap/${id}`)
    }, 500)
  }

  if (loading) {
    return (
      <div className="skill-details-container">
        <p>Loading skill details...</p>
      </div>
    )
  }

  if (error || !skill) {
    return (
      <div className="skill-details-container">
        <p>{error || 'Skill not found.'}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    )
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="skill-box">
        <h1>{skill.title}</h1>
        <span className="type">{skill.type}</span>

        <div className="details">
          <h2>About This Skill</h2>
          <p>{skill.description}</p>

          <h2>Requirements</h2>
          <ul>
            <li>Time: {skill.time}</li>
            <li>Level: {skill.level}</li>
            <li>Location: {skill.location}</li>
          </ul>

          <h2>Teacher</h2>
          <div className="teacher-box">
            <div className="avatar">{skill.teacher.charAt(0)}</div>
            <div>
              <h3>{skill.teacher}</h3>
              <p>{skill.about}</p>
            </div>
          </div>
        </div>

        <div className="buttons">
          <button onClick={() => alert('Messaging coming soon!')}>Message</button>
          <button onClick={() => setShowSwapModal(true)}>Swap Skills</button>
        </div>
      </div>

      {showSwapModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Propose a Skill Swap</h2>
            <p>Choose one of your skills to swap for {skill.title}:</p>

            <div className="skill-select">
              {userSkills.map((userSkill) => (
                <div
                  key={userSkill.id}
                  className={`skill-option ${selectedSkillId === userSkill.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSkillId(userSkill.id)}
                >
                  <h3>{userSkill.title}</h3>
                  <p>{userSkill.description}</p>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowSwapModal(false)}>Cancel</button>
              <button onClick={handleProposeSwap}>Propose Swap</button>
            </div>
          </div>
        </div>
      )}

      <div className="similar-skills-section">
        <h2>Similar Skills</h2>
        <div className="similar-skills-grid">
          {/* could show similar skills here later */}
        </div>
      </div>
    </div>
  );
}

export default SkillDetails;
