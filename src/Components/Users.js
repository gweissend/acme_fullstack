import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

const Users = ({ users, destroyUser })=> {
  return (
    <ul>
      {
        users.map( user => <li key={ user.id }>
          { user.name }
          <button onClick={()=> destroyUser(user)}>x</button>
        </li>)
      }
    </ul>
  );
};

export default connect(({ users }, { isActive })=> {
  return {
    users: isActive ? users.filter( user => user.active) : users
  };
}, (dispatch)=> {
  return {
    destroyUser: (user)=> dispatch(actions.destroyUser(user))
  };
})(Users);
