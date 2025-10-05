import Header from '../components/Header'
import Hero from '../components/Hero'
import ThreeColumnActions from '../components/ThreeColumnActions'
import Section from '../components/Section'
import FeaturesGrid from '../components/FeaturesGrid'
import ProcessChain from '../components/ProcessChain'
import ImpactSection from '../components/ImpactSection'
import AboutPreview from '../components/AboutPreview'
import Footer from '../components/Footer'
import landingData from '../data/landingData.json'

const LandingPage = () => {
  const headerData = landingData.components.find((c) => c.type === 'header')
  const heroData = landingData.components.find((c) => c.type === 'hero')
  const threeActionsData = landingData.components.find((c) => c.type === 'three_column_actions')
  const diffSection = landingData.components.find((c) => c.id === 'diff_section')
  const communitySection = landingData.components.find((c) => c.id === 'community_section')
  const featuresData = landingData.components.find((c) => c.type === 'features_grid')
  const processData = landingData.components.find((c) => c.type === 'process_chain')
  const techSection = landingData.components.find((c) => c.id === 'tech')
  const impactData = landingData.components.find((c) => c.type === 'impact_section')
  const aboutPreviewData = landingData.components.find((c) => c.type === 'about_preview')
  const footerData = landingData.components.find((c) => c.type === 'footer')

  return (
    <div>
      {headerData && <Header {...headerData.props} />}
      {heroData && <Hero {...heroData.props} />}
      {threeActionsData && <ThreeColumnActions {...threeActionsData.props} />}
      {diffSection && <Section {...diffSection.props} />}
      {communitySection && <Section {...communitySection.props} />}
      {featuresData && <FeaturesGrid {...featuresData.props} />}
      {processData && <ProcessChain {...processData.props} />}
      {techSection && <Section {...techSection.props} />}
      {impactData && <ImpactSection {...impactData.props} />}
      {aboutPreviewData && <AboutPreview {...aboutPreviewData.props} />}
      {footerData && <Footer {...footerData.props} />}
    </div>
  )
}

export default LandingPage
