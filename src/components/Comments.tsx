import { TextField } from '@mui/material';
import { format } from 'date-fns';
import { KeyboardEvent, useRef } from 'react';

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
    <div className="flex flex-col" key={comment.id}>
      <div className="flex flex-col rounded-lg bg-slate-200 p-2">
        <span className="font-bold">{comment.username}</span>
        <span>{comment.text}</span>
      </div>

      <small className="ml-2">
        <span className="text-stone-500">
          {format(new Date(comment.timestamp), 'MMMM d, y')} at{' '}
          {format(new Date(comment.timestamp), 'h:mm a')}
        </span>
      </small>
    </div>
  ));

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
};
