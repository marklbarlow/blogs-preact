export const Avatar = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <span data-testid="username"> by {username} </span>
    </div>
  );
};
