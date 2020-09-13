import {
  CLEAR_ARTISTS,
  GET_ARTISTS,
  ARTISTS_ERROR,
  CLEAR_ARTIST,
  GET_ARTIST,
  ARTIST_ERROR,
} from '../actions/types';

const initialState = {
  loading_artists: true,
  loading_artist: true,
  artist: null,
  artists: [],
  hasMore: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_ARTISTS:
      return {
        ...state,
        artists: [],
        loading_artists: true,
        error: {},
      };
    case GET_ARTISTS:
      return {
        ...state,
        artists: payload.results,
        loading_artists: false,
        hasMore: payload.next ? true : false,
      };
    case ARTISTS_ERROR:
      return {
        ...state,
        error: payload,
        loading_artists: false,
        artists: [],
      };
    case CLEAR_ARTIST:
      return {
        ...state,
        artist: null,
        loading_artist: true,
        error: {},
      };
    case GET_ARTIST:
      return {
        ...state,
        artist: payload,
        loading_artist: false,
      };
    case ARTIST_ERROR:
      return {
        ...state,
        error: payload,
        loading_artist: false,
        artist: null,
      };
    default:
      return state;
  }
}
