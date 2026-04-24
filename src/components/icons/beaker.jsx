const MagnifierIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <g fill="none">
      <path
        d="M10.586 10.5859C11.3671 9.80486 12.6331 9.80486 13.4142 10.5859L21.9142 19.0859L22.0519 19.2373C22.6926 20.0228 22.6464 21.1818 21.9142 21.914C21.1819 22.6463 20.0229 22.6925 19.2374 22.0517L19.086 21.914L10.586 13.414C9.80498 12.633 9.80498 11.367 10.586 10.5859Z"
        fill="url(#mag_g0)"
        mask="url(#mag_mask)"
      />
      <path
        d="M10.586 10.5859C11.3671 9.80486 12.6331 9.80486 13.4142 10.5859L21.9142 19.0859L22.0519 19.2373C22.6926 20.0228 22.6464 21.1818 21.9142 21.914C21.1819 22.6463 20.0229 22.6925 19.2374 22.0517L19.086 21.914L10.586 13.414C9.80498 12.633 9.80498 11.367 10.586 10.5859Z"
        fill="url(#mag_g0)"
        filter="url(#mag_blur)"
        clipPath="url(#mag_clip)"
      />
      <path
        d="M18.5 10C18.5 14.6943 14.6943 18.5 10 18.5C5.30567 18.5 1.5 14.6943 1.5 10C1.5 5.30567 5.30567 1.5 10 1.5C14.6943 1.5 18.5 5.30567 18.5 10Z"
        fill="url(#mag_g1)"
      />
      <path
        d="M17.75 10C17.75 5.71989 14.2801 2.25 10 2.25C5.71989 2.25 2.25 5.71989 2.25 10C2.25 14.2801 5.71989 17.75 10 17.75V18.5C5.30567 18.5 1.5 14.6943 1.5 10C1.5 5.30567 5.30567 1.5 10 1.5C14.6943 1.5 18.5 5.30567 18.5 10C18.5 14.6943 14.6943 18.5 10 18.5V17.75C14.2801 17.75 17.75 14.2801 17.75 10Z"
        fill="url(#mag_g2)"
      />
      <defs>
        <linearGradient id="mag_g0" x1="16.25" y1="10" x2="16.25" y2="22.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
        <linearGradient id="mag_g1" x1="10" y1="1.5" x2="10" y2="18.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6" />
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="mag_g2" x1="10" y1="1.5" x2="10" y2="11.345" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="mag_blur" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
        </filter>
        <clipPath id="mag_clip">
          <path d="M18.5 10C18.5 14.6943 14.6943 18.5 10 18.5C5.30567 18.5 1.5 14.6943 1.5 10C1.5 5.30567 5.30567 1.5 10 1.5C14.6943 1.5 18.5 5.30567 18.5 10Z" fill="url(#mag_g1)" />
        </clipPath>
        <mask id="mag_mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path d="M18.5 10C18.5 14.6943 14.6943 18.5 10 18.5C5.30567 18.5 1.5 14.6943 1.5 10C1.5 5.30567 5.30567 1.5 10 1.5C14.6943 1.5 18.5 5.30567 18.5 10Z" fill="#000" />
        </mask>
      </defs>
    </g>
  </svg>
);

export default MagnifierIcon;
