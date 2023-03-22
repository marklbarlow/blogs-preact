import { useNavigate } from 'react-router-dom';

import { User } from '../model';

export const NavBar = ({
  availableUsers,
  className,
  onSelectUser,
  selectedUser,
}: {
  availableUsers: User[];
  className?: string;
  onSelectUser: (user: User) => void;
  selectedUser?: User;
}) => {
  const navigate = useNavigate();

  const onChangeUser = (event: Event) => {
    if (event.target) {
      const target = event.target as EventTarget & {
        value: string;
        name: string;
      };
      onSelectUser(JSON.parse(target.value) as User);
    }
  };

  const onEditBlog = () => {
    navigate(`/edit-blog`);
  };

  return (
    <div
      className={`${
        className ?? ''
      } flex flex-row items-center gap-2 px-4 backdrop-blur border-b border-slate-900/10`}
    >
      <a className="text-xl font-mono text-decoration-none" href="/">
        Blog - Preact
      </a>

      <button
        className="btn btn-blue"
        type="button"
        onClick={() => onEditBlog()}
      >
        Create Blog Entry
      </button>
      <span className="flex-auto"></span>
      <span>Impersonating user:</span>

      <select
        className="form-select rounded-md border-gray-300 shadow-sm"
        data-testid="user"
        key={selectedUser?.id}
        value={selectedUser ? JSON.stringify(selectedUser) : ''}
        placeholder="User"
        onChange={onChangeUser}
      >
        {availableUsers.map(user => (
          <option key={user.id} value={JSON.stringify(user)}>
            {user.name}
          </option>
        ))}
      </select>

      <button
        className="btn btn-blue"
        onClick={() =>
          (location.href =
            'https://victorious-tree-0f7138003.2.azurestaticapps.net')
        }
      >
        Angular
      </button>

      <button
        className="btn btn-blue"
        onClick={() =>
          (location.href =
            'https://gray-beach-08c130f03.2.azurestaticapps.net/')
        }
      >
        React
      </button>
    </div>
  );
};
