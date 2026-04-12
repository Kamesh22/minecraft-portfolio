import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import './Terminal.css'

/* ===== RESUME DATA ===== */
const RESUME_DATA = {
  about: [
    '',
    '  ════════════════════════════════════════',
    '           ABOUT — KAMESH RAJARAM',
    '  ════════════════════════════════════════',
    '',
    '  Software Engineer with 2 years of experience',
    '  building secure, scalable backend services.',
    '',
    '  Currently at Tata Consultancy Services,',
    '  working on a UK-based Insurance project',
    '  using Spring Boot Microservices with React.js.',
    '',
    '  Previously interned at Nokia Networks,',
    '  migrating automation frameworks from Java',
    '  (Jython) to Python using Robot Framework.',
    '',
    '  M.Tech in Software Engineering from VIT',
    '  Vellore — CGPA: 9.37 / 10.0',
    '',
    '  ════════════════════════════════════════',
    '',
  ],

  skills: [
    '',
    '  ════════════════════════════════════════',
    '                SKILLS',
    '  ════════════════════════════════════════',
    '',
    '  ⛏  LANGUAGES',
    '     Java • Python • JavaScript',
    '',
    '  🔧 FRAMEWORKS & BACKEND',
    '     Spring Framework • Spring Boot',
    '     Hibernate (JPA) • ReactJS',
    '     REST APIs • Microservices',
    '',
    '  ☁  TECHNOLOGIES',
    '     Microsoft Azure • Git • Linux',
    '     Dynatrace • Jira • Jenkins',
    '     Docker • Kubernetes • Confluence',
    '',
    '  ════════════════════════════════════════',
    '',
  ],

  experience: [
    '',
    '  ════════════════════════════════════════',
    '              EXPERIENCE',
    '  ════════════════════════════════════════',
    '',
    '  ▸ TATA CONSULTANCY SERVICES',
    '    Systems Engineer — Developer',
    '    Nov 2024 – Present | Bengaluru, KA',
    '    ─────────────────────────────────',
    '    • Java Developer on a UK-based Insurance',
    '      project using Spring Boot + React.js',
    '    • Built new Microservices by adapting',
    '      logic from legacy monolithic apps',
    '    • Owned end-to-end initial development',
    '      of a Microservice (REST API design,',
    '      error handling, configuration)',
    '    • Implemented Azure AD OAuth2 with',
    '      JWT-based security for pre-prod',
    '    • Optimized performance with Redis',
    '      caching, Azure Insights & Dynatrace',
    '    • Contributed to 3000+ unit tests',
    '      (JUnit + Mockito), 100% CSS delivery',
    '',
    '  ▸ NOKIA NETWORKS',
    '    Student Intern',
    '    Aug 2023 – May 2024 | Chennai, TN',
    '    ─────────────────────────────────',
    '    • Migrated automation framework from',
    '      Java (Jython) to Python + Robot Framework',
    '    • Developed automation scripts, assisted',
    '      with Jenkins pipelines, Docker & K8s',
    '    • Migrated 3500+ test cases with zero',
    '      functional impact across 3 P1 pipelines',
    '',
    '  ════════════════════════════════════════',
    '',
  ],

  education: [
    '',
    '  ════════════════════════════════════════',
    '              EDUCATION',
    '  ════════════════════════════════════════',
    '',
    '  🎓 Vellore Institute of Technology',
    '     Integrated M.Tech — Software Engineering',
    '     Graduated: May 2024',
    '     CGPA: 9.37 / 10.0',
    '',
    '  ════════════════════════════════════════',
    '',
  ],

  certifications: [
    '',
    '  ════════════════════════════════════════',
    '            CERTIFICATIONS',
    '  ════════════════════════════════════════',
    '',
    '  📜 Azure AI Fundamentals (AI-900)    Jan 2026',
    '  📜 GitHub Copilot Cert (GH-300)      Oct 2025',
    '  📜 Azure Fundamentals (AZ-900)       Jul 2024',
    '',
    '  ════════════════════════════════════════',
    '',
  ],

  projects: [
    '',
    '  ════════════════════════════════════════',
    '               PROJECTS',
    '  ════════════════════════════════════════',
    '',
    '  ▸ Secure E-Commerce Microservices Platform',
    '    Java | Spring Boot | Spring Cloud | JWT',
    '    PostgreSQL | API Gateway',
    '    ─────────────────────────────────────',
    '    • Built production-style microservices',
    '      with API Gateway, Eureka discovery,',
    '      and centralized config (Spring Cloud)',
    '    • Implemented JWT auth with role-based',
    '      access control & method-level security',
    '    • Developed order workflow with inventory',
    '      reservation, payment simulation, and',
    '      inter-service comms via WebClient',
    '',
    '    GitHub: github.com/Kamesh22/',
    '    secure-ecommerce-microservices',
    '',
    '  ════════════════════════════════════════',
    '',
  ],

  contact: [
    '',
    '  ════════════════════════════════════════',
    '               CONTACT',
    '  ════════════════════════════════════════',
    '',
    '  📧 Email    : kameshraja07@gmail.com',
    '  💼 LinkedIn : linkedin.com/in/kamesh-r-a23280230',
    '  🐙 GitHub   : github.com/Kamesh22',
    '  📍 Location : Vellore, Tamil Nadu',
    '',
    '  ════════════════════════════════════════',
    '',
  ],
}

const HELP_TEXT = [
  '',
  '  ════════════════════════════════════════',
  '         AVAILABLE COMMANDS',
  '  ════════════════════════════════════════',
  '',
  '  about          — Who is Kamesh?',
  '  skills         — Technical skills',
  '  experience     — Work experience',
  '  education      — Academic background',
  '  certifications — Professional certs',
  '  project        — Recent project',
  '  contact        — Get in touch',
  '  resume         — Download my resume',
  '  clear          — Clear terminal',
  '  time-travel    — ???',
  '',
  '  Type a command and press Enter.',
  '',
  '  ════════════════════════════════════════',
  '',
]

const ASCII_BANNER = [
  '',
  '  ██╗  ██╗ █████╗ ███╗   ███╗███████╗███████╗██╗  ██╗',
  '  ██║ ██╔╝██╔══██╗████╗ ████║██╔════╝██╔════╝██║  ██║',
  '  █████╔╝ ███████║██╔████╔██║█████╗  ███████╗███████║',
  '  ██╔═██╗ ██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║',
  '  ██║  ██╗██║  ██║██║ ╚═╝ ██║███████╗███████║██║  ██║',
  '  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝',
  '',
  '  ⛏  Minecraft Portfolio Terminal v1.0',
  '  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '',
]

const TIME_TRAVEL_MESSAGES = [
  [
    '',
    '  ⚡ Initiating temporal splinter sequence...',
    '  ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 50%',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░ 75%',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
    '',
    '  ❌ ERROR: Year 2043 not found in timeline.',
    '  "Sic Mundus Creatus Est."',
    '',
    '  The passage remains... but not for you.',
    '  Not yet.',
    '',
  ],
  [
    '',
    '  🌀 Warping spacetime continuum...',
    '  ████████████████████ COMPLETE',
    '',
    '  ⚠  PARADOX DETECTED: You already visited',
    '  this exact moment 3 times before.',
    '  The bootstrap paradox is real.',
    '',
    '  "We are not free in what we do,',
    '   because we are not free in what we want."',
    '      — Adam, Dark (S3E8)',
    '',
  ],
  [
    '',
    '  ⏱️ Calculating gravitational time dilation...',
    '  [████████░░░░░░░░░░] 40%',
    '  [████████████████░░] 80%',
    '',
    '  ⚠️ WARNING: Extreme proximity to singularity detected.',
    '  Every minute spent running this command costs 7 years on Earth.',
    '',
    '  "Do not go gentle into that good night."',
    '',
  ],
  [
    '',
    '  ⚡ Routing power to Flux Capacitor...',
    '  Velocity: 65 MPH... 75 MPH... 87.9 MPH...',
    '',
    '  💥 CRITICAL FAILURE: Power output at 0.8 Gigawatts.',
    '  1.21 GIGAWATTS REQUIRED FOR CHRONO-DISPLACEMENT.',
    '',
    '  "Roads? Where we are going, we do not need roads."',
    '',
  ],
  [
    '',
    '  ⚛️ Opening Einstein-Rosen bridge...',
    '  Stabilizing Cesium-137 isotope levels...',
    '  ████████████████████ 100%',
    '',
    '  ⏳ ERROR: The passage operates strictly on a 33-year cycle.',
    '  Current cycle alignment: MISMATCH.',
    '',
    '  "The distinction between past, present, and future',
    '   is only a stubbornly persistent illusion."',
    '',
  ],
  [
    '',
    '  🔬 Calibrating core temporal tether...',
    '  Target Destination: Philadelphia, 1996.',
    '',
    '  🧬 ANOMALY DETECTED: Kalavirus mutation present in timeline.',
    '  Splinter sequence aborted. You are anchored to the present.',
    '',
    '  "Memory is a traitor. It is a one-way street."',
    '',
  ],
  [
    '',
    '  🖥️ Accessing timeline repository...',
    '  Reversing entropy in local environment...',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ REWINDING',
    '',
    '  🐈 DÉJÀ VU ALERT: A glitch in the simulation has occurred.',
    '  Changes to the source code detected in the past 24 hours.',
    '',
    '  You have already written this exact line of code tomorrow.',
    '',
  ],
  [
    '',
    '  ⏳ Time dilation field collapsing...',
    '  Re-integrating temporal signature...', 
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
    '',
    '  ⚠️ CAUTION: Paradox contamination detected.',
    '  The timeline is attempting to self-correct.',
    '',
    '  "The future is not set. There is no fate but what we make for ourselves."',
    '',
  ],
  [
    '',
    '  🚀 Engaging warp drive...',
    '  Navigating asteroid field of causality...', 
    '  ████████████████████ 100%',
    '',
    '  🚨 WARNING: Collision with alternate timeline imminent.',
    '  Diverting power to shields...', 
    '',
    '  "Great Scott! We’re going to need more power!"',
    '',
  ],
  [
    '',
    '  🌀 Entering quantum foam...',
    '  Observing multiple probability states...', 
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
    '',
    '  ⚛️ ERROR: Wave function collapse failed.',
    '  You are now in a superposition of all possible timelines.',
    '',
    '  "I am the master of my fate. I am the captain of my soul."',
    '',
  ],
  [
    '',
    '  🔬 Analyzing temporal residue...',
    '  Tracing energy signature to source...', 
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
    '',
    '  📍 SOURCE IDENTIFIED: Your GitHub repository.',
    '  The code itself is creating temporal loops.',
    '',
    '  "With great power comes great responsibility."',
    '',
  ],
  [
    '',
    '  🔧 Repairing timeline integrity...',
    '  Patching paradox leaks...', 
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
    '',
    '  ✅ TIMELINE STABILIZED.',
    '  You are safely back in the present.',
    '',
    '  "Yesterday is history, tomorrow is a mystery, but today is a gift."',
    '',
  ]
]

/* ===== TERMINAL COMPONENT ===== */
function Terminal() {
  const [history, setHistory] = useState([...ASCII_BANNER, '  Enter guest name: '])
  const [input, setInput] = useState('')
  const [guestName, setGuestName] = useState('')
  const [phase, setPhase] = useState('AWAITING_NAME') // 'AWAITING_NAME' | 'READY'
  const inputRef = useRef(null)
  const terminalRef = useRef(null)
  const mirrorRef = useRef(null)
  const timeTravelIndex = useRef(0)
  const [inputWidth, setInputWidth] = useState(0)

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Measure input text width via mirror span
  useLayoutEffect(() => {
    if (mirrorRef.current) {
      setInputWidth(mirrorRef.current.scrollWidth)
    }
  }, [input])

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addLines = useCallback((lines) => {
    setHistory((prev) => [...prev, ...lines])
  }, [])

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()

    switch (trimmed) {
      case 'help':
        addLines(HELP_TEXT)
        break
      case 'about':
        addLines(RESUME_DATA.about)
        break
      case 'skills':
        addLines(RESUME_DATA.skills)
        break
      case 'experience':
        addLines(RESUME_DATA.experience)
        break
      case 'education':
        addLines(RESUME_DATA.education)
        break
      case 'certifications':
      case 'certs':
        addLines(RESUME_DATA.certifications)
        break
      case 'projects':
      case 'project':
        addLines(RESUME_DATA.projects)
        break
      case 'contact':
      case 'email':
        addLines(RESUME_DATA.contact)
        break
      case 'resume':
        addLines([
          '',
          '  📄 Opening resume in a new tab...',
          '',
        ])
        window.open(import.meta.env.BASE_URL + 'resume/Kamesh_Rajaram_Resume.pdf', '_blank')
        break
      case 'clear':
        setHistory([])
        return
      case 'time-travel':
      case 'timetravel':
        addLines(TIME_TRAVEL_MESSAGES[timeTravelIndex.current % TIME_TRAVEL_MESSAGES.length])
        timeTravelIndex.current++
        break
      default:
        addLines([
          '',
          `  ❌ Command not found: "${trimmed}"`,
          '  Type "help" for available commands.',
          '',
        ])
    }
  }, [addLines])

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = input.trim()

    if (phase === 'AWAITING_NAME') {
      if (!value) return
      setGuestName(value)
      addLines([
        `  > ${value}`,
        '',
        `  Welcome, ${value}! 🎮`,
        '  You\'ve joined the server.',
        '',
        '  Type "help" to see available commands.',
        '',
      ])
      setPhase('READY')
    } else {
      addLines([`  ${guestName}@portfolio:~$ ${value}`])
      if (value) {
        handleCommand(value)
      }
    }

    setInput('')
  }

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const promptText =
    phase === 'AWAITING_NAME'
      ? '  > '
      : `  ${guestName}@portfolio:~$ `

  return (
    <div className="terminal" onClick={handleTerminalClick} id="terminal">
      {/* Scanline overlay */}
      <div className="terminal-scanlines" />

      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-titlebar-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="terminal-titlebar-text">⛏ kamesh@minecraft-portfolio — bash</span>
      </div>

      {/* Output area */}
      <div className="terminal-body" ref={terminalRef}>
        {history.map((line, i) => (
          <div key={i} className="terminal-line">
            {line}
          </div>
        ))}

        {/* Input line — prompt + visible text + blinking cursor */}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">{promptText}</span>
          <div className="terminal-input-area">
            {/* Hidden mirror span to measure text width */}
            <span
              ref={mirrorRef}
              className="terminal-mirror"
              aria-hidden="true"
            >
              {input}
            </span>
            {/* Actual input, sized to match mirror */}
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              style={{ width: inputWidth + 2 + 'px' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              id="terminal-input"
            />
            <span className="terminal-cursor" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Terminal
