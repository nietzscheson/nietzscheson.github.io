/* Real content, sourced from _config.yml, _data/*.yml, _posts and the LinkedIn profile.
   Principles (§) are a first draft in Cristian's voice — edit freely. */

export const profile = {
  name: "Cristian Angulo Nova",
  handle: "nietzscheson",
  role: "Staff Software Engineer, AI/ML",
  location: "México",
  avatar: "https://github.com/nietzscheson.png",
  email: "cristian@nietzscheson.com",
  headline: ["I build AI systems", "that turn documents", "into decisions."],
  intro:
    "Staff Software Engineer on the AI/ML team at Aviva. I design agent workflows and LLM document pipelines, and the Python backends and infrastructure that keep them reliable in production.",
  social: {
    github: "https://github.com/nietzscheson",
    linkedin: "https://www.linkedin.com/in/nietzscheson/",
    x: "https://x.com/nietzscheson",
    rss: "/feed.xml",
  },
};

/* One-page site: nav items are anchors. "/#id" works from article pages too. */
export const nav = [
  { label: "About", href: "/#about" },
  { label: "Principles", href: "/#principles" },
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
];

export const bio = [
  "I build production systems across web platforms, distributed services and data-heavy applications. Today that work sits where software engineering, site reliability and AI meet: agent architectures, LLM workflows and the backends that turn unstructured data into something a business can act on.",
  "Before software, I studied Philosophy. It taught me to think from first principles and to write in order to find out what I actually think, which is why this site has a writing section and nine aphorisms instead of a skills chart.",
];

export const services = [
  {
    title: "AI and ML systems",
    description: "LLM pipelines, agents, RAG and LangGraph, built to run in production rather than in a notebook.",
  },
  {
    title: "Backend engineering",
    description: "Python and FastAPI services and distributed systems with clear contracts.",
  },
  {
    title: "Cloud and infrastructure",
    description: "AWS, Docker, Terraform, Nix and CI/CD, with environments you can reproduce.",
  },
  {
    title: "Site reliability",
    description: "Observability, incident response and the automation that removes toil.",
  },
];

export const principles = [
  {
    title: "Pose the question before choosing the tool.",
    gloss: "Philosophy taught me that most bad answers come from badly posed questions. I name the problem in one sentence first.",
  },
  {
    title: "Unstructured in, structured out.",
    gloss: "My best work turns messy documents into data a system can act on. Intelligence is the part that holds a shape.",
  },
  {
    title: "If it only works on my machine, it does not work.",
    gloss: "Nix, containers and pinned versions. The environment is part of the code.",
  },
  {
    title: "Production is the only benchmark.",
    gloss: "A model that impresses in a demo and fails under load is still a demo.",
  },
  {
    title: "Observe before you optimize.",
    gloss: "Logs, traces and metrics first. Opinions second.",
  },
  {
    title: "An agent is a distributed system with imagination.",
    gloss: "Give it the same discipline: timeouts, evaluations, budgets and a way to roll back.",
  },
  {
    title: "Boring infrastructure, interesting products.",
    gloss: "Spend novelty where people feel it.",
  },
  {
    title: "Writing is how I find out what I think.",
    gloss: "A design document is cheaper than a rewrite.",
  },
  {
    title: "Leave teams faster than you found them.",
    gloss: "Leadership shows up as fewer handoffs and clearer decisions, not more meetings.",
  },
];

export const companies = ["Aviva", "Globant", "Crehana", "Konfio", "TrueHome"];

export const experience = [
  {
    title: "Staff Systems & Software Engineer, AI/ML",
    company: "Aviva",
    period: "Aug 2025 – Present",
    description:
      "Building AI and ML systems: agent-based workflows, LLM fine-tuning and MLOps pipelines that move AI applications into production reliably.",
    featured: true,
  },
  {
    title: "Senior Software Engineer, Python & SRE",
    company: "Globant",
    period: "Jul 2023 – Aug 2025",
    description:
      "Designed FastAPI services and operated distributed applications in production across backend engineering and site reliability.",
    featured: true,
  },
  {
    title: "Technical Lead",
    company: "Crehana",
    period: "Jul 2022 – Dec 2022",
    description: "Led engineering execution across backend and platform initiatives with clearer technical direction.",
    featured: true,
  },
  {
    title: "Senior Software Engineer",
    company: "Crehana",
    period: "Dec 2021 – Jun 2022",
    description: "Built backend services with Python and Flask, contributing to architecture and delivery.",
    featured: false,
  },
  {
    title: "Senior Software Engineer",
    company: "Konfio",
    period: "Nov 2020 – Dec 2021",
    description: "Built backend services and applications with PHP and Vue.js.",
    featured: false,
  },
  {
    title: "Software Engineer",
    company: "TrueHome",
    period: "Jan 2020 – Dec 2020",
    description: "Built automation and cloud applications on AWS across multiple projects.",
    featured: false,
  },
];

export type Project = {
  name: string;
  audience: string;
  url: string;
  description: string;
  stack?: string[];
  kind: "product";
};

export const projects: Project[] = [
  {
    name: "Rento",
    audience: "For landlords and property managers in Latin America",
    url: "https://rento.la",
    description:
      "Tenant validation that reads financial statements and documents with LLMs and returns a rental risk assessment.",
    stack: ["LLMs", "Document AI", "Python"],
    kind: "product",
  },
  {
    name: "Structy",
    audience: "For teams drowning in PDFs",
    url: "https://structry.com",
    description: "Converts PDFs and documents into structured JSON through LLM and retrieval pipelines.",
    stack: ["RAG", "LangGraph", "AWS", "ADK"],
    kind: "product",
  },
];

export const posts = [
  {
    title: "Why I Love Using Nix for All My Projects",
    date: "2026-01-10",
    description:
      "Stop wasting time configuring environments. Nix Flakes and uv automate the workflow, from Python to Terraform.",
    href: "/why-i-love-using-nix-for-all-my-projects/",
    image: "/images/posts/nix.jpeg",
    readingTime: "4 min read",
  },
  {
    title: "Microservices Federation (GraphQL, Python and Apollo)",
    date: "2022-04-20",
    description: "Exposing one unified GraphQL API over Python microservices with Apollo Federation, without coupling the services together.",
    href: "/microservices-federation/",
    image: "/images/posts/microservices-federation.png",
    readingTime: "7 min read",
  },
];
