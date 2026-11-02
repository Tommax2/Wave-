import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Landmark, Megaphone, Sparkles, Users } from 'lucide-react'
import { conversations } from '../data/content'

const icons = [Users, BriefcaseBusiness, Landmark, Megaphone, GraduationCap, Sparkles]
const labels = ['Human stories', 'The working world', 'Life together', 'Ideas that matter', 'Learning & growth', 'What comes next']

export default function Conversations() {
  return <main className="page-shell page-main conversations-page">
    <section className="conversations-hero">
      <div className="conversations-hero-copy"><span className="conversations-label">Explore conversations</span><h1>Every part of life<br /><em>is worth discussing.</em></h1></div>
      <div className="conversations-hero-note"><p>Life does not come in neat categories—and neither do the conversations that shape us.</p><span>Explore what matters to you.</span></div>
    </section>

    <section className="conversation-categories">
      <header><div><span>Discover</span><h2>Where the conversation begins</h2></div><p>Six spaces for stories, perspectives and questions that deserve room to breathe.</p></header>
      <div className="conversation-card-grid">{conversations.map(([title, description], index) => {
        const Icon = icons[index]
        return <article key={title}>
          <div className="conversation-card-head"><span><Icon size={20} /></span><small>{labels[index]}</small></div>
          <div><h3>{title}</h3><p>{description}</p></div>
          <a href="#/contribute" aria-label={`Share a story about ${title}`}>Add your perspective <ArrowUpRight size={16} /></a>
        </article>
      })}</div>
    </section>

    <section className="conversations-invite"><div><span>Do you see life differently?</span><h2>Your perspective could begin the next conversation.</h2></div><a href="#/contribute">Share your story <ArrowUpRight size={18} /></a></section>
  </main>
}
