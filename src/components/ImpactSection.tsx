import './ImpactSection.css'

interface ImpactSectionProps {
  title: string
  bullets: string[]
}

const ImpactSection = ({ title, bullets }: ImpactSectionProps) => {
  return (
    <section className="impact-section">
      <div className="impact-container">
        <h2 className="impact-title">{title}</h2>
        <div className="impact-bullets">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="impact-bullet">
              <div className="bullet-marker"></div>
              <p className="bullet-text">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
