import { Icon, Tooltip } from '@mui/material';

import { BlogLike } from '../model';

export const Likes = (props: {
  likes: BlogLike[];
  onLikeToggled: () => void;
  userHasLiked: boolean;
}) => {
  const iconClass = props.userHasLiked
    ? 'material-icons'
    : 'material-icons-outlined';

  const tooltip =
    props.likes.length > 0
      ? `Liked by ${props.likes.map(x => x.username).join(', ')}`
      : '';

  return (
    props.likes && (
      <div className="flex gap-2">
        <Icon
          className="cursor-pointer"
          baseClassName={iconClass}
          onClick={props.onLikeToggled}
        >
          thumb_up
        </Icon>
        <Tooltip title={tooltip}>
          <span className="mt-1">{props.likes.length}</span>
        </Tooltip>
      </div>
    )
  );
};
