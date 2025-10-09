import { Droplet, Target, Users, Award } from 'lucide-react'
import './AboutUsPage.css'

const AboutUsPage = () => {
  const facts = [
    {
      title: 'Water Conservation',
      description: 'A single drop of water wasted can lead to gallons lost over time. Every drop counts towards a sustainable future.'
    },
    {
      title: 'Daily Usage',
      description: 'Average household water consumption in rural India is 40-50 liters per person per day.'
    },
    {
      title: 'Clean Water Access',
      description: 'SDG 6 aims to ensure availability and sustainable management of water and sanitation for all by 2030.'
    }
  ]

  const team = [
    {
      name: 'Raj Kumar',
      role: 'Gram Panchayat President',
      description: 'Leading the initiative for transparent water management'
    },
    {
      name: 'Priya Sharma',
      role: 'Technical Coordinator',
      description: 'Managing the digital infrastructure and monitoring systems'
    },
    {
      name: 'Amit Patel',
      role: 'Quality Inspector',
      description: 'Ensuring water quality standards are maintained'
    }
  ]

  return (
    <div className="about-us-page">
      <div className="about-hero fade-in">
        <div className="hero-icon">
          <Droplet size={48} />
        </div>
        <h1>SmartGram Portal</h1>
        <p className="hero-subtitle">
          Empowering citizens and Gram Panchayats to ensure transparent, real-time water monitoring and maintenance
        </p>
      </div>

      <div className="about-content fade-in delay-1">
        <div className="content-card">
          <h2>Our Mission</h2>
          <p>
            The Smart Water Portal is a transformative initiative that promotes efficient water use and supports
            the Digital India vision. By leveraging technology, we aim to create a transparent ecosystem where
            every household has access to clean, safe drinking water, and every stakeholder can monitor and maintain
            water quality in real-time.
          </p>
        </div>
      </div>

      <div className="features-section fade-in delay-2">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Target size={32} />
            </div>
            <h3>Real-Time Monitoring</h3>
            <p>Track water usage, quality parameters, and supply schedules in real-time through our digital platform.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Citizen Engagement</h3>
            <p>Empowering citizens to report issues, track complaints, and participate in water management decisions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={32} />
            </div>
            <h3>Quality Assurance</h3>
            <p>Continuous monitoring of pH, TDS, turbidity, and chlorine levels to ensure safe drinking water.</p>
          </div>
        </div>
      </div>

      <div className="facts-section fade-in delay-3">
        <h2>Water Conservation Facts</h2>
        <div className="facts-grid">
          {facts.map((fact, index) => (
            <div key={index} className="fact-card">
              <div className="fact-icon">
                <Droplet size={24} />
              </div>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sdg-section fade-in delay-4">
        <div className="sdg-content">
          <div className="sdg-icon">
            <Target size={48} />
          </div>
          <div className="sdg-text">
            <h2>SDG 6: Clean Water & Sanitation</h2>
            <p>
              Our initiative aligns with the United Nations Sustainable Development Goal 6, which focuses on ensuring
              availability and sustainable management of water and sanitation for all. Through technology and community
              participation, we are contributing to a future where clean water is accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      <div className="team-section fade-in delay-5">
        <h2>Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                <Users size={40} />
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-description">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="appreciation-section fade-in delay-6">
        <div className="appreciation-card">
          <h2>Making a Difference Together</h2>
          <p>
            This initiative represents a significant step towards digital governance and sustainable water management.
            We appreciate the support of our community members, technical partners, and government officials who have
            made this project possible. Together, we are building a future where technology serves the common good
            and ensures that every household has access to safe, clean drinking water.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
