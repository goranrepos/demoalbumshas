import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getAlbums } from './actions/album';
import useSearchAlbum from './useSearchAlbum';

const FilterForm = ({ getAlbums, pageNumber, pageLimit, resetPageNumber }) => {
  const [query, setQuery] = useState('');

  useSearchAlbum(query, pageNumber, pageLimit);

  const onChange = (e) => {
    resetPageNumber();
    setQuery(e.target.value);
  };

  return (
    <Fragment>
      <form>
        <div>
          <label htmlFor='query'>Search</label>
          <input
            type='text'
            placeholder='Search Album'
            name='query'
            value={query}
            onChange={onChange}
          />
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  album: state.album,
  state_artist: state.artist,
});

export default connect(mapStateToProps, { getAlbums })(FilterForm);
