import { SEO } from '../components/SEO'
import { Hero } from '../components/sections/Hero'
import { HomeTechStrip } from '../components/sections/home/HomeTechStrip'
import { CreativeStatsBar } from '../components/sections/home/CreativeStatsBar'
import { BentoAbout } from '../components/sections/BentoAbout'
import { FascinatingProjectScroll } from '../components/sections/home/FascinatingProjectScroll'
import { Services } from '../components/sections/Services'
import { Contact } from '../components/sections/Contact'

export const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Usman Khatri — Full-Stack Architect specializing in MERN Stack, PWA Engineering, and AI-Powered product visuals. Building high-performance digital ecosystems."
        url="/"
      />

      <main>
        {/* Hero */}
        <Hero />

        {/* Short Animated Frameworks & Languages Strip */}
        <HomeTechStrip />

        {/* Key Metrics & Creative Stats Bar */}
        <CreativeStatsBar />

        {/* Projects Stacked Card Scroll */}
        <FascinatingProjectScroll />

        {/* About Bento */}
        <BentoAbout />

        {/* Services */}
        <Services />

        {/* Contact */}
        <Contact />
      </main>
    </>
  )
}
