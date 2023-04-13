import { render, screen } from '@testing-library/preact';
import { comments, setup } from 'tests';
import { describe, vi } from 'vitest';

import { Comments } from './Comments';

describe('Comments', () => {
  it('renders the component', () => {
    render(<Comments comments={comments} onCommentAdded={() => {}} />);
  });

  it('handles the comment addition', async () => {
    const handleCommentAdded = vi.fn((_: string) => {});
    const comment = 'Here is a new comment';
    const { user } = setup(
      <Comments comments={comments} onCommentAdded={handleCommentAdded} />
    );

    const input = screen.getByPlaceholderText('Add a comment');
    await user.type(input, comment);
    await user.keyboard('{Enter}');

    expect(handleCommentAdded).toHaveBeenCalledTimes(1);
    expect(handleCommentAdded).toHaveBeenCalledWith(comment);
  });
});
