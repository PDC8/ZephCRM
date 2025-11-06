import React, { useState } from 'react';
import { TrendingUp, Package, Calendar, Clock, LogOut, AlertCircle, Ticket, FileText, X, Plus } from 'lucide-react';
import FieldGroup from './FieldGroup';

const PatientView = ({ patient: initialPatient, onBack, patients, setPatients, stageColors }) => {
  const [activeTab, setActiveTab] = useState('information');
  const [editMode, setEditMode] = useState({});
  const [showNewRiskModal, setShowNewRiskModal] = useState(false);
  const [showNewDeferralModal, setShowNewDeferralModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(initialPatient);
  const [newRiskData, setNewRiskData] = useState({
    stage: 'Medium Risk',
    type: 'Attendance',
    mitigationAttempted: '',
    mitigationCompleted: ''
  });
    const [newDeferralData, setNewDeferralData] = useState({
    stage: '30 Days',
    category: 'Personal',
    ended: '',
    clinicAssistanceRequested: ''
  });

  const toggleEdit = (section) => setEditMode({ ...editMode, [section]: !editMode[section] });

  const handleCreateRiskTicket = () => {
    const newTicket = {
      id: `RT${Math.floor(Math.random() * 10000)}`,
      stage: newRiskData.stage,
      time: '0 Days',
      type: newRiskData.type,
      triggered: new Date().toLocaleDateString('en-US'),
      mitigationAttempted: newRiskData.mitigationAttempted || null,
      mitigationCompleted: newRiskData.mitigationCompleted || null
    };
    const updatedPatient = { ...currentPatient, riskTickets: [...currentPatient.riskTickets, newTicket] };
    setCurrentPatient(updatedPatient);
    setPatients(patients.map(p => p.id === currentPatient.id ? updatedPatient : p));
    setShowNewRiskModal(false);
    setNewRiskData({ stage: 'Medium Risk', type: 'Attendance', mitigationAttempted: '', mitigationCompleted: '' });
  };

  const handleCreateDeferralTicket = () => {
    const newTicket = {
      id: `DT${Math.floor(Math.random() * 10000)}`,
      stage: newDeferralData.stage,
      time: '0 Days',
      initiated: new Date().toLocaleDateString('en-US'),
      category: newDeferralData.category,
      ended: newDeferralData.ended || null,
      clinicAssistanceRequested: newDeferralData.clinicAssistanceRequested || null
    };
    const updatedPatient = { ...currentPatient, deferralTickets: [...currentPatient.deferralTickets, newTicket] };
    setCurrentPatient(updatedPatient);
    setPatients(patients.map(p => p.id === currentPatient.id ? updatedPatient : p));
    setShowNewDeferralModal(false);
    setNewDeferralData({ stage: '30 Days', category: 'Personal', ended: '', clinicAssistanceRequested: '' });
  };

  const tabs = [
    { id: 'information', label: 'Information', icon: FileText },
    { id: 'rampOn', label: 'Ramp On', icon: TrendingUp },
    { id: 'kit', label: 'Kit', icon: Package },
    { id: 'program', label: 'Program', icon: Calendar },
    { id: 'maintenance', label: 'Maintenance', icon: Clock },
    { id: 'rampOff', label: 'Ramp Off', icon: LogOut },
    { id: 'risks', label: 'Risk Tickets', icon: AlertCircle },
    { id: 'deferrals', label: 'Deferral Tickets', icon: Ticket }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'information':
        return (
          <FieldGroup
            title="Patient Information"
            section="information"
            isEditing={!!editMode['information']}
            onToggleEdit={toggleEdit}
            fields={[
              { label: 'Patient ID', key: 'id', value: currentPatient.id, readonly: true },
              { label: 'Name', key: 'name', value: currentPatient.name, readonly: false },
              { label: 'MRN', key: 'mrn', value: currentPatient.mrn, readonly: false },
              { label: 'Clinic ID', key: 'clinicId', value: currentPatient.clinicId, readonly: false },
              { label: 'State', key: 'state', value: currentPatient.state, readonly: false }
            ]}
          />
        );

      case 'rampOn':
        return (
          <FieldGroup
            title="Ramp On Details"
            section="rampOn"
            isEditing={!!editMode['rampOn']}
            onToggleEdit={toggleEdit}
            fields={[
              { label: 'Stage', key: 'stage', value: currentPatient.rampOn.stage, readonly: true },
              { label: 'Time in Stage', key: 'time', value: currentPatient.rampOn.time, readonly: true },
              { label: 'Referred', key: 'referred', value: currentPatient.rampOn.referred, readonly: false },
              { label: 'Enrollment Attempted', key: 'enrollmentAttempted', value: currentPatient.rampOn.enrollmentAttempted, readonly: false },
              { label: 'Enrollment Completed', key: 'enrollmentCompleted', value: currentPatient.rampOn.enrollmentCompleted, readonly: false },
              { label: 'Onboarding Attempted', key: 'onboardingAttempted', value: currentPatient.rampOn.onboardingAttempted, readonly: false },
              { label: 'Onboarding Completed', key: 'onboardingCompleted', value: currentPatient.rampOn.onboardingCompleted, readonly: false }
            ]}
          />
        );

      case 'kit':
        return (
          <FieldGroup
            title="Kit Tracking"
            section="kit"
            isEditing={!!editMode['kit']}
            onToggleEdit={toggleEdit}
            fields={[
              { label: 'Stage', key: 'stage', value: currentPatient.kit.stage, readonly: true },
              { label: 'Time in Stage', key: 'time', value: currentPatient.kit.time, readonly: true },
              { label: 'Location', key: 'location', value: currentPatient.kit.location, readonly: true },
              { label: 'Kit ID', key: 'kitId', value: currentPatient.kit.kitId, readonly: false },
              { label: 'Shipped From', key: 'shippedFrom', value: currentPatient.kit.shippedFrom, readonly: false },
              { label: 'Outbound Shipped', key: 'outboundShipped', value: currentPatient.kit.outboundShipped, readonly: false },
              { label: 'Outbound Delivered', key: 'outboundDelivered', value: currentPatient.kit.outboundDelivered, readonly: false },
              { label: 'Inbound Request Attempted', key: 'inboundRequestAttempted', value: currentPatient.kit.inboundRequestAttempted, readonly: false },
              { label: 'Inbound Shipped', key: 'inboundShipped', value: currentPatient.kit.inboundShipped, readonly: false },
              { label: 'Inbound Delivered', key: 'inboundDelivered', value: currentPatient.kit.inboundDelivered, readonly: false }
            ]}
          />
        );

      case 'program':
        return (
          <FieldGroup
            title="Program Progress"
            section="program"
            isEditing={!!editMode['program']}
            onToggleEdit={toggleEdit}
            fields={[
              { label: 'Stage', key: 'stage', value: currentPatient.program.stage, readonly: true },
              { label: 'Time in Program', key: 'time', value: currentPatient.program.time, readonly: true },
              { label: 'Live Sessions Attended', key: 'liveSessionsAttended', value: currentPatient.program.liveSessionsAttended, readonly: true },
              { label: 'Live Sessions Available', key: 'liveSessionsAvailable', value: currentPatient.program.liveSessionsAvailable, readonly: true },
              { label: 'Live Session Attendance', key: 'liveSessionAttendance', value: currentPatient.program.liveSessionAttendance, readonly: true },
              { label: 'Solo Sessions Attended', key: 'soloSessionsAttended', value: currentPatient.program.soloSessionsAttended, readonly: true },
              { label: 'Solo Sessions Available', key: 'soloSessionsAvailable', value: currentPatient.program.soloSessionsAvailable, readonly: true },
              { label: 'Solo Session Attendance', key: 'soloSessionAttendance', value: currentPatient.program.soloSessionAttendance, readonly: true },
              { label: 'Cohort Type', key: 'cohortType', value: currentPatient.program.cohortType, readonly: false },
              { label: 'Cohort ID', key: 'cohortId', value: currentPatient.program.cohortId, readonly: false },
              { label: 'Live Session Type', key: 'liveSessionType', value: currentPatient.program.liveSessionType, readonly: false },
              { label: 'Live Days', key: 'liveDays', value: currentPatient.program.liveDays, readonly: false },
              { label: 'Live Time', key: 'liveTime', value: currentPatient.program.liveTime, readonly: false },
              { label: 'Solo Days', key: 'soloDays', value: currentPatient.program.soloDays, readonly: false },
              { label: 'Solo Time', key: 'soloTime', value: currentPatient.program.soloTime, readonly: false }
            ]}
          />
        );

      case 'maintenance':
        if (!currentPatient.maintenance) {
          return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600">Patient has not entered Maintenance phase yet</p>
            </div>
          );
        }
        return (
          <FieldGroup
            title="Maintenance Phase"
            section="maintenance"
            isEditing={!!editMode['maintenance']}
            onToggleEdit={toggleEdit}
            fields={[
              { label: 'Stage', key: 'stage', value: currentPatient.maintenance.stage, readonly: true },
              { label: 'Time in Maintenance', key: 'time', value: currentPatient.maintenance.time, readonly: true },
              { label: 'Payments Made', key: 'payments', value: currentPatient.maintenance.payments, readonly: true },
              { label: 'Live Sessions Attended', key: 'liveSessionsAttended', value: currentPatient.maintenance.liveSessionsAttended, readonly: true },
              { label: 'Live Session Attendance', key: 'liveSessionAttendance', value: currentPatient.maintenance.liveSessionAttendance, readonly: true },
              { label: 'Solo Sessions Attended', key: 'soloSessionsAttended', value: currentPatient.maintenance.soloSessionsAttended, readonly: true },
              { label: 'Solo Session Attendance', key: 'soloSessionAttendance', value: currentPatient.maintenance.soloSessionAttendance, readonly: true },
              { label: 'Cohort Type', key: 'cohortType', value: currentPatient.maintenance.cohortType, readonly: false },
              { label: 'Cohort ID', key: 'cohortId', value: currentPatient.maintenance.cohortId, readonly: false },
              { label: 'Live Session Type', key: 'liveSessionType', value: currentPatient.maintenance.liveSessionType, readonly: false },
              { label: 'Live Days', key: 'liveDays', value: currentPatient.maintenance.liveDays, readonly: false },
              { label: 'Live Time', key: 'liveTime', value: currentPatient.maintenance.liveTime, readonly: false },
              { label: 'Solo Days', key: 'soloDays', value: currentPatient.maintenance.soloDays, readonly: false },
              { label: 'Solo Time', key: 'soloTime', value: currentPatient.maintenance.soloTime, readonly: false }
            ]}
          />
        );

      case 'rampOff':
        if (!currentPatient.rampOff) {
          return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600">Patient has not entered Ramp Off phase yet</p>
            </div>
          );
        }
        return (
          <FieldGroup
            title="Ramp Off Details"
            section="rampOff"
            isEditing={!!editMode['rampOff']}
            onToggleEdit={toggleEdit}
            fields={[
              { label: 'Stage', key: 'stage', value: currentPatient.rampOff.stage, readonly: true },
              { label: 'Time in Stage', key: 'time', value: currentPatient.rampOff.time, readonly: true },
              { label: 'Offboarding Attempted', key: 'offboardingAttempted', value: currentPatient.rampOff.offboardingAttempted, readonly: false },
              { label: 'Offboarding Completed', key: 'offboardingCompleted', value: currentPatient.rampOff.offboardingCompleted, readonly: false },
              { label: 'Exit Category', key: 'exitCategory', value: currentPatient.rampOff.exitCategory, readonly: false },
              { label: 'Exit Date', key: 'exitDate', value: currentPatient.rampOff.exitDate, readonly: false }
            ]}
          />
        );

      case 'risks':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Risk Tickets</h3>
              <button 
                onClick={() => setShowNewRiskModal(true)}
                className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                New Risk Ticket
              </button>
            </div>

            {currentPatient.riskTickets.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <p className="text-green-800">No risk tickets for this patient</p>
              </div>
            ) : (
              currentPatient.riskTickets.map((ticket, idx) => (
                <div key={ticket.id} className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-red-900">Risk Ticket #{ticket.id}</h4>
                      <p className="text-sm text-red-700">Stage: {ticket.stage}</p>
                    </div>
                    <button
                      onClick={() => toggleEdit(`risk-${idx}`)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium"
                    >
                      {editMode[`risk-${idx}`] ? 'Save' : 'Edit'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Risk Stage', value: ticket.stage, readonly: true },
                      { label: 'Time', value: ticket.time, readonly: true },
                      { label: 'Risk Type', value: ticket.type, readonly: true },
                      { label: 'Triggered', value: ticket.triggered, readonly: true },
                      { label: 'Mitigation Attempted', value: ticket.mitigationAttempted, readonly: false },
                      { label: 'Mitigation Completed', value: ticket.mitigationCompleted, readonly: false }
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                          {field.readonly ? (
                            <span className="ml-1 text-xs text-gray-500">(Read-only)</span>
                          ) : (
                            <span className="ml-1 text-xs text-blue-600">(Writeable)</span>
                          )}
                        </label>
                        {editMode[`risk-${idx}`] && !field.readonly ? (
                          <input
                            type="text"
                            defaultValue={field.value}
                            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                          />
                        ) : (
                          <div className={`px-3 py-2 rounded-md ${field.readonly ? 'bg-gray-50 text-gray-700' : 'bg-white border text-gray-900'}`}>
                            {field.value || 'N/A'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            {/* New Risk Ticket Modal */}
            {showNewRiskModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                  <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Risk Ticket</h2>
                    <button onClick={() => setShowNewRiskModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Risk Stage</label>
                        <select
                          value={newRiskData.stage}
                          onChange={(e) => setNewRiskData({...newRiskData, stage: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>High Risk</option>
                          <option>Medium Risk</option>
                          <option>Low Risk</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Risk Type</label>
                        <select
                          value={newRiskData.type}
                          onChange={(e) => setNewRiskData({...newRiskData, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Attendance</option>
                          <option>Engagement</option>
                          <option>Payment</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mitigation Attempted</label>
                        <input
                          type="date"
                          value={newRiskData.mitigationAttempted}
                          onChange={(e) => setNewRiskData({...newRiskData, mitigationAttempted: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mitigation Completed</label>
                        <input
                          type="date"
                          value={newRiskData.mitigationCompleted}
                          onChange={(e) => setNewRiskData({...newRiskData, mitigationCompleted: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t flex gap-3">
                      <button 
                        onClick={handleCreateRiskTicket}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition font-medium"
                      >
                        Create Risk Ticket
                      </button>
                      <button 
                        onClick={() => setShowNewRiskModal(false)}
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

      case 'deferrals':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Deferral Tickets</h3>
              <button 
                onClick={() => setShowNewDeferralModal(true)}
                className="bg-amber-600 text-white px-3 py-2 rounded-md hover:bg-amber-700 text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                New Deferral Ticket
              </button>
            </div>

            {currentPatient.deferralTickets.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <p className="text-green-800">No deferral tickets for this patient</p>
              </div>
            ) : (
              currentPatient.deferralTickets.map((ticket, idx) => (
                <div key={ticket.id} className="bg-amber-50 border-2 border-amber-200 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-amber-900">Deferral Ticket #{ticket.id}</h4>
                      <p className="text-sm text-amber-700">Duration: {ticket.stage}</p>
                    </div>
                    <button
                      onClick={() => toggleEdit(`deferral-${idx}`)}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 text-sm font-medium"
                    >
                      {editMode[`deferral-${idx}`] ? 'Save' : 'Edit'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Deferral Stage', value: ticket.stage, readonly: true },
                      { label: 'Time', value: ticket.time, readonly: true },
                      { label: 'Initiated', value: ticket.initiated, readonly: true },
                      { label: 'Category', value: ticket.category, readonly: false },
                      { label: 'Ended', value: ticket.ended, readonly: false },
                      { label: 'Clinic Assistance Requested', value: ticket.clinicAssistanceRequested, readonly: false }
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                          {field.readonly ? (
                            <span className="ml-1 text-xs text-gray-500">(Read-only)</span>
                          ) : (
                            <span className="ml-1 text-xs text-blue-600">(Writeable)</span>
                          )}
                        </label>
                        {editMode[`deferral-${idx}`] && !field.readonly ? (
                          <input
                            type="text"
                            defaultValue={field.value}
                            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                          />
                        ) : (
                          <div className={`px-3 py-2 rounded-md ${field.readonly ? 'bg-gray-50 text-gray-700' : 'bg-white border text-gray-900'}`}>
                            {field.value || 'N/A'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            {/* New Deferral Ticket Modal */}
            {showNewDeferralModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                  <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Deferral Ticket</h2>
                    <button onClick={() => setShowNewDeferralModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deferral Stage</label>
                        <select
                          value={newDeferralData.stage}
                          onChange={(e) => setNewDeferralData({...newDeferralData, stage: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>30 Days</option>
                          <option>60 Days</option>
                          <option>90 Days</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={newDeferralData.category}
                          onChange={(e) => setNewDeferralData({...newDeferralData, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Medical</option>
                          <option>Personal</option>
                          <option>Financial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ended</label>
                        <input
                          type="date"
                          value={newDeferralData.ended}
                          onChange={(e) => setNewDeferralData({...newDeferralData, ended: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Assistance Requested</label>
                        <input
                          type="date"
                          value={newDeferralData.clinicAssistanceRequested}
                          onChange={(e) => setNewDeferralData({...newDeferralData, clinicAssistanceRequested: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t flex gap-3">
                      <button 
                        onClick={handleCreateDeferralTicket}
                        className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition font-medium"
                      >
                        Create Deferral Ticket
                      </button>
                      <button 
                        onClick={() => setShowNewDeferralModal(false)}
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

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
          ← Back to Funnel
        </button>
        <div className="h-6 w-px bg-gray-300" />
        <h2 className="text-2xl font-bold text-gray-900">{currentPatient.name}</h2>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${stageColors[currentPatient.currentStage]}`}>
          {currentPatient.currentStage}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition whitespace-nowrap ${
                    isActive
                      ? 'border-blue-600 text-blue-600 font-medium bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientView;