
// components/StageBadge.jsx
import React from 'react';
import { stageBadgeClass } from '../data/sampleData';

const StageBadge = ({ stage }) => (
  <span className={stageBadgeClass[stage] || 'badge-gray'}>{stage}</span>
);

export default StageBadge;
