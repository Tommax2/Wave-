import { ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react'
import { pillars, values } from '../data/content'

export default function About() {
  return <main className="about-page page-shell page-main">
    <section className="about-hero">
      <div className="about-hero-copy"><span className="eyebrow">ABOUT WAVE</span><h1><span>We make room for</span><br /><em>what matters.</em></h1><p>Stories that open minds, connect people and move conversations forward.</p></div>
    </section>

    <section className="about-mission">
      <div className="about-mission-heading"><span className="about-section-label">Our purpose</span><p>Why we are here</p></div>
      <div className="about-mission-copy"><h2>More than stories.<br /><em>A place to understand.</em></h2><p>WAVE is an independent space for thoughtful conversations about the experiences shaping our lives and communities. We listen without rushing, question with curiosity, and share with purpose.</p><div className="about-verbs"><span>Listen</span><span>Question</span><span>Share</span><span>Connect</span></div></div>
    </section>

    <section className="about-pillars">
      <header><div className="about-pillars-heading"><span className="about-pillars-label">The four pillars</span><p>What WAVE is built on</p></div><h2>The ideas behind<br /><em>every conversation.</em></h2></header>
      <div className="about-pillar-grid">{pillars.map(([title, description, label]) => <article key={title}><div className="about-pillar-top"><Sparkles size={18} aria-hidden="true" /></div><div><small>{label}</small><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </section>

    <section className="about-belief"><div className="about-belief-mark"><MessageCircle size={34} aria-hidden="true" /></div><div><span className="about-belief-label">Why WAVE exists</span><h2>Some conversations need more space.</h2><p>We create that space—so people can speak honestly, listen deeply and find meaning in perspectives beyond their own.</p></div></section>

    <section className="about-values">
      <div className="about-values-heading"><span className="about-values-label">How we show up</span><h2>Our values,<br /><em>in practice.</em></h2><p>The principles that shape how we listen, tell stories and build every conversation.</p></div>
      <div className="about-values-list">{values.map(([title, description]) => <article key={title}><i aria-hidden="true" /><strong>{title}</strong><p>{description}</p></article>)}</div>
    </section>

    <section className="about-cta"><div className="about-cta-copy"><span className="about-cta-label">Add your voice</span><h2>There is always more<br /><em>to the story.</em></h2><p>Your experience could be the perspective someone else needs.</p></div><a href="#/contribute"><span>Share your story</span><i><ArrowUpRight size={19} /></i></a></section>
  </main>
}
