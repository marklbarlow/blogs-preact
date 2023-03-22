import { format } from 'date-fns';
import createDOMPurify from 'dompurify';
import { useCallback, useContext, useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';

import { BlogsAPI } from '../apis';
import { BlogComment, BlogEntry, BlogLike, User } from '../model';
import { AppState } from '../state';
import { Avatar } from './Avatar';
import { CircularProgress } from './CircularProgress';
import { Comments } from './Comments';
import { Likes } from './Likes';

const DOMPurify = createDOMPurify(window);

function includesUser(likes: BlogLike[], currentUser?: User): boolean {
  return (
    currentUser !== undefined &&
    likes.map(x => x.userId).includes(currentUser.id)
  );
}

export const ViewBlog = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [entry, setEntry] = useState<BlogEntry>();
  const [likes, setLikes] = useState<BlogLike[]>([]);
  const state = useContext(AppState);

  const userHasLiked = includesUser(likes, state.selectedUser.value);

  const loadBlogComments = useCallback(
    async (id: number) => setComments(await BlogsAPI.loadBlogComments(id)),
    []
  );

  const loadBlogLikes = useCallback(
    async (id: number) => setLikes(await BlogsAPI.loadBlogLikes(id)),
    []
  );

  const onLikeToggled = async () => {
    if (entry && state.selectedUser.value) {
      if (userHasLiked) {
        setLikes(likes.filter(x => x.userId !== state.selectedUser.value!.id));
        await BlogsAPI.removeLike(entry.id, state.selectedUser.value.id);
      } else {
        setLikes([
          ...likes,
          {
            blogEntryId: entry.id,
            userId: state.selectedUser.value.id,
            username: state.selectedUser.value.name,
          },
        ]);

        await BlogsAPI.addLike(entry.id, state.selectedUser.value.id);
      }

      await loadBlogLikes(entry.id);
    }
  };

  const onCommentAdded = async (comment: string) => {
    if (entry && state.selectedUser.value) {
      await BlogsAPI.addComment(entry.id, comment, state.selectedUser.value.id);
      await loadBlogComments(entry.id);
    }
  };

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id);
      (async () => {
        setEntry(await BlogsAPI.loadBlogEntry(idAsNumber));
        await loadBlogComments(idAsNumber);
        await loadBlogLikes(idAsNumber);
      })();
    }
  }, [id, loadBlogComments, loadBlogLikes]);

  return entry ? (
    <main className="flex flex-col gap-4 w-full mt-8">
      <span data-testid="date" className="text-stone-500">
        {format(new Date(entry.timestamp), 'EEEE, MMMM d, y')}
      </span>

      <h1 data-testid="title" className="text-4xl">
        {entry.title}
      </h1>
      <Avatar username={entry.username}></Avatar>

      <article className="prose prose-lg max-w-none prose-img:mx-auto">
        <div
          data-testid="text"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(entry.text),
          }}
        ></div>
      </article>
      <Likes
        likes={likes}
        onLikeToggled={onLikeToggled}
        userHasLiked={userHasLiked}
      />
      <Comments comments={comments} onCommentAdded={onCommentAdded} />
    </main>
  ) : (
    <div className="flex h-full items-center justify-center">
      <CircularProgress />
    </div>
  );
};
