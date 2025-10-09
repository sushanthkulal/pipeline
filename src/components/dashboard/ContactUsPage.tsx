import { Phone, Mail, MapPin, User } from 'lucide-react'
import './ContactUsPage.css'

const ContactUsPage = () => {
  const contacts = [
    {
      role: 'Admin',
      name: 'Prakash Kumar',
      phone: '+91 9876543210',
      email: 'prakash.admin@smartgram.in',
      department: 'Administration & Coordination'
    },
    {
      role: 'Tank Cleaner',
      name: 'Ravi Singh',
      phone: '+91 9876501234',
      email: 'ravi.cleaner@smartgram.in',
      department: 'Maintenance Services'
    },
    {
      role: 'Technician',
      name: 'Rohit Sharma',
      phone: '+91 9988776655',
      email: 'rohit.tech@smartgram.in',
      department: 'Technical Support'
    },
    {
      role: 'Quality Inspector',
      name: 'Meera Patel',
      phone: '+91 9876554321',
      email: 'meera.quality@smartgram.in',
      department: 'Quality Assurance'
    },
    {
      role: 'Billing Officer',
      name: 'Suresh Reddy',
      phone: '+91 9988665544',
      email: 'suresh.billing@smartgram.in',
      department: 'Billing & Accounts'
    },
    {
      role: 'Complaint Handler',
      name: 'Anjali Verma',
      phone: '+91 9876543322',
      email: 'anjali.complaints@smartgram.in',
      department: 'Customer Support'
    }
  ]

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  return (
    <div className="contact-us-page">
      <div className="page-header">
        <h2>Contact Us</h2>
        <p>Get in touch with our team for any assistance or queries</p>
      </div>

      <div className="office-info fade-in">
        <div className="office-card">
          <div className="office-icon">
            <MapPin size={32} />
          </div>
          <div className="office-content">
            <h3>Gram Panchayat Office</h3>
            <p>SmartGram Portal Headquarters</p>
            <p>Main Road, Village Center</p>
            <p>District: Sample District, State: Sample State</p>
            <p>PIN: 123456</p>
          </div>
        </div>

        <div className="office-card">
          <div className="office-icon">
            <Phone size={32} />
          </div>
          <div className="office-content">
            <h3>Emergency Helpline</h3>
            <p className="helpline">1800-123-4567</p>
            <p>Available 24/7 for water-related emergencies</p>
          </div>
        </div>
      </div>

      <div className="contacts-section fade-in delay-1">
        <h3>Our Team</h3>
        <div className="contacts-grid">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <div className="contact-avatar">
                <User size={32} />
              </div>
              <div className="contact-info">
                <span className="contact-role">{contact.role}</span>
                <h4>{contact.name}</h4>
                <p className="department">{contact.department}</p>

                <div className="contact-details">
                  <button
                    className="contact-button phone"
                    onClick={() => handleCall(contact.phone)}
                  >
                    <Phone size={16} />
                    <span>{contact.phone}</span>
                  </button>
                  <button
                    className="contact-button email"
                    onClick={() => handleEmail(contact.email)}
                  >
                    <Mail size={16} />
                    <span>{contact.email}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="working-hours fade-in delay-2">
        <div className="hours-card">
          <h3>Office Hours</h3>
          <div className="hours-list">
            <div className="hours-item">
              <span className="day">Monday - Friday</span>
              <span className="time">9:00 AM - 5:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="day">Saturday</span>
              <span className="time">9:00 AM - 1:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="day">Sunday</span>
              <span className="time">Closed</span>
            </div>
          </div>
          <p className="emergency-note">
            For emergencies, please call our 24/7 helpline
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
