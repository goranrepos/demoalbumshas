import {
  GET_ALBUMS,
  ALBUM_ERROR,
  GET_ALBUM,
  //GET_ARTIST,
  //GET_ARTISTS,
  //ARTIST_ERROR,
  CLEAR_ALBUM,
  CLEAR_ALBUMS,
} from './types';
import axios from 'axios';

// Get all albums
export const getAlbums = (pageNumber, pageLimit, query, CancelToken) => async (
  dispatch
) => {
  dispatch({
    type: CLEAR_ALBUMS,
  });
  dispatch({
    type: CLEAR_ALBUM,
  });
  //console.log('getAlbums', pageNumber, pageLimit, query, cancel, CancelToken);
  try {
    let res = await axios({
      method: 'GET',
      url: '/api/album',
      params: { page: pageNumber, limit: pageLimit, query: query },
      //create cancelToken by passing an executor func that receives the 'let cancel' func as param
      cancelToken: CancelToken,
    });
    //console.log('Action:getAlbums:', res.data);

    dispatch({
      type: GET_ALBUMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    if (axios.isCancel(err)) return;
    dispatch({
      type: ALBUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get album by Id
export const getAlbumById = (album_id) => async (dispatch) => {
  dispatch({
    type: CLEAR_ALBUM,
  });
  try {
    let res = await axios({
      method: 'GET',
      url: `/api/album/${album_id}`,
    });
    //console.log('getAlbumById:res', res.data);

    //const res = await api.get(`/album/${album_id}`);

    dispatch({
      type: GET_ALBUM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ALBUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or Update Album
export const updateAlbum = (
  album_id,
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    //console.log('updatelbum', history);
    let res = await axios({
      method: 'put',
      url: `/api/album/${album_id}`,
      data: { ...formData },
    });

    dispatch({
      type: GET_ALBUM,
      payload: res.data,
    });
    history.push('/');
  } catch (err) {
    console.log(err);
    dispatch({
      type: ALBUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
