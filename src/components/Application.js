import React, { useEffect, useState } from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Whatever',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 4,
    time: '3pm',
  },
  {
    id: 5,
    time: '4pm',
  },
];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });
  const { day, days } = state;
  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    const setDays = (days) => setState((s) => ({ ...s, days }));
    axios
      .get('/api/days')
      .then(({ data }) => setDays(data))
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
        {appointments
          .map((appointment) => (
            <Appointment key={appointment.id} {...appointment} />
          ))
          .concat(<Appointment key="last" time="5pm" />)}
      </section>
    </main>
  );
}
