import { pillars, topics } from '../data/content'
import { starterPosts } from '../data/posts'

const topicImages = ['/assets/wave-community-conversation.png', '/assets/wave-writer-perspective.png', '/assets/wave-workshop-future.png']

export default function Home() {
  const posts = starterPosts
  return <main className="home-page">
    <section className="home-hero">
      <div className="hero-photo" aria-hidden="true"></div><div className="hero-shape" aria-hidden="true"></div>
      <div className="hero-inner page-shell">
        <div className="hero-copy">
          <h1><span>Amplifying voices.</span><span>Sharing experiences.</span><span className="accent-line">Inspiring change.</span></h1>
          <p>A space for honest conversations about the experiences that shape our lives and communities.</p>
          <div className="actions"><a className="primary" href="#/conversations">Explore WAVE</a><a className="secondary" href="#/about">About us</a></div>
        </div>
        <div className="hero-note"><span>STORIES</span><span>CULTURE</span><span>CHANGE</span></div>
      </div>
    </section>
    <section className="wave-overview page-shell" aria-label="WAVE at a glance">
      <div><div><strong>Real experiences</strong><p>Personal stories told with honesty and care.</p></div></div>
      <div><div><strong>Open conversations</strong><p>Ideas that make room for different perspectives.</p></div></div>
      <div><div><strong>A place to contribute</strong><p>Your voice can begin the next conversation.</p></div></div>
    </section>
    <section className="wave-pulse page-shell" aria-label="The WAVE community">
      <div><strong>04</strong><span>Pillars that guide us</span></div>
      <div><strong>06</strong><span>Areas of conversation</span></div>
      <div><strong>01</strong><span>Shared human space</span></div>
      <div><strong>Always</strong><span>Listening and learning</span></div>
    </section>
    <section className="featured page-shell">
      <div className="featured-heading">
        <div><span className="eyebrow featured-eyebrow">FEATURED CONVERSATIONS</span><h2>Things worth talking about</h2></div>
        <a className="featured-all" href="#/conversations">See all conversations</a>
      </div>
      <div className="topic-grid">
        {topics.map(([title, description, color], index) => <article className={index === 0 ? 'topic-card topic-card-lead' : 'topic-card'} key={title}>
          <a className={`topic-art ${color}`} href="#/conversations" aria-label={`Explore ${title}`}>
            <img src={topicImages[index]} alt="" />
            <span className="topic-label">Featured topic</span>
          </a>
          <div className="topic-content">
            <h3><a href="#/conversations">{title}</a></h3>
            <p>{description}</p>
            <a className="topic-link" href="#/conversations">Join the conversation</a>
          </div>
        </article>)}
      </div>
    </section>
    <section className="featured-voices page-shell">
      <div className="voices-heading"><span className="eyebrow">VOICES AT THE CENTRE</span><h2>Every perspective adds something.</h2><p>WAVE is shaped by people willing to share what they have lived, learned and noticed.</p></div>
      <div className="voices-grid">
        <article><img src="/assets/portrait.jpg" alt="A community storyteller" /><div><span>PERSONAL STORIES</span><h3>The courage to speak honestly</h3><p>First-person experiences that help others feel recognised.</p></div></article>
        <article><img src="/assets/youth.jpg" alt="Young people in conversation" /><div><span>THE NEXT GENERATION</span><h3>Ideas shaping what comes next</h3><p>Young voices asking better questions about the future.</p></div></article>
        <article><img src="/assets/work.jpg" alt="People learning and working together" /><div><span>WORK AND GROWTH</span><h3>Lessons from the way we work</h3><p>Honest conversations about learning, leadership and opportunity.</p></div></article>
      </div>
      <a className="voices-action primary" href="#/contribute">Add your voice</a>
    </section>
    <section className="latest-section page-shell">
      <div className="section-heading"><div><span className="eyebrow">LATEST FROM WAVE</span><h2>Fresh stories and ideas</h2></div><a href="#/conversations">Browse all stories</a></div>
      <div className="latest-grid">{posts.slice(0, 3).map((post, index) => <a href={`#/story/${post.id}`} className={`story-card ${index === 0 ? 'story-lead' : 'story-brief'}`} key={post.id} aria-label={`Read ${post.title}`}>
        <div className="story-image">{post.image ? <img src={post.image} alt="" /> : <div className="story-placeholder">WAVE</div>}{index === 0 && <span>{post.category}</span>}</div>
        <div className="story-copy">{index > 0 && <span className="story-category">{post.category}</span>}<small>{post.date} · {post.author}</small><h3>{post.title}</h3><p>{post.excerpt}</p></div>
      </a>)}</div>
    </section>
    <section className="pillar-discovery page-shell">
      <div className="pillar-intro"><span className="eyebrow">EXPLORE THE WAVE WORLD</span><h2>Four ways into the conversation.</h2><p>Follow the ideas, issues, people and moments that shape how we understand one another.</p></div>
      <div className="pillar-track">{pillars.map(([title, description, label]) => <a href="#/conversations" className="pillar-tile" key={title}><span className="pillar-kicker">{label}</span><h3>{title}</h3><p>{description}</p><span className="pillar-action">Explore this pillar</span></a>)}</div>
    </section>
    <section className="home-manifesto page-shell">
      <div className="manifesto-aside"><span>OUR BELIEF</span><strong>People understand one another when there is room to be honest.</strong></div>
      <div className="manifesto-content"><span className="eyebrow">WHY WAVE EXISTS</span><h2>Every experience carries something worth understanding.</h2><p>We make space for thoughtful voices, honest questions and stories that help people see life from another point of view.</p><div className="manifesto-principles"><span>Listen with care</span><span>Question with curiosity</span><span>Share with purpose</span></div><a href="#/about">Learn why we’re here</a></div>
    </section>
    <section className="publish-invite page-shell"><div><span className="eyebrow">SHARE WITH WAVE</span><h2>Have a story you want to tell?</h2><p>Tell us what’s on your mind. Your experience could help someone feel seen.</p></div><a className="primary" href="#/contribute">Tell us your story</a></section>
    <section className="publish-invite publish-redesign page-shell">
      <div className="publish-copy">
        <span className="eyebrow">SHARE WITH WAVE</span>
        <h2>Your experience could start a conversation.</h2>
      </div>
      <div className="publish-details">
        <p>You do not need to be a professional writer. Bring us a lived experience, an idea, or a question worth exploring—we will help you shape it.</p>
        <a className="primary publish-action" href="#/contribute">Share your story</a>
      </div>
    </section>
    <section className="cta page-shell"><div><strong>Have something to say?</strong> Share your voice. Start a conversation.</div><a href="#/contribute">Get in touch</a></section>
  </main>
}
