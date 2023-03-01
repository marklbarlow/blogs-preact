import { Button } from '@mui/material';
import { format } from 'date-fns';
import createDOMPurify from 'dompurify';

import { BlogPreview } from '../model';

const DOMPurify = createDOMPurify(window);

export const Card = (props: {
  onReadClicked: (id: number) => void;
  preview: BlogPreview;
}) => {
  return (
    <div className="shadow-lg rounded-lg flex flex-col gap-2 p-4 border">
      <div className="text-sm text-stone-500">
        {format(new Date(props.preview.timestamp), 'MMMM d, y')}
      </div>
      <h5 className="text-2xl">{props.preview.title}</h5>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.preview.text),
        }}
      ></div>
      <div>
        <Button onClick={() => props.onReadClicked(props.preview.id)}>
          Read More
        </Button>
      </div>
    </div>
  );
};
