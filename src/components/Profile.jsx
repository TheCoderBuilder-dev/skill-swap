import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

function Profile() {
  const [userSkills, setUserSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    skill_type: ''
  })
  const currentUser = 'Mike R'

  useEffect(() => {
    fetch('http://localhost:3000/skills')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(skill => skill.user_name === currentUser)
        setUserSkills(filtered)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching skills:', err)
        toast.error('Failed to load your skills')
        setLoading(false)
      })
  }, [])

  const handleEdit = (skill) => {
    setEditingId(skill.id)
    setEditForm({
      title: skill.title,
      description: skill.description,
      skill_type: skill.skill_type
    })
  }

  const handleUpdate = (id) => {
    fetch(`http://localhost:3000/skills/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editForm)
    })
    .then(res => res.json())
    .then(updatedSkill => {
      setUserSkills(prev => 
        prev.map(skill => 
          skill.id === id ? { ...skill, ...editForm } : skill
        )
      )
      setEditingId(null)
      toast.success('Skill updated successfully!')
    })
    .catch(err => {
      console.error('Error updating skill:', err)
      toast.error('Failed to update skill')
    })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      fetch(`http://localhost:3000/skills/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        setUserSkills(prev => prev.filter(skill => skill.id !== id))
        toast.success('Skill deleted successfully!')
      })
      .catch(err => {
        console.error('Error deleting skill:', err)
        toast.error('Failed to delete skill')
      })
    }
  }

  if (loading) {
    return <div>Loading profile...</div>
  }

  return (
    <div>
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>Welcome back, {currentUser}!</p>
      </div>

      <div className="skill-card">
        <h3>My Listed Skills</h3>
        {userSkills.length === 0 ? (
          <p>You haven't listed any skills yet.</p>
        ) : (
          userSkills.map(skill => (
            <div key={skill.id} className="skill-card" style={{ marginTop: '1rem' }}>
              {editingId === skill.id ? (
                <div>
                  <input
                    type="text"
                    className="form-input"
                    value={editForm.title}
                    onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <textarea
                    className="form-input"
                    value={editForm.description}
                    onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    style={{ marginTop: '0.5rem' }}
                  />
                  <select
                    className="form-input"
                    value={editForm.skill_type}
                    onChange={e => setEditForm(prev => ({ ...prev, skill_type: e.target.value }))}
                    style={{ marginTop: '0.5rem' }}
                  >
                    <option value="music">Music</option>
                    <option value="technology">Technology</option>
                    <option value="language">Language</option>
                    <option value="art">Art</option>
                    <option value="sports">Sports</option>
                    <option value="cooking">Cooking</option>
                    <option value="other">Other</option>
                  </select>
                  <div style={{ marginTop: '1rem' }}>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => handleUpdate(skill.id)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Save
                    </button>
                    <button 
                      className="btn" 
                      onClick={() => setEditingId(null)}
                      style={{ background: '#ddd' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4>{skill.title}</h4>
                  <span className={`skill-type ${skill.skill_type}`}>
                    {skill.skill_type}
                  </span>
                  <p style={{ marginTop: '0.5rem' }}>{skill.description}</p>
                  <div style={{ marginTop: '1rem' }}>
                    <button
                      className="btn"
                      onClick={() => handleEdit(skill)}
                      style={{ marginRight: '0.5rem', background: '#ddd' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(skill.id)}
                      style={{ background: '#e74c3c', color: 'white' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Profile 