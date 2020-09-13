import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { getAlbumById, updateAlbum } from './actions/album';
import { getArtists } from './actions/artist';
import { Link } from 'react-router-dom';

const initialState = {
  condition: '',
  album_title: '',
  year: '',
  artist_name: '',
};

const AlbumForm2 = ({
  getAlbumById,
  updateAlbum,
  getArtists,
  state_album: { loading_album, album },
  state_artist: { loading_artists, artists },
  match,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const fetchAlbumById = useCallback(() => {
    //console.log('fetchAlbumbyId');
    if (!album) getAlbumById(match.params.id);
    if (!loading_album && album && album.artist && album.artist.name) {
      // console.log('AlbumForm2:useEffect:album:if:', album, loading_album);
      const albumData = { ...initialState };
      for (const key in album) {
        if (key in albumData) albumData[key] = album[key];
      }
      setFormData({ ...albumData, artist_name: album.artist.name });
      //console.log('Albumform:fetchAlbumById:', album, album.artist.name);
      //console.log('formData', formData);
    }
  }, [loading_album, album, getAlbumById, match.params.id]);

  useEffect(() => {
    if (match.params.id) {
      fetchAlbumById();
    }
  }, [match.params.id, fetchAlbumById]);

  //const fetchPokemon = useCallback(() => {});

  const fetchArtists = useCallback(() => {
    getArtists(1, 100);
  }, [getArtists]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const { album_title, year, condition, artist_name } = formData;

  const onChange = (e) => {
    //console.log('onchange', e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log('submit');
    //console.log(formData);

    updateAlbum(match.params.id, formData, history, album ? true : false);
  };

  return (
    <Fragment>
      {loading_album && loading_artists ? (
        <p>Loading edit album form...</p>
      ) : (
        <Fragment>
          <h1>Edit Album details</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor='album_title'>Album Title</label>
              <input
                type='text'
                placeholder='Album Title'
                name='album_title'
                value={album_title}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor='condition'>Condition</label>
              <input
                type='text'
                placeholder='Condition'
                name='condition'
                value={condition}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor='year'>Year</label>
              <input
                type='text'
                placeholder='Year'
                name='year'
                value={year}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor='artist_name'>Artist</label>
              <select
                id='artist_name'
                name='artist_name'
                value={artist_name}
                onChange={onChange}
              >
                {artists.map((artist) => {
                  return (
                    <option key={artist.name} value={artist.name}>
                      {artist.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input type='submit' />
          </form>
          <Link to='/'>Go Back to Albums</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  state_album: state.album,
  state_artist: state.artist,
});

export default connect(mapStateToProps, {
  getAlbumById,
  updateAlbum,
  getArtists,
})(AlbumForm2);
