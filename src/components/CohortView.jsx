import React, { useState } from 'react';
import { Plus, Calendar, Clock, X } from 'lucide-react';

const CohortView = ({ cohorts, setCohorts, patients, setSelectedCohort, stageColors }) => {
  const [showNewCohortModal, setShowNewCohortModal] = useState(false);
  const [newCohortData, setNewCohortData] = useState({
    id: `C${200 + cohorts.length}`,
    cohortSize: 6,
    cohortType: 'Group A',
    liveSessionType: '90 MINUTES',
    liveDays: 'M-W',
    liveTime: '2:00 PM',
    patientsIds: []
  });

  const handleCreateCohort = () => {
    const newCohort = {
      ...newCohortData,
      cohortSize: newCohortData.patientsIds.length
    };
    setCohorts([...cohorts, newCohort]);
    setShowNewCohortModal(false);
    setNewCohortData({
      id: `C${200 + cohorts.length + 1}`,
      cohortSize: 6,
      cohortType: 'Group A',
      liveSessionType: '90 MINUTES',
      liveDays: 'M-W',
      liveTime: '2:00 PM',
      patientsIds: []
    });
  };

  const togglePatientSelection = (patientId) => {
    setNewCohortData(prev => ({
      ...prev,
      patientsIds: prev.patientsIds.includes(patientId)
        ? prev.patientsIds.filter(id => id !== patientId)
        : [...prev.patientsIds, patientId]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Cohort Management</h2>
        <button 
          onClick={() => setShowNewCohortModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          New Cohort
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cohorts.map((cohort) => (
          <div key={cohort.id} className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{cohort.id}</h3>
                <p className="text-sm text-gray-600">{cohort.cohortType}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {cohort.patientsIds?.length || cohort.cohortSize} patients
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} className="text-gray-400" />
                <span>{cohort.liveSessionType}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <span>{cohort.liveDays} at {cohort.liveTime}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCohort(cohort)}
              className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition font-medium"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* New Cohort Modal */}
      {showNewCohortModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold text-gray-900">Create New Cohort</h2>
              <button onClick={() => setShowNewCohortModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Cohort Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cohort Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cohort ID / Name</label>
                    <input
                      type="text"
                      value={newCohortData.id}
                      onChange={(e) => setNewCohortData({...newCohortData, id: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., C200 or Morning Group"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cohort Type</label>
                    <select
                      value={newCohortData.cohortType}
                      onChange={(e) => setNewCohortData({...newCohortData, cohortType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Group A</option>
                      <option>Group B</option>
                      <option>Group C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Session Type</label>
                    <select
                      value={newCohortData.liveSessionType}
                      onChange={(e) => setNewCohortData({...newCohortData, liveSessionType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>90 MINUTES</option>
                      <option>60 MINUTES</option>
                      <option>30 MINUTES</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Days</label>
                    <select
                      value={newCohortData.liveDays}
                      onChange={(e) => setNewCohortData({...newCohortData, liveDays: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>M-W</option>
                      <option>T-Th</option>
                      <option>M-W-F</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Time</label>
                    <select
                      value={newCohortData.liveTime}
                      onChange={(e) => setNewCohortData({...newCohortData, liveTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>9:00 AM</option>
                      <option>2:00 PM</option>
                      <option>6:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Patient Assignment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assign Patients</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Selected: {newCohortData.patientsIds.length} patients
                </p>
                <div className="border rounded-lg max-h-80 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={newCohortData.patientsIds.length === patients.length}
                            onChange={(e) => {
                              setNewCohortData({
                                ...newCohortData,
                                patientsIds: e.target.checked ? patients.map(p => p.id) : []
                              });
                            }}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Patient ID</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">State</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Current Stage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {patients.map((patient) => (
                        <tr 
                          key={patient.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${
                            newCohortData.patientsIds.includes(patient.id) ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => togglePatientSelection(patient.id)}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={newCohortData.patientsIds.includes(patient.id)}
                              onChange={() => togglePatientSelection(patient.id)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-900">{patient.id}</td>
                          <td className="px-4 py-3 text-gray-900">{patient.name}</td>
                          <td className="px-4 py-3 text-gray-600">{patient.state}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stageColors[patient.currentStage]}`}>
                              {patient.currentStage}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-3">
                <button 
                  onClick={handleCreateCohort}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
                >
                  Create Cohort ({newCohortData.patientsIds.length} patients)
                </button>
                <button 
                  onClick={() => setShowNewCohortModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CohortView;