import { useNavigate } from 'react-router-dom'
import './AboutUs.css'

const AboutUs = () => {
  const navigate = useNavigate()

  return (
    <div className="about-page">
      <div className="about-container">
        <button onClick={() => navigate('/')} className="about-back-button">
          ← Back to Home
        </button>

        <div className="about-content">
          <h1 className="about-title">About Jal Jeevan Mission</h1>

          <section className="about-section">
            <h2>Mission Overview</h2>
            <p>
              The Jal Jeevan Mission (JJM) is a flagship programme of the Government of India,
              launched on 15th August 2019, to ensure safe and adequate drinking water through
              individual household tap connections by 2024 to all households in rural India.
            </p>
            <p>
              The programme aims to create local water supply infrastructure and provide functional
              household tap connections (FHTC) to every rural household, i.e., Har Ghar Jal.
            </p>
          </section>

          <section className="about-section">
            <h2>Key Objectives</h2>
            <ul className="about-list">
              <li>Provide functional household tap connection to every rural household</li>
              <li>Ensure safe and adequate drinking water supply</li>
              <li>Improve water quality monitoring and surveillance</li>
              <li>Promote community participation and ownership</li>
              <li>Strengthen local governance in water management</li>
              <li>Achieve sustainable water security</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Digital Platform</h2>
            <p>
              This platform supports the Jal Jeevan Mission by providing digital tools for Gram
              Panchayats to monitor, maintain, and report on water quality and infrastructure in
              real-time. Our solution empowers local communities with:
            </p>
            <ul className="about-list">
              <li>Real-time water quality monitoring and alerts</li>
              <li>Digital record-keeping for water tests and maintenance</li>
              <li>Predictive analytics for infrastructure maintenance</li>
              <li>Transparent reporting to households and government portals</li>
              <li>Mobile-first design for village functionaries</li>
              <li>Offline capability for areas with limited connectivity</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Vision</h2>
            <p>
              We envision a future where every village in India has access to safe drinking water,
              monitored and managed efficiently by local communities using modern digital tools. By
              combining government initiatives with technology, we aim to make water security a
              reality for all.
            </p>
          </section>

          <section className="about-section">
            <h2>Get Started</h2>
            <p>
              Whether you're a household member wanting to check your water quality or a Panchayat
              staff member managing village water infrastructure, our platform is designed to serve
              your needs.
            </p>
            <div className="about-actions">
              <button onClick={() => navigate('/user_login')} className="about-action-button">
                Login as User
              </button>
              <button onClick={() => navigate('/panchayat_login')} className="about-action-button">
                Login as Panchayat Staff
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
