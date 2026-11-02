import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Clock, Share2 } from 'lucide-react'
import { starterPosts } from '../data/posts'

export default function Story({ id }) {
  const story = starterPosts.find(post => post.id === id)
  const [shared, setShared] = useState(false)

  if (!story) return <main className="page-shell page-main story-missing"><span>Story not found</span><h1>We couldn’t find that story.</h1><a href="#/conversations"><ArrowLeft size={17} /> Browse conversations</a></main>

  const words = story.body.join(' ').split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(words / 200))
  const shareStory = async () => {
    const details = { title: story.title, text: story.excerpt, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(details)
      else await navigator.clipboard.writeText(window.location.href)
      setShared(true)
      window.setTimeout(() => setShared(false), 1800)
    } catch { /* Sharing was cancelled. */ }
  }

  return <main className="story-page">
    <header className="story-hero page-shell">
      <a className="story-back" href="#/conversations"><ArrowLeft size={16} /> All conversations</a>
      <div className="story-heading-row">
        <div><span className="story-category-label">{story.category}</span><h1>{story.title}</h1></div>
        <button className="story-share" onClick={shareStory} type="button"><Share2 size={17} /><span>{shared ? 'Link copied' : 'Share'}</span></button>
      </div>
      <div className="story-deck"><p>{story.excerpt}</p><div className="story-meta"><span>By <strong>{story.author}</strong></span><span>{story.date}</span><span><Clock size={14} /> {readTime} min read</span></div></div>
    </header>

    <figure className="story-cover"><img src={story.image} alt="" /><figcaption><span>{story.category}</span><span>WAVE Stories</span></figcaption></figure>

    <div className="story-reading-layout page-shell">
      <aside className="story-rail"><span>In this story</span><p>{story.category}</p><i /><small>Words that help us understand one another.</small></aside>
      <article className="story-body">
        {story.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <div className="story-close"><span>Continue the conversation</span><h2>What does this story bring to mind?</h2><p>Your experience could help someone feel seen, understood or less alone.</p><a href="#/contribute">Share your story <i><ArrowUpRight size={18} /></i></a></div>
      </article>
    </div>
  </main>
}
