import React from 'react';
import { Filter } from 'lucide-react';

const pretty = (key) => key.replace(/([A-Z])/g, ' $1').trim();

const ColumnFilterPanel = ({ visibleColumns, setVisibleColumns }) => (
  <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <Filter size={18} />
      Visible Columns
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {Object.entries(visibleColumns).map(([key, value]) => (
        <label key={key} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setVisibleColumns({ ...visibleColumns, [key]: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 capitalize">{pretty(key)}</span>
        </label>
      ))}
    </div>
  </div>
);

export default ColumnFilterPanel;