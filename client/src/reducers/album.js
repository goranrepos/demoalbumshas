import {
  CLEAR_ALBUMS,
  GET_ALBUMS,
  ALBUMS_ERROR,
  CLEAR_ALBUM,
  GET_ALBUM,
  ALBUM_ERROR,
} from '../actions/types';

const initialState = {
  album: null,
  albums: [],
  hasMore: false,
  error: {},
  artist: null,
  loading_albums: true,
  loading_album: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_ALBUMS:
      return {
        ...state,
        albums: [],
        loading_albums: true,
        error: {},
      };
    case GET_ALBUMS:
      return {
        ...state,
        albums: payload.results,
        loading_albums: false,
        hasMore: payload.next ? true : false,
      };
    case ALBUMS_ERROR:
      return {
        ...state,
        error: payload,
        loading_albums: false,
        albums: [],
      };
    case CLEAR_ALBUM:
      return {
        ...state,
        album: null,
        loading_album: true,
        error: {},
      };
    case GET_ALBUM:
      return {
        ...state,
        album: payload,
        loading_album: false,
      };
    case ALBUM_ERROR:
      return {
        ...state,
        error: payload,
        loading_album: false,
        album: null,
      };

    default:
      return state;
  }
}
