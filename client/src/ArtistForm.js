import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getArtists, updateArtist } from './actions/artist';
import { Link } from 'react-router-dom';

const initialState = {
  artist_id: '',
  new_artist_name: '',
};

const ArtistForm = ({
  getArtists,
  updateArtist,
  state_artist: { loading_artists, artists },
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const { artist_id, new_artist_name } = formData;

  useEffect(() => {
    //   updateArtistId();
    if (!loading_artists && artists.length > 0) {
      if (artist_id !== artists[0]._id) {
        setFormData({ ...formData, artist_id: artists[0]._id });
      }
    }
  }, [loading_artists, artists, artist_id, formData]);

  useEffect(() => {
    getArtists(1, 100);
  }, [getArtists]);

  const onChange = (e) => {
    //console.log('onchange', e.target.name, e.target.value);
    setFormData(() => {
      return { ...formData, [e.target.name]: e.target.value };
    });
    //console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log('submit');
    //console.log(formData);
    updateArtist(artist_id, new_artist_name, history, true);
  };
  //console.log('ArtistForm', artists);

  return (
    <Fragment>
      {loading_artists && artists.length > 0 ? (
        <p>Loading edit artist form...</p>
      ) : (
        <Fragment>
          <h1>Edit Artists</h1>
          <h2>Select Artist Name and update with new one</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor='artist_id'>Current Artist Name</label>
              <select
                id='artist_id'
                name='artist_id'
                value={artist_id}
                onChange={onChange}
                required
              >
                {artists.map((artist) => {
                  return (
                    <option key={artist.name} value={artist._id}>
                      {artist.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor='new_artist_name'>New Artist Name</label>
              <input
                type='text'
                placeholder='new_artist_name'
                name='new_artist_name'
                value={new_artist_name}
                onChange={onChange}
                required
              />
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
  state_artist: state.artist,
});

export default connect(mapStateToProps, {
  getArtists,
  updateArtist,
})(ArtistForm);
