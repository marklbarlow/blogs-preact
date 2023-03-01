import { signal } from '@preact/signals';
import { createContext } from 'preact';

import { User } from './model';

export function createAppState() {
  const availableUsers = signal<User[]>([]);
  const selectedUser = signal<User | undefined>(undefined);

  return { availableUsers, selectedUser };
}

export const AppState = createContext(createAppState());
