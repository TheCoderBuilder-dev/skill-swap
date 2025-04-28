import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/SkillSwap.css'

function SkillSwap() {
  const [swapDetails, setSwapDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSwapDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        await new Promise(resolve => setTimeout(resolve, 500))

        // Mock data for swap details
        const mockSwapDetails = {
          id: id,
          status: 'pending',
          proposedBy: { name: 'John Doe', skill: { title: 'Guitar Lessons', description: 'Beginner to intermediate' } },
          requestedSkill: { title: 'Programming Lessons', description: 'Learn programming fundamentals' }
        }

        setSwapDetails(mockSwapDetails)
      } catch (err) {
        console.error('Error fetching swap details:', err)
        setError('Failed to load swap details')
        toast.error('Failed to load swap details')
      } finally {
        setLoading(false)
      }
    }

    fetchSwapDetails()
  }, [id])

  // Handle accepting the swap
  const handleAcceptSwap = () => {
    toast.success('Swap request accepted!')
    navigate('/dashboard')
  };

  const handleDeclineSwap = () => {
    toast.info('Swap request declined')
    navigate('/dashboard')
  };

  if (loading) {
    return <div className="loading">Loading swap details...</div>
  }

  // If there's an error or no swap details, show error message
  if (error || !swapDetails) {
    return (
      <div className="error-message">
        {error || 'Swap details not found'}
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="skill-swap-container">
      <h1>Skill Swap Request</h1>

      <div className="swap-details-card">
        <div className="swap-header">
          <h2>Swap Proposal</h2>
          <span className={`status-badge ${swapDetails.status}`}>{swapDetails.status}</span>
        </div>

        <div className="swap-content">
          <div className="user-offer">
            <h3>Offering</h3>
            <div className="skill-card">
              <h4>{swapDetails.proposedBy.skill.title}</h4>
              <p>{swapDetails.proposedBy.skill.description}</p>
              <div>Offered by: {swapDetails.proposedBy.name}</div>
            </div>
          </div>

          <div className="swap-arrow">↔️</div>

          <div className="user-request">
            <h3>Requesting</h3>
            <div className="skill-card">
              <h4>{swapDetails.requestedSkill.title}</h4>
              <p>{swapDetails.requestedSkill.description}</p>
            </div>
          </div>
        </div>

        <div className="swap-actions">
          <button className="decline-button" onClick={handleDeclineSwap}>Decline</button>
          <button className="accept-button" onClick={handleAcceptSwap}>Accept</button>
        </div>
      </div>
    </div>
  );
}

export default SkillSwap;
