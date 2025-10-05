import './ProcessChain.css'

interface ProcessStep {
  step: number
  title: string
  desc: string
}

interface ProcessChainProps {
  title: string
  steps: ProcessStep[]
}

const ProcessChain = ({ title, steps }: ProcessChainProps) => {
  return (
    <section className="process-chain">
      <div className="process-container">
        <h2 className="process-title">{title}</h2>
        <div className="process-steps">
          {steps.map((step, idx) => (
            <div key={step.step} className="process-step">
              <div className="step-number">{step.step}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessChain
