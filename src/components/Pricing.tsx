import Reveal from './Reveal';

const PLANS = [
  {
    name: 'Fixed Scope',
    price: 'From $5,000',
    description: 'Best for a well-defined MVP, feature, or integration with a clear finish line.',
    features: ['Fixed timeline & budget', 'Dedicated project lead', 'Weekly milestone demos', '30-day post-launch support'],
    highlighted: false,
  },
  {
    name: 'Dedicated Team',
    price: 'From $8,000/mo',
    description: 'An embedded senior team working exclusively on your roadmap, sprint by sprint.',
    features: ['2–4 senior engineers', 'Sprint planning & standups', 'Direct Slack & Linear access', 'Scale up or down monthly'],
    highlighted: true,
  },
  {
    name: 'Time & Materials',
    price: 'From $45/hr',
    description: 'Flexible hours for ongoing work, audits, or support without a long-term commitment.',
    features: ['Pay for hours used', 'No minimum commitment', 'Ideal for maintenance & support', 'Transparent time tracking'],
    highlighted: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-28 max-w-container mx-auto px-6">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">Engagement models</span>
        <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
          Simple, flexible pricing
        </h2>
        <p className="text-ink-soft text-lg">
          Every project is different — pick the model that fits, and we'll tailor a proposal to your scope.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((plan, i) => (
          <Reveal
            key={plan.name}
            delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
            className={`flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
              plan.highlighted
                ? 'border-primary bg-ink text-white shadow-card-hover md:-translate-y-3'
                : 'border-line bg-paper hover:shadow-card'
            }`}
          >
            {plan.highlighted && (
              <span className="self-start mb-4 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wide">
                Most popular
              </span>
            )}
            <h3 className={`font-display font-semibold text-xl mb-1 ${plan.highlighted ? 'text-white' : 'text-ink'}`}>
              {plan.name}
            </h3>
            <div className={`font-display font-bold text-3xl mb-3 ${plan.highlighted ? 'text-white' : 'text-ink'}`}>
              {plan.price}
            </div>
            <p className={`text-sm leading-relaxed mb-6 ${plan.highlighted ? 'text-white/70' : 'text-ink-soft'}`}>
              {plan.description}
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? 'text-white/85' : 'text-ink-soft'}`}
                >
                  <span className={plan.highlighted ? 'text-white' : 'text-primary'}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-colors ${
                plan.highlighted
                  ? 'bg-white text-ink hover:bg-primary-soft'
                  : 'bg-ink text-white hover:bg-primary'
              }`}
            >
              Get a proposal
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
