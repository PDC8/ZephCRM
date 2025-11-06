
// views/PatientView.jsx
import React, { useState } from 'react';
import { FileText, TrendingUp, Calendar, Clock, LogOut, AlertCircle, Ticket, Plus } from 'lucide-react';
import Section from '../components/Section';
import StatBox from '../components/StatBox';
import { stageBadgeClass } from '../data/sampleData';

const PatientView = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState('information');
  const [editMode, setEditMode] = useState({});
  const toggleEdit = (section) => setEditMode((s) => ({ ...s, [section]: !s[section] }));

  const tabs = [
    { id: 'information', label: 'Information', icon: FileText },
    { id: 'rampOn', label: 'Ramp On', icon: TrendingUp },
    { id: 'kit', label: 'Kit', icon: Calendar },
    { id: 'program', label: 'Program', icon: Calendar },
    { id: 'maintenance', label: 'Maintenance', icon: Clock },
    { id: 'rampOff', label: 'Ramp Off', icon: LogOut },
    { id: 'risks', label: 'Risk Tickets', icon: AlertCircle },
    { id: 'deferrals', label: 'Deferral Tickets', icon: Ticket }
  ];

  const Group = ({ title, section, fields, readonly = false }) => {
    const editing = !!editMode[section];
    return (
      <Section
        title={title}
        action={!readonly && (
          <button onClick={() => toggleEdit(section)} className={editing ? 'btn bg-green-100 text-green-700 hover:bg-green-200' : 'btn bg-blue-100 text-blue-700 hover:bg-blue-200'}>
            {editing ? 'Save' : 'Edit'}
          </button>
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <StatBox key={f.key} label={f.label} value={f.value} readonly={f.readonly || readonly} editing={editing} />
          ))}
        </div>
      </Section>
    );
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'information':
        return <Group title="Patient Information" section="information" readonly fields={[
          { label: 'Patient ID', key: 'id', value: patient.id, readonly: true },
          { label: 'Name', key: 'name', value: patient.name },
          { label: 'MRN', key: 'mrn', value: patient.mrn },
          { label: 'Clinic ID', key: 'clinicId', value: patient.clinicId },
          { label: 'State', key: 'state', value: patient.state }
        ]}/>;
      case 'rampOn':
        return <Group title="Ramp On Details" section="rampOn" fields={[
          { label: 'Stage', key: 'stage', value: patient.rampOn.stage, readonly: true },
          { label: 'Time in Stage', key: 'time', value: patient.rampOn.time, readonly: true },
          { label: 'Referred', key: 'referred', value: patient.rampOn.referred },
          { label: 'Enrollment Attempted', key: 'enrollmentAttempted', value: patient.rampOn.enrollmentAttempted },
          { label: 'Enrollment Completed', key: 'enrollmentCompleted', value: patient.rampOn.enrollmentCompleted },
          { label: 'Onboarding Attempted', key: 'onboardingAttempted', value: patient.rampOn.onboardingAttempted },
          { label: 'Onboarding Completed', key: 'onboardingCompleted', value: patient.rampOn.onboardingCompleted }
        ]}/>;
      case 'kit':
        return <Group title="Kit Tracking" section="kit" fields={[
          { label: 'Stage', key: 'stage', value: patient.kit.stage, readonly: true },
          { label: 'Time in Stage', key: 'time', value: patient.kit.time, readonly: true },
          { label: 'Location', key: 'location', value: patient.kit.location, readonly: true },
          { label: 'Kit ID', key: 'kitId', value: patient.kit.kitId },
          { label: 'Shipped From', key: 'shippedFrom', value: patient.kit.shippedFrom },
          { label: 'Outbound Shipped', key: 'outboundShipped', value: patient.kit.outboundShipped },
          { label: 'Outbound Delivered', key: 'outboundDelivered', value: patient.kit.outboundDelivered },
          { label: 'Inbound Request Attempted', key: 'inboundRequestAttempted', value: patient.kit.inboundRequestAttempted },
          { label: 'Inbound Shipped', key: 'inboundShipped', value: patient.kit.inboundShipped },
          { label: 'Inbound Delivered', key: 'inboundDelivered', value: patient.kit.inboundDelivered }
        ]}/>;
      case 'program':
        return <Group title="Program Progress" section="program" fields={[
          { label: 'Stage', key: 'stage', value: patient.program.stage, readonly: true },
          { label: 'Time in Program', key: 'time', value: patient.program.time, readonly: true },
          { label: 'Live Sessions Attended', key: 'liveSessionsAttended', value: patient.program.liveSessionsAttended, readonly: true },
          { label: 'Live Sessions Available', key: 'liveSessionsAvailable', value: patient.program.liveSessionsAvailable, readonly: true },
          { label: 'Live Session Attendance', key: 'liveSessionAttendance', value: patient.program.liveSessionAttendance, readonly: true },
          { label: 'Solo Sessions Attended', key: 'soloSessionsAttended', value: patient.program.soloSessionsAttended, readonly: true },
          { label: 'Solo Sessions Available', key: 'soloSessionsAvailable', value: patient.program.soloSessionsAvailable, readonly: true },
          { label: 'Solo Session Attendance', key: 'soloSessionAttendance', value: patient.program.soloSessionAttendance, readonly: true },
          { label: 'Cohort Type', key: 'cohortType', value: patient.program.cohortType },
          { label: 'Cohort ID', key: 'cohortId', value: patient.program.cohortId },
          { label: 'Live Session Type', key: 'liveSessionType', value: patient.program.liveSessionType },
          { label: 'Live Days', key: 'liveDays', value: patient.program.liveDays },
          { label: 'Live Time', key: 'liveTime', value: patient.program.liveTime },
          { label: 'Solo Days', key: 'soloDays', value: patient.program.soloDays },
          { label: 'Solo Time', key: 'soloTime', value: patient.program.soloTime }
        ]}/>;
      case 'maintenance':
        if (!patient.maintenance) {
          return <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">Patient has not entered Maintenance phase yet</p>
          </div>;
        }
        return <Group title="Maintenance Phase" section="maintenance" fields={[
          { label: 'Stage', key: 'stage', value: patient.maintenance.stage, readonly: true },
          { label: 'Time in Maintenance', key: 'time', value: patient.maintenance.time, readonly: true },
          { label: 'Payments Made', key: 'payments', value: patient.maintenance.payments, readonly: true },
          { label: 'Live Sessions Attended', key: 'liveSessionsAttended', value: patient.maintenance.liveSessionsAttended, readonly: true },
          { label: 'Live Session Attendance', key: 'liveSessionAttendance', value: patient.maintenance.liveSessionAttendance, readonly: true },
          { label: 'Solo Sessions Attended', key: 'soloSessionsAttended', value: patient.maintenance.soloSessionsAttended, readonly: true },
          { label: 'Solo Session Attendance', key: 'soloSessionAttendance', value: patient.maintenance.soloSessionAttendance, readonly: true },
          { label: 'Cohort Type', key: 'cohortType', value: patient.maintenance.cohortType },
          { label: 'Cohort ID', key: 'cohortId', value: patient.maintenance.cohortId },
          { label: 'Live Session Type', key: 'liveSessionType', value: patient.maintenance.liveSessionType },
          { label: 'Live Days', key: 'liveDays', value: patient.maintenance.liveDays },
          { label: 'Live Time', key: 'liveTime', value: patient.maintenance.liveTime },
          { label: 'Solo Days', key: 'soloDays', value: patient.maintenance.soloDays },
          { label: 'Solo Time', key: 'soloTime', value: patient.maintenance.soloTime }
        ]}/>;
      case 'rampOff':
        if (!patient.rampOff) {
          return <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">Patient has not entered Ramp Off phase yet</p>
          </div>;
        }
        return <Group title="Ramp Off Details" section="rampOff" fields={[
          { label: 'Stage', key: 'stage', value: patient.rampOff.stage, readonly: true },
          { label: 'Time in Stage', key: 'time', value: patient.rampOff.time, readonly: true },
          { label: 'Offboarding Attempted', key: 'offboardingAttempted', value: patient.rampOff.offboardingAttempted },
          { label: 'Offboarding Completed', key: 'offboardingCompleted', value: patient.rampOff.offboardingCompleted },
          { label: 'Exit Category', key: 'exitCategory', value: patient.rampOff.exitCategory },
          { label: 'Exit Date', key: 'exitDate', value: patient.rampOff.exitDate }
        ]}/>;
      case 'risks':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Risk Tickets</h3>
              <button className="btn-danger text-sm flex items-center gap-2"><Plus size={16}/> New Risk Ticket</button>
            </div>
            {patient.riskTickets.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <p className="text-green-800">No risk tickets for this patient</p>
              </div>
            ) : (
              patient.riskTickets.map((t, idx) => {
                const editing = !!editMode[`risk-${idx}`];
                return (
                  <div key={t.id} className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-red-900">Risk Ticket #{t.id}</h4>
                        <p className="text-sm text-red-700">Stage: {t.stage}</p>
                      </div>
                      <button
                        onClick={() => toggleEdit(`risk-${idx}`)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium"
                      >
                        {editing ? 'Save' : 'Edit'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'Risk Stage', value: t.stage, readonly: true },
                        { label: 'Time', value: t.time, readonly: true },
                        { label: 'Risk Type', value: t.type, readonly: true },
                        { label: 'Triggered', value: t.triggered, readonly: true },
                        { label: 'Mitigation Attempted', value: t.mitigationAttempted },
                        { label: 'Mitigation Completed', value: t.mitigationCompleted }
                      ].map((f) => <StatBox key={f.label} label={f.label} value={f.value} readonly={f.readonly} editing={editing} />)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        );
      case 'deferrals':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Deferral Tickets</h3>
              <button className="btn-amber text-sm flex items-center gap-2"><Plus size={16}/> New Deferral Ticket</button>
            </div>
            {patient.deferralTickets.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <p className="text-green-800">No deferral tickets for this patient</p>
              </div>
            ) : (
              patient.deferralTickets.map((t, idx) => {
                const editing = !!editMode[`deferral-${idx}`];
                return (
                  <div key={t.id} className="bg-amber-50 border-2 border-amber-200 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-amber-900">Deferral Ticket #{t.id}</h4>
                        <p className="text-sm text-amber-700">Duration: {t.stage}</p>
                      </div>
                      <button
                        onClick={() => toggleEdit(`deferral-${idx}`)}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 text-sm font-medium"
                      >
                        {editing ? 'Save' : 'Edit'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'Deferral Stage', value: t.stage, readonly: true },
                        { label: 'Time', value: t.time, readonly: true },
                        { label: 'Initiated', value: t.initiated, readonly: true },
                        { label: 'Category', value: t.category },
                        { label: 'Ended', value: t.ended },
                        { label: 'Clinic Assistance Requested', value: t.clinicAssistanceRequested }
                      ].map((f) => <StatBox key={f.label} label={f.label} value={f.value} readonly={f.readonly} editing={editing} />)}
                    </div>
                  </div>
                );
              })
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
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">← Back to Funnel</button>
        <div className="divider" />
        <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
        <span className={stageBadgeClass[patient.currentStage] || 'badge-gray'}>{patient.currentStage}</span>
      </div>

      <div className="card">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={active ? 'btn-tab-active' : 'btn-tab-inactive'}
                >
                  <Icon size={18} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-6">{renderTab()}</div>
      </div>
    </div>
  );
};

export default PatientView;
