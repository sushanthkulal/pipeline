import './Section.css'

interface SectionRow {
  headline: string
  text: string
}

interface SectionProps {
  title: string
  rows: SectionRow[]
}

const Section = ({ title, rows }: SectionProps) => {
  return (
    <section className="section">
      <div className="section-container">
        <h2 className="section-title">{title}</h2>
        <div className="section-rows">
          {rows.map((row, idx) => (
            <div key={idx} className="section-row">
              <h3 className="row-headline">{row.headline}</h3>
              <p className="row-text">{row.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section
