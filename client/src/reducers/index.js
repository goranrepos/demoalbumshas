import { combineReducers } from 'redux';
import album from './album';
import artist from './artist';

export default combineReducers({
  album,
  artist,
});
