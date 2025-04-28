import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddSkill() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillType: '',
    skillLevel: 'beginner',
  });

  const [errors, setErrors] = useState({});

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.skillType) {
      newErrors.skillType = 'Skill type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create skill');
      }

      const data = await response.json();
      toast.success('Skill added successfully!');
      nav(`/skills/${data.id}`);
    } catch (error) {
      console.error('Error creating skill:', error);
      toast.error('Failed to create skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-skill-container">
      <h2>Add New Skill</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What skill are you offering?"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what you'll teach..."
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label>Skill Type *</label>
          <select
            name="skillType"
            value={formData.skillType}
            onChange={handleChange}
            className={errors.skillType ? 'error' : ''}
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="language">Language</option>
            <option value="art">Art</option>
            <option value="sports">Sports</option>
            <option value="cooking">Cooking</option>
          </select>
          {errors.skillType && <div className="error-message">{errors.skillType}</div>}
        </div>

        <div className="form-group">
          <label>Skill Level</label>
          <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Skill'}
        </button>
      </form>
    </div>
  );
}

export default AddSkill;
