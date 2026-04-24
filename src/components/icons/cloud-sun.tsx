const CloudSunIcon = ({ className, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g fill="none">
      <path
        d="M11 9C11 5.68629 13.6863 3 17 3C20.3137 3 23 5.68629 23 9C23 12.3137 20.3137 15 17 15C13.6863 15 11 12.3137 11 9Z"
        fill="url(#cs_g0)"
        mask="url(#cs_mask)"
      />
      <path
        d="M11 9C11 5.68629 13.6863 3 17 3C20.3137 3 23 5.68629 23 9C23 12.3137 20.3137 15 17 15C13.6863 15 11 12.3137 11 9Z"
        fill="url(#cs_g0)"
        filter="url(#cs_blur)"
        clipPath="url(#cs_clip)"
      />
      <path
        d="M17.8789 11.0781C17.2021 7.06081 13.7098 4 9.5 4C4.80558 4 1 7.80558 1 12.5C1 17.1944 4.80558 21 9.5 21H17C19.7614 21 22 18.7614 22 16C22 13.5385 20.2211 11.4936 17.8789 11.0781Z"
        fill="url(#cs_g1)"
      />
      <path
        d="M17 20.25V21H9.5V20.25H17ZM1 12.5C1 7.80558 4.80558 4 9.5 4C13.7098 4 17.2021 7.06081 17.8789 11.0781C20.2211 11.4936 22 13.5385 22 16C22 18.7614 19.7614 21 17 21V20.25C19.3472 20.25 21.25 18.3472 21.25 16C21.25 13.9088 19.7386 12.1695 17.748 11.8164L17.2275 11.7246L17.1396 11.2031C16.5226 7.54051 13.3372 4.75 9.5 4.75C5.21979 4.75 1.75 8.21979 1.75 12.5C1.75 16.7802 5.21979 20.25 9.5 20.25V21C4.80558 21 1 17.1944 1 12.5Z"
        fill="url(#cs_g2)"
      />
      <defs>
        <linearGradient id="cs_g0" x1="17" y1="3" x2="17" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
        <linearGradient id="cs_g1" x1="11.5" y1="4" x2="11.5" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6" />
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="cs_g2" x1="11.5" y1="4" x2="11.5" y2="13.845" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="cs_blur" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
        </filter>
        <clipPath id="cs_clip">
          <path d="M17.8789 11.0781C17.2021 7.06081 13.7098 4 9.5 4C4.80558 4 1 7.80558 1 12.5C1 17.1944 4.80558 21 9.5 21H17C19.7614 21 22 18.7614 22 16C22 13.5385 20.2211 11.4936 17.8789 11.0781Z" />
        </clipPath>
        <mask id="cs_mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path d="M17.8789 11.0781C17.2021 7.06081 13.7098 4 9.5 4C4.80558 4 1 7.80558 1 12.5C1 17.1944 4.80558 21 9.5 21H17C19.7614 21 22 18.7614 22 16C22 13.5385 20.2211 11.4936 17.8789 11.0781Z" fill="#000" />
        </mask>
      </defs>
    </g>
  </svg>
);

export default CloudSunIcon;
