import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to SkillSwap</h1>
        <p>Connect with others to exchange skills and knowledge. No money needed - just trade what you know!</p>
      </section>

      <section className="how-it-works">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3 className="step-title">Browse Skills</h3>
          <p className="step-description">
            Explore a diverse range of skills offered by our community members or add your own expertise to the mix.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <h3 className="step-title">Find Matches</h3>
          <p className="step-description">
            Discover people whose skills you want to learn and who might be interested in what you can teach.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <h3 className="step-title">Make an Offer</h3>
          <p className="step-description">
            Propose a skill exchange that benefits both parties. No money involved - just pure knowledge sharing.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <h3 className="step-title">Start Learning</h3>
          <p className="step-description">
            Connect with your match and begin your learning journey together. Grow your skillset while helping others grow theirs.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <Link to="/skills" className="cta-button">
          Browse Skills
        </Link>
      </section>
    </div>
  );
}

export default Home;
