import { useMemo, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'

export default function Stories({ stories = [] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All stories')
  const categories = useMemo(() => ['All stories', ...new Set(stories.map(story => story.category).filter(Boolean))], [stories])
  const visibleStories = useMemo(() => {
    const term = query.trim().toLowerCase()
    return stories.filter(story => {
      const matchesCategory = category === 'All stories' || story.category === category
      const searchable = `${story.title} ${story.excerpt} ${story.author} ${story.category}`.toLowerCase()
      return matchesCategory && (!term || searchable.includes(term))
    })
  }, [stories, query, category])

  return <main className="stories-page page-shell page-main">
    <header className="stories-hero">
      <span>WAVE STORIES</span>
      <h1>Stories that help us<br /><em>see life differently.</em></h1>
      <p>Read personal experiences, thoughtful perspectives and ideas shared by people across the WAVE community.</p>
    </header>

    <section className="stories-browser" aria-label="Browse stories">
      <div className="stories-tools">
        <label className="stories-search"><Search size={18} /><span className="sr-only">Search stories</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search stories, topics or authors" /></label>
        <div className="stories-categories" aria-label="Filter by category">{categories.map(item => <button type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      </div>

      <div className="stories-result-count">{visibleStories.length} {visibleStories.length === 1 ? 'story' : 'stories'}</div>
      {visibleStories.length ? <div className="stories-grid">{visibleStories.map(story => <a className="stories-card" href={`#/story/${story.id}`} key={story.id}>
        <div className="stories-card-image">{story.image ? <img src={story.image} alt="" /> : <span>WAVE</span>}<small>{story.category}</small></div>
        <div className="stories-card-copy"><span>{story.date} · {story.author}</span><h2>{story.title}</h2><p>{story.excerpt}</p><strong>Read story <ArrowUpRight size={16} /></strong></div>
      </a>)}</div> : <div className="stories-empty"><h2>No stories found</h2><p>Try another search or category.</p></div>}
    </section>
  </main>
}
