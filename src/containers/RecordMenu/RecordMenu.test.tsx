import React from 'react';
import { render } from '../../shared/test-utils';
import RecordMenu from './RecordMenu';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<RecordMenu />);
    const recordMenu = getByText(/Play/i);
    expect(recordMenu).toBeInTheDocument();
  });

  test('renders learn react link', () => {
    const { getByText } = render(<RecordMenu />);
    const recordMenu = getByText(/Reset/i);
    expect(recordMenu).toBeInTheDocument();
  });

  test('renders learn react link', () => {
    const { getByText } = render(<RecordMenu />);
    const recordMenu = getByText(/Record/i);
    expect(recordMenu).toBeInTheDocument();
  });
});
