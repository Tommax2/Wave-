import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Conversations from './pages/Conversations'
import Contribute from './pages/Contribute'
import Story from './pages/Story'

const routeFromHash = () => window.location.hash.replace('#/', '') || 'home'

export default function App() {
  const [route, setRoute] = useState(routeFromHash)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  useEffect(() => {
    const updateRoute = () => { setRoute(routeFromHash()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('wave-theme', theme)
  }, [theme])

  const storyId = route.startsWith('story/') ? route.split('/')[1] : null
  const Page = route === 'about' ? About : route === 'conversations' ? Conversations : route === 'contribute' ? Contribute : storyId ? Story : Home
  return <><Header route={storyId ? 'story' : route} theme={theme} onThemeChange={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} /><Page {...(storyId ? { id: storyId } : {})} /><div className="page-shell"><Footer /></div></>
}
