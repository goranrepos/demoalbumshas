import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AlbumTable = ({ albums, loading_albums }) => {
  return (
    <Fragment>
      {albums.length > 0 ? (
        <Fragment>
          <table>
            <thead>
              <tr>
                <th>Album</th>
                <th>Condition</th>
                <th>Year</th>
                <th>Artist</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album, index) => {
                return (
                  <tr key={album._id}>
                    <td>{album.album_title}</td>
                    <td>{album.condition}</td>
                    <td>{album.year}</td>
                    <td>{album.artist.name}</td>
                    <td>
                      <Link to={`/edit-album/${album._id}`}>
                        Edit Album Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Fragment>
      ) : (
        <h4>No albums found...</h4>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  album: state.album,
  state_artist: state.artist,
});

export default connect(mapStateToProps, null)(AlbumTable);
