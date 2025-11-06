
// components/StatBox.jsx
import React from 'react';

const StatBox = ({ label, value, readonly, editing }) => (
  <div>
    <label className="label">
      {label}
      {readonly ? <span className="ml-1 text-xs text-gray-500">(Read-only)</span>
                : <span className="ml-1 text-xs text-blue-600">(Writeable)</span>}
    </label>
    {editing && !readonly
      ? <input type="text" defaultValue={value} className="input-edit" />
      : <div className={readonly ? 'read-box' : 'write-box'}>{value ?? 'N/A'}</div>}
  </div>
);

export default StatBox;
