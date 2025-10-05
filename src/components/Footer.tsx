import './Footer.css'

interface Contact {
  role: string
  name?: string
  phone: string
  email?: string
}

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  contacts: Contact[]
  links: FooterLink[]
  copyright: string
}

const Footer = ({ contacts, links, copyright }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Contact Information</h3>
          {contacts.map((contact, idx) => (
            <div key={idx} className="footer-contact">
              <p className="contact-role">{contact.role}</p>
              {contact.name && <p className="contact-name">{contact.name}</p>}
              <p className="contact-detail">Phone: {contact.phone}</p>
              {contact.email && <p className="contact-detail">Email: {contact.email}</p>}
            </div>
          ))}
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Useful Links</h3>
          <div className="footer-links">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
