import React from "react";

function Icon(props) {
  const size = props.size || 20;
  const color = props.color || "#111";
  return (
    <svg
      style={{
        width: size,
        height: size
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
    >
      <path
        fill={color}
        d="M8 0c-5 0-6 1-6 1v4.09c-.15-.05-.33-.09-.5-.09-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5v-3.97c.73-.23 1.99-.44 4-.5v2.06c-.15-.05-.33-.09-.5-.09-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5v-5.5z"
      />
    </svg>
  );
}

export default Icon;
