export const usersEndpoints = {
  list: '/users',
  details: (userId: string) => `/users/${userId}`,
};
