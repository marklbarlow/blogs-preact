import { SelectChangeEvent, ThemeProvider } from '@mui/material';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BlogsAPI } from './apis';
import { EditBlog, Home, NavBar, ViewBlog } from './components';
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
        <div className="flex flex-col h-full">
          <NavBar
            className="sticky top-0 z-50"
            availableUsers={availableUsers}
            onSelectUser={onSelectUser}
            selectedUser={selectedUser}
          ></NavBar>

          <div className="flex flex-col h-full container mx-auto max-w-4xl relative mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit-blog" element={<EditBlog />} />
              <Route path="/view-blog/:id" element={<ViewBlog />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
