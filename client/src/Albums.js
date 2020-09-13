import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getAlbums } from './actions/album';
import { Link } from 'react-router-dom';
import FilterForm from './FilterForm';
import AlbumTable from './AlbumTable';

const Albums = ({
  getAlbums,
  album: { albums, loading_albums, error, hasMore },
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(3);

  function handleNext(e) {
    //setQuery(e.target.value);
    setPageNumber(pageNumber + 1);
  }

  function handlePrev(e) {
    //setQuery(e.target.value);
    setPageNumber(pageNumber - 1);
  }

  const resetPageNumber = () => {
    setPageNumber(1);
  };

  //console.log('Album', hasMore);

  return (
    <Fragment>
      <FilterForm
        pageNumber={pageNumber}
        pageLimit={pageLimit}
        resetPageNumber={resetPageNumber}
      />
      {loading_albums ? (
        <p>Loading albums...</p>
      ) : (
        <Fragment>
          {albums.length > 0 ? (
            <Fragment>
              <p>
                Found {albums.length} result{albums.length > 1 ? 's' : ''}
              </p>
              <AlbumTable albums={albums} loading_albums={loading_albums} />
              {pageNumber > 1 && (
                <button onClick={handlePrev}>Show prev albums</button>
              )}
              {hasMore && (
                <button onClick={handleNext}>Show next albums</button>
              )}
              <div>PageNumber {pageNumber}</div>
            </Fragment>
          ) : (
            <h4>No albums found...</h4>
          )}
          <div>
            <Link to={`/edit-album/`}>Add new Album</Link>
            <Link to={`/edit-artist/`}>Update Artist Names</Link>
          </div>
        </Fragment>
      )}
      {/* 
        <Fragment>
          {albums.length > 0 ? (
            <Fragment>
              <div>PageNumber {pageNumber}</div>

              
              {pageNumber > 1 && (
                <button onClick={handlePrev}>Show prev albums</button>
              )}
              {hasMore && (
                <button onClick={handleNext}>Show next albums</button>
              )}
              <div>PageNumber {pageNumber}</div>
              <div>
                <Link to={`/edit-album/`}>Add new Album</Link>
                <Link to={`/edit-artist/`}>Update Artist Names</Link>
              </div>
            </Fragment>
          ) : (
            <h4>No albums found...</h4>
          )}
        </Fragment>
      )} */}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  album: state.album,
  state_artist: state.artist,
});

export default connect(mapStateToProps, { getAlbums })(Albums);
