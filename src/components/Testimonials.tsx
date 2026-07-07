import Reveal from './Reveal';

const TESTIMONIALS = [
  {
    quote: 'Halify exceeded every expectation. They delivered a production-ready AI platform that significantly improved our customer support efficiency while maintaining exceptional communication throughout.',
    name: 'Sarah Thompson',
    role: 'CEO, SaaS Startup',
    initials: 'ST',
  },
  {
    quote: 'The quality of engineering, attention to detail, and technical expertise were outstanding. The team delivered on time and helped us launch successfully.',
    name: 'Michael Rodriguez',
    role: 'Founder, HealthTech Company',
    initials: 'MR',
  },
  {
    quote: 'Our automation platform reduced manual work by over sixty percent within the first month. Halify became more than a development partner — they became part of our growth journey.',
    name: 'David Lee',
    role: 'Operations Director',
    initials: 'DL',
  },
  {
    quote: 'The project management, architecture decisions, and software quality were excellent. We would gladly work with Halify again.',
    name: 'Emily Carter',
    role: 'Product Manager',
    initials: 'EC',
  },
];

function Testimonials() {
  return (
    <section className="py-24 md:py-28 bg-paper-alt">
      <div className="max-w-container mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">Client feedback</span>
          <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
            What our clients say
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              className="p-8 rounded-2xl bg-paper border border-line hover:shadow-card transition-all"
            >
              <div className="flex gap-1 mb-5 text-amber" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <p className="text-ink-soft text-[15px] leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet flex items-center justify-center text-white text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">{t.name}</p>
                  <p className="text-ink-faint text-sm">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
