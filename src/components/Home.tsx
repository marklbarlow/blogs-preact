import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  List,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import createDOMPurify from 'dompurify';
import { useEffect, useState } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';

import { BlogsAPI } from '../apis';
import { BlogPreview } from '../model';

const DOMPurify = createDOMPurify(window);

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
    <Card elevation={8} sx={{ margin: '20px', minWidth: 275 }} key={preview.id}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {format(new Date(preview.timestamp), 'MMMM d, y')}
        </Typography>
        <Typography variant="h5" component="div">
          {preview.title}
        </Typography>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(preview.text),
          }}
        ></Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => onViewBlog(preview.id)}>Read More</Button>
      </CardActions>
    </Card>
  ));

  return (
    <Container maxWidth="md">
      <section>
        <List>{items}</List>
      </section>
    </Container>
  );
};
