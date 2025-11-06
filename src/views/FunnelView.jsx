
// views/FunnelView.jsx
import React from 'react';
import { Search } from 'lucide-react';
import ColumnFilterPanel from '../components/ColumnFilterPanel';
import StageBadge from '../components/StageBadge';

const FunnelView = ({
  patients, filteredPatients, searchTerm, setSearchTerm, visibleColumns, setVisibleColumns, onOpenPatient
}) => (
  <div className="space-y-4">
    <div className="notice-blue">
      <p className="text-sm text-blue-900">
        <strong>Read-Only View:</strong> This funnel aggregates all patient information from individual patient records.
        Use column filters to focus on specific data categories.
      </p>
    </div>

    <ColumnFilterPanel visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />

    <div className="card">
      <div className="card-section flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-primary pl-10"
            />
          </div>
        </div>
        <div className="text-sm muted">{filteredPatients.length} patients</div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="table-head">
            <tr>
              {visibleColumns.demographics && (<>
                <th className="th">Patient ID</th>
                <th className="th">Name</th>
                <th className="th">State</th>
              </>)}
              {visibleColumns.currentStatus && (<>
                <th className="th">Current Stage</th>
                <th className="th">Sub-Stage</th>
              </>)}
              {visibleColumns.risks && (<>
                <th className="th">Last Risk Stage</th>
                <th className="th">Last Risk Type</th>
              </>)}
              {visibleColumns.deferrals && (<>
                <th className="th">Last Deferral Stage</th>
                <th className="th">Deferral Category</th>
              </>)}
              {visibleColumns.kit && (<>
                <th className="th">Kit Stage</th>
                <th className="th">Kit Location</th>
              </>)}
              {visibleColumns.rampOn && (<th className="th">Ramp On Stage</th>)}
              {visibleColumns.program && (<>
                <th className="th">Program Stage</th>
                <th className="th">Live Attendance</th>
                <th className="th">Cohort ID</th>
              </>)}
              {visibleColumns.maintenance && (<>
                <th className="th">Maint. Stage</th>
                <th className="th">Payments</th>
              </>)}
              {visibleColumns.rampOff && (<>
                <th className="th">Ramp Off Stage</th>
                <th className="th">Exit Category</th>
              </>)}
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.map((p) => (
              <tr key={p.id} className="row">
                {visibleColumns.demographics && (<>
                  <td className="td text-gray-900">{p.id}</td>
                  <td className="td text-gray-900">{p.name}</td>
                  <td className="td text-gray-600">{p.state}</td>
                </>)}
                {visibleColumns.currentStatus && (<>
                  <td className="td"><StageBadge stage={p.currentStage} /></td>
                  <td className="td text-gray-700">{p.currentSubStage}</td>
                </>)}
                {visibleColumns.risks && (<>
                  <td className="td">
                    {p.riskTickets.length > 0
                      ? <span className="text-red-700 font-medium">{p.riskTickets.at(-1).stage}</span>
                      : <span className="muted-400">—</span>}
                  </td>
                  <td className="td text-gray-700">
                    {p.riskTickets.length > 0 ? p.riskTickets.at(-1).type : '—'}
                  </td>
                </>)}
                {visibleColumns.deferrals && (<>
                  <td className="td">
                    {p.deferralTickets.length > 0
                      ? <span className="text-amber-700 font-medium">{p.deferralTickets.at(-1).stage}</span>
                      : <span className="muted-400">—</span>}
                  </td>
                  <td className="td text-gray-700">
                    {p.deferralTickets.length > 0 ? p.deferralTickets.at(-1).category : '—'}
                  </td>
                </>)}
                {visibleColumns.kit && (<>
                  <td className="td text-gray-700">{p.kit.stage}</td>
                  <td className="td text-gray-700">{p.kit.location}</td>
                </>)}
                {visibleColumns.rampOn && (<td className="td text-gray-700">{p.rampOn.stage}</td>)}
                {visibleColumns.program && (<>
                  <td className="td text-gray-700">{p.program.stage}</td>
                  <td className="td text-gray-700">{p.program.liveSessionAttendance}</td>
                  <td className="td text-gray-700">{p.program.cohortId}</td>
                </>)}
                {visibleColumns.maintenance && (<>
                  <td className="td text-gray-700">{p.maintenance?.stage || '—'}</td>
                  <td className="td text-gray-700">{p.maintenance?.payments || '—'}</td>
                </>)}
                {visibleColumns.rampOff && (<>
                  <td className="td text-gray-700">{p.rampOff?.stage || '—'}</td>
                  <td className="td text-gray-700">{p.rampOff?.exitCategory || '—'}</td>
                </>)}
                <td className="td">
                  <button onClick={() => onOpenPatient(p)} className="btn-link">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default FunnelView;
