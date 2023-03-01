import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { User } from '../model';

export const NavBar = (props: {
  availableUsers: User[];
  className?: string;
  onSelectUser: (event: SelectChangeEvent) => void;
  selectedUser?: User;
}) => {
  return (
    <div
      className={`${
        props.className ?? ''
      } flex flex-row items-center gap-2 px-4 backdrop-blur border-b border-slate-900/10`}
    >
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Blog
      </Typography>

      <Button href="/edit-blog" color="secondary" variant="contained">
        Create Blog Entry
      </Button>
      <span className="flex-auto"></span>
      <span>Impersonating user:</span>
      <FormControl>
        <Select
          variant="filled"
          key={props.selectedUser?.id}
          value={props.selectedUser ? JSON.stringify(props.selectedUser) : ''}
          label="User"
          onChange={props.onSelectUser}
        >
          {props.availableUsers.map(user => (
            <MenuItem key={user.id} value={JSON.stringify(user)}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        href="https://victorious-tree-0f7138003.2.azurestaticapps.net"
        color="secondary"
        variant="contained"
      >
        View Angular Version
      </Button>
    </div>
  );
};
