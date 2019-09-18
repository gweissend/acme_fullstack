import { combineReducers } from 'redux';
import { SET_USERS, SET_LOADING, DESTROY_USER, TOGGLE_ACTIVE } from './constants';

const loadingReducer = (state = false, action)=> {
  if(action.type === SET_LOADING){
    return action.loading;
  }
  return state;
};

const usersReducer = (state = [], action)=> {
  switch(action.type){
    case SET_USERS:
      return action.users;
      break;
    case DESTROY_USER:
      return state.filter(user => user.id !== action.user.id);
      break;
    case TOGGLE_ACTIVE:
      return state.map(user => {
        if (user.id === action.user.id) {
          return action.user;
        }
        return user;
      });
      break;
  }
  return state;
};

const reducer = combineReducers({
  loading: loadingReducer,
  users: usersReducer
});

export default reducer;
