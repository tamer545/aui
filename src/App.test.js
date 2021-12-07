import { render, screen } from '@testing-library/react';
import AuiList from './AuiList';

test('renders learn react link', () => {
  render(<AuiList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
