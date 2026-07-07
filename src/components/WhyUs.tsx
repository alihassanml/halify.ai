import Reveal from './Reveal';

const REASONS = [
  { icon: '🧠', title: 'AI Expertise', description: 'Engineers specializing in modern AI including LLMs, agents, RAG, and workflow automation.' },
  { icon: '🔄', title: 'End-to-End Delivery', description: 'From idea validation to deployment and long-term maintenance, we own every stage.' },
  { icon: '✅', title: 'Production Ready', description: 'Scalable, secure, maintainable software with monitoring and testing from day one.' },
  { icon: '⚡', title: 'Fast Delivery', description: 'Agile development and transparent communication ship quality work quickly.' },
  { icon: '💬', title: 'Transparent Communication', description: 'Regular updates, clear timelines, and direct access to the team building your product.' },
  { icon: '📈', title: 'Scalable Architecture', description: 'Built to support growth, rising traffic, and future feature expansion effortlessly.' },
  { icon: '🔒', title: 'Security First', description: 'Authentication, encryption, and cloud best practices integrated into every solution.' },
  { icon: '🤝', title: 'Long-Term Partnership', description: 'Continuous improvements, support, and optimization after launch for lasting success.' },
];

function WhyUs() {
  return (
    <section id="about" className="py-24 md:py-28 bg-paper-alt">
      <div className="max-w-container mx-auto px-6">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">Why Halify</span>
          <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
            Expertise and partnership that drive growth
          </h2>
          <p className="text-ink-soft text-lg">
            We're not just a vendor — we're a technical partner invested in your product's success.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              className="p-7 bg-paper rounded-2xl border border-line hover:border-primary/30 hover:shadow-card transition-all"
            >
              <div className="text-2xl mb-4">{reason.icon}</div>
              <h4 className="font-display font-semibold text-base text-ink mb-2">{reason.title}</h4>
              <p className="text-ink-soft text-sm leading-relaxed">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
