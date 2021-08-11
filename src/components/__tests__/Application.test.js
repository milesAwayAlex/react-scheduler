import React from 'react';

import {
  waitForElement,
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

it('defaults to Monday and changes the schedule when a new day is selected', () => {
  const { getByText, findAllByText } = render(<Application />);
  return (
    waitForElement(() => getByText('Monday'))
      .then(() => fireEvent.click(getByText('Tuesday')))
      // findAll will throw for no matches, failing the test
      .then(() => findAllByText('Leopold Silvers', { exact: false }))
  );
});
