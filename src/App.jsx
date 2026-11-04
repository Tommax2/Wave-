import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Seo from './components/Seo'
import Home from './pages/Home'
import About from './pages/About'
import Conversations from './pages/Conversations'
import Contribute from './pages/Contribute'
import Story from './pages/Story'
import Stories from './pages/Stories'
import { fetchStories } from './data/storyApi'
import { starterPosts } from './data/posts'

const routeFromLocation = () => {
  const hashRoute = window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : ''
  const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return hashRoute || pathRoute || 'home'
}

export default function App() {
  const [route, setRoute] = useState(routeFromLocation)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const [stories, setStories] = useState(starterPosts)
  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      const cleanPath = `/${window.location.hash.slice(2)}`
      window.history.replaceState({}, '', cleanPath)
      setRoute(routeFromLocation())
    }
    const updateRoute = () => { setRoute(routeFromLocation()); window.scrollTo(0, 0) }
    const handleInternalLink = event => {
      const link = event.target.closest('a[href^="#/"]')
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      const destination = `/${link.getAttribute('href').slice(2)}`
      window.history.pushState({}, '', destination)
      updateRoute()
    }
    window.addEventListener('hashchange', updateRoute)
    window.addEventListener('popstate', updateRoute)
    document.addEventListener('click', handleInternalLink)
    return () => {
      window.removeEventListener('hashchange', updateRoute)
      window.removeEventListener('popstate', updateRoute)
      document.removeEventListener('click', handleInternalLink)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('wave-theme', theme)
  }, [theme])

  useEffect(() => {
    const loadStories = () => fetchStories().then(setStories)
    loadStories()
    window.addEventListener('focus', loadStories)
    return () => window.removeEventListener('focus', loadStories)
  }, [])

  const storyId = route.startsWith('story/') ? route.split('/')[1] : null
  const activeStory = storyId ? stories.find(story => String(story.id) === storyId) : null
  const Page = route === 'about' ? About : route === 'conversations' ? Conversations : route === 'stories' ? Stories : route === 'contribute' ? Contribute : storyId ? Story : Home
  return <><Seo route={storyId ? 'story' : route} story={activeStory} /><Header route={storyId ? 'story' : route} theme={theme} onThemeChange={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} /><Page stories={stories} {...(storyId ? { id: storyId } : {})} /><div className="page-shell"><Footer /></div></>
}
