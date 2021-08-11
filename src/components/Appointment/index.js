import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const i = props.interview;
  const { mode, transition, back } = useVisualMode(i ? SHOW : EMPTY);
  const save = (student, interviewer) => {
    transition(SAVING);
    props
      .bookInterview(props.id, { student, interviewer })
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };
  const onDelete = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={i.student}
          interviewer={i.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === EDIT && (
        <Form
          name={i.student}
          interviewer={i.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onCancel={() => back()}
          onConfirm={onDelete}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={'Error while saving..'} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={'Error while deleting'} onClose={() => back()} />
      )}
    </article>
  );
}
