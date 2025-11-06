import React, { useMemo } from 'react';
import { Search } from 'lucide-react';
import ColumnFilterPanel from './ColumnFilterPanel';

const FunnelView = ({
  patients,
  searchTerm,
  setSearchTerm,
  filterCohort,
  setFilterCohort,
  visibleColumns,
  setVisibleColumns,
  setSelectedPatient,
  setView,
  stageColors
}) => {
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.mrn.toLowerCase().includes(q);
      const matchesCohort = filterCohort === 'all' || p.program.cohortId === filterCohort;
      return matchesSearch && matchesCohort;
    });
  }, [patients, searchTerm, filterCohort]);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Read-Only View:</strong> This funnel aggregates all patient information from individual patient records. 
          Use column filters to focus on specific data categories.
        </p>
      </div>

      <ColumnFilterPanel visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={filterCohort}
                onChange={(e) => setFilterCohort(e.target.value)}
                className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Cohorts</option>
                {[...new Set(patients.map(p => p.program.cohortId))].sort().map(cohortId => (
                  <option key={cohortId} value={cohortId}>{cohortId}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-4">
            <span>{filteredPatients.length} patients</span>
            {filterCohort !== 'all' && (
              <span className="text-blue-600">
                Filtered by Cohort: {filterCohort}
              </span>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {visibleColumns.demographics && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Patient ID</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">State</th>
                  </>
                )}
                {visibleColumns.currentStatus && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Current Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Sub-Stage</th>
                  </>
                )}
                {visibleColumns.risks && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Last Risk Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Last Risk Type</th>
                  </>
                )}
                {visibleColumns.deferrals && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Last Deferral Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Deferral Category</th>
                  </>
                )}
                {visibleColumns.kit && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Kit Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Kit Location</th>
                  </>
                )}
                {visibleColumns.rampOn && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Ramp On Stage</th>
                  </>
                )}
                {visibleColumns.program && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Program Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Live Attendance</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Cohort ID</th>
                  </>
                )}
                {visibleColumns.maintenance && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Maint. Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Payments</th>
                  </>
                )}
                {visibleColumns.rampOff && (
                  <>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Ramp Off Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Exit Category</th>
                  </>
                )}
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  {visibleColumns.demographics && (
                    <>
                      <td className="px-4 py-3 text-gray-900">{patient.id}</td>
                      <td className="px-4 py-3 text-gray-900">{patient.name}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.state}</td>
                    </>
                  )}
                  {visibleColumns.currentStatus && (
                    <>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stageColors[patient.currentStage]}`}>
                          {patient.currentStage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{patient.currentSubStage}</td>
                    </>
                  )}
                  {visibleColumns.risks && (
                    <>
                      <td className="px-4 py-3">
                        {patient.riskTickets.length > 0 ? (
                          <span className="text-red-700 font-medium">{patient.riskTickets[patient.riskTickets.length - 1].stage}</span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {patient.riskTickets.length > 0 ? patient.riskTickets[patient.riskTickets.length - 1].type : '—'}
                      </td>
                    </>
                  )}
                  {visibleColumns.deferrals && (
                    <>
                      <td className="px-4 py-3">
                        {patient.deferralTickets.length > 0 ? (
                          <span className="text-amber-700 font-medium">{patient.deferralTickets[patient.deferralTickets.length - 1].stage}</span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {patient.deferralTickets.length > 0 ? patient.deferralTickets[patient.deferralTickets.length - 1].category : '—'}
                      </td>
                    </>
                  )}
                  {visibleColumns.kit && (
                    <>
                      <td className="px-4 py-3 text-gray-700">{patient.kit.stage}</td>
                      <td className="px-4 py-3 text-gray-700">{patient.kit.location}</td>
                    </>
                  )}
                  {visibleColumns.rampOn && (
                    <>
                      <td className="px-4 py-3 text-gray-700">{patient.rampOn.stage}</td>
                    </>
                  )}
                  {visibleColumns.program && (
                    <>
                      <td className="px-4 py-3 text-gray-700">{patient.program.stage}</td>
                      <td className="px-4 py-3 text-gray-700">{patient.program.liveSessionAttendance}</td>
                      <td className="px-4 py-3 text-gray-700">{patient.program.cohortId}</td>
                    </>
                  )}
                  {visibleColumns.maintenance && (
                    <>
                      <td className="px-4 py-3 text-gray-700">{patient.maintenance?.stage || '—'}</td>
                      <td className="px-4 py-3 text-gray-700">{patient.maintenance?.payments || '—'}</td>
                    </>
                  )}
                  {visibleColumns.rampOff && (
                    <>
                      <td className="px-4 py-3 text-gray-700">{patient.rampOff?.stage || '—'}</td>
                      <td className="px-4 py-3 text-gray-700">{patient.rampOff?.exitCategory || '—'}</td>
                    </>
                  )}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedPatient(patient);
                        setView('patient');
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FunnelView;