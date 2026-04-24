const BookIcon = ({ className, ...props }) => (
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
        d="M11.25 7.75C11.25 7.33579 11.5858 7 12 7C12.4142 7 12.75 7.33579 12.75 7.75V20.25C12.75 20.6642 12.4142 21 12 21C11.5858 21 11.25 20.6642 11.25 20.25V7.75Z"
        fill="url(#bk_g0)"
        mask="url(#bk_mask)"
      />
      <path
        d="M11.25 7.75C11.25 7.33579 11.5858 7 12 7C12.4142 7 12.75 7.33579 12.75 7.75V20.25C12.75 20.6642 12.4142 21 12 21C11.5858 21 11.25 20.6642 11.25 20.25V7.75Z"
        fill="url(#bk_g0)"
        filter="url(#bk_blur)"
        clipPath="url(#bk_clip)"
      />
      <path
        d="M3 3H8C10.2091 3 12 4.79086 12 7C12 4.79086 13.7909 3 16 3H21C21.5523 3 22 3.44772 22 4V17C22 17.5523 21.5523 18 21 18H15C13.3431 18 12 19.3431 12 21C12 19.3431 10.6569 18 9 18H3C2.44772 18 2 17.5523 2 17V4C2 3.44772 2.44772 3 3 3Z"
        fill="url(#bk_g1)"
      />
      <path
        d="M3 3H8C10.2091 3 12 4.79086 12 7C12 4.79086 13.7909 3 16 3H21C21.5523 3 22 3.44772 22 4V17C22 17.5523 21.5523 18 21 18H15C13.3431 18 12 19.3431 12 21C12 19.3431 10.6569 18 9 18H3C2.44772 18 2 17.5523 2 17V4C2 3.44772 2.44772 3 3 3Z"
        fill="url(#bk_shadow)"
      />
      <path
        d="M21 3H16C13.7909 3 12 4.79086 12 7C12 4.79086 10.2091 3 8 3H3C2.44772 3 2 3.44772 2 4V11H2.75V4C2.75 3.86193 2.86193 3.75 3 3.75H8C9.79493 3.75 11.25 5.20507 11.25 7V11H12.75V7C12.75 5.20507 14.2051 3.75 16 3.75H21C21.1381 3.75 21.25 3.86193 21.25 4V11H22V4C22 3.44772 21.5523 3 21 3Z"
        fill="url(#bk_g2)"
      />
      <defs>
        <linearGradient id="bk_g0" x1="12" y1="7" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
        <linearGradient id="bk_g1" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6" />
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="bk_g2" x1="12" y1="3" x2="12" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bk_shadow" x1="12" y1="13" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".18" />
        </linearGradient>
        <filter id="bk_blur" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
        </filter>
        <clipPath id="bk_clip">
          <path d="M11.25 7.75C11.25 7.33579 11.5858 7 12 7C12.4142 7 12.75 7.33579 12.75 7.75V20.25C12.75 20.6642 12.4142 21 12 21C11.5858 21 11.25 20.6642 11.25 20.25V7.75Z" />
        </clipPath>
        <mask id="bk_mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path
            d="M3 3H8C10.2091 3 12 4.79086 12 7C12 4.79086 13.7909 3 16 3H21C21.5523 3 22 3.44772 22 4V17C22 17.5523 21.5523 18 21 18H15C13.3431 18 12 19.3431 12 21C12 19.3431 10.6569 18 9 18H3C2.44772 18 2 17.5523 2 17V4C2 3.44772 2.44772 3 3 3Z"
            fill="#000"
          />
        </mask>
      </defs>
    </g>
  </svg>
);

export default BookIcon;
