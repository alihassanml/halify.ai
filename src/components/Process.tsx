import Reveal from './Reveal';
import TiltCard from './TiltCard';

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
    <section id="process" className="relative py-24 md:py-28 max-w-container mx-auto px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-10 left-[-10%] w-80 h-80 rounded-full bg-gradient-to-br from-primary-soft to-violet-soft blur-3xl opacity-60 pointer-events-none"
      />

      <Reveal className="relative text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">How we work</span>
        <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
          Our development process
        </h2>
        <p className="text-ink-soft text-lg">
          From discovery to long-term support, we guide you through every step.
        </p>
      </Reveal>

      <div className="process-grid relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {STEPS.map((step, i) => (
          <Reveal key={step.num} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}>
            <TiltCard className="process-card h-full">
              <div className="process-orb">{step.num}</div>
              <div className="process-card-body">
                <h4 className="font-display font-semibold text-lg text-ink mb-2">{step.title}</h4>
                <p className="text-ink-soft text-sm leading-relaxed">{step.description}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Process;
