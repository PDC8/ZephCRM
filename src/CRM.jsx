import React, { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import FunnelView from './components/FunnelView';
import CohortView from './components/CohortView';
import PatientView from './components/PatientView';
import { generateSampleCohorts, generateSamplePatients } from './data/sampleData';
import { stageColors } from './constants/stageColors';

const CRM = () => {
  // Generate cohorts first
  const initialCohorts = generateSampleCohorts();
  const cohortIds = initialCohorts.map(c => c.id);

  // Generate patients with valid cohort IDs
  const initialPatients = generateSamplePatients(cohortIds);

  // Assign patients to cohorts based on their program cohortId
  initialCohorts.forEach(cohort => {
    cohort.patientsIds = initialPatients
      .filter(patient => patient.program.cohortId === cohort.id)
      .map(patient => patient.id);
  });

  const [patients, setPatients] = useState(initialPatients);
  const [cohorts, setCohorts] = useState(initialCohorts);
  const [view, setView] = useState('funnel'); // funnel, cohort, patient
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCohort, setFilterCohort] = useState('all');
  const [visibleColumns, setVisibleColumns] = useState({
    demographics: true,
    currentStatus: true,
    rampOn: true,
    kit: true,
    program: true,
    maintenance: true,
    rampOff: true,
    risks: true,
    deferrals: true
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Patient Journey CRM</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('funnel')}
                className={`px-4 py-2 rounded-md transition ${
                  view === 'funnel'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Funnel [F]
              </button>
              <button
                onClick={() => setView('cohort')}
                className={`px-4 py-2 rounded-md transition ${
                  view === 'cohort'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cohort [C]
              </button>
              <button
                onClick={() => selectedPatient && setView('patient')}
                disabled={!selectedPatient}
                className={`px-4 py-2 rounded-md transition ${
                  view === 'patient'
                    ? 'bg-blue-600 text-white font-medium'
                    : selectedPatient
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Patient [P]
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'funnel' && (
          <FunnelView
            patients={patients}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCohort={filterCohort}
            setFilterCohort={setFilterCohort}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            setSelectedPatient={setSelectedPatient}
            setView={setView}
            stageColors={stageColors}
          />
        )}

        {view === 'cohort' && (
          <CohortView
            cohorts={cohorts}
            setCohorts={setCohorts}
            patients={patients}
            setSelectedCohort={setSelectedCohort}
            stageColors={stageColors}
          />
        )}

        {view === 'patient' && selectedPatient && (
          <PatientView
            patient={patients.find(p => p.id === selectedPatient.id) || selectedPatient}
            onBack={() => setView('funnel')}
            patients={patients}
            setPatients={setPatients}
            stageColors={stageColors}
          />
        )}
      </main>

      {selectedCohort && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Cohort {selectedCohort.id}</h2>
              <button onClick={() => setSelectedCohort(null)} className="text-gray-400 hover:text-gray-600">
                ×
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
                      defaultValue={selectedCohort.id}
                      onChange={(e) => {
                        setCohorts(cohorts.map(c => 
                          c.id === selectedCohort.id ? { ...c, id: e.target.value } : c
                        ));
                        setSelectedCohort({ ...selectedCohort, id: e.target.value });
                      }}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cohort Type</label>
                    <select
                      defaultValue={selectedCohort.cohortType}
                      onChange={(e) => {
                        setCohorts(cohorts.map(c => 
                          c.id === selectedCohort.id ? { ...c, cohortType: e.target.value } : c
                        ));
                        setSelectedCohort({ ...selectedCohort, cohortType: e.target.value });
                      }}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    >
                      <option>Group A</option>
                      <option>Group B</option>
                      <option>Group C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cohort Size</label>
                    <input
                      type="text"
                      value={`${selectedCohort.patientsIds?.length || selectedCohort.cohortSize} patients`}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Session Type</label>
                    <select
                      defaultValue={selectedCohort.liveSessionType}
                      onChange={(e) => {
                        setCohorts(cohorts.map(c => 
                          c.id === selectedCohort.id ? { ...c, liveSessionType: e.target.value } : c
                        ));
                        setSelectedCohort({ ...selectedCohort, liveSessionType: e.target.value });
                      }}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    >
                      <option>90 MINUTES</option>
                      <option>60 MINUTES</option>
                      <option>30 MINUTES</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Days</label>
                    <select
                      defaultValue={selectedCohort.liveDays}
                      onChange={(e) => {
                        setCohorts(cohorts.map(c => 
                          c.id === selectedCohort.id ? { ...c, liveDays: e.target.value } : c
                        ));
                        setSelectedCohort({ ...selectedCohort, liveDays: e.target.value });
                      }}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    >
                      <option>M-W</option>
                      <option>T-Th</option>
                      <option>M-W-F</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Time</label>
                    <select
                      defaultValue={selectedCohort.liveTime}
                      onChange={(e) => {
                        setCohorts(cohorts.map(c => 
                          c.id === selectedCohort.id ? { ...c, liveTime: e.target.value } : c
                        ));
                        setSelectedCohort({ ...selectedCohort, liveTime: e.target.value });
                      }}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assigned Patients</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {(selectedCohort.patientsIds || []).length} patients assigned
                </p>
                <div className="border rounded-lg max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={(selectedCohort.patientsIds || []).length === patients.length}
                            onChange={(e) => {
                              const updatedCohort = {
                                ...selectedCohort,
                                patientsIds: e.target.checked ? patients.map(p => p.id) : []
                              };
                              setCohorts(cohorts.map(c => 
                                c.id === selectedCohort.id ? updatedCohort : c
                              ));
                              setSelectedCohort(updatedCohort);
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
                      {patients.map((patient) => {
                        const isSelected = (selectedCohort.patientsIds || []).includes(patient.id);
                        return (
                          <tr 
                            key={patient.id} 
                            className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                            onClick={() => {
                              const currentIds = selectedCohort.patientsIds || [];
                              const updatedCohort = {
                                ...selectedCohort,
                                patientsIds: isSelected
                                  ? currentIds.filter(id => id !== patient.id)
                                  : [...currentIds, patient.id]
                              };
                              setCohorts(cohorts.map(c => c.id === selectedCohort.id ? updatedCohort : c));
                              setSelectedCohort(updatedCohort);
                            }}
                          >
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-3">
                <button 
                  onClick={() => setSelectedCohort(null)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Save & Close
                </button>
                <button 
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this cohort?')) {
                      setCohorts(cohorts.filter(c => c.id !== selectedCohort.id));
                      setSelectedCohort(null);
                    }
                  }}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                >
                  Delete Cohort
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;