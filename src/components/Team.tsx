import Reveal from './Reveal';

const TEAM = [
  {
    name: 'Ali Hassan',
    role: 'Founder & AI Engineer',
    image: '/team/Ali%20Hassan.jpeg',
    position: '50% 22%',
  },
  {
    name: 'Faheem',
    role: 'Founder & Marketing Manager',
    image: '/team/faheem.jpeg',
    position: '50% 18%',
  },
  {
    name: 'Areeb',
    role: 'Team Developer',
    image: '/team/Areeb.jpeg',
    position: '50% 12%',
  },
  {
    name: 'Mukkaram',
    role: 'Team Developer',
    image: '/team/Mukkaram.jpeg',
    position: '50% 18%',
  },
];

function Team() {
  return (
    <section id="team" className="py-24 md:py-28 max-w-container mx-auto px-6">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">Meet the team</span>
        <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
          The people behind Halify
        </h2>
        <p className="text-ink-soft text-lg">
          A small, hands-on team building every product we ship.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {TEAM.map((member, i) => (
          <Reveal
            key={member.name}
            delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
            className="flex flex-col items-center text-center"
          >
            <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border border-line shadow-card mb-5">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover scale-150"
                style={{ objectPosition: member.position }}
              />
            </div>
            <h3 className="font-display font-semibold text-base text-ink">{member.name}</h3>
            <p className="text-ink-soft text-sm">{member.role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Team;
