import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Braces, Check,
  ChevronDown, Code2, Copy, ExternalLink, Github, Globe2, Layers3, Mail,
  Menu, Moon, MousePointer2, Play, Rocket, Send, Sparkles, Sun, Terminal,
  X, Zap, Database, Server, Smartphone, Eye, CarFront
} from "lucide-react";
import "./styles.css";

const projects = [
  {
    number: "01", title: "Hospital Appointment & Patient Management", type: "BACKEND / REST API",
    description: "A backend system for managing patients, doctors, appointments, and medical records, with authentication, role-based access, validation, search, filtering, pagination, and PostgreSQL integration.",
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL"], icon: Server,
    link: null, linkLabel: "Project from resume", accent: "violet"
  },
  {
    number: "02", title: "PDF Maker", type: "WEB APP / DOCUMENT TOOLS",
    description: "A browser-based PDF conversion tool with a frontend and Python backend, organized into separate application components.",
    tags: ["Python", "FastAPI", "HTML", "CSS"], icon: Layers3,
    link: "https://github.com/ramsivaji/pdf-maker", linkLabel: "View on GitHub", accent: "blue"
  },
  {
    number: "03", title: "Automated Road Damage Detection", type: "AI / COMPUTER VISION",
    description: "An AI project that detects potholes and road cracks in drone imagery using YOLOv8 trained on the RDD2022 dataset to support more efficient road inspections.",
    tags: ["Python", "YOLOv8"], icon: BrainCircuit,
    link: null, linkLabel: "Project from resume", accent: "orange"
  },
  {
    number: "04", title: "AP & Telangana Tourism", type: "WEB / TOURISM",
    description: "A React-based tourism website for exploring popular destinations across Andhra Pradesh and Telangana, with state selection, destination information, and a responsive interface.",
    tags: ["React", "Vite", "TypeScript"], icon: Globe2,
    link: "https://github.com/ramsivaji/AP-TS-Tourism", linkLabel: "View on GitHub", accent: "blue"
  },
  {
    number: "05", title: "Student Management System", type: "DATABASE / CRUD APP",
    description: "A desktop CRUD application to insert, update, delete, and view student records through a Tkinter interface connected to a MySQL database.",
    tags: ["Python", "Tkinter", "MySQL"], icon: Database,
    link: "https://github.com/ramsivaji/student-mangement-system-using-pdbc-and-mysql-database.", linkLabel: "View on GitHub", accent: "violet"
  },
  {
    number: "06", title: "ESP32-CAM Car", type: "EMBEDDED / IOT",
    description: "An ESP32-CAM car project concept combining a camera-enabled vehicle with Wi-Fi-based control and a pan–tilt servo setup to adjust the camera’s viewing direction.",
    tags: ["ESP32-CAM", "Embedded Systems", "Wi-Fi", "Servo Motors"], icon: CarFront,
    link: null, linkLabel: "Personal project", accent: "orange"
  }
];

const skills = [
  { icon: Code2, title: "Programming Languages", text: "Python, SQL" },
  { icon: Server, title: "Backend Frameworks", text: "Django, Django REST Framework (DRF), Flask" },
  { icon: Database, title: "Databases", text: "MySQL, PostgreSQL" },
  { icon: Layers3, title: "Python Libraries", text: "Pandas, NumPy" },
  { icon: Terminal, title: "Tools & IDEs", text: "Git, GitHub, Visual Studio Code, Jupyter Notebook" }
];

function Reveal({ children, delay = 0, className = "" }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function ScrollFigure({ side, progress }) {
  const isRobot = side === "right";
  const top = useTransform(progress, [0, 1], isRobot ? ["13vh", "76vh"] : ["76vh", "13vh"]);
  const rotate = useTransform(progress, [0, 0.5, 1], isRobot ? [-8, 8, -8] : [8, -8, 8]);

  return (
    <motion.div className={`scroll-figure scroll-figure-${side}`} style={{ top, rotate }} aria-hidden="true">
      <span className="figure-shadow" />
      {isRobot ? (
        <svg className="figure-art robot-art" viewBox="0 0 64 88" fill="none">
          <path d="M32 4v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="4" r="3" fill="#f6bd60" />
          <rect x="17" y="12" width="30" height="25" rx="9" fill="#d9e7ff" stroke="currentColor" strokeWidth="2.5" />
          <rect x="22" y="19" width="20" height="10" rx="5" fill="#20263b" />
          <circle cx="27" cy="24" r="2" fill="#81f2ca" /><circle cx="37" cy="24" r="2" fill="#81f2ca" />
          <path d="M17 21h-5m35 0h5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="19" y="40" width="26" height="24" rx="8" fill="#b49aff" stroke="currentColor" strokeWidth="2.5" />
          <path d="M25 47h14m-14 6h9" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <g className="figure-arm figure-arm-left"><path d="M19 45 11 54l4 8" stroke="#d9e7ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="15" cy="63" r="3" fill="#f6bd60"/></g>
          <g className="figure-arm figure-arm-right"><path d="m45 45 8 9-4 8" stroke="#d9e7ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="49" cy="63" r="3" fill="#f6bd60"/></g>
          <g className="figure-leg figure-leg-left"><path d="m26 64-3 12" stroke="#d9e7ff" strokeWidth="6" strokeLinecap="round"/><path d="M17 78h10" stroke="#81f2ca" strokeWidth="5" strokeLinecap="round"/></g>
          <g className="figure-leg figure-leg-right"><path d="m38 64 3 12" stroke="#d9e7ff" strokeWidth="6" strokeLinecap="round"/><path d="M39 78h10" stroke="#81f2ca" strokeWidth="5" strokeLinecap="round"/></g>
        </svg>
      ) : (
        <svg className="figure-art explorer-art" viewBox="0 0 64 88" fill="none">
          <path d="M16 24a16 16 0 0 1 32 0v6H16v-6Z" fill="#ffc18b" stroke="currentColor" strokeWidth="2.5" />
          <path d="M19 24a13 13 0 0 1 26 0v3H19v-3Z" fill="#263047" />
          <circle cx="28" cy="23" r="2" fill="#81f2ca" /><circle cx="36" cy="23" r="2" fill="#81f2ca" />
          <path d="M32 9v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <rect x="19" y="34" width="26" height="29" rx="9" fill="#8dddf1" stroke="currentColor" strokeWidth="2.5" />
          <rect x="25" y="41" width="14" height="12" rx="5" fill="#263047" />
          <path d="M29 47h6" stroke="#ffc18b" strokeWidth="2" strokeLinecap="round" />
          <g className="figure-arm figure-arm-left"><path d="m20 40-8 10 4 8" stroke="#ffc18b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="17" cy="59" r="3" fill="#b49aff"/></g>
          <g className="figure-arm figure-arm-right"><path d="m44 40 8 10-4 8" stroke="#ffc18b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="47" cy="59" r="3" fill="#b49aff"/></g>
          <g className="figure-leg figure-leg-left"><path d="m26 63-3 13" stroke="#ffc18b" strokeWidth="6" strokeLinecap="round"/><path d="M17 78h10" stroke="#b49aff" strokeWidth="5" strokeLinecap="round"/></g>
          <g className="figure-leg figure-leg-right"><path d="m38 63 3 13" stroke="#ffc18b" strokeWidth="6" strokeLinecap="round"/><path d="M39 78h10" stroke="#b49aff" strokeWidth="5" strokeLinecap="round"/></g>
          <circle cx="13" cy="35" r="2" fill="#f6bd60" /><circle cx="51" cy="33" r="2" fill="#81f2ca" />
        </svg>
      )}
      <span className="figure-caption">{isRobot ? "BOT_01" : "EXPLORER"}</span>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState(false);
  const [activeTool, setActiveTool] = useState("playground");
  const [codeOutput, setCodeOutput] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const categories = ["All", "Backend", "AI / ML", "Web App", "Database", "Embedded / IoT"];
  const visibleProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "AI / ML") return p.type.includes("AI") || p.type.includes("COMPUTER");
    if (filter === "Backend") return p.type.includes("BACKEND");
    if (filter === "Database") return p.type.includes("DATABASE");
    if (filter === "Embedded / IoT") return p.type.includes("EMBEDDED") || p.tags.includes("ESP32-CAM");
    return p.type.includes("WEB") || p.type.includes("TOURISM") || p.type.includes("DOCUMENT");
  });

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("ramsivaji0@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:ramsivaji0@gmail.com";
    }
  }

  const navLinks = [["About", "#about"], ["Skills", "#skills"], ["Projects", "#projects"], ["Lab", "#lab"], ["Contact", "#contact"]];

  return (
    <div className={light ? "app light" : "app"}>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="scroll-figure-rail" aria-hidden="true"><span /></div>
      <ScrollFigure side="right" progress={scrollYProgress} />
      <ScrollFigure side="left" progress={scrollYProgress} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Rama Sivaji home"><span className="brand-mark">RS</span><span>rama<span className="brand-dot">.</span>dev</span></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navLinks.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-button theme-toggle" onClick={() => setLight(!light)} aria-label="Toggle theme">{light ? <Moon size={17} /> : <Sun size={17} />}</button>
          <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15} /></a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div className="availability" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}><span className="status-dot" /> OPEN TO OPPORTUNITIES <span className="availability-line" /></motion.div>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7 }}>
              I build things<br />for the <span className="gradient-text">digital world.</span>
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>
              Hey, I’m <strong>Kaisarlla Rama Sivaji</strong> — a Python Backend Developer focused on Django, REST APIs, database-backed applications, and practical AI projects.
            </motion.p>
            <motion.div className="hero-buttons" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }}>
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-ghost" href="#contact"><Mail size={16} /> Get in touch</a>
            </motion.div>
            <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }}>
              <span><span className="meta-icon"><Code2 size={14} /></span> Python Backend</span><span className="meta-divider" /><span><span className="meta-icon"><Database size={14} /></span> REST APIs & SQL</span><span className="meta-divider" /><span><span className="meta-icon"><Globe2 size={14} /></span> India</span>
            </motion.div>
          </div>
          <div className="hero-visual" aria-label="Animated developer illustration">
            <motion.div className="orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
            <motion.div className="orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }} />
            <motion.div className="floating-chip chip-python" animate={{ y: [0, -10, 0], rotate: [-3, 2, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><span className="chip-logo python-logo">Py</span><span>Python</span></motion.div>
            <motion.div className="floating-chip chip-react" animate={{ y: [0, 9, 0], rotate: [2, -2, 2] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}><span className="react-symbol">⚛</span><span>React</span></motion.div>
            <motion.div className="floating-chip chip-ai" animate={{ y: [0, -8, 0], x: [0, 3, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}><BrainCircuit size={17} /><span>AI / ML</span></motion.div>
            <motion.div className="core-card" animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <div className="core-top"><span className="window-dots"><i /><i /><i /></span><span className="core-file">developer.tsx</span><span className="core-status">● LIVE</span></div>
              <div className="code-snippet"><div><span className="code-purple">const</span> <span className="code-blue">developer</span> = {"{"}</div><div className="code-indent"><span className="code-cyan">name</span>: <span className="code-green">'Sivaji'</span>,</div><div className="code-indent"><span className="code-cyan">focus</span>: <span className="code-green">'Build + Learn'</span>,</div><div className="code-indent"><span className="code-cyan">coffee</span>: <span className="code-orange">true</span>,</div><div>{"}"}</div><div className="code-comment">// turning ideas into products <span className="blinking-cursor">▍</span></div></div>
              <div className="core-bottom"><span><span className="pulse-dot" /> Available for new projects</span><span>v1.0.0</span></div>
            </motion.div>
            <motion.div className="floating-stat" animate={{ y: [0, 6, 0] }} transition={{ duration: 3.8, repeat: Infinity }}><Sparkles size={15} /><span><strong>Curiosity</strong><small>always compiling</small></span></motion.div>
            <div className="hero-visual-caption">DESIGNED TO LEARN. BUILT TO SHIP.</div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown size={16} /></a>
        </section>

        <section className="ticker" aria-label="Technologies"><div className="ticker-track">{Array.from({ length: 2 }).flatMap((_, i) => ["PYTHON", "SQL", "DJANGO", "DJANGO REST FRAMEWORK", "FLASK", "MYSQL", "PANDAS", "NUMPY", "GIT", "GITHUB"].map((item, j) => <span key={`${i}-${j}`}><i />{item}</span>))}</div></section>

        <section className="section-wrap about-section" id="about">
          <Reveal><div className="section-kicker"><span>01 / ABOUT ME</span><span className="kicker-line" /></div></Reveal>
          <div className="about-grid">
            <Reveal className="about-heading"><h2>Curious mind.<br /><span className="muted-heading">Practical builder.</span></h2></Reveal>
            <Reveal delay={.12} className="about-body"><p>I’m a B.Tech Computer Science (AI & ML) graduate and Python Backend Developer. My focus is building RESTful APIs, database-backed applications, and useful software with Django and Python.</p><p>My projects include a hospital appointment and patient management API, a PDF conversion web app, and an image-based road damage detection system. I value clear code, reliable data handling, and practical solutions.</p><a href="#contact" className="text-link">A little more about me <ArrowRight size={16} /></a></Reveal>
          </div>
          <div className="stats-row">
            {[["2025", "B.Tech graduate"], ["Python", "Backend focus"], ["REST APIs", "Development focus"]].map(([num, label], i) => <Reveal delay={i * .08} key={label} className="stat-item"><strong>{num}</strong><span>{label}</span></Reveal>)}
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <Reveal><div className="section-kicker"><span>02 / TOOLKIT</span><span className="kicker-line" /></div><div className="section-heading-row"><h2>Tools of the trade<span className="gradient-text">.</span></h2><p>Skills listed in my resume, organized by focus area.</p></div></Reveal>
          <div className="skills-grid">{skills.map((skill, i) => <Reveal key={skill.title} delay={i * .06} className="skill-card"><div className="skill-icon"><skill.icon size={20} /></div><div><h3>{skill.title}</h3><p>{skill.text}</p></div><ArrowUpRight className="skill-arrow" size={16} /></Reveal>)}</div>
        </section>

        <section className="section-wrap projects-section" id="projects">
          <Reveal><div className="section-kicker"><span>03 / SELECTED WORK</span><span className="kicker-line" /></div><div className="section-heading-row projects-heading"><h2>Made with intent<span className="gradient-text">.</span></h2><div className="filters">{categories.map((c) => <button key={c} onClick={() => setFilter(c)} className={filter === c ? "filter active" : "filter"}>{c}</button>)}</div></div></Reveal>
          <div className="projects-grid">{visibleProjects.map((project, i) => <Reveal key={project.number} delay={i * .08} className={`project-card ${project.accent}`}><div className="project-card-top"><span className="project-number">{project.number} / 06</span><span className="project-type">{project.type}</span></div><div className="project-illustration"><div className="illustration-ring ring-a" /><div className="illustration-ring ring-b" /><div className="illustration-orb"><project.icon size={38} strokeWidth={1.3} /></div><span className="illustration-label">{project.type}</span></div><div className="project-content"><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={16} /></a> : <span className="project-link project-link-muted">{project.linkLabel}</span>}</div></Reveal>)}</div>
        </section>

        <section className="section-wrap experience-section">
          <Reveal><div className="section-kicker"><span>04 / JOURNEY</span><span className="kicker-line" /></div><div className="section-heading-row"><h2>Learning by doing<span className="gradient-text">.</span></h2><p>Each step is a chance to build a stronger foundation.</p></div></Reveal>
          <div className="timeline">
            <Reveal className="timeline-item">
              <div className="timeline-marker"><span /></div>
              <div className="timeline-date">16 FEB 2026 — 15 MAR 2026</div>
              <div className="timeline-main">
                <div>
                  <h3>Data Analyst</h3>
                  <p className="timeline-org">Concentrix &nbsp;·&nbsp; <span className="timeline-client">Apple AI</span> &nbsp;·&nbsp; Hyderabad</p>
                </div>
                <span className="timeline-pill">EXPERIENCE</span>
              </div>
              <ul className="timeline-bullets">
                <li>Reviewed AI-generated responses from Apple's AI system and evaluated them for accuracy, relevance, and overall quality.</li>
                <li>Analyzed user prompts and AI-generated outputs to support model evaluation and improve real-world performance.</li>
                <li>Maintained consistent feedback and annotations to help improve the reliability and quality of AI-generated responses.</li>
              </ul>
            </Reveal>
            <Reveal delay={.1} className="timeline-item"><div className="timeline-marker"><span /></div><div className="timeline-date">DEC 2025 — MAR 2026</div><div className="timeline-main"><div><h3>Research Analyst Intern</h3><p className="timeline-org">Concentrix &nbsp;·&nbsp; <span className="timeline-client">Procore</span> &nbsp;·&nbsp; Hyderabad</p></div><span className="timeline-pill">INTERNSHIP</span></div><ul className="timeline-bullets"><li>Updated and maintained client information in Salesforce CRM for the Procore client.</li><li>Reviewed and verified client records to ensure data accuracy, consistency, and completeness.</li><li>Organized and managed CRM data to support efficient record keeping and client information management.</li></ul></Reveal>
            <Reveal delay={.12} className="timeline-item"><div className="timeline-marker"><span /></div><div className="timeline-date">SEP 2021 — JUL 2025</div><div className="timeline-main"><div><h3>B.Tech — Computer Science Engineering (AI & ML)</h3><p className="timeline-org">Malla Reddy College of Engineering · CGPA 7.0</p></div><span className="timeline-pill">EDUCATION</span></div><p className="timeline-description">Sri Chaitanya Junior College (693 marks, 2019–2021) · Jasmine High School (CGPA 8.0, 2018–2019).</p></Reveal>
          </div>
          <div className="certifications-strip"><span className="certification-label">CERTIFICATIONS</span><span>PMKVY 4.0 – Skill India Certificate (Python Programming / Web Development)</span><span>Udemy – Python Frameworks and Django for Beginners</span></div>
        </section>

        <section className="section-wrap lab-section" id="lab">
          <Reveal><div className="section-kicker"><span>05 / INTERACTIVE LAB</span><span className="kicker-line" /></div><div className="section-heading-row"><h2>A tiny developer lab<span className="gradient-text">.</span></h2><p>A few playful interactions — because a portfolio should do more than sit still.</p></div></Reveal>
          <Reveal className="lab-panel">
            <div className="lab-sidebar"><div className="lab-label"><span className="pulse-dot" /> PLAYGROUND</div><button onClick={() => setActiveTool("playground")} className={activeTool === "playground" ? "lab-tab active" : "lab-tab"}><Braces size={16} /> Code playground</button><button onClick={() => setActiveTool("focus")} className={activeTool === "focus" ? "lab-tab active" : "lab-tab"}><Zap size={16} /> Focus mode</button><button onClick={() => setActiveTool("manifesto")} className={activeTool === "manifesto" ? "lab-tab active" : "lab-tab"}><Rocket size={16} /> Build mindset</button><div className="lab-sidebar-foot">INTERACTIVE COMPONENTS<br /><span>STATUS: ALL SYSTEMS GO</span></div></div>
            <div className="lab-workspace">
              <AnimatePresence mode="wait">
                {activeTool === "playground" && <motion.div key="playground" className="lab-content" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}><div className="workspace-top"><span><Terminal size={15} /> app.py</span><span className="file-language">PYTHON</span></div><pre className="play-code"><span className="code-purple">def</span> <span className="code-blue">build_idea</span>(idea):{"\n"}    <span className="code-comment"># small steps, real progress</span>{"\n"}    <span className="code-purple">return</span> <span className="code-green">f"Shipping: {"{idea}"} 🚀"</span>{"\n\n"}<span className="code-blue">print</span>(build_idea(<span className="code-green">"something useful"</span>))</pre><div className="terminal-output"><span className="terminal-prompt">➜</span> {codeOutput ? "Shipping: something useful 🚀" : "Click run to execute this demo"}</div><div className="workspace-actions"><button className="button button-primary small" onClick={() => setCodeOutput(true)}><Play size={14} fill="currentColor" /> Run demo</button><button className="button button-ghost small" onClick={() => setCodeOutput(false)}>Reset</button></div></motion.div>}
                {activeTool === "focus" && <motion.div key="focus" className="lab-content focus-content" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}><div className="workspace-top"><span><Zap size={15} /> focus-mode.exe</span><span className="file-language">FLOW</span></div><div className="focus-orb"><motion.div animate={{ scale: [1, 1.12, 1], opacity: [.6, 1, .6] }} transition={{ duration: 3, repeat: Infinity }} /><MousePointer2 size={26} /></div><h3>One thing at a time.</h3><p>Reduce the noise. Pick one task. Make the next small move.</p><div className="focus-steps"><span><Check size={14} /> Choose a goal</span><span><Check size={14} /> Work in small steps</span><span><Check size={14} /> Ship, then improve</span></div></motion.div>}
                {activeTool === "manifesto" && <motion.div key="manifesto" className="lab-content manifesto-content" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}><div className="workspace-top"><span><Rocket size={15} /> build-manifesto.md</span><span className="file-language">NOTES</span></div><div className="manifesto-mark">“</div><h3>Make it work.<br />Make it clear.<br /><span className="gradient-text">Make it better.</span></h3><p>Curiosity starts the build. Consistency gets it over the line.</p><div className="manifesto-bottom"><span>PRINCIPLE_001</span><Sparkles size={17} /></div></motion.div>}
              </AnimatePresence>
            </div>
          </Reveal>
        </section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-wrap"><Reveal><div className="section-kicker"><span>06 / CONTACT</span><span className="kicker-line" /></div><div className="contact-grid"><div><h2>Have an idea?<br /><span className="gradient-text">Let's make it real.</span></h2><p>Open to entry-level developer opportunities, collaborations, and interesting problems to solve.</p><div className="contact-buttons"><a className="button button-primary" href="mailto:ramsivaji0@gmail.com">Send me an email <ArrowUpRight size={16} /></a><button className="button button-ghost" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy email"}</button></div></div><div className="contact-card"><div className="contact-card-top"><span className="status-dot" /> CURRENTLY OPEN TO WORK</div><div className="contact-detail"><span className="contact-detail-icon"><Mail size={18} /></span><div><small>EMAIL</small><strong>ramsivaji0@gmail.com</strong></div><button onClick={copyEmail} aria-label="Copy email">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div><a className="contact-detail contact-link" href="https://github.com/ramsivaji" target="_blank" rel="noreferrer"><span className="contact-detail-icon"><Github size={18} /></span><div><small>GITHUB</small><strong>github.com/ramsivaji</strong></div><ArrowUpRight size={16} /></a><a className="contact-detail contact-link" href="https://www.linkedin.com/in/kaisarlla-rama-sivaji-619559232/" target="_blank" rel="noreferrer"><span className="contact-detail-icon"><Globe2 size={18} /></span><div><small>LINKEDIN</small><strong>Rama Sivaji Kaisarlla</strong></div><ArrowUpRight size={16} /></a></div></div></Reveal></div></section>
      </main>
      <footer className="footer section-wrap"><a className="brand" href="#home"><span className="brand-mark">RS</span><span>rama<span className="brand-dot">.</span>dev</span></a><span>Designed & built with curiosity <span className="footer-heart">✦</span></span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
