import { useEffect } from 'react'
import Terminal from '../components/Terminal/Terminal'
import MinecraftWorld from '../components/World/MinecraftWorld'
import './Home.css'

const EXPERIENCE = [
  {
    company: 'Tata Consultancy Services',
    role: 'Systems Engineer - Developer',
    period: 'Nov 2024 - Present',
    location: 'Bengaluru, KA',
    summary:
      'Building Spring Boot microservices and React features for enterprise insurance platforms with a focus on secure APIs and fast delivery.',
    achievements: [
      'Owned REST API design, error handling, service configuration, and initial microservice delivery.',
      'Implemented Azure AD OAuth2 and JWT security flows for pre-production environments.',
      'Improved latency using Redis caching, Azure App Insights, and Dynatrace investigation.',
      'Used GitHub Copilot and focused automation habits to move faster through boilerplate, tests, and delivery tasks.',
      'Recognized with a Star Team Award for contribution and delivery quality.',
    ],
    tech: ['Java', 'Spring Boot', 'Microservices', 'Azure', 'Redis', 'GitHub Copilot', 'React'],
  },
  {
    company: 'Nokia Networks',
    role: 'Student Intern',
    period: 'Aug 2023 - May 2024',
    location: 'Chennai, TN',
    summary:
      'Migrated telecom automation workflows from Java/Jython to Python and Robot Framework.',
    achievements: [
      'Migrated 3500+ automation test cases with zero functional impact across 3 priority-1 pipelines.',
      'Used Python to automate repetitive manual work and speed up day-to-day engineering tasks.',
      'Supported Jenkins pipeline work while gaining hands-on Docker and Kubernetes exposure.',
      'Improved maintainability by moving legacy automation logic into clearer Python test assets.',
    ],
    tech: ['Python', 'Robot Framework', 'Jenkins', 'Docker', 'Kubernetes'],
  },
]

const PROJECTS = [
  {
    title: 'Secure E-Commerce Microservices',
    category: 'Distributed backend',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'JWT', 'PostgreSQL'],
    problem:
      'A production-style commerce backend needs secure auth, service discovery, config management, and reliable order flow.',
    outcome:
      'Built API Gateway, Eureka discovery, centralized config, JWT authorization, inventory reservation, and inter-service communication.',
    proof: ['Role-based access control', 'Order workflow orchestration', 'WebClient service calls'],
    github: 'https://github.com/Kamesh22/secure-ecommerce-microservices',
  },
  {
    title: 'Secure Expense Manager API',
    category: 'API security',
    tech: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'Hibernate'],
    problem:
      'Expense data needs strict ownership rules, safe retention behavior, and analytics without exposing user records.',
    outcome:
      'Implemented RBAC, JWT auth, method-level security, soft delete, paginated filtering, and monthly/category analytics.',
    proof: ['Data ownership checks', 'Soft-delete retention', 'Swagger API docs'],
    github: 'https://github.com/Kamesh22/expense-manager-api',
  },
  {
    title: 'Minecraft Portfolio',
    category: 'Interactive frontend',
    tech: ['React', 'Three.js', 'Vite', 'CSS'],
    problem:
      'A developer portfolio should be memorable without hiding the engineering story behind visual tricks.',
    outcome:
      'Created an interactive 3D island, terminal commands, GitHub Pages deployment, and a themed recruiter-friendly layout.',
    proof: ['3D block placement', 'Terminal command layer', 'Responsive SPA'],
    github: 'https://github.com/Kamesh22/minecraft-portfolio',
  },
]

const STRENGTHS = [
  {
    title: 'AI-assisted shipping',
    text: 'Use GitHub Copilot and GenAI tools to speed up implementation, documentation, boilerplate, and debugging while keeping code review and design judgment central.',
  },
  {
    title: 'Python automation',
    text: 'Use Python to reduce repetitive manual work, migrate test assets, and turn everyday engineering chores into reusable scripts.',
  },
  {
    title: 'Cloud and ML-aware',
    text: 'Hands-on Azure exposure with working knowledge of ML concepts, GenAI fundamentals, observability, and production backend delivery.',
  },
]

const CERTIFICATIONS = [
  'Star Team Award',
  'Azure AI Fundamentals (AI-900)',
  'GitHub Copilot (GH-300)',
  'Azure Fundamentals (AZ-900)',
  'Claude Certified Developer (Anthropic)',
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Kamesh22' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kamesh-r-a23280230' },
  { label: 'Email', href: 'mailto:kameshraja07@gmail.com' },
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openResume() {
  window.open(import.meta.env.BASE_URL + 'resume/Kamesh_Rajaram_Resume.pdf', '_blank')
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
}

function Home() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="home-shell" id="home">
      <header className="site-header">
        <a
          href="#home"
          className="brand"
          onClick={(event) => {
            event.preventDefault()
            scrollToId('home')
          }}
        >
          <span className="brand-mark" aria-hidden="true" />
          <span>Kamesh Rajaram</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <button onClick={() => scrollToId('projects')}>Projects</button>
          <button onClick={() => scrollToId('experience')}>Experience</button>
          <button onClick={() => scrollToId('terminal-section')}>Terminal</button>
          <button onClick={() => scrollToId('contact')}>Contact</button>
        </nav>

        <button className="icon-action" onClick={openResume} aria-label="Open resume" title="Open resume">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14" />
          </svg>
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Backend engineer / Java / Spring Boot</p>
            <div className="profile-strip">
              <img
                src={import.meta.env.BASE_URL + 'person/person.png'}
                alt="Kamesh Rajaram"
              />
              <span>Systems Engineer at TCS, building secure backend services.</span>
            </div>
            <h1>Kamesh Rajaram</h1>
            <p className="hero-lede">
              I build secure Java microservices and production-ready APIs, then use Python
              automation, Azure tools, and AI-assisted workflows to remove friction and ship
              faster without losing engineering discipline.
            </p>

            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollToId('projects')}>
                View projects
              </button>
              <button className="secondary-action" onClick={openResume}>
                Resume
              </button>
            </div>

            <div className="hero-stats" aria-label="Career highlights">
              <span>
                <strong>AI</strong>
                Copilot-assisted delivery
              </span>
              <span>
                <strong>Java</strong>
                Spring Boot, Microservices, REST APIs
              </span>
              <span>
                <strong>Azure</strong>
                cloud and AI certified
              </span>
              <span>
                <strong>Award</strong>
                Star Team recognition
              </span>
              <span>
                <strong>Claude Code</strong>
                Claude Certified Developer
              </span>
              <span>
                <strong>9.37</strong>
                VIT CGPA
              </span>
            </div>
          </div>

          <div className="hero-world" aria-label="Interactive Minecraft-style developer island">
            <div className="world-toolbar">
              <span>Developer island</span>
              <button onClick={() => scrollToId('sandbox')}>Expand</button>
            </div>
            <MinecraftWorld />
            <div className="world-caption">
              Drag to rotate. Click a block face to place. Shift+click removes.
            </div>
          </div>
        </section>

        <section className="section-band intro-band">
          <div className="section-heading">
            <p className="eyebrow">What I bring</p>
            <h2>Backend depth with a product-minded frontend touch.</h2>
          </div>
          <div className="strength-grid">
            {STRENGTHS.map((item) => (
              <article className="strength-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-band" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Selected builds</p>
            <h2>Projects framed around architecture, security, and impact.</h2>
          </div>

          <div className="project-grid">
            {PROJECTS.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline">
                  <span>{project.category}</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
                    <ExternalIcon />
                  </a>
                </div>
                <h3>{project.title}</h3>
                <p className="project-problem">{project.problem}</p>
                <p className="project-outcome">{project.outcome}</p>
                <div className="proof-list">
                  {project.proof.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-band split-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Work that maps to real backend ownership.</h2>
          </div>

          <div className="timeline">
            {EXPERIENCE.map((job) => (
              <article className="timeline-item" key={job.company}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span>{job.period}</span>
                    <span>{job.location}</span>
                  </div>
                  <h3>{job.company}</h3>
                  <p className="role">{job.role}</p>
                  <p>{job.summary}</p>
                  <ul>
                    {job.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="tech-list">
                    {job.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-band compact-band">
          <div>
            <p className="eyebrow">Signals</p>
            <h2>Certifications and focus areas</h2>
          </div>
          <div className="cert-list">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert}>{cert}</span>
            ))}
          </div>
        </section>

        <section className="section-band terminal-section" id="terminal-section">
          <div className="section-heading center-heading">
            <p className="eyebrow">Optional command mode</p>
            <h2>Explore the same portfolio through a terminal layer.</h2>
          </div>
          <div className="terminal-wrapper">
            <Terminal />
          </div>
        </section>

        <section className="section-band sandbox-section" id="sandbox">
          <div className="section-heading center-heading">
            <p className="eyebrow">Interactive island</p>
            <h2>A playful layer, still tied to the engineering story.</h2>
          </div>
          <div className="sandbox-container">
            <MinecraftWorld />
            <div className="sandbox-hint">
              Drag to rotate / click to build / shift+click to remove
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-copy">
          <strong>Ready to build reliable backend systems.</strong>
          <p>Java, Spring Boot, Azure, API security, Python automation, and AI-assisted delivery.</p>
          <small>Copyright {new Date().getFullYear()} Kamesh Rajaram. All rights reserved.</small>
        </div>
        <div className="footer-links">
          {SOCIALS.map((social) => (
            <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Home
