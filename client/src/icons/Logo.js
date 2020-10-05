import React from "react";
import { motion} from "framer-motion";

const svgVariants = {
  hidden: {
   originX:0,
    scale:0
  },
  visible: {
    scale:1,
  
    transition: {
      duration: 1,
      type: 'spring',
    },
  },
};
const eyesVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
};
const smileVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      delay: 2,
      duration: 2,
      ease: "easeInOut",
    },
  },
};
function Logo() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="9rem"
      height="9rem"
      fill="none"
      viewBox="0 0 373 264"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      className="left"
    >
      <ellipse
        cx="248.5"
        cy="108.5"
        fill="#F391E9"
        rx="124.5"
        ry="98.5"
      ></ellipse>
      <ellipse
        cx="124.5"
        cy="108.5"
        fill="#F391E9"
        rx="124.5"
        ry="98.5"
      ></ellipse>
      <circle cx="185" cy="78" r="78" fill="#F391E9"></circle>
      <ellipse
        cx="248.5"
        cy="157.5"
        fill="#F391E9"
        rx="124.5"
        ry="106.5"
      ></ellipse>
      <ellipse
        cx="124.5"
        cy="157.5"
        fill="#F391E9"
        rx="124.5"
        ry="106.5"
      ></ellipse>
      <g style={{ mixBlendMode: "darken" }} filter="url(#filter0_d)">
        <motion.path
          stroke="#A613A0"
          strokeWidth="6"
          d="M173.299 202.472c-43.131 10.769-75.258-2.751-87.65-45.472"
          variants={smileVariants}
        />
      </g>
      <motion.path
        fill="#AE1784"
        d="M160.782 109.5c0 22.92-9.452 21-28.782 21s-32.718 1.92-32.718-21S112.67 63 132 63c19.33 0 28.782 23.58 28.782 46.5zM266.782 109.5c0 22.92-9.452 21-28.782 21s-32.718 1.92-32.718-21S218.67 63 238 63c19.33 0 28.782 23.58 28.782 46.5z"
        variants={eyesVariants}
      />
      <defs>
        <filter
          id="filter0_d"
          width="99.258"
          height="60.837"
          x="78.768"
          y="156.164"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </motion.svg>
  );
}

export default Logo;
