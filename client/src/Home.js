import React, { Fragment, useState } from 'react';
import useAlbumSearch from './useAlbumSearch';
import { Link } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(2);

  const { albums, hasMore, loading, error } = useAlbumSearch(
    query,
    pageNumber,
    pageLimit
  );

  function handleNext(e) {
    //setQuery(e.target.value);
    setPageNumber(pageNumber + 1);
  }

  function handlePrev(e) {
    //setQuery(e.target.value);
    setPageNumber(pageNumber - 1);
  }
  console.log(555);

  return (
    <Fragment>
      <div>PageNumber {pageNumber}</div>
      <table>
        <thead>
          <tr>
            <th>Album Title</th>
            <th>Condition</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album, index) => {
            return (
              <tr key={album._id}>
                <td>{album.album_title}</td>
                <td>{album.condition}</td>
                <td>{album.year}</td>
                <td>
                  <Link to={{ pathname: 'albumform', state: { album: album } }}>
                    Edit Album Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {pageNumber > 1 && <button onClick={handlePrev}>Show prev albums</button>}
      {hasMore && <button onClick={handleNext}>Show next albums</button>}
    </Fragment>
  );
};

export default Home;
