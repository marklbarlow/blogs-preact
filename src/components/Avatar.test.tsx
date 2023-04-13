import { render, screen } from '@testing-library/preact';
import { describe, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the component', () => {
    render(<Avatar username="John Smith" />);
    expect(screen.getByTestId('username')).toHaveTextContent('by John Smith');
  });
});
