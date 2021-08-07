import { useEffect, useReducer } from 'react';

import 'components/Application.scss';
import axios from 'axios';

export default () => {
  const [state, dispatch] = useReducer(
    (st, act) => {
      const day = st.days.find((d) => d.name === st.day);
      const re = {
        setDay: (day) => ({ ...st, day }),
        bookInterview: (id, interview) => {
          const upSt = {
            ...st,
            appointments: {
              ...st.appointments,
              [id]: {
                ...st.appointments[id],
                interview: { ...interview },
              },
            },
          };
          return {
            ...upSt,
            days: [
              ...upSt.days.map((d) => {
                if (d.id !== day.id) return d;
                return {
                  ...d,
                  spots:
                    !!day &&
                    Object.values(upSt.appointments)
                      .filter((a) => d.appointments.includes(a.id))
                      .filter((a) => a.interview === null).length,
                };
              }),
            ],
          };
        },
        deleteAppointment: (id) => {
          const upSt = {
            ...st,
            appointments: {
              ...st.appointments,
              [id]: { ...st.appointments[id], interview: null },
            },
          };
          return {
            ...upSt,
            days: [
              ...upSt.days.map((d) => {
                if (d.id !== day.id) return d;
                return {
                  ...d,
                  spots:
                    !!day &&
                    Object.values(upSt.appointments)
                      .filter((a) => d.appointments.includes(a.id))
                      .filter((a) => a.interview === null).length,
                };
              }),
            ],
          };
        },
        fetch: (d, a, i) => ({
          ...st,
          days: d.data,
          appointments: a.data,
          interviewers: i.data,
        }),
      };
      return re[act.type](...act.args);
    },
    {
      day: 'Monday',
      days: [],
      appointments: {},
      iws: {},
      interviewers: [],
    }
  );
  const setDay = (day) => dispatch({ type: 'setDay', args: [day] });
  const bookInterview = (id, interview) =>
    axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => dispatch({ type: 'bookInterview', args: [id, interview] }));
  const deleteAppointment = (id) =>
    axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: 'deleteAppointment', args: [id] }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(([d, a, i]) => dispatch({ type: 'fetch', args: [d, a, i] }))
      .catch((e) => {
        throw e;
      });
  }, []);
  return { state, setDay, bookInterview, deleteAppointment };
};
