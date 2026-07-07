import Reveal from './Reveal';

const STEPS = [
  { num: '01', title: 'Discovery', description: 'Understand your business goals, users, competitors, and technical requirements.' },
  { num: '02', title: 'Strategy', description: 'Plan architecture, timelines, milestones, and technology choices.' },
  { num: '03', title: 'Design', description: 'Create intuitive interfaces and seamless user experiences.' },
  { num: '04', title: 'Development', description: 'Build scalable, maintainable, production-ready software.' },
  { num: '05', title: 'Testing', description: 'Quality assurance, security testing, and performance optimization.' },
  { num: '06', title: 'Deployment', description: 'Launch securely with monitoring, backups, and cloud infrastructure.' },
  { num: '07', title: 'Support', description: 'Ongoing maintenance, feature enhancements, and technical support.' },
];

function Process() {
  return (
    <section id="process" className="py-24 md:py-28 max-w-container mx-auto px-6">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">How we work</span>
        <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
          Our development process
        </h2>
        <p className="text-ink-soft text-lg">
          From discovery to long-term support, we guide you through every step.
        </p>
      </Reveal>

      <div className="relative">
        <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-line" aria-hidden="true" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="relative">
              <div className="relative z-10 w-12 h-12 rounded-full bg-ink text-white font-display font-bold flex items-center justify-center mb-5">
                {step.num}
              </div>
              <h4 className="font-display font-semibold text-lg text-ink mb-2">{step.title}</h4>
              <p className="text-ink-soft text-sm leading-relaxed">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
