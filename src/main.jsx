import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useSpring, MotionConfig } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Braces, CarFront, Check, Code2,
  Copy, Database, Github, Globe2, Layers3, Linkedin, Mail, Menu, Moon,
  Server, Sun, X
} from "lucide-react";
import "./styles.css";

const projects = [
  {
    number: "01", cover: "CarePoint", title: "Hospital Appointment & Patient Management", type: "BACKEND / REST API",
    description: "A backend system for managing patients, doctors, appointments, and medical records, with authentication, role-based access, validation, search, filtering, pagination, and PostgreSQL integration.",
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL"], icon: Server,
    link: "https://sivajicarepoint.netlify.app/", linkLabel: "Open live app", accent: "violet"
  },
  {
    number: "02", cover: "PDF Maker", title: "PDF Maker", type: "WEB APP / DOCUMENT TOOLS",
    description: "A browser-based PDF conversion tool with a frontend and Python backend, organized into separate application components.",
    tags: ["Python", "FastAPI", "HTML", "CSS"], icon: Layers3,
    link: "https://pdf-maker-chi.vercel.app/", linkLabel: "Open live app", accent: "blue"
  },
  {
    number: "03", cover: "Road Vision", title: "Automated Road Damage Detection", type: "AI / COMPUTER VISION",
    description: "An AI project that detects potholes and road cracks in drone imagery using YOLOv8 trained on the RDD2022 dataset to support more efficient road inspections.",
    tags: ["Python", "YOLOv8"], icon: BrainCircuit,
    link: null, linkLabel: "Project from resume", accent: "orange"
  },
  {
    number: "04", cover: "Discover South India", title: "AP & Telangana Tourism", type: "WEB / TOURISM",
    description: "A React-based tourism website for exploring popular destinations across Andhra Pradesh and Telangana, with state selection, destination information, and a responsive interface.",
    tags: ["React", "Vite", "TypeScript"], icon: Globe2,
    link: "https://ramsivaji.github.io/discover-south-india/index.html", linkLabel: "Open live site", accent: "blue"
  },
  {
    number: "05", cover: "Student Records", title: "Student Management System", type: "DATABASE / CRUD APP",
    description: "A desktop CRUD application to insert, update, delete, and view student records through a Tkinter interface connected to a MySQL database.",
    tags: ["Python", "Tkinter", "MySQL"], icon: Database,
    link: "https://github.com/ramsivaji/student-mangement-system-using-pdbc-and-mysql-database.", linkLabel: "View on GitHub", accent: "violet"
  },
  {
    number: "06", cover: "ESP32-CAM", title: "ESP32-CAM Car", type: "EMBEDDED / IOT",
    description: "An ESP32-CAM car project concept combining a camera-enabled vehicle with Wi-Fi-based control and a pan–tilt servo setup to adjust the camera’s viewing direction.",
    tags: ["ESP32-CAM", "Embedded Systems", "Wi-Fi", "Servo Motors"], icon: CarFront,
    link: null, linkLabel: "Personal project", accent: "orange"
  }
];

const skills = [
  { title: "Programming Languages", logos: [{ name: "Python", file: "python" }, { name: "SQL", symbol: "database" }] },
  { title: "Backend Frameworks", logos: [{ name: "Django", file: "django" }, { name: "Django REST", symbol: "api" }, { name: "Flask", file: "flask" }] },
  { title: "Databases", logos: [{ name: "MySQL", file: "mysql" }, { name: "PostgreSQL", file: "postgresql" }] },
  { title: "Python Libraries", logos: [{ name: "Pandas", file: "pandas" }, { name: "NumPy", file: "numpy" }] },
  { title: "Tools & IDEs", logos: [{ name: "Git", file: "git" }, { name: "GitHub", file: "github" }, { name: "VS Code", file: "vscode" }, { name: "Jupyter", file: "jupyter" }] }
];

function Reveal({ children, delay = 0, className = "" }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function StackGraphic() {
  return (
    <figure className="stack-graphic" aria-label="Backend stack illustration showing Python, Django, and PostgreSQL">
      <div className="stack-stage" aria-hidden="true">
        <div className="stack-shadow" />
        {["storage", "framework", "language"].map((layer) => (
          <div key={layer} className={`stack-layer ${layer}`}>
            <div className="stack-plane">{layer === "language" && <Code2 strokeWidth={1.35} />}</div>
          </div>
        ))}
        <span className="stack-label label-language">Python</span>
        <span className="stack-label label-framework">Django</span>
        <span className="stack-label label-storage">PostgreSQL</span>
      </div>
    </figure>
  );
}

function ProjectCover({ project }) {
  const Icon = project.icon;
  return (
    <div className={`project-cover cover-${project.number}`} aria-hidden="true">
      <div className="cover-mark"><Icon strokeWidth={1.3} /></div>
      <div className="cover-title">{project.cover}</div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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

  const navLinks = [["Projects", "#projects"], ["About", "#about"], ["Skills", "#skills"], ["Contact", "#contact"]];

  return (
    <div className={light ? "app light" : "app"}>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <a className="skip-link" href="#projects">Skip to projects</a>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Rama Sivaji home"><span className="brand-mark">RS</span><span>Rama Sivaji</span></a>
        <nav aria-label="Main navigation" className={menuOpen ? "nav-links open" : "nav-links"}>
          {navLinks.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-button theme-toggle" onClick={() => setLight(!light)} aria-label="Toggle theme">{light ? <Moon size={17} /> : <Sun size={17} />}</button>
          <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15} /></a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div className="availability" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}><span className="status-dot" /> Open to my first full-time role <span className="availability-line" /></motion.div>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7 }}>
              Rama <em>Sivaji.</em>
            </motion.h1>

            <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>
              I’m a <strong>computer science graduate</strong> focused on Python backend development. I build REST APIs, database-backed applications, and computer vision projects.
            </motion.p>
            <motion.div className="hero-buttons" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }}>
              <a className="button button-primary" href="#projects">View projects</a>
              <a className="button button-ghost" href="#contact"><Mail size={16} /> Get in touch</a>
            </motion.div>
          </div>
          <StackGraphic />
        </section>
        <div className="stack-strip section-wrap" aria-label="Core technologies">
          {["Python", "Django", "PostgreSQL", "Flask", "Git"].map(name => (
            <span key={name}><img alt="" src={`${import.meta.env.BASE_URL}tech-logos/${name.toLowerCase()}.svg`} />{name}</span>
          ))}
        </div>


        <section className="section-wrap projects-section" id="projects">
          <div className="section-heading-row">
            <h2>Selected work<span>.</span></h2>
            <a className="text-link" href="https://github.com/ramsivaji" target="_blank" rel="noreferrer"><Github size={17} /> GitHub profile</a>
          </div>
          <div className="filters" aria-label="Project categories">
            {categories.map(category => (
              <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>
                {filter === category && <motion.span aria-hidden="true" className="filter-pill" layoutId="selected-category" transition={{ type: "spring", stiffness: 430, damping: 36 }} />}
                {category}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {visibleProjects.map((project, i) => (
              <Reveal key={project.number} delay={Math.min(i, 2) * .06} className="project-card">
                <ProjectCover project={project} />
                <div className="project-content">
                  <small>{project.type}</small>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  {project.link && <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={16} /></a>}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-wrap about-section" id="about">
          <Reveal><div className="section-kicker"><span>ABOUT ME</span><span className="kicker-line" /></div></Reveal>
          <div className="about-grid">
            <Reveal className="about-heading"><h2>Curious mind.<br /><span className="muted-heading">Practical builder.</span></h2></Reveal>
            <Reveal delay={.12} className="about-body"><p>I’m Kaisarlla Rama Sivaji, a B.Tech Computer Science (AI & ML) graduate and Python Backend Developer. My focus is building RESTful APIs, database-backed applications, and useful software with Django and Python.</p><p>My projects include a hospital appointment and patient management API, a PDF conversion web app, and an image-based road damage detection system. I value clear code, reliable data handling, and practical solutions.</p><a href="#contact" className="text-link">Get in touch <ArrowRight size={16} /></a></Reveal>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <Reveal><div className="section-kicker"><span>TOOLKIT</span><span className="kicker-line" /></div><div className="section-heading-row"><h2>Tools of the trade<span className="gradient-text">.</span></h2><p>Languages, frameworks, and tools I use in my projects.</p></div></Reveal>
          <div className="skills-grid">{skills.map((skill, i) => <Reveal key={skill.title} delay={i * .06} className="skill-card"><div className="skill-card-heading"><h3>{skill.title}</h3></div><div className="skill-logo-row">{skill.logos.map((logo) => <div className="skill-logo-item" key={logo.name} title={logo.name}><div className={`tech-logo tech-logo-${logo.name.toLowerCase().replaceAll(" ", "-")}`} role="img" aria-label={`${logo.name} logo`}>{logo.file ? <img src={`${import.meta.env.BASE_URL}tech-logos/${logo.file}.svg`} alt="" /> : logo.symbol === "database" ? <Database size={25} strokeWidth={2.1} /> : <Braces size={25} strokeWidth={2.1} />}</div><span className="tech-logo-name">{logo.name}</span></div>)}</div></Reveal>)}</div>
        </section>

        <section className="section-wrap experience-section">
          <Reveal><div className="section-heading-row"><h2>Internship & education<span className="gradient-text">.</span></h2></div></Reveal>
          <div className="timeline">
            <Reveal className="timeline-item">
              <div className="timeline-marker"><span /></div>
              <div className="timeline-date">16 FEB 2026 — 15 MAR 2026</div>
              <div className="timeline-main">
                <div>
                  <h3>Data Analyst</h3>
                  <p className="timeline-org">Concentrix &nbsp;·&nbsp; <span className="timeline-client">Apple AI</span> &nbsp;·&nbsp; Hyderabad</p>
                </div>
                <span className="timeline-pill">INTERNSHIP</span>
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

        <section className="contact-section" id="contact"><div className="section-wrap contact-wrap"><Reveal><div className="section-kicker"><span>CONTACT</span><span className="kicker-line" /></div><div className="contact-grid"><div><h2>Have an idea?<br /><span className="gradient-text">Let's make it real.</span></h2><p>I’m looking for my first full-time Python backend role. Get in touch to discuss an opening or one of my projects.</p><div className="contact-buttons"><a className="button button-primary" href="mailto:ramsivaji0@gmail.com">Send me an email <ArrowUpRight size={16} /></a><button className="button button-ghost" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy email"}</button></div></div><div className="contact-card"><div className="contact-card-top"><span className="status-dot" /> CURRENTLY OPEN TO WORK</div><div className="contact-detail"><span className="contact-detail-icon"><Mail size={18} /></span><div><small>EMAIL</small><strong>ramsivaji0@gmail.com</strong></div><button onClick={copyEmail} aria-label="Copy email">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div><a className="contact-detail contact-link" href="https://github.com/ramsivaji" target="_blank" rel="noreferrer"><span className="contact-detail-icon"><Github size={18} /></span><div><small>GITHUB</small><strong>github.com/ramsivaji</strong></div><ArrowUpRight size={16} /></a><a className="contact-detail contact-link" href="https://www.linkedin.com/in/rama-sivaji-kaisarlla/" target="_blank" rel="noreferrer"><span className="contact-detail-icon"><Linkedin size={18} /></span><div><small>LINKEDIN</small><strong>Rama Sivaji Kaisarlla</strong></div><ArrowUpRight size={16} /></a></div></div></Reveal></div></section>
      </main>
      <footer className="footer section-wrap"><a className="brand" href="#home"><span className="brand-mark">RS</span><span>Rama Sivaji</span></a><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>);
