import React from 'react';

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
});
