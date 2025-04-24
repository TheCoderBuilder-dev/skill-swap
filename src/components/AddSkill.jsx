import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AddSkill() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skill_type: '',
    user_name: '',
    contact_info: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.skill_type) {
      toast.error('Please fill in all required fields')
      return
    }

    const skillData = {
      ...formData,
      posted_on: new Date().toISOString().split('T')[0]
    }

    fetch('http://localhost:3000/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(skillData)
    })
    .then(res => res.json())
    .then(data => {
      toast.success('Skill added successfully!')
      navigate('/skills')
    })
    .catch(err => {
      console.error('Error adding skill:', err)
      toast.error('Failed to add skill')
    })
  }

  return (
    <div>
      <div className="profile-header">
        <h2>Add New Skill</h2>
      </div>

      <div className="skill-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Guitar Lessons"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you can teach or what you want to learn..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skill Type *</label>
            <select
              name="skill_type"
              className="form-input"
              value={formData.skill_type}
              onChange={handleChange}
            >
              <option value="">Select a type</option>
              <option value="music">Music</option>
              <option value="technology">Technology</option>
              <option value="language">Language</option>
              <option value="art">Art</option>
              <option value="sports">Sports</option>
              <option value="cooking">Cooking</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input
              type="text"
              name="user_name"
              className="form-input"
              value={formData.user_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Info *</label>
            <input
              type="text"
              name="contact_info"
              className="form-input"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder="Email or phone number"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Skill
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddSkill 