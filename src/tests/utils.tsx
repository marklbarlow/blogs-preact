import { render } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import type { InitialEntry } from '@remix-run/router';

import type { RenderOptions } from '@testing-library/preact';
import { ComponentChild } from 'preact';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialEntries?: InitialEntry[];
}

// export function renderWithProviders(
//   ui: React.ReactElement,
//   {
//     initialEntries = ['/'],

//     ...renderOptions
//   }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
//     return (
//       <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
//     );
//   }
//   return {
//     user: userEvent.setup(),
//     ...render(ui, { wrapper: Wrapper, ...renderOptions }),
//   };
// }

export function setup(ui: ComponentChild) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}
