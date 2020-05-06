export const login = (user, id, permission, subscribers) => ({
  type: 'LOGIN',
  id,
  user,
  permission,
  subscribers
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setSubscribers = (subscribers) => ({
  type: 'SET_SUBSCRIBERS',
  subscribers
});