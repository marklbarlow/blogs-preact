import './App.css';

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BlogsAPI } from './apis/BlogsAPI';
import { EditBlog, Home, ViewBlog } from './components';
import {
  selectAvailableUsers,
  selectSelectedUser,
  selectUser,
  setUsers,
} from './features/usersSlice';
import { User } from './model';
import { theme } from './theme';

export const App = () => {
  const availableUsers = useSelector(selectAvailableUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch();

  const onSelectUser = (event: SelectChangeEvent) => {
    const user = JSON.parse(event.target.value) as User;
    dispatch(selectUser({ user }));
  };

  useEffect(() => {
    (async () => {
      const users = await BlogsAPI.loadUsers();
      dispatch(setUsers({ users }));
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Blog
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Button href="/edit-blog" color="secondary" variant="contained">
                  Create Blog Entry
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1}>
                  <FormControl fullWidth>
                    <Select
                      variant="filled"
                      key={selectedUser?.id}
                      value={selectedUser ? JSON.stringify(selectedUser) : ''}
                      label="User"
                      onChange={onSelectUser}
                    >
                      {availableUsers.map(user => (
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
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box m={2}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-blog" element={<EditBlog />} />
            <Route path="/view-blog/:id" element={<ViewBlog />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
