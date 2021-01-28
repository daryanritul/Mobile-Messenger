import {combineReducers} from 'redux';

import authReducer from './authReducer';
import friendsReducer from './friendsReducer';
import chatReducer from './chatReducer';

export default combineReducers({
  auth: authReducer,
  friends: friendsReducer,
  chats: chatReducer,
});
