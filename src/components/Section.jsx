
// components/Section.jsx
import React from 'react';

const Section = ({ title, children, action }) => (
  <div className="card-padded">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

export default Section;
