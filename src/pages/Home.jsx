import Terminal from '../components/Terminal/Terminal'
import MinecraftWorld from '../components/World/MinecraftWorld'
import './Home.css'

/* ===== DATA ===== */
const EXPERIENCE = [
  {
    company: 'Tata Consultancy Services',
    role: 'Systems Engineer — Developer',
    period: 'Nov 2024 – Present',
    location: 'Bengaluru, KA',
    tech: ['Java', 'Spring Boot', 'Microservices', 'Azure', 'Redis', 'React.js'],
    achievements: [
      'Owned end-to-end development of a Microservice — REST API design, error handling, and service configuration',
      'Implemented Azure AD OAuth2 with JWT-based security for live pre-production environments',
      'Optimized latency via Redis caching, identified bottlenecks with Azure App Insights & Dynatrace',
      'Contributed to 3000+ unit tests (JUnit + Mockito) and delivered project early with 100% CSS',
      'Built new Microservices-based system by adapting core logic from legacy monolithic application',
    ],
  },
  {
    company: 'Nokia Networks',
    role: 'Student Intern',
    period: 'Aug 2023 – May 2024',
    location: 'Chennai, TN',
    tech: ['Python', 'Robot Framework', 'Jenkins', 'Docker', 'Kubernetes'],
    achievements: [
      'Migrated automation framework from Java (Jython) to Python using Robot Framework',
      'Assisted with Jenkins pipelines, gaining hands-on exposure to Docker & Kubernetes in CI/CD',
      'Migrated 3500+ automation test cases with zero functional impact across 3 priority-1 pipelines',
    ],
  },
]

const PROJECTS = [
  {
    title: 'Secure E-Commerce Microservices Platform',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'JWT', 'PostgreSQL', 'API Gateway'],
    description:
      'Production-style microservices system with API Gateway, Eureka discovery, and centralized config using Spring Cloud.',
    highlights: [
      'JWT-based auth with role-based access control & method-level security',
      'Order workflow with inventory reservation, payment simulation, and inter-service comms via WebClient',
    ],
    github: 'https://github.com/Kamesh22/secure-ecommerce-microservices',
  },
  {
    title: 'Secure Expense Manager API',
    tech: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Hibernate'],
    description: 'A production-ready Spring Boot REST API for secure expense management, featuring strict data ownership, analytics, and Swagger API documentation.',
    highlights: [
      'Implemented strict Role-Based Access Control (RBAC) with JWT and method-level security to enforce data ownership and prevent privilege escalation.',
      'Engineered a soft-delete data retention system, paginated filtering, and dynamic analytics for generating monthly and category-based expense summaries.'
    ],
    github: 'https://github.com/Kamesh22/expense-manager-api'
  },
  {
    title: 'Portfolio Website (React + Three.js)',
    tech: ['React', 'Three.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    description: 'A modern, interactive portfolio website featuring a 3D Minecraft-style sandbox, scroll-triggered animations, and a retro terminal interface.',
    highlights: [
      'Integrated Three.js to create a fully interactive 3D Minecraft world with block placement/removal mechanics and orbit controls.',
      'Implemented a retro terminal interface with command history, auto-completion, and dynamic content rendering for a unique user experience.'
    ],
    github: 'https://github.com/Kamesh22/minecraft-portfolio'
  }
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Kamesh22',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kamesh-r-a23280230',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:kameshraja07@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
]

/* ===== SCROLL HELPERS ===== */
function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleResumeDownload() {
  window.open(import.meta.env.BASE_URL + 'resume/Kamesh_Rajaram_Resume.pdf', '_blank')
}

/* ===== COMPONENT ===== */
function Home() {
  return (
    <div className="home-scroll" id="home">
      {/* ───── 1. STICKY HEADER ───── */}
      <header className="site-header" id="site-header">
        <div className="header-inner">
          <a href="#home" className="header-logo" onClick={(e) => { e.preventDefault(); scrollToId('home') }}>
            <span className="logo-icon">⛏</span>
            <span className="logo-text">Kamesh Rajaram</span>
          </a>
          <div className="header-actions">
            {/* Terminal button */}
            <button
              className="header-icon-btn"
              onClick={() => scrollToId('terminal-section')}
              aria-label="Go to terminal"
              title="Terminal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </button>

            {/* Download resume button */}
            <button
              className="header-icon-btn"
              onClick={handleResumeDownload}
              aria-label="Download resume"
              title="Download Resume"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>

            {/* Wanna play button */}
            <button
              className="header-cta"
              onClick={() => scrollToId('minecraft-sandbox')}
            >
              🎮 Wanna play?
            </button>
          </div>
        </div>
      </header>

      {/* ───── 2. HERO SECTION ───── */}
      <section className="hero-section" id="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">Kamesh Rajaram</h1>
            <p className="hero-title">Software Engineer</p>
            <p className="hero-description">
              I build secure, scalable backend systems with <strong>Java</strong>,{' '}
              <strong>Spring Boot</strong>, and <strong>Microservices</strong>. Currently
              at <span className="hero-highlight">Tata Consultancy Services</span> working
              on enterprise insurance platforms. VIT grad with a 9.37 CGPA and a passion for
              clean architecture.
            </p>
            <div className="hero-tags">
              {['Java', 'Spring Boot', 'Microservices', 'Python', 'Azure', 'React'].map(
                (tag) => (
                  <span key={tag} className="hero-tag">
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="hero-avatar">
            <div className="avatar-frame">
              <img
                src={import.meta.env.BASE_URL + 'person/person.png'}
                alt="Kamesh Rajaram — Pixel Art Portrait"
                className="avatar-image"
              />
            </div>
            <div className="avatar-glow" />
          </div>
        </div>
      </section>

      {/* ───── 3. TERMINAL SECTION ───── */}
      <section className="terminal-section" id="terminal-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">{'>'}_</span> Terminal
          </h2>
          <p className="section-subtitle">
            Type <code>help</code> to explore my portfolio the hacker way
          </p>
        </div>
        <div className="terminal-wrapper">
          <Terminal />
        </div>
      </section>

      {/* ───── 4. EXPERIENCE & PROJECTS ───── */}
      <section className="exp-section" id="experience">
        {/* Experience Row */}
        <div className="exp-block">
          <h2 className="section-title">
            <span className="section-icon">⚡</span> Experience
          </h2>
          <div className="cards-scroll-row">
            {EXPERIENCE.map((job, i) => (
              <div className="card card-fixed" key={i} id={`exp-card-${i}`}>
                <div className="card-header">
                  <h3 className="card-company">{job.company}</h3>
                  <span className="card-period">{job.period}</span>
                </div>
                <p className="card-role">
                  {job.role} <span className="card-location">• {job.location}</span>
                </p>
                <div className="card-tech-row">
                  {job.tech.map((t) => (
                    <span key={t} className="card-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="card-body-scroll">
                  <ul className="card-achievements">
                    {job.achievements.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Row */}
        <div className="exp-block">
          <h2 className="section-title">
            <span className="section-icon">🚀</span> Projects
          </h2>
          <div className="cards-scroll-row">
            {PROJECTS.map((proj, i) => (
              <div className="card card-fixed" key={i} id={`proj-card-${i}`}>
                <div className="card-header">
                  <h3 className="card-company">{proj.title}</h3>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-github-link"
                    >
                      View Code ↗
                    </a>
                  )}
                </div>
                <p className="card-description">{proj.description}</p>
                <div className="card-tech-row">
                  {proj.tech.map((t) => (
                    <span key={t} className="card-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="card-body-scroll">
                  <ul className="card-achievements">
                    {proj.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 5. MINECRAFT SANDBOX ───── */}
      <section className="sandbox-section" id="minecraft-sandbox">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">🎮</span> Minecraft Sandbox
          </h2>
          <p className="section-subtitle">
            Click blocks to place, Shift+Click to remove. Drag to orbit the island.
          </p>
        </div>
        <div className="sandbox-container">
          <MinecraftWorld />
          <div className="sandbox-controls-hint">
            <span>🖱️ Drag to rotate</span>
            <span>📦 Click face to place</span>
            <span>⇧ Shift+Click to remove</span>
          </div>
        </div>
      </section>

      {/* ───── 6. FOOTER ───── */}
      <footer className="site-footer" id="footer">
        <div className="footer-inner">
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={s.label}
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Kamesh Rajaram — Built with React, Three.js &amp; ☕
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
