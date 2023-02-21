import './Comments.css';

import { Stack, TextField } from '@mui/material';
import { format } from 'date-fns';
import { useRef } from 'preact/hooks';
import { KeyboardEvent } from 'react';

import { BlogComment } from '../model';

export const Comments = (props: {
  comments: BlogComment[];
  onCommentAdded: (comment: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      props.onCommentAdded((event.target as HTMLTextAreaElement).value);
      // @ts-ignore
      inputRef.current.value = '';
    }
  };

  const renderedComments = props.comments?.map(comment => (
    <Stack key={comment.id}>
      <Stack className="comment">
        <span className="user">{comment.username}</span>
        <span>{comment.text}</span>
      </Stack>

      <small className="indent">
        <span className="date">
          {format(new Date(comment.timestamp), 'MMMM d, y')} at{' '}
          {format(new Date(comment.timestamp), 'h:mm a')}
        </span>
      </small>
    </Stack>
  ));

  return (
    <Stack spacing={1}>
      {renderedComments}
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        variant="standard"
        minRows={1}
        maxRows={5}
        onKeyDown={onKeyDown}
        placeholder="Add a comment"
      />
    </Stack>
  );
};
