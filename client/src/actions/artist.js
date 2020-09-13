import {
  GET_ARTIST,
  GET_ARTISTS,
  ARTIST_ERROR,
  CLEAR_ARTISTS,
  CLEAR_ARTIST,
  ARTISTS_ERROR,
} from './types';
import axios from 'axios';

// Get all artists
export const getArtists = (pageNumber, pageLimit) => async (dispatch) => {
  dispatch({
    type: CLEAR_ARTISTS,
  });
  dispatch({
    type: CLEAR_ARTIST,
  });
  try {
    //let cancel; //cancel func
    let res = await axios({
      method: 'GET',
      url: '/api/artist',
      params: { page: pageNumber, limit: pageLimit },
      //create cancelToken by passing an executor func that receives the 'let cancel' func as param
      //cancelToken: new axios.CancelToken((c) => (cancel = c)),
    });
    //console.log('Action:getArtists:', res.data);

    dispatch({
      type: GET_ARTISTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    if (axios.isCancel(err)) return;
    dispatch({
      type: ARTISTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get album by Id
export const getArtistById = (artist_id) => async (dispatch) => {
  dispatch({
    type: CLEAR_ARTIST,
  });
  try {
    let res = await axios({
      method: 'GET',
      url: `/api/artist/${artist_id}`,
    });
    console.log('Action:getArtistById:res');
    console.log(res.data);

    //const res = await api.get(`/album/${album_id}`);

    dispatch({
      type: GET_ARTIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or Update Artist
export const updateArtist = (
  artist_id,
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    console.log('updateArtist', history);
    let res = await axios({
      method: 'put',
      url: `/api/artist/${artist_id}`,
      data: { name: formData.new_artist_name },
    });

    dispatch({
      type: GET_ARTIST,
      payload: res.data,
    });
    history.push('/');
  } catch (err) {
    console.log(err);
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
