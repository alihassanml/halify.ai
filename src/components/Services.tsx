import Reveal from './Reveal';

type Tone = 'primary' | 'violet' | 'amber';

const TONE_CLASSES: Record<Tone, string> = {
  primary: 'bg-primary-soft text-primary',
  violet: 'bg-violet-soft text-violet',
  amber: 'bg-amber-soft text-amber',
};

const SERVICES: { icon: string; title: string; description: string; tone: Tone }[] = [
  {
    icon: '🤖',
    title: 'AI Development',
    description: 'Custom AI applications, generative AI solutions, and business AI integration powered by modern LLMs.',
    tone: 'primary',
  },
  {
    icon: '🧠',
    title: 'AI Agent Development',
    description: 'Autonomous agents for customer support, research, sales, marketing, and business automation.',
    tone: 'violet',
  },
  {
    icon: '🔗',
    title: 'Multi-Agent Systems',
    description: 'Collaborative AI ecosystems where specialized agents work together on complex workflows.',
    tone: 'amber',
  },
  {
    icon: '📚',
    title: 'RAG Solutions',
    description: 'Transform company knowledge into intelligent assistants with semantic search and vector databases.',
    tone: 'primary',
  },
  {
    icon: '💬',
    title: 'AI Chatbots',
    description: 'Conversational assistants for websites, mobile apps, WhatsApp, Slack, Teams, and custom platforms.',
    tone: 'violet',
  },
  {
    icon: '💻',
    title: 'Full Stack Development',
    description: 'Modern web applications with React, Next.js, FastAPI, and scalable cloud architecture.',
    tone: 'amber',
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    description: 'iOS, Android, and cross-platform apps including progressive web apps and AI-powered mobile solutions.',
    tone: 'primary',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, and GCP deployment with Docker, Kubernetes, CI/CD, and infrastructure automation.',
    tone: 'violet',
  },
  {
    icon: '🔌',
    title: 'API Development',
    description: 'REST and GraphQL APIs with authentication, rate limiting, integrations, and payment gateways.',
    tone: 'amber',
  },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-28 max-w-container mx-auto px-6">
      <Reveal className="mb-14 max-w-2xl">
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">What we do</span>
        <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
          Services built for real product outcomes
        </h2>
        <p className="text-ink-soft text-lg">
          Comprehensive development solutions from AI to cloud infrastructure — everything a modern
          product team needs under one roof.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, i) => (
          <Reveal
            key={service.title}
            delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
            className="group p-8 rounded-2xl border border-line bg-paper hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 ${TONE_CLASSES[service.tone]}`}
            >
              {service.icon}
            </div>
            <h3 className="font-display font-semibold text-xl text-ink mb-2">{service.title}</h3>
            <p className="text-ink-soft text-[15px] leading-relaxed mb-5">{service.description}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-primary transition-colors"
            >
              Learn more
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Services;
