import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Terminal.css'

const RESUME_DATA = {
  whoami: [
    '',
    'Kamesh Rajaram',
    'Backend engineer focused on Java, Spring Boot, API security, and microservices.',
    'Currently building enterprise insurance platform features at TCS.',
    '',
  ],
  stack: [
    '',
    'Core stack',
    '- Java, Spring Boot, Spring Security, Hibernate',
    '- Microservices, REST APIs, JWT, OAuth2, RBAC',
    '- PostgreSQL, Redis, Azure, Dynatrace, App Insights',
    '- React, Vite, Three.js for frontend experiments',
    '',
  ],
  projects: [
    '',
    'Selected projects',
    '- Secure E-Commerce Microservices: API Gateway, Eureka, JWT, order workflow',
    '- Secure Expense Manager API: RBAC, strict ownership, analytics, soft delete',
    '- Minecraft Portfolio: React + Three.js interactive developer island',
    '',
  ],
  impact: [
    '',
    'Impact signals',
    '- Contributed to 3000+ unit tests using JUnit and Mockito',
    '- Migrated 3500+ automation test cases across priority-1 pipelines',
    '- Delivered Spring Boot microservice ownership from API design to config',
    '',
  ],
  contact: [
    '',
    'Contact',
    'Email:    kameshraja07@gmail.com',
    'LinkedIn: linkedin.com/in/kamesh-r-a23280230',
    'GitHub:   github.com/Kamesh22',
    '',
  ],
}

const HELP_TEXT = [
  '',
  'Available commands',
  'whoami     - short profile',
  'stack      - core technologies',
  'projects   - selected builds',
  'impact     - measurable highlights',
  'contact    - links and email',
  'resume     - open resume PDF',
  'clear      - clear terminal',
  '',
]

const BANNER = [
  'KAMESH.DEV // developer island terminal',
  'Type "help" to list commands.',
  '',
]

function Terminal() {
  const [history, setHistory] = useState(BANNER)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const terminalRef = useRef(null)
  const mirrorRef = useRef(null)
  const [inputWidth, setInputWidth] = useState(0)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useLayoutEffect(() => {
    if (mirrorRef.current) {
      setInputWidth(mirrorRef.current.scrollWidth)
    }
  }, [input])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addLines = useCallback((lines) => {
    setHistory((prev) => [...prev, ...lines])
  }, [])

  const handleCommand = useCallback((command) => {
    const trimmed = command.trim().toLowerCase()

    if (!trimmed) {
      addLines([''])
      return
    }

    if (trimmed === 'clear') {
      setHistory([])
      return
    }

    if (trimmed === 'resume') {
      addLines(['', 'Opening resume PDF...', ''])
      window.open(import.meta.env.BASE_URL + 'resume/Kamesh_Rajaram_Resume.pdf', '_blank')
      return
    }

    const output = trimmed === 'help' ? HELP_TEXT : RESUME_DATA[trimmed]
    if (output) {
      addLines(output)
      return
    }

    addLines(['', `Command not found: ${trimmed}`, 'Try "help".', ''])
  }, [addLines])

  const handleSubmit = (event) => {
    event.preventDefault()
    const value = input.trim()
    addLines([`kamesh@portfolio:~$ ${value}`])
    handleCommand(value)
    setInput('')
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-titlebar">
        <div className="terminal-titlebar-dots" aria-hidden="true">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="terminal-titlebar-text">kamesh@portfolio - command mode</span>
      </div>

      <div className="terminal-body" ref={terminalRef}>
        {history.map((line, index) => (
          <div key={`${line}-${index}`} className="terminal-line">
            {line}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">kamesh@portfolio:~$ </span>
          <div className="terminal-input-area">
            <span ref={mirrorRef} className="terminal-mirror" aria-hidden="true">
              {input}
            </span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              style={{ width: `${inputWidth + 3}px` }}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command"
            />
            <span className="terminal-cursor" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Terminal
