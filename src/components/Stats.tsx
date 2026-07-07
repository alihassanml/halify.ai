import Reveal from './Reveal';
import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';

const STATS = [
  { value: '60+', label: 'Projects delivered' },
  { value: '9', label: 'Countries served' },
  { value: '4.9/5', label: 'Average client rating' },
  { value: '5 yrs', label: 'Avg. engineer experience' },
];

function StatItem({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const display = useCountUp(value, inView);

  return (
    <div ref={ref}>
      <div className="font-display font-bold text-3xl md:text-4xl text-ink mb-1 tabular-nums">
        {display}
      </div>
      <div className="text-sm text-ink-faint">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-16 max-w-container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
            className="text-center md:text-left"
          >
            <StatItem value={stat.value} label={stat.label} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Stats;
