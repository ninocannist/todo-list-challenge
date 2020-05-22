import React from 'react';
import { render } from '@testing-library/react';
import Hello from './Hello';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<Hello compiler='ciaone' framework='bicca' />);
    const linkElement = getByText(/Hello from ciaone and bicca/i);
    expect(linkElement).toBeInTheDocument();
  });
});
