import Reveal from './Reveal';

const CASE_STUDIES = [
  {
    tag: 'AI Agents',
    gradient: 'from-primary to-violet',
    title: 'Support automation for a SaaS platform',
    description: 'Deployed a multi-agent support system that resolves tier-1 tickets automatically.',
    metric: '65% fewer tickets escalated',
  },
  {
    tag: 'RAG Platform',
    gradient: 'from-violet to-amber',
    title: 'Knowledge assistant for a HealthTech company',
    description: 'Built a HIPAA-aware RAG assistant surfacing clinical documentation in seconds.',
    metric: '3x faster information retrieval',
  },
  {
    tag: 'Full Stack',
    gradient: 'from-amber to-primary',
    title: 'Operations dashboard & workflow automation',
    description: 'Replaced spreadsheet workflows with a real-time operations platform.',
    metric: '60% less manual work',
  },
];

function CaseStudies() {
  return (
    <section id="work" className="py-24 md:py-28 bg-paper-alt">
      <div className="max-w-container mx-auto px-6">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">Selected work</span>
          <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
            Products we've helped build
          </h2>
          <p className="text-ink-soft text-lg">
            A snapshot of the outcomes our engineering partnerships have delivered.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((project, i) => (
            <Reveal
              key={project.title}
              delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              className="group rounded-2xl border border-line bg-paper overflow-hidden hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 grid-backdrop opacity-30" />
              </div>
              <div className="p-7">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  {project.tag}
                </span>
                <h3 className="font-display font-semibold text-lg text-ink mt-2 mb-2">
                  {project.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-success">{project.metric}</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-primary transition-colors"
                  >
                    View case study
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
