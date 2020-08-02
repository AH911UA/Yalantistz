import React from "react";

export const Card = ({ name, style, open, count, hide }) => (
  <div className={`card ${style}`} onMouseEnter={open} onMouseLeave={hide}>
    {name} ({count})
  </div>
);
