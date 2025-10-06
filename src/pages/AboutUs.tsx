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
          <h1 className="about-title">About SmartGram</h1>
          <p className="about-subtitle">Department of Rural Water Supply & Sanitation</p>
          <p className="about-tagline">Empowering Gram Panchayats through Digital Water Management</p>

          <section className="about-section vision-section">
            <h2>Vision</h2>
            <p>
              Every village and household should have access to safe, adequate, and affordable
              drinking water through a digitally managed water distribution system, ensuring
              sustainability, transparency, and participation of local communities.
            </p>
          </section>

          <section className="about-section mission-section">
            <h2>Mission</h2>
            <p>The SmartGram Portal aims to assist, empower, and facilitate Gram Panchayats in:</p>
            <ul className="about-list">
              <li>Implementing smart water monitoring and maintenance systems</li>
              <li>Providing real-time access to water supply data for every household</li>
              <li>Enabling predictive maintenance through digital scheduling and alerts</li>
              <li>Creating a transparent complaint and billing system for citizens</li>
              <li>Ensuring sustainable operation & maintenance (O&M) of water infrastructure</li>
            </ul>
          </section>

          <section className="about-section objectives-section">
            <h2>Objectives</h2>
            <p>The key objectives of the portal are to:</p>
            <ul className="about-list">
              <li>Provide real-time data on water supply, quality, and usage for every registered household</li>
              <li>Enable Gram Panchayat-level dashboards for management, billing, and maintenance</li>
              <li>Build citizen awareness on water conservation and usage efficiency</li>
              <li>Support IoT-based monitoring through Bluetooth-enabled digital meters</li>
              <li>Facilitate grievance redressal with geo-tagged complaints and task assignment</li>
              <li>Ensure data transparency and integration with higher-level water authorities</li>
            </ul>
          </section>

          <section className="about-section commitment-section">
            <h2>Our Commitment</h2>
            <p>
              We are dedicated to making every Gram Panchayat digitally self-reliant in water
              governance — strengthening community participation, improving transparency, and
              ensuring safe water delivery for every household.
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
