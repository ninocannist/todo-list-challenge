import React from 'react';
import { render } from '@testing-library/react';
import RecordMenu from './RecordMenu';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<RecordMenu />);
    const recordMenu = getByText(/Record Menu/i);
    expect(recordMenu).toBeInTheDocument();
  });
});
