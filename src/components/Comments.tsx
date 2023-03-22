import { format } from 'date-fns';
import { useRef } from 'preact/hooks';

import { BlogComment } from '../model';

export const Comments = ({
  comments,
  onCommentAdded,
}: {
  comments: BlogComment[];
  onCommentAdded: (comment: string) => void;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      onCommentAdded((event.target as HTMLTextAreaElement).value);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inputRef.current!.value = '';
    }
  };

  const renderedComments = comments?.map(comment => (
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
      <textarea
        className="form-textarea rounded-md border-gray-300 shadow-sm resize-none"
        rows={2}
        onKeyDown={onKeyDown}
        placeholder="Add a comment"
        ref={inputRef}
      ></textarea>
    </div>
  );
};
