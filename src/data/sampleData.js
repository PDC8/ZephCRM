// Sample data structures based on the spreadsheet requirements
export const STAGES = ['Ramp On', 'Kit', 'Program', 'Maintenance', 'Ramp Off'];

export const SUB_STAGES = {
  'Ramp On': ['Referred', 'Enrollment Attempted', 'Enrollment Completed', 'Onboarding Attempted', 'Onboarding Completed'],
  'Kit': ['Shipped From', 'Outbound Shipped', 'Outbound Delivered', 'Inbound Shipped', 'Inbound Delivered'],
  'Program': ['Active - Weeks 1-9', 'Active - Weeks 10-18', 'Active - Weeks 19-36'],
  'Maintenance': ['Month 1', 'Month 2', 'Month 3+'],
  'Ramp Off': ['Offboarding Attempted', 'Offboarding Completed', 'Exited']
};

export function generateSamplePatients(availableCohortIds) {
  return Array.from({ length: 25 }, (_, i) => {
    const stage = STAGES[Math.floor(Math.random() * STAGES.length)];
    const subStageList = SUB_STAGES[stage];
    const subStage = subStageList[Math.floor(Math.random() * subStageList.length)];
    const cohortId = availableCohortIds[Math.floor(Math.random() * availableCohortIds.length)];

    return {
      id: `P${1000 + i}`,
      name: `Patient ${i + 1}`,
      mrn: `MRN${5000 + i}`,
      clinicId: `CL${100 + Math.floor(Math.random() * 10)}`,
      state: ['AZ', 'CA', 'TX', 'NY', 'FL'][Math.floor(Math.random() * 5)],
      currentStage: stage,
      currentSubStage: subStage,
      cohortId: cohortId,
      lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),

      // Ramp On data (writeable)
      rampOn: {
        stage: 'Onboarding Completed',
        time: '45 Days',
        referred: '09/01/25',
        enrollmentAttempted: '09/03/25',
        enrollmentCompleted: '09/05/25',
        onboardingAttempted: '09/10/25',
        onboardingCompleted: '09/15/25'
      },

      // Kit data (writeable)
      kit: {
        stage: 'Inbound Delivered',
        time: '12 Days',
        location: 'Patient Home',
        kitId: `K${8000 + i}`,
        shippedFrom: 'Phoenix, AZ',
        outboundShipped: '09/16/25',
        outboundDelivered: '09/18/25',
        inboundRequestAttempted: '10/20/25',
        inboundShipped: '10/22/25',
        inboundDelivered: '10/25/25'
      },

      // Program data (writeable)
      program: {
        stage: 'Active - Week 12',
        time: '84 Days',
        liveSessionsAttended: Math.floor(Math.random() * 12),
        liveSessionsAvailable: 18,
        liveSessionAttendance: `${Math.floor(60 + Math.random() * 35)}%`,
        soloSessionsAttended: Math.floor(Math.random() * 8),
        soloSessionsAvailable: 8,
        soloSessionAttendance: `${Math.floor(50 + Math.random() * 45)}%`,
        cohortType: 'Group A',
        cohortId: cohortId,
        liveSessionType: '90 MINUTES',
        liveDays: 'M-W',
        liveTime: '2:00 PM',
        soloDays: 'Th',
        soloTime: '2:00 PM'
      },

      // Maintenance data (writeable)
      maintenance: Math.random() > 0.6 ? {
        stage: 'Month 3',
        time: '90 Days',
        payments: 3,
        liveSessionsAttended: Math.floor(Math.random() * 6),
        liveSessionAttendance: `${Math.floor(60 + Math.random() * 35)}%`,
        soloSessionsAttended: Math.floor(Math.random() * 12),
        soloSessionAttendance: `${Math.floor(50 + Math.random() * 45)}%`,
        cohortType: 'Group B',
        cohortId: cohortId,
        liveSessionType: '30 MINUTES',
        liveDays: 'T-Th',
        liveTime: '6:00 PM',
        soloDays: 'M-W-F',
        soloTime: '10:00 AM'
      } : null,

      // Ramp Off data (writeable)
      rampOff: Math.random() > 0.8 ? {
        stage: 'Offboarding Completed',
        time: '14 Days',
        offboardingAttempted: '10/28/25',
        offboardingCompleted: '10/30/25',
        exitCategory: 'Completed Program',
        exitDate: '10/30/25'
      } : null,

      // Risk tickets (can have multiple)
      riskTickets: Math.random() > 0.7 ? [{
        id: `RT${Math.floor(Math.random() * 10000)}`,
        stage: ['High Risk', 'Medium Risk', 'Low Risk'][Math.floor(Math.random() * 3)],
        time: '5 Days',
        type: ['Attendance', 'Engagement', 'Payment'][Math.floor(Math.random() * 3)],
        triggered: '10/15/25',
        mitigationAttempted: '10/16/25',
        mitigationCompleted: Math.random() > 0.5 ? '10/18/25' : null
      }] : [],

      // Deferral tickets (can have multiple)
      deferralTickets: Math.random() > 0.85 ? [{
        id: `DT${Math.floor(Math.random() * 10000)}`,
        stage: ['30 Days', '60 Days', '90 Days'][Math.floor(Math.random() * 3)],
        time: '15 Days',
        initiated: '10/01/25',
        category: ['Medical', 'Personal', 'Financial'][Math.floor(Math.random() * 3)],
        ended: Math.random() > 0.5 ? '10/15/25' : null,
        clinicAssistanceRequested: Math.random() > 0.5 ? '10/02/25' : null
      }] : []
    };
  });
}

export function generateSampleCohorts() {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `C${200 + i}`,
    cohortSize: Math.floor(4 + Math.random() * 8),
    cohortType: ['Group A', 'Group B', 'Group C'][Math.floor(Math.random() * 3)],
    liveSessionType: ['90 MINUTES', '60 MINUTES', '30 MINUTES'][Math.floor(Math.random() * 3)],
    liveDays: ['M-W', 'T-Th', 'M-W-F'][Math.floor(Math.random() * 3)],
    liveTime: ['9:00 AM', '2:00 PM', '6:00 PM'][Math.floor(Math.random() * 3)],
    patientsIds: []
  }));
}