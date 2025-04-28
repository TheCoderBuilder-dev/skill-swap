import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/SkillList.css';

function SkillList() {
  const [all_skills, setAllSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setisLoading] = useState(true);
  let navigate = useNavigate();

  var skills = [
    {
      id: '1',
      title: 'JavaScript Programming',
      description: 'Learn JavaScript programming from basics to advanced concepts.',
      type: 'OFFERING',
      teacher: 'John Smith'
    },
    {
      id: '2',
      title: 'Guitar Lessons',
      description: 'Beginner to intermediate acoustic guitar lessons.',
      type: 'OFFERING',
      teacher: 'Sarah Johnson'
    },
    {
      id: '3',
      title: 'Spanish Language',
      description: 'Want to learn Spanish language. Looking for a tutor.',
      type: 'SEEKING',
      teacher: 'Mike Wilson'
    },
  ];

  useEffect(() => {
    setAllSkills(skills);
    setisLoading(false);
  }, [])

  function searchSkills(searchText) {
    setSearch(searchText);
  }

  if(isLoading == true) {
    return <div className="skills-container">
      <div className="loading">Loading skills...</div>
    </div>
  }

  let filtered = [];
  for(let i = 0; i < all_skills.length; i++) {
    if(all_skills[i].title.toLowerCase().includes(search.toLowerCase()) || 
       all_skills[i].description.toLowerCase().includes(search.toLowerCase())) {
      filtered.push(all_skills[i]);
    }
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
            value={search}
            onChange={(e) => searchSkills(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          No skills found matching your search.
        </div>
      ) : (
        <div className="skills-list">
          {filtered.map(skill => (
            <div 
              key={skill.id} 
              className="skill-card"
              onClick={() => navigate(`/skills/${skill.id}`)}
            >
              <div className="skill-header">
                <h3 className="skill-title">{skill.title}</h3>
                <span className={`skill-type ${skill.type.toLowerCase()}`}>
                  {skill.type}
                </span>
              </div>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-footer">
                <span className="user-name">By {skill.teacher}</span>
                <button 
                  className="view-details-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/skills/${skill.id}`);
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
  );
}

export default SkillList;
