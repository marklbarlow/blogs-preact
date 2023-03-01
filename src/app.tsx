import { SelectChangeEvent, ThemeProvider } from '@mui/material';
import { useContext, useEffect } from 'preact/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BlogsAPI } from './apis';
import { EditBlog, Home, NavBar, ViewBlog } from './components';
import { User } from './model';
import { AppState } from './state';
import { theme } from './theme';

export const App = () => {
  const state = useContext(AppState);

  const onSelectUser = (event: SelectChangeEvent) => {
    if (event.target) {
      const target = event.target as EventTarget & {
        value: string;
        name: string;
      };
      state.selectedUser.value = JSON.parse(target.value) as User;
    }
  };

  useEffect(() => {
    (async () => {
      const users = await BlogsAPI.loadUsers();
      state.availableUsers.value = users;
      state.selectedUser.value = users[0];
    })();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="flex flex-col h-full">
          <NavBar
            className="sticky top-0 z-50"
            availableUsers={state.availableUsers.value}
            onSelectUser={onSelectUser}
            selectedUser={state.selectedUser.value}
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
