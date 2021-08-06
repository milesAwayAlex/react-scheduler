const getItemForDay = (key) => (st, dn) => {
  const day = st.days.find((d) => d.name === dn);
  if (!day) return [];
  return day[key].map((id) => st[key][id]);
};

export const getAppointmentsForDay = (state, dayName) =>
  getItemForDay('appointments')(state, dayName);

export const getInterviewersForDay = (state, dayName) =>
  getItemForDay('interviewers')(state, dayName);

export const getInterview = (state, iview) => {
  if (!iview) return null;
  const { student, interviewer } = iview;
  return { student, interviewer: state.interviewers[interviewer] };
};
