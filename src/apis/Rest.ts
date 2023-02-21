const baseURL = 'https://blogsapi.azurewebsites.net/Blogs';

export const Rest = {
  delete: async <T>(url: string): Promise<T> =>
    (
      await fetch(`${baseURL}${url}`, {
        credentials: 'include',
        method: 'DELETE',
      })
    ).json(),
  get: async <T>(url: string): Promise<T> =>
    (
      await fetch(`${baseURL}${url}`, {
        credentials: 'include',
        method: 'GET',
      })
    ).json(),
  post: async <T>(url: string, data: unknown): Promise<T> =>
    (
      await fetch(`${baseURL}${url}`, {
        body: JSON.stringify(data),
        credentials: 'include',
        method: 'POST',
      })
    ).json(),
  put: async <T>(url: string, data: unknown): Promise<T> =>
    (
      await fetch(`${baseURL}${url}`, {
        body: JSON.stringify(data),
        credentials: 'include',
        method: 'PUT',
      })
    ).json(),
};
