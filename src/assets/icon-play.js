import React from "react";

function IconPlay(props) {
  const color = props.color || "#222";
  const defaultSize = 24;
  const size = props.size || defaultSize;
  const scale = props.size / defaultSize;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`scale(${scale})`}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export default IconPlay;
