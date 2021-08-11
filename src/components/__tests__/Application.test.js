import React from 'react';
import axios from 'axios';

import {
  waitForElement,
  render,
  cleanup,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByDisplayValue,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);
describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    const { getByText, findAllByText } = render(<Application />);
    return (
      waitForElement(() => getByText('Monday'))
        .then(() => fireEvent.click(getByText('Tuesday')))
        // findAllBy... will throw for no matches, failing the test
        .then(() => findAllByText('Leopold Silvers', { exact: false }))
    );
  });

  it('loads data, books an interview and decrements the spots remaining for the first day', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, 'Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    const day = getAllByTestId(container, 'day').find((e) =>
      queryByText(e, 'Monday')
    );
    // getBy... will throw for no matches
    getByText(day, 'no spots remaining');
  });
  it('loads data, cancels an interview and increments the spots remaining for Monday', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // while finding the appointment with .find() is possible,
    // we are in control of the test data, so we can just select by index
    const appointment = getAllByTestId(container, 'appointment')[1];
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // wait for the empty spot to render
    await waitForElement(() => getByAltText(appointment, 'Add'));
    const day = getAllByTestId(container, 'day').find((e) =>
      queryByText(e, 'Monday')
    );
    // will throw for zero matches
    getByText(day, '2 spots remaining');
  });
  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[1];
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByDisplayValue(appointment, 'Archie Cohen'), {
      target: { value: 'Washington Irving' },
    });
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Washington Irving'));
    const day = getAllByTestId(container, 'day').find((e) =>
      queryByText(e, 'Monday')
    );
    // will throw for zero matches
    getByText(day, '1 spot remaining');
  });
  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[1];
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByDisplayValue(appointment, 'Archie Cohen'), {
      target: { value: 'Washington Irving' },
    });
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, 'error while saving', { exact: false })
    );
    fireEvent.click(getByAltText(appointment, 'Close'));
    fireEvent.click(getByText(appointment, 'Cancel'));
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const day = getAllByTestId(container, 'day').find((e) =>
      queryByText(e, 'Monday')
    );
    // will throw for zero matches
    getByText(day, '1 spot remaining');
  });
  it('shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[1];
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // wait for the empty spot to render
    await waitForElement(() =>
      getByText(appointment, 'Error while deleting', { exact: false })
    );
    fireEvent.click(getByAltText(appointment, 'Close'));
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const day = getAllByTestId(container, 'day').find((e) =>
      queryByText(e, 'Monday')
    );
    // will throw for zero matches
    getByText(day, '1 spot remaining');
  });
});
