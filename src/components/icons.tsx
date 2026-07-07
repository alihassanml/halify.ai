import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconSpark(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function IconBot(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4M9 4.5h6" />
      <circle cx="9" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9 17h6" />
    </svg>
  );
}

export function IconNetwork(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="7" r="2.4" />
      <circle cx="18" cy="7" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M8 8.3 10.2 16M16 8.3 13.8 16M8.3 6.6h7.4" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5Z" />
      <path d="M4 12l8 4.5 8-4.5M4 16l8 4.5 8-4.5" />
    </svg>
  );
}

export function IconChatBubble(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16v10H9.5L5.5 19v-3.5H4v-10Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

export function IconCode(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
    </svg>
  );
}

export function IconDevice(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6.5" y="3" width="11" height="18" rx="2.4" />
      <path d="M10.5 18.2h3" />
    </svg>
  );
}

export function IconCloud(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18h10.5a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8.2 8.6 4 4 0 0 0 7 16.5" />
    </svg>
  );
}

export function IconLink(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="8.5" width="8" height="7" rx="3.5" />
      <rect x="12.5" y="8.5" width="8" height="7" rx="3.5" />
      <path d="M11.5 12h1" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconLoop(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12a8 8 0 0 1 13.5-5.8M20 12a8 8 0 0 1-13.5 5.8" />
      <path d="M17 3.5v3.2h-3.2M7 20.5v-3.2h3.2" />
    </svg>
  );
}

export function IconShieldCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 19 6.3v5.4c0 4.3-2.9 7.2-7 8.8-4.1-1.6-7-4.5-7-8.8V6.3L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z" />
    </svg>
  );
}

export function IconMessage(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16v9H10l-3.5 3V15H4V6Z" />
      <circle cx="8.3" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTrendUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16.5 9.5 11l4 4L20 7" />
      <path d="M14.5 7H20v5.5" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 19 6.3v5.4c0 4.3-2.9 7.2-7 8.8-4.1-1.6-7-4.5-7-8.8V6.3L12 3.5Z" />
    </svg>
  );
}

export function IconInfinity(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7.5 9a3.5 3.5 0 1 0 0 7c2.5 0 3.8-2 4.5-3.5C12.7 11 14 9 16.5 9a3.5 3.5 0 1 1 0 7c-2.5 0-3.8-2-4.5-3.5C11.3 11 10 9 7.5 9Z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function IconArrowDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M12 2.5l2.9 6.16 6.6.77-4.9 4.6 1.28 6.6L12 17.9l-5.88 2.73 1.28-6.6-4.9-4.6 6.6-.77L12 2.5z" />
    </svg>
  );
}
