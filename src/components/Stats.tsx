import Reveal from './Reveal';

const STATS = [
  { value: '60+', label: 'Projects delivered' },
  { value: '9', label: 'Countries served' },
  { value: '4.9/5', label: 'Average client rating' },
  { value: '5 yrs', label: 'Avg. engineer experience' },
];

function Stats() {
  return (
    <section className="py-16 max-w-container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="text-center md:text-left">
            <div className="font-display font-bold text-3xl md:text-4xl text-ink mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-ink-faint">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Stats;
