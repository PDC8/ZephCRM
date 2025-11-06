
// CRM.jsx (refactored root) — imports split components & views
import React, { useState, useMemo } from 'react';
import './CRM.css';
import { Users, X } from 'lucide-react';

import FunnelView from './views/FunnelView';
import CohortView from './views/CohortView';
import PatientView from './views/PatientView';

import { generateSamplePatients, generateSampleCohorts } from './data/sampleData';

const CRM = () => {
  const [patients, setPatients] = useState(generateSamplePatients());
  const [cohorts] = useState(generateSampleCohorts());
  const [view, setView] = useState('funnel'); // funnel | cohort | patient
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredPatients = useMemo(
    () => patients.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [patients, searchTerm]
  );

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Patient Journey CRM</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setView('funnel')} className={view === 'funnel' ? 'btn-primary' : 'btn-secondary'}>Funnel [F]</button>
              <button onClick={() => setView('cohort')} className={view === 'cohort' ? 'btn-primary' : 'btn-secondary'}>Cohort [C]</button>
              <button
                onClick={() => { if (selectedPatient) setView('patient'); }}
                disabled={!selectedPatient}
                className={view === 'patient'
                  ? 'btn-primary'
                  : selectedPatient ? 'btn-secondary' : 'btn text-gray-400 cursor-not-allowed'}
              >
                Patient [P]
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="page">
        {view === 'funnel' && (
          <FunnelView
            patients={patients}
            filteredPatients={filteredPatients}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            onOpenPatient={(p) => { setSelectedPatient(p); setView('patient'); }}
          />
        )}
        {view === 'cohort' && <CohortView cohorts={cohorts} onOpenCohort={setSelectedCohort} />}
        {view === 'patient' && selectedPatient && (
          <PatientView patient={selectedPatient} onBack={() => setView('funnel')} />
        )}
      </main>

      {selectedCohort && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Cohort {selectedCohort.id}</h2>
              <button onClick={() => setSelectedCohort(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Cohort Size</label>
                  <input type="number" defaultValue={selectedCohort.cohortSize} className="input-edit" />
                </div>
                <div>
                  <label className="label">Cohort Type</label>
                  <input type="text" defaultValue={selectedCohort.cohortType} className="input-edit" />
                </div>
                <div>
                  <label className="label">Live Session Type</label>
                  <input type="text" defaultValue={selectedCohort.liveSessionType} className="input-edit" />
                </div>
                <div>
                  <label className="label">Live Days</label>
                  <input type="text" defaultValue={selectedCohort.liveDays} className="input-edit" />
                </div>
                <div className="col-span-2">
                  <label className="label">Live Time</label>
                  <input type="text" defaultValue={selectedCohort.liveTime} className="input-edit" />
                </div>
              </div>
              <div className="pt-4 border-t">
                <button className="btn-primary w-full">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
