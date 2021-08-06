import React, { useEffect, useState } from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    iws: {},
  });
  const { day, days } = state;
  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, day);
  const doAppointment = (appointment) => {
    const iv = getInterview(state, appointment.interview);
    return <Appointment key={appointment.id} {...appointment} interview={iv} />;
  };

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
          iws: i.data,
        }));
      })
      .catch((e) => {
        throw e;
      });
  }, []);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} setValue={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments
          .map((a) => doAppointment(a))
          .concat(<Appointment key="last" time="5pm" />)}
      </section>
    </main>
  );
}
