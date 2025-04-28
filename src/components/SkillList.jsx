import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/SkillList.css'

function SkillList() {
  const [all_skills, setAllSkills] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  let navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/skills')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch skills')
        }
        return response.json()
      })
      .then((data) => {
        setAllSkills(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed to load skills. Try again later.')
        setIsLoading(false)
      })
  }, [])

  function searchSkills(searchText) {
    setSearch(searchText)
  }

  if (isLoading) {
    return (
      <div className="skills-container">
        <div className="loading">Loading skills...</div>
      </div>
    )
  }

  const filtered = all_skills.filter(skill =>
    (skill?.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (skill?.description?.toLowerCase() || '').includes(search.toLowerCase())
  )

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h2>Available Skills</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => searchSkills(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">No skills found matching your search.</div>
      ) : (
        <div className="skills-list">
          {filtered.map(skill => (
            <div
              key={skill?.id || Math.random()}
              className="skill-card"
              onClick={() => navigate(`/skills/${skill?.id}`)}
            >
              <div className="skill-header">
                <h3 className="skill-title">{skill?.title || 'Untitled Skill'}</h3>
                <span className={`skill-type ${skill?.type?.toLowerCase() || ''}`}>
                  {skill?.type || 'Unspecified'}
                </span>
              </div>
              <p className="skill-description">{skill?.description || 'No description available'}</p>
              <div className="skill-footer">
                <span className="user-name">By {skill?.teacher || 'Anonymous'}</span>
                <button
                  className="view-details-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/skills/${skill?.id}`)
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillList

