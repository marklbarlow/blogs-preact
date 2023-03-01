import { useEffect, useState } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';

import { BlogsAPI } from '../apis';
import { BlogPreview } from '../model';
import { Card } from './Card';

export const Home = () => {
  const [previews, setPreviews] = useState<BlogPreview[]>([]);
  const navigate = useNavigate();

  const onViewBlog = (id: number) => {
    navigate(`/view-blog/${id}`);
  };

  useEffect(() => {
    (async () => setPreviews(await BlogsAPI.loadBlogPreviews(5)))();
  }, []);

  const items = previews.map(preview => (
    <Card onReadClicked={onViewBlog} preview={preview} key={preview.id}></Card>
  ));

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-4">{items}</div>
    </section>
  );
};
