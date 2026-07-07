const TECH = [
  'OpenAI', 'Anthropic', 'LangChain', 'FastAPI', 'React', 'Next.js',
  'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'Supabase',
];

function TechMarquee() {
  const items = [...TECH, ...TECH];

  return (
    <section className="py-10 border-y border-line bg-paper-alt/60">
      <div className="marquee-fade overflow-hidden">
        <div className="marquee-track">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center px-8 font-display font-semibold text-lg text-ink-faint hover:text-ink transition-colors whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechMarquee;
