import { DESTROY_USER, SET_USERS, SET_LOADING, TOGGLE_ACTIVE } from './constants';
import axios from 'axios';


const setUsers = (users)=> {
  return {
    users,
    type: SET_USERS
  };
};

const setLoading = (loading)=> {
  return {
    type: SET_LOADING,
    loading
  };
};

const _destroyUser = (user)=> {
  return {
    type: DESTROY_USER,
    user
  };
};

const _toggleActive = (user) => {
  return {
    type: TOGGLE_ACTIVE,
    user
  };
};

const fetchUsers = ()=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    const users = (await axios.get('/api/users')).data;
    dispatch(setLoading(false));
    return dispatch(setUsers(users));
  };
};

const destroyUser = (user)=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    await axios.delete(`/api/users/${user.id}`);
    dispatch(setLoading(false));
    return dispatch(_destroyUser(user));
  };
};

const toggleActive = (user) => {
  return async(dispatch) => {
    const _user = (await axios.put(`/api/users/${user.id}`, user.active)).data;
    return dispatch(_toggleActive(_user))
  };
};

export { fetchUsers, destroyUser, toggleActive };
