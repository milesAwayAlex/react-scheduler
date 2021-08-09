import React from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';
import useAppData from 'hooks/useAppData';

export default function Application(props) {
  const { state, setDay, bookInterview, deleteAppointment } = useAppData();
  const { day, days } = state;
  const dailyAppointments = getAppointmentsForDay(state, day);
  const dailyInterviewers = getInterviewersForDay(state, day);
  const doAppointment = (appointment) => (
    <Appointment
      key={appointment.id}
      {...appointment}
      interview={getInterview(state, appointment.interview)}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={deleteAppointment}
    />
  );
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
