import { useEffect, useRef, useState } from 'react'

// ---- Content. Edit here when the resume changes. ----

const profile = {
  name: 'John Denmar Tan',
  roles: ['Full Stack Software Developer', '.NET Backend Developer', 'React Frontend Developer'],
  location: 'Hagonoy, Bulacan, Philippines',
  email: 'johndenmar.tan@gmail.com',
  linkedin: 'https://linkedin.com/in/denmartan',
  intro:
    'I build full-stack web applications with .NET on the backend and React on the frontend, and I care about making them fast.',
  about: [
    'I started my career in middleware support at Accenture, deploying applications and keeping servers healthy across Integration, Stage and Production. That taught me how software behaves once it leaves the developer’s machine.',
    'Since 2022 I have been a Full Stack Software Developer at DXC Technology, working in an Agile/Scrum team and delivering features end to end, from the API and database to the user interface.',
  ],
}

const stats = [
  { value: 80, suffix: '%', label: 'Faster API response through pagination' },
  { value: new Date().getFullYear() - 2021, suffix: '+', label: 'Years in the IT industry' },
  { value: 2, suffix: '', label: 'Microsoft certifications' },
]

const experience = [
  {
    company: 'DXC Technology',
    role: 'Full Stack Software Developer',
    place: 'Taguig, Philippines',
    period: 'Aug 2022 - Present',
    points: [
      'Deliver full-stack features using .NET for the backend and ReactJS for the frontend.',
      'Improved API response time by 80% by implementing pagination.',
      'Migrated data from SharePoint sources into the Cosmos DB NoSQL database.',
      'Work in an Agile/Scrum team with weekly backlog sessions and daily Scrum meetings.',
    ],
  },
  {
    company: 'Accenture Inc.',
    role: 'Middleware Admin Support',
    place: 'Mandaluyong, Philippines',
    period: 'Feb 2021 - Aug 2022',
    points: [
      'Deployed applications across Integration, Stage and Production environments.',
      'Monitored application alerts, restarted services and servers, updated certificates, and ran pre/post validation during patching.',
      'Provisioned access for development teams and worked with them to investigate application issues.',
      'Performed daily health checks on supported technologies and servers.',
    ],
  },
]

const skills = [
  { group: 'Development', items: ['C#', '.NET', 'ReactJS', 'Cosmos DB', 'SQL'] },
  { group: 'Tools & Platforms', items: ['Azure', 'GitHub', 'Jira'] },
  { group: 'AI', items: ['GitHub Copilot'] },
  { group: 'Languages', items: ['English', 'Filipino'] },
]

const education = {
  school: 'Bulacan State University',
  degree: 'Bachelor of Science in Computer Engineering',
  period: '2015 - 2020',
}

const certifications = [
  { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', date: 'May 2024' },
  { name: 'Microsoft Certified: Power Platform Fundamentals', issuer: 'Microsoft', date: 'July 2024' },
]

// Add projects here and the section + nav link show up on their own.
const projects = [
  {
    title: 'Apartment Management System - Web App',
    description:
      'A website for a small property manager. The manager gets a dashboard and pages for apartments, tenants, leases, billing and maintenance requests. Tenants sign in to see their own lease and balance and to report problems. Hosted on Azure Static Web Apps.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Azure Static Web Apps'],
    links: [
      { label: 'Live demo', url: 'https://yellow-pond-033850b00.5.azurestaticapps.net' },
      { label: 'Code', url: 'https://github.com/denmarthrtn/ApartmentTenantSystemFrontend' },
    ],
  },
  {
    title: 'Apartment Management System - REST API',
    description:
      'The API behind the web app. It handles apartments, tenants, leases, monthly rent billing with a daily background job, partial payments, maintenance requests and reports, with JWT login for Admin and Tenant roles. Hosted on Azure App Service.',
    tech: ['C#', '.NET 10', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Docker', 'GitHub Actions', 'Azure App Service'],
    links: [
      {
        label: 'Swagger UI',
        url: 'https://apartment-den-fec9b9dre5dadsg9.eastasia-01.azurewebsites.net/swagger',
      },
      { label: 'Code', url: 'https://github.com/denmarthrtn/ApartmentSystem' },
    ],
  },
]

// ---- Animation helpers ----

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function CountUp({ to, suffix }) {
  const [ref, inView] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf, start
    const tick = (t) => {
      start ??= t
      const p = Math.min((t - start) / 1200, 1)
      setN(Math.round(to * (1 - (1 - p) ** 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function Typed({ words }) {
  const [index, setIndex] = useState(0)
  const [len, setLen] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const word = words[index]

  useEffect(() => {
    const full = !deleting && len === word.length
    const empty = deleting && len === 0
    const timer = setTimeout(
      () => {
        if (full) setDeleting(true)
        else if (empty) {
          setDeleting(false)
          setIndex((index + 1) % words.length)
        } else setLen(len + (deleting ? -1 : 1))
      },
      full ? 1600 : deleting ? 35 : 70,
    )
    return () => clearTimeout(timer)
  }, [len, deleting, index, word, words])

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <span className="typed" aria-hidden="true">
        {word.slice(0, len)}
      </span>
    </>
  )
}

// ---- Page ----

function Section({ id, title, children }) {
  return (
    <section id={id}>
      <Reveal as="h2">{title}</Reveal>
      {children}
    </section>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = ['about', 'experience', 'skills', ...(projects.length ? ['projects'] : []), 'education', 'contact']

  return (
    <>
      <div className="progress" />
      <header className="nav">
        <a href="#top" className="logo">
          JDT<span>.</span>
        </a>
        <button
          className="menu-btn"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
        </button>
        <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
          {nav.map((id) => (
            <a key={id} href={`#${id}`}>
              {id}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <div className="hero">
          <div className="blob blob-a" />
          <div className="blob blob-b" />
          <div className="hero-inner">
            <p className="hello">Hi, my name is</p>
            <h1>{profile.name}</h1>
            <p className="role">
              <Typed words={profile.roles} />
            </p>
            <p className="intro">{profile.intro}</p>
            <div className="actions">
              <a className="btn primary" href="#contact">
                Get in touch
              </a>
              <a className="btn" href="#experience">
                View my experience
              </a>
            </div>
          </div>
          <a className="scroll-hint" href="#about" aria-label="Scroll to about section" />
        </div>

        <Section id="about" title="About me">
          {profile.about.map((text, i) => (
            <Reveal as="p" key={i} delay={i * 100} className="lead">
              {text}
            </Reveal>
          ))}
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120} className="card stat">
                <strong>
                  <CountUp to={s.value} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="timeline">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 120} className="job">
                <div className="card">
                  <div className="job-head">
                    <div>
                      <h3>{job.role}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                    <p className="meta">
                      {job.period}
                      <br />
                      {job.place}
                    </p>
                  </div>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 100} className="card">
                <h3>{s.group}</h3>
                <div className="chips">
                  {s.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {projects.length > 0 && (
          <Section id="projects" title="Projects">
            <div className="grid">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 100} className="card">
                  <h3>{p.title}</h3>
                  <p className="project-text">{p.description}</p>
                  <div className="chips">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                        {l.label} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        <Section id="education" title="Education & Certifications">
          <div className="grid">
            <Reveal className="card">
              <p className="meta">{education.period}</p>
              <h3>{education.degree}</h3>
              <p className="company">{education.school}</p>
            </Reveal>
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={(i + 1) * 100} className="card">
                <p className="meta">{c.date}</p>
                <h3>{c.name}</h3>
                <p className="company">{c.issuer}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Let’s work together">
          <Reveal as="p" className="lead">
            I am open to new opportunities and happy to talk about .NET, React, or anything in between.
          </Reveal>
          <Reveal className="actions" delay={100}>
            <a className="btn primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Reveal>
          <Reveal as="p" className="meta" delay={200}>
            {profile.location}
          </Reveal>
        </Section>
      </main>

      <footer>
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  )
}
