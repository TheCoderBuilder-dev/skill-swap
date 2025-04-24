import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import '../styles/SkillList.css'

function SkillList() {
  const [skills, setSkills] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/skills')
      .then(res => res.json())
      .then(data => {
        setSkills(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching skills:', err)
        toast.error('Failed to load skills')
        setLoading(false)
      })
  }, [])

  const filteredSkills = skills.filter(skill => 
    skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.skill_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="skills-container">
        <div className="loading">Loading skills</div>
      </div>
    )
  }

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h2>Available Skills</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {filteredSkills.length === 0 ? (
        <div className="no-results">
          No skills found matching your search.
        </div>
      ) : (
        <div className="skills-grid">
          {filteredSkills.map(skill => (
            <div key={skill.id} className="skill-card">
              <div className="skill-header">
                <h3 className="skill-title">{skill.title}</h3>
                <span className={`skill-type ${skill.skill_type.toLowerCase()}`}>
                  {skill.skill_type}
                </span>
              </div>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-footer">
                <div className="user-info">
                  <div className="user-avatar">
                    {skill.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{skill.user_name}</div>
                    <div className="user-contact">{skill.contact_info}</div>
                  </div>
                </div>
                <button className="connect-button">Connect</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillList 