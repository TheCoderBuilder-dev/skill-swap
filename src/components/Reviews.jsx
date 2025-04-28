import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Reviews.css';

function Reviews() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // mock review data
        const mockReview = {
          id,
          rating: 5,
          comment: "Great teaching skills! Very patient and knowledgeable.",
          reviewedSkill: "JavaScript Tutoring",
          reviewer: {
            name: "Sarah Johnson",
            avatar: "SJ"
          },
          reviewee: {
            name: "John Smith",
            avatar: "JS"
          },
          createdAt: new Date().toISOString()
        };
        
        setReview(mockReview);
      } catch (err) {
        console.error('Error fetching review:', err);
        setError('Failed to load review');
        toast.error('Failed to load review details');
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <div className="reviews-container">
        <div className="loading">Loading review...</div>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="reviews-container">
        <div className="error-message">
          {error || 'Review not found'}
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="reviews-container">
      <h1>Review Details</h1>
      
      <div className="review-card">
        <div className="review-header">
          <div className="reviewer-info">
            <div className="avatar">{review.reviewer.avatar}</div>
            <div className="name-and-skill">
              <h3>{review.reviewer.name}</h3>
              <p>Review for {review.reviewedSkill}</p>
            </div>
          </div>
          <div className="rating">
            <span className="stars">{renderStars(review.rating)}</span>
            <span className="rating-number">{review.rating}/5</span>
          </div>
        </div>

        <div className="review-content">
          <p className="review-text">{review.comment}</p>
        </div>

        <div className="review-footer">
          <div className="reviewee-info">
            <span>Given to: </span>
            <div className="avatar small">{review.reviewee.avatar}</div>
            <span className="name">{review.reviewee.name}</span>
          </div>
          <div className="review-date">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews; 