import { BlogLike } from '../model';

export const Likes = ({
  likes,
  onLikeToggled,
  userHasLiked,
}: {
  likes: BlogLike[];
  onLikeToggled: () => void;
  userHasLiked: boolean;
}) => {
  const iconClass = userHasLiked ? 'material-icons' : 'material-icons-outlined';

  const tooltip =
    likes.length > 0 ? `Liked by ${likes.map(x => x.username).join(', ')}` : '';

  return (
    likes && (
      <div className="flex gap-2">
        <button
          data-testid="icon"
          type="button"
          className={`cursor-pointer ${iconClass}`}
          onClick={onLikeToggled}
        >
          thumb_up
        </button>
        <div data-testid="tooltip" title={tooltip}>
          <span className="mt-1">{likes.length}</span>
        </div>
      </div>
    )
  );
};
