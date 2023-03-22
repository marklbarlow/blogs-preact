import { format } from 'date-fns';
import createDOMPurify from 'dompurify';

import { BlogPreview } from '../model';

const DOMPurify = createDOMPurify(window);

export const Card = ({
  onReadClicked,
  preview,
}: {
  onReadClicked: (id: number) => void;
  preview: BlogPreview;
}) => {
  return (
    <div className="shadow-lg rounded-lg flex flex-col gap-2 p-4 border">
      <div data-testid="date" className="text-sm text-stone-500">
        {format(new Date(preview.timestamp), 'MMMM d, y')}
      </div>
      <h5 data-testid="title" className="text-2xl">
        {preview.title}
      </h5>
      <div
        data-testid="preview"
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(preview.text),
        }}
      ></div>
      <div>
        <button
          className="btn btn-outline"
          type="button"
          onClick={() => onReadClicked(preview.id)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};
