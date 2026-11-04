import { useEffect } from 'react'

const defaults = {
  home: ['WAVE — Your Voice, Your Story, Your Space', 'WAVE is a space for honest stories, thoughtful perspectives and conversations that help people understand one another.'],
  about: ['About WAVE | Stories and Meaningful Conversations', 'Learn why WAVE creates room for honest experiences, thoughtful voices and conversations that inspire understanding and change.'],
  conversations: ['Conversations | WAVE', 'Explore conversations about people, work, culture, learning, society and the ideas shaping what comes next.'],
  stories: ['Stories | WAVE', 'Read personal stories, thoughtful perspectives and ideas shared by people across the WAVE community.'],
  contribute: ['Share Your Story | WAVE', 'Share your experience, idea or perspective with WAVE and help begin a meaningful conversation.'],
}
const SITE_ORIGIN = 'https://www.waveng.org'

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)
  if (!element) { element = document.createElement('meta'); document.head.appendChild(element) }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

export default function Seo({ route, story }) {
  useEffect(() => {
    const isStory = Boolean(story)
    const [title, description] = isStory ? [`${story.title} | WAVE`, story.excerpt] : (defaults[route] || defaults.home)
    const url = `${SITE_ORIGIN}${window.location.pathname}`
    const image = story?.image ? new URL(story.image, SITE_ORIGIN).href : new URL('/assets/community.jpg', SITE_ORIGIN).href
    document.title = title
    document.documentElement.lang = 'en'
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' })
    ;[['og:title', title], ['og:description', description], ['og:type', isStory ? 'article' : 'website'], ['og:url', url], ['og:image', image], ['og:image:alt', story ? `Cover image for ${story.title}` : 'People sharing stories and perspectives with WAVE'], ['og:site_name', 'WAVE']].forEach(([property, content]) => setMeta(`meta[property="${property}"]`, { property, content }))
    ;[['twitter:card', 'summary_large_image'], ['twitter:title', title], ['twitter:description', description], ['twitter:image', image]].forEach(([name, content]) => setMeta(`meta[name="${name}"]`, { name, content }))
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = url
    const schema = isStory ? {
      '@context': 'https://schema.org', '@type': 'Article', headline: story.title, description: story.excerpt,
      image: story.image ? [image] : undefined, author: { '@type': 'Person', name: story.author },
      publisher: { '@type': 'Organization', name: 'WAVE', logo: { '@type': 'ImageObject', url: new URL('/assets/wave-logo.jpeg', SITE_ORIGIN).href } },
      mainEntityOfPage: url, datePublished: story.publishedAt || story.createdAt || undefined,
    } : {
      '@context': 'https://schema.org', '@type': 'WebSite', name: 'WAVE', url: SITE_ORIGIN,
      description: defaults.home[1], publisher: { '@type': 'Organization', name: 'WAVE', logo: new URL('/assets/wave-logo.jpeg', SITE_ORIGIN).href },
    }
    let script = document.head.querySelector('#wave-structured-data')
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.id = 'wave-structured-data'; document.head.appendChild(script) }
    script.textContent = JSON.stringify(schema)
  }, [route, story])
  return null
}
