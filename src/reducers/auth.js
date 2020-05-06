export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
        id: action.id,
        permission: action.permission,
        subscribers: action.subscribers
      };
    case 'LOGOUT':
      return {};
    case 'SET_SUBSCRIBERS':
      return {
        ...state,
        subscribers: action.subscribers
      };
    default:
      return state;
  }
};
