import React from 'react';

const FieldGroup = ({ title, fields, section, readonly = false, isEditing, onToggleEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {!readonly && (
          <button
            onClick={() => onToggleEdit(section)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              isEditing
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.readonly && <span className="ml-1 text-xs text-gray-500">(Read-only)</span>}
              {!field.readonly && !readonly && <span className="ml-1 text-xs text-blue-600">(Writeable)</span>}
            </label>
            {isEditing && !field.readonly ? (
              <input
                type="text"
                defaultValue={field.value}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              />
            ) : (
              <div className={`px-3 py-2 rounded-md ${field.readonly || readonly ? 'bg-gray-50 text-gray-700' : 'bg-white border text-gray-900'}`}>
                {field.value || 'N/A'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldGroup;