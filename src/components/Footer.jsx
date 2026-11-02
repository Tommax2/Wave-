const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/thewave_ng/', path: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm9.45 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z' },
  { label: 'X', href: 'https://x.com/Thewave_ng', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/thewave-ng/', path: 'M5.34 3.5A2.34 2.34 0 1 1 .66 3.5a2.34 2.34 0 0 1 4.68 0ZM1 8h4.68v15H1V8Zm7.67 0h4.49v2.05h.06c.63-1.18 2.15-2.43 4.43-2.43 4.74 0 5.62 3.12 5.62 7.18V23h-4.68v-7.27c0-1.73-.03-3.96-2.41-3.96-2.42 0-2.79 1.89-2.79 3.84V23H8.67V8Z' },
]

function SocialIcon({ path }) {
  return <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d={path} /></svg>
}

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-identity"><a className="footer-brand" href="#/" aria-label="WAVE home"><span className="footer-logo"><img src="/assets/wave-logo.jpeg" alt="" /></span><span>WAVE</span></a><p>Stories that connect us.</p></div>
      <nav className="footer-nav" aria-label="Footer navigation"><a href="#/">Home</a><a href="#/about">About</a><a href="#/conversations">Conversations</a><a href="#/contribute">Share a story</a></nav>
      <div className="footer-socials">{socialLinks.map(({ label, href, path }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`WAVE on ${label}`}><SocialIcon path={path} /></a>)}</div>
    </div>
    <div className="footer-bottom"><span>© 2026 WAVE</span><a href="mailto:hello@waveplatform.com">hello@waveplatform.com</a></div>
  </footer>
}
