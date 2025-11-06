
// components/ColumnFilterPanel.jsx
import React from 'react';

const ColumnFilterPanel = ({ visibleColumns, setVisibleColumns }) => (
  <div className="card-padded mb-4">
    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
      Visible Columns
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {Object.entries(visibleColumns).map(([key, value]) => (
        <label key={key} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setVisibleColumns({ ...visibleColumns, [key]: e.target.checked })}
            className="checkbox"
          />
          <span className="text-sm text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default ColumnFilterPanel;
