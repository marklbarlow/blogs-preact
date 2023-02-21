import { BlogComment, BlogEntry, BlogLike, BlogPreview, User } from '../model';
import { Rest } from './Rest';

export const BlogsAPI = {
  addComment: async (
    blogId: number,
    text: string,
    userId: number
  ): Promise<void> =>
    await Rest.post<void>(`/blogs/${blogId}/comments`, { text, userId }),
  addLike: async (blogId: number, userId: number): Promise<void> =>
    await Rest.put<void>(`/blogs/${blogId}/likes/${userId}`, {}),
  loadBlogComments: async (blogId: number): Promise<BlogComment[]> =>
    await Rest.get<BlogComment[]>(`/blogs/${blogId}/comments`),
  loadBlogEntry: async (blogId: number): Promise<BlogEntry> =>
    await Rest.get<BlogEntry>(`/blogs/${blogId}`),
  loadBlogLikes: async (blogId: number): Promise<BlogLike[]> =>
    await Rest.get<BlogLike[]>(`/blogs/${blogId}/likes`),
  loadBlogPreviews: async (top: number = 5): Promise<BlogPreview[]> =>
    await Rest.get<BlogPreview[]>(`/blogs?top=${top}`),
  loadUsers: async (): Promise<User[]> => await Rest.get<User[]>('/users'),
  saveBlogEntry: async (
    title: string,
    text: string,
    userId: number
  ): Promise<void> => await Rest.post<void>('/blogs', { text, title, userId }),
  removeLike: async (blogId: number, userId: number): Promise<void> =>
    Rest.delete(`/blogs/${blogId}/likes/${userId}`),
};
