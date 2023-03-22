import { BlogComment } from '../model';

export const comments: BlogComment[] = [
  {
    id: 1,
    text: 'Pellentesque tempus lobortis ligula in blandit. Fusce imperdiet imperdiet massa.',
    timestamp: new Date().toISOString(),
    userId: 1,
    username: 'John Smith',
  },
  {
    id: 2,
    text: 'Curabitur feugiat dui pellentesque nisi molestie, a pulvinar purus iaculis.',
    timestamp: new Date().toISOString(),
    userId: 4,
    username: 'Homer Simpson',
  },
  {
    id: 3,
    text: 'Quisque a rutrum leo. Nunc lacus dolor, aliquet at ex.',
    timestamp: new Date().toISOString(),
    userId: 2,
    username: 'Darth Vader',
  },
  {
    id: 4,
    text: 'Aliquam iaculis, ligula ut porta rutrum, lorem nisi fringilla tellus.',
    timestamp: new Date().toISOString(),
    userId: 3,
    username: 'John Snow',
  },
];
