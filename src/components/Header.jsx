import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MessageCircle, Moon, Sun, X } from 'lucide-react'

const links = [
  { label: 'Home', href: '#/', route: 'home' },
  { label: 'About', href: '#/about', route: 'about' },
  { label: 'Conversations', href: '#/conversations', route: 'conversations' }
]

export default function Header({ route, theme, onThemeChange }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlay = route === 'home' && !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return <header className={`site-header ${overlay ? 'header-overlay' : 'is-solid'}`}>
    <div className="header-inner">
      <a className="brand" href="#/" aria-label="WAVE home"><span className="brand-mark"><img src="/assets/wave-logo.jpeg" alt="" /></span><span className="brand-name">WAVE</span></a>
      <nav className="main-nav" aria-label="Main navigation">{links.map(link => <a key={link.route} href={link.href} className={`nav-link ${route === link.route ? 'active' : ''}`}>{link.label}</a>)}</nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={onThemeChange} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a href="#/contribute" className="header-cta"><MessageCircle size={16} /> Share your story</a>
      </div>
      <button className="menu-button" onClick={() => setOpen(true)} aria-expanded={open} aria-label="Open navigation"><Menu size={21} /></button>
    </div>
    <AnimatePresence>{open && <>
      <motion.button className="nav-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} aria-label="Close navigation" />
      <motion.aside className="mobile-sidebar" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 330, damping: 34 }}>
        <div className="sidebar-head"><a className="brand" href="#/" onClick={() => setOpen(false)}><span className="brand-mark"><img src="/assets/wave-logo.jpeg" alt="" /></span><span className="brand-name">WAVE</span></a><button onClick={() => setOpen(false)} aria-label="Close navigation"><X size={21} /></button></div>
        <div className="sidebar-theme"><span>Appearance</span><button className="theme-toggle" onClick={onThemeChange} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button></div>
        <p className="sidebar-intro">Stories and conversations that bring people closer.</p>
        <nav aria-label="Mobile navigation">{links.map(link => <a key={link.route} href={link.href} onClick={() => setOpen(false)} className={route === link.route ? 'active' : ''}>{link.label}</a>)}</nav>
        <a href="#/contribute" onClick={() => setOpen(false)} className="mobile-cta"><MessageCircle size={17} /> Share your story</a>
        <small>Words. Awareness. Voices. Experiences.</small>
      </motion.aside>
    </>}</AnimatePresence>
  </header>
}
