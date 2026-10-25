import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Braces,
  BriefcaseBusiness,
  Building2,
  ChartLine,
  Cloud,
  CodeXml,
  Database,
  FileSpreadsheet,
  GraduationCap,
  LaptopMinimal,
  LayoutGrid,
  Mail,
  MapPin,
  ShieldCheck,
  University,
  Wrench,
} from "lucide-react";

const projects = [
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
  },
];

const experience = [
  {
    dates: "Jun 2026 — Aug 2026",
    role: "Annual Fund & Database Specialist Intern",
    organization: "The Salvation Army – Southern New England Division | Hartford, CT",
    details: [
      "Managed divisional donor data integrity across Salesforce and Raiser's Edge gift entry, reconciliation, reporting, and maintaining audit-ready records for the Advancement team.",
      "Partnered with IT to connect Salesforce and Raiser's Edge data into Power BI and Excel reporting workflows, giving leadership up-to-date visibility into donor giving and improving reconciliation efficiency.",
    ],
  },
  {
    dates: "Apr 2025 — May 2026",
    role: "Research Assistant – Office of Institutional Research & Strategy",
    organization: "Quinnipiac University | Hamden, CT",
    details: [
      "Standardized compliance documentation and supported federal regulatory submissions (Integrated Postsecondary Education Data System (IPEDS), National Student Loan Data System (NSLDS), and Financial Value Transparency Reporting) by generating and auditing reporting extracts via Informer.",
      "Consolidated enrollment, academic records, and financial aid data across Ellucian Colleague for 9,200+ students, structuring validated datasets to power institutional dashboards and official reporting.",
    ],
  },
  {
    dates: "Jan 2023 — Dec 2024",
    role: "Client Solutions Specialist",
    organization: "Zimbabwe Insurance Brokers | Harare, Zimbabwe",
    details: [
      "Analyzed client risk profiles, exposure data, and claims histories in Excel and evaluated market options to support coverage structuring, pricing, and insurer/reinsurer negotiations.",
      "Leveraged Salesforce and HubSpot CRM data to identify prospects and track business development, building pipeline dashboards and KPI reporting on conversion rates and revenue forecasts.",
    ],
  },
  {
    dates: "Nov 2020 — Dec 2022",
    role: "Claims Analyst",
    organization: "First Mutual Holdings | Harare, Zimbabwe",
    details: [
      "Analyzed claims data and loss drivers across auto, liability, and property portfolios to identify subrogation opportunities and support settlement and reserve decisions.",
      "Reported on claims cycle time, loss ratios, reserve adequacy, and adjuster performance using Power BI dashboards and SAP/Excel data, partnering with Underwriting, Legal, and Finance on risk and claims-handling strategy.",
    ],
  },
];

const technicalSkills = [
  { label: "Data Analysis & Manipulation", icon: CodeXml },
  { label: "Database Management", icon: Database },
  { label: "Data Visualization", icon: ChartLine },
  { label: "Machine Learning", icon: Bot },
  { label: "Cloud Computing", icon: Cloud },
];

const tools = [
  { label: "CRM & Enterprise Platforms", value: "Salesforce, HubSpot", icon: Building2 },
  { label: "Higher Ed Systems", value: "Ellucian Colleague (SIS), Informer (Reporting)", icon: University },
  { label: "Donor Database Systems", value: "Raiser's Edge", icon: Database },
  { label: "Power BI", icon: LayoutGrid },
  { label: "Excel", icon: FileSpreadsheet },
  { label: "SQL", icon: Database },
  { label: "Python", icon: Braces },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Ryan Makamba home">RM</a>
        <nav aria-label="Primary navigation">
          <a href="#work">View My Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-contact" href="mailto:ryanmakamba@gmail.com">
          Let’s connect <ArrowUpRight />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> New Haven, Connecticut</p>
          <h1>Ryan<br />Makamba</h1>
          <p className="specialization">Data Analytics <i /> Risk &amp; Insurance <i /> Business Operations</p>
          <p className="intro">
            A Data Analyst dedicated to developing business intelligence solutions that leverage best practice technologies to deliver data-driven insights. With over 4+ years of experience in data analytics and reporting, statistical analysis and business intelligence across insurance, higher education, and nonprofit operations.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">View My Work <ArrowDownRight /></a>
            <a className="text-link resume-link" href="/Ryan-Makamba-Resume.pdf" target="_blank" rel="noreferrer">
              Resume <ArrowUpRight />
            </a>
          </div>
        </div>
        <aside className="hero-note">
          <span>Current focus</span>
          <strong>Applied AI &amp;<br />Business Analytics</strong>
          <p>Building practical systems for risk, reporting and operational intelligence.</p>
        </aside>
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
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a href={project.href} target="_blank" rel="noreferrer">Open live project <ArrowUpRight /></a>
              </div>
              {project.image ? (
                <a className="project-visual" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                  <span className="preview-canvas">
                    <img src={project.image} alt={`${project.title} interface preview`} />
                  </span>
                </a>
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

      <section className="experience section" id="experience">
        <div className="section-heading compact">
          <p className="eyebrow">Experience</p>
          <h2>Analytics grounded<br />in operations.</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.role}>
              <time>{item.dates}</time>
              <div>
                <h3>{item.role}</h3>
                <h4>{item.organization}</h4>
                <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h2>Risk knowledge.<br />Analytical discipline.<br />Operational perspective.</h2>
          <p>
            My background spans insurance underwriting and claims, institutional research, regulatory reporting and nonprofit data operations. That range helps me see both the numbers and the decisions behind them.
          </p>
          <div className="contact-row">
            <a href="mailto:ryanmakamba@gmail.com"><Mail /> Email</a>
            <a href="https://www.linkedin.com/in/ryan-makamba/" target="_blank" rel="noreferrer"><ArrowUpRight /> LinkedIn</a>
          </div>
        </div>
        <div className="credentials">
          <div className="credential"><GraduationCap /><span><b>MS Applied AI &amp; Business Analytics</b><small>Quinnipiac University · Expected Dec 2026</small></span></div>
          <div className="credential"><BriefcaseBusiness /><span><b>BSc Risk Management &amp; Insurance</b><small>National University of Science and Technology · 2022</small></span></div>
          <div className="skills-grid" aria-label="Skills and tools">
            <article className="skills-card technical-card">
              <h3><LaptopMinimal /> Technical Skills</h3>
              <ul>
                {technicalSkills.map(({ label, icon: Icon }) => (
                  <li key={label}><Icon /><span>{label}</span></li>
                ))}
              </ul>
            </article>
            <article className="skills-card tools-card">
              <h3><Wrench /> Tools</h3>
              <ul>
                {tools.map(({ label, value, icon: Icon }) => (
                  <li key={label}>
                    <Icon />
                    <span>{value ? <>{label}: {value}</> : label}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
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
