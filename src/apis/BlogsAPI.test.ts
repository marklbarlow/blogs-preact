import { comments, entry, likes, previews, users } from 'tests';
import { afterEach, beforeEach, vi } from 'vitest';
import type { SpyInstance } from 'vitest';

import { BlogsAPI } from './BlogsAPI';
import { Rest } from './Rest';

describe('Blogs API', () => {
  let deleteSpy: SpyInstance;
  let getSpy: SpyInstance;
  let postSpy: SpyInstance;
  let putSpy: SpyInstance;

  beforeEach(() => {
    deleteSpy = vi.spyOn(Rest, 'delete');
    getSpy = vi.spyOn(Rest, 'get');
    postSpy = vi.spyOn(Rest, 'post');
    putSpy = vi.spyOn(Rest, 'put');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('addComment', () => {
    it('makes a POST request to add a comment', async () => {
      const blogId = 1;
      const text = 'This is a comment';
      const userId = 999;

      await BlogsAPI.addComment(blogId, text, userId);

      expect(postSpy).toHaveBeenCalledWith(`/blogs/${blogId}/comments`, {
        text,
        userId,
      });
    });
  });

  describe('addLike', () => {
    it('makes a PUT request to add a like', async () => {
      const blogId = 1;
      const userId = 999;

      await BlogsAPI.addLike(blogId, userId);

      expect(putSpy).toHaveBeenCalledWith(
        `/blogs/${blogId}/likes/${userId}`,
        {}
      );
    });
  });

  describe('loadBlogComments', () => {
    it('makes a GET request for the comments', async () => {
      const blogId = 1;

      const response = await BlogsAPI.loadBlogComments(blogId);
      expect(response).toEqual(comments);
      expect(getSpy).toHaveBeenCalledWith(`/blogs/${blogId}/comments`);
    });
  });

  describe('loadBlogEntry', () => {
    it('makes a GET request for the entry', async () => {
      const blogId = 1;

      const response = await BlogsAPI.loadBlogEntry(blogId);
      expect(response).toEqual(entry);
      expect(getSpy).toHaveBeenCalledWith(`/blogs/${blogId}`);
    });
  });

  describe('loadBlogLikes', () => {
    it('makes a GET request for the likes', async () => {
      const blogId = 1;

      const response = await BlogsAPI.loadBlogLikes(blogId);
      expect(response).toEqual(likes);
      expect(getSpy).toHaveBeenCalledWith(`/blogs/${blogId}/likes`);
    });
  });

  describe('loadBlogPreviews', () => {
    it('makes a GET request for the previews', async () => {
      const top = 10;

      const response = await BlogsAPI.loadBlogPreviews(top);
      expect(response).toEqual(previews);
      expect(getSpy).toHaveBeenCalledWith(`/blogs?top=${top}`);
    });
  });

  describe('loadUsers', () => {
    it('makes a GET request for the users', async () => {
      const response = await BlogsAPI.loadUsers();
      expect(response).toEqual(users);
      expect(getSpy).toHaveBeenCalledWith('/users');
    });
  });

  describe('saveBlogEntry', () => {
    it('makes a POST request to save a blog entry', async () => {
      const text = 'text';
      const title = 'title';
      const userId = 1;

      await BlogsAPI.saveBlogEntry(title, text, userId);
      expect(postSpy).toHaveBeenCalledWith('/blogs', { text, title, userId });
    });
  });

  describe('removeLike', () => {
    it('makes a DELETE request to remove a like', async () => {
      const blogId = 1;
      const userId = 999;

      await BlogsAPI.removeLike(blogId, userId);
      expect(deleteSpy).toHaveBeenCalledWith(
        `/blogs/${blogId}/likes/${userId}`
      );
    });
  });
});
