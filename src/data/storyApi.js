import { starterPosts } from './posts'

const DEFAULT_API_URL = import.meta.env.DEV ? 'http://localhost:4000' : 'https://wave-blog.onrender.com'
export const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '')

const asParagraphs = value => {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value !== 'string') return []
  return value.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean)
}

const normalizeStory = story => {
  const body = asParagraphs(story.body || story.content || story.story)
  const createdAt = story.publishedAt || story.createdAt || story.date
  const parsedDate = createdAt ? new Date(createdAt) : null
  const image = story.image || story.coverImage || story.imageUrl || ''

  return {
    ...story,
    id: String(story.id || story._id || story.slug || ''),
    title: story.title || 'Untitled story',
    category: story.category || 'Stories',
    author: story.author?.name || story.author || story.name || 'WAVE Community',
    date: parsedDate && !Number.isNaN(parsedDate.valueOf())
      ? parsedDate.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
      : (story.date || 'Recently'),
    excerpt: story.excerpt || story.summary || body[0]?.slice(0, 180) || 'A new story from the WAVE community.',
    body: body.length ? body : [story.excerpt || story.summary || 'This story is coming soon.'],
    image: image.startsWith('/uploads/') ? `${API_URL}${image}` : image,
    _publishedAt: parsedDate && !Number.isNaN(parsedDate.valueOf()) ? parsedDate.valueOf() : 0,
  }
}

export async function fetchStories() {
  try {
    const response = await fetch(`${API_URL}/api/stories`)
    if (!response.ok) throw new Error('Could not load stories')
    const payload = await response.json()
    const remote = Array.isArray(payload) ? payload : (payload.stories || payload.data || payload.results || [])
    if (!Array.isArray(remote)) throw new Error('Invalid stories response')

    const normalized = remote
      .map(normalizeStory)
      .filter(story => story.id)
      .sort((a, b) => b._publishedAt - a._publishedAt)
    const remoteIds = new Set(normalized.map(story => story.id))
    return [...normalized, ...starterPosts.filter(story => !remoteIds.has(String(story.id)))]
  } catch {
    return starterPosts
  }
}

