import { Mail, Send } from 'lucide-react'

const recipient = 'waveplatform@gmail.com'

export default function Contribute() {
  const submitStory = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `WAVE story submission: ${data.get('title')}`
    const body = [`Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Story type: ${data.get('category')}`, `Story title: ${data.get('title')}`, '', data.get('story')].join('\n')
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return <main className="page-shell page-main contribute-page">
    <section className="contribute-intro"><div><span className="contribute-label">Share your voice</span><h1>Your story<br /><em>belongs here.</em></h1></div><p>Have an experience, idea or perspective worth sharing? Tell us in your own words. You do not need to be a professional writer—we care about honest voices.</p></section>
    <section className="story-form-shell">
      <aside className="story-form-aside"><span>Before you begin</span><h2>Start the conversation.</h2><p>Share as much as you feel comfortable sharing. Our team will read your submission with care and contact you before anything is published.</p><a href={`mailto:${recipient}`}><Mail size={16} /> {recipient}</a></aside>
      <form className="story-form" onSubmit={submitStory}>
        <div className="form-row"><label><span>Your name</span><input name="name" type="text" autoComplete="name" placeholder="How should we address you?" required /></label><label><span>Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div>
        <div className="form-row"><label><span>Story title</span><input name="title" type="text" placeholder="Give your story a working title" required /></label><label><span>Story type</span><select name="category" defaultValue="" required><option value="" disabled>Choose a category</option><option>Personal experience</option><option>People and perspectives</option><option>Work and development</option><option>Society and culture</option><option>Idea or opinion</option><option>Other</option></select></label></div>
        <label className="story-field"><span>Your story</span><textarea name="story" rows="10" placeholder="Write your story, idea or perspective here..." required /></label>
        <label className="form-consent"><input type="checkbox" required /><span>I understand that WAVE may contact me about this submission before publishing it.</span></label>
        <div className="form-submit"><p>Submitting opens your email app with your story ready to send.</p><button type="submit">Prepare email <Send size={17} /></button></div>
      </form>
    </section>
  </main>
}
