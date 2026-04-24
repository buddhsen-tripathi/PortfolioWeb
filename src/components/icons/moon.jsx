const MoonIcon = ({ className, ...props }) => (
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
        d="M18 4.8l.5.7.7.5-.7.5-.5.7-.5-.7-.7-.5.7-.5.5-.7zM20 8.2l.3.5.5.3-.5.3-.3.5-.3-.5-.5-.3.5-.3.3-.5zM16 4l.2.3.3.2-.3.2-.2.3-.2-.3-.3-.2.3-.2.2-.3z"
        fill="url(#moon_g0)"
        mask="url(#moon_mask)"
      />
      <path
        d="M18 4.8l.5.7.7.5-.7.5-.5.7-.5-.7-.7-.5.7-.5.5-.7zM20 8.2l.3.5.5.3-.5.3-.3.5-.3-.5-.5-.3.5-.3.3-.5zM16 4l.2.3.3.2-.3.2-.2.3-.2-.3-.3-.2.3-.2.2-.3z"
        fill="url(#moon_g0)"
        filter="url(#moon_blur)"
        clipPath="url(#moon_clip)"
      />
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="url(#moon_g1)"
      />
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="url(#moon_g2)"
        strokeWidth="0.75"
        fill="none"
      />
      <defs>
        <linearGradient id="moon_g0" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
        <linearGradient id="moon_g1" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6" />
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="moon_g2" x1="12" y1="3" x2="12" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="moon_blur" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
        </filter>
        <clipPath id="moon_clip">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </clipPath>
        <mask id="moon_mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#000" />
        </mask>
      </defs>
    </g>
  </svg>
);

export default MoonIcon;
