import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
  image?: string;
  details?: string[];
  visual?: "evidence" | "thesis";
};

const projects: Project[] = [
  {
    number: "01",
    title: "Aegis Underwriting Command Center",
    category: "Insurance Analytics",
    description:
      "A multi-line P&C platform that automates risk scoring, pricing and expected-loss analysis while connecting underwriting decisions to portfolio performance.",
    tags: ["Risk Scoring", "Pricing Analytics", "P&C Insurance"],
    href: "https://aegis-underwriting-command-center.vercel.app",
    image: "/aegis-underwriting-cover.png",
  },
  {
    number: "02",
    title: "Aegis Claims Intelligence Center",
    category: "Claims Operations",
    description:
      "An operational claims workspace for monitoring severity, reserve adequacy, aging pressure, fraud indicators and leakage exposure across personal and commercial lines.",
    tags: ["Claims Analytics", "Fraud Indicators", "Reserve Monitoring"],
    href: "https://aegis-claims-intelligence-center-ge9zymxtq-aegis-da54.vercel.app/",
    image: "/aegis-claims-cover.png",
  },
  {
    number: "03",
    title: "Aegis Evidence Studio",
    category: "Governance & Compliance",
    description:
      "An audit-ready evidence platform connecting underwriting decisions, rule versions, cloud controls and policy-as-code mappings across major regulatory frameworks.",
    tags: ["NIST", "ISO 27001", "SOC 2", "SOX", "HIPAA", "GDPR", "COBIT"],
    href: "https://aegis-evidence-studio-tppi.vercel.app",
    visual: "evidence",
  },
  {
    number: "04",
    title: "Balancing Predictive Performance and Explainability in Insurance Underwriting",
    category: "Master’s Thesis",
    description:
      "Research examining how underwriting models can improve predictive performance while remaining transparent, fair and suitable for defensible insurance decisions.",
    details: [
      "Comparing traditional statistical and machine-learning underwriting models across predictive performance, calibration, fairness and interpretability.",
      "Using Python, Scikit-learn and XGBoost to develop and compare models, MLflow to track experiments and model versions, and SHAP to assess risk drivers, transparency and fairness.",
    ],
    tags: ["Python", "Scikit-learn", "XGBoost", "MLflow", "SHAP"],
    visual: "thesis",
  },
];

const experience = [
  {
    dates: "Jun 2026 — Aug 2026",
    role: "Fundraising Data & Reporting Analyst Intern",
    organization: "The Salvation Army – Southern New England Division",
    location: "Hartford, CT",
    logo: "/experience/salvation-army-logo.webp",
    logoAlt: "The Salvation Army logo",
    logoClass: "salvation-logo",
  },
  {
    dates: "Apr 2025 — May 2026",
    role: "Research Assistant – Office of Institutional Research & Assessment",
    organization: "Quinnipiac University",
    location: "Hamden, CT",
    logo: "/education/quinnipiac-logo.png",
    logoAlt: "Quinnipiac University logo",
    logoClass: "quinnipiac-logo",
  },
  {
    dates: "Jan 2023 — Dec 2024",
    role: "Client Solutions Specialist",
    organization: "Zimbabwe Insurance Brokers",
    location: "Harare, Zimbabwe",
    logo: "/experience/zib-logo.webp",
    logoAlt: "ZIB logo",
    logoClass: "zib-logo",
  },
  {
    dates: "Nov 2020 — Dec 2022",
    role: "Claims Analyst",
    organization: "First Mutual Holdings",
    location: "Harare, Zimbabwe",
    logo: "https://ihararejobs.com/media/logo/logo_first-mutual-holdings-limited_D.png",
    logoAlt: "First Mutual Holdings logo",
    logoClass: "first-mutual-logo",
  },
];

const featuredTools = [
  { label: "Power BI", detail: "Dashboards & DAX", logo: "/logos/powerbi.svg" },
  { label: "Excel", detail: "Analysis & Modeling", logo: "/logos/microsoftexcel.svg" },
  { label: "SQL", detail: "Data Querying", logo: "/logos/postgresql.svg" },
  { label: "Python", detail: "Analytics & ML", logo: "/logos/python.svg" },
  { label: "Salesforce", detail: "CRM & Pipeline", logo: "/logos/salesforce.svg" },
  { label: "HubSpot", detail: "CRM & Growth", logo: "/logos/hubspot.svg" },
  { label: "ChatGPT", detail: "Research & Analysis", logo: "/logos/openai.svg" },
  { label: "Claude", detail: "", logo: "/logos/claude.svg" },
  { label: "Canva", detail: "Visual Communication", logo: "/logos/canva.svg" },
  { label: "Zoho Desk", detail: "Customer Support", logo: "/logos/zoho.svg" },
  { label: "GitHub", detail: "Version Control", logo: "/logos/github.svg" },
  { label: "Microsoft Teams", detail: "Collaboration", logo: "/logos/microsoftteams.svg" },
  { label: "Figma", detail: "Interface Design", logo: "/logos/figma.svg" },
  { label: "Slack", detail: "Team Communication", logo: "/logos/slack.svg" },
  { label: "MLflow", detail: "Model Tracking", logo: "/logos/mlflow.svg" },
  { label: "Scikit-learn", detail: "Machine Learning", logo: "/logos/scikitlearn.svg" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Ryan Makamba home">RM</a>
        <nav aria-label="Primary navigation">
          <a href="#top">Home</a>
          <a href="#work">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#toolkit">Tools</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-contact" href="/Ryan-Makamba-Resume.pdf" target="_blank" rel="noreferrer">
          Resume <ArrowUpRight />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Hi, I’m<br />Ryan</h1>
          <p className="specialization">Data Analytics <i /> Risk &amp; Insurance <i /> Business Operations</p>
          <p className="intro">
            Risk and insurance analytics professional with 4+ years of experience across underwriting, claims, and data-driven operations. Skilled in analyzing complex risk and exposure data to support pricing, coverage, and portfolio decisions, with applied AI and machine learning experience in insurance underwriting contexts.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">View My Work <ArrowDownRight /></a>
            <a className="text-link resume-link" href="/Ryan-Makamba-Resume.pdf" target="_blank" rel="noreferrer">
              Resume <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="hero-cta about-cta" id="contact">
          <p className="eyebrow">Let’s Connect</p>
          <h3>Open to opportunities where analytics, risk and operations meet.</h3>
          <div className="contact-row">
            <a href="mailto:ryanmakamba@gmail.com"><Mail /> Email me</a>
            <a href="https://www.linkedin.com/in/ryan-makamba/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
            <a href="/Ryan-Makamba-Resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="section-heading compact about-heading">
          <p className="eyebrow">About Me</p>
        </div>

        <div className="about-story" aria-label="My professional story">
          <article>
            <span>01</span>
            <div>
              <h3>How it started</h3>
              <p>My career began in Zimbabwe’s insurance sector, working across claims, client risk, coverage, pricing and insurer negotiations. It taught me early that analysis is only valuable when it improves a real business decision.</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>The perspective expanded</h3>
              <p>Institutional research at Quinnipiac and fundraising data work with The Salvation Army widened that view. I learned how reliable data, careful reconciliation and clear reporting support decisions across very different organizations.</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Right now</h3>
              <p>I’m completing graduate study in Applied AI and Business Analytics while building practical systems around underwriting, claims intelligence, model explainability and data governance.</p>
            </div>
          </article>
        </div>

        <div className="about-rule">
          <p className="eyebrow">The Principle I Work By</p>
          <blockquote>“If the insight cannot guide a decision, the analysis is not finished.”</blockquote>
          <p>That principle shapes how I approach dashboards, models and reporting workflows: start with the decision, make the evidence clear and leave the next action easier to take.</p>
        </div>

      </section>

      <section className="experience section" id="experience">
        <div className="section-heading compact">
          <p className="eyebrow">Experience</p>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.role}>
              <div className={`experience-logo ${item.logoClass}`}>
                <img src={item.logo} alt={item.logoAlt} />
              </div>
              <div className="experience-role">
                <h3>{item.role}</h3>
                <h4>{item.organization}<span>{item.location}</span></h4>
              </div>
              <time>{item.dates}</time>
            </article>
          ))}
        </div>
      </section>

      <section className="education-section section" aria-label="Education and contact">
        <div className="about-close">
          <div className="education-stack" id="education">
            <p className="eyebrow">Education</p>
            <div className="credential">
              <a className="credential-logo-wrap qu-logo" href="https://www.qu.edu/" target="_blank" rel="noreferrer" aria-label="Visit Quinnipiac University">
                <img src="/education/quinnipiac-logo.png" alt="Quinnipiac University logo" />
              </a>
              <span><b>MS Applied AI &amp; Business Analytics</b><small>Quinnipiac University · Expected Dec 2026</small></span>
            </div>
            <div className="credential">
              <a className="credential-logo-wrap nust-logo" href="https://www.nust.ac.zw/" target="_blank" rel="noreferrer" aria-label="Visit National University of Science and Technology">
                <img src="/education/nust-wordmark.svg" alt="NUST — Think in other Terms" />
              </a>
              <span><b>BSc Risk Management &amp; Insurance</b><small>National University of Science and Technology · 2022</small></span>
            </div>
          </div>

        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Featured Projects</p>
          <h2>Systems built around<br />real business decisions.</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.title}>
              <div className="project-index">{project.number}</div>
              <div className="project-body">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.details ? (
                  <ul className="project-points">
                    {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                ) : null}
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">Open live project <ArrowUpRight /></a>
                ) : (
                  <span className="research-status">Graduate research · In progress</span>
                )}
              </div>
              {project.image && project.href ? (
                <a className="project-visual" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                  <span className="preview-canvas">
                    <img src={project.image} alt={`${project.title} interface preview`} />
                  </span>
                </a>
              ) : project.visual === "thesis" ? (
                <div className="project-visual thesis-visual" aria-hidden="true">
                  <Bot />
                  <span>PREDICTIVE<br />MODELING</span>
                  <small>Performance · Fairness · Explainability</small>
                </div>
              ) : (
                <div className="project-visual evidence-visual" aria-hidden="true">
                  <ShieldCheck />
                  <span>CONTROL<br />EVIDENCE</span>
                  <small>Traceable · Governed · Audit-ready</small>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>


      <section className="toolkit section" id="toolkit" aria-labelledby="toolkit-title">
        <div className="toolkit-label">
          <p className="eyebrow" id="toolkit-title">Tools I Work With</p>
        </div>
        <div className="tool-marquees" aria-label="Analytics and business technology">
          {[featuredTools.slice(0, 8), featuredTools.slice(8)].map((row, rowIndex) => (
            <div className={`tool-marquee ${rowIndex === 1 ? "reverse" : ""}`} key={rowIndex}>
              <div className="tool-track">
                {[...row, ...row].map(({ label, logo }, index) => (
                  <article className="tool-chip" key={`${label}-${index}`} aria-hidden={index >= row.length}>
                    <span className="tool-icon"><img src={logo} alt="" /></span>
                    <span><b>{label}</b></span>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div><span className="footer-mark">RM</span><p>Ryan Makamba<br /><small>Data Analytics | Risk &amp; Insurance | Business Operations</small></p></div>
        <p><MapPin /> New Haven, CT</p>
        <p>© 2026 Ryan Makamba. All rights reserved.</p>
      </footer>
    </main>
  );
}
