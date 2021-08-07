import { useEffect, useState } from 'react';

import 'components/Application.scss';
import axios from 'axios';

export default () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    iws: {},
    interviewers: [],
  });
  const setDay = (day) => setState({ ...state, day });
  const bookInterview = (id, interview) =>
    axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        setState((s) => ({
          ...s,
          appointments: {
            ...s.appointments,
            [id]: {
              ...s.appointments[id],
              interview: { ...interview },
            },
          },
        }));
      });
  const deleteAppointment = (id) =>
    axios.delete(`/api/appointments/${id}`).then(() =>
      setState((s) => ({
        ...s,
        appointments: {
          ...s.appointments,
          [id]: { ...s.appointments[id], interview: null },
        },
      }))
    );

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(([d, a, i]) => {
        setState((s) => ({
          ...s,
          days: d.data,
          appointments: a.data,
          interviewers: i.data,
        }));
      })
      .catch((e) => {
        throw e;
      });
  }, []);
  return { state, setDay, bookInterview, deleteAppointment };
};
