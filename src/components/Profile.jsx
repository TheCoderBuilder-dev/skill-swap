import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Profile.css';

function Profile() {
  const [mySkills, setMySkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editStuff, setEditStuff] = useState({
    title: '',
    description: ''
  });
  const [newSkill, setNewSkill] = useState({ title: '', description: '' });
  const myName = 'Mike R';

  useEffect(() => {
    fetch('http://localhost:3000/skills')
      .then(response => response.json())
      .then(data => {
        const userSkills = data.filter(skill => skill.user_name === myName);
        setMySkills(userSkills);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
        toast.error('Could not load your skills.');
        setLoading(false);
      });
  }, []);

  function startEdit(skill) {
    setEditId(skill.id);
    setEditStuff({
      title: skill.title,
      description: skill.description
    });
  }

  function saveChanges(id) {
    if (!editStuff.title || !editStuff.description) {
      toast.error('Both title and description are required!');
      return;
    }

    fetch(`http://localhost:3000/skills/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editStuff),
    })
      .then(response => response.json())
      .then(updatedSkill => {
        setMySkills(prevSkills =>
          prevSkills.map(skill =>
            skill.id === id ? { ...skill, ...editStuff } : skill
          )
        );
        setEditId(null);
        toast.success('Skill updated!');
      })
      .catch(error => {
        console.error('Error updating skill:', error);
        toast.error('Could not update skill.');
      });
  }

  function deleteSkill(id) {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      fetch(`http://localhost:3000/skills/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setMySkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
          toast.success('Skill deleted!');
        })
        .catch(error => {
          console.error('Error deleting skill:', error);
          toast.error('Could not delete skill.');
        });
    }
  }

  function addNewSkill() {
    if (!newSkill.title || !newSkill.description) {
      toast.error('Both title and description are required!');
      return;
    }

    const newSkillData = {
      user_name: myName,
      title: newSkill.title,
      description: newSkill.description,
    };

    fetch('http://localhost:3000/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSkillData),
    })
      .then(response => response.json())
      .then(skill => {
        setMySkills(prevSkills => [...prevSkills, skill]);
        setNewSkill({ title: '', description: '' });
        toast.success('New skill added!');
      })
      .catch(error => {
        console.error('Error adding skill:', error);
        toast.error('Could not add skill.');
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>Hi {myName}!</p>
      </div>

      <div className="skill-card">
        <h3>My Skills</h3>
        {mySkills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          mySkills.map(skill => (
            <div key={skill.id}>
              {editId === skill.id ? (
                <div>
                  <input
                    value={editStuff.title}
                    onChange={e => setEditStuff({ ...editStuff, title: e.target.value })}
                    placeholder="Skill Title"
                  />
                  <textarea
                    value={editStuff.description}
                    onChange={e => setEditStuff({ ...editStuff, description: e.target.value })}
                    placeholder="Skill Description"
                  />
                  <button onClick={() => saveChanges(skill.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h4>{skill.title}</h4>
                  <p>{skill.description}</p>
                  <button onClick={() => startEdit(skill)}>Edit</button>
                  <button onClick={() => deleteSkill(skill.id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="add-skill">
        <h3>Add a New Skill</h3>
        <input
          type="text"
          value={newSkill.title}
          onChange={e => setNewSkill({ ...newSkill, title: e.target.value })}
          placeholder="Skill Title"
        />
        <textarea
          value={newSkill.description}
          onChange={e => setNewSkill({ ...newSkill, description: e.target.value })}
          placeholder="Skill Description"
        />
        <button onClick={addNewSkill}>Add Skill</button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Profile;
