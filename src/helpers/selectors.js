export const getAppointmentsForDay = (state, dayName) => {
  const day = state.days.find((d) => d.name === dayName);
  if (!day) return [];
  return day.appointments.map((id) => state.appointments[id]);
};
