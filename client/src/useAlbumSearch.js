import { useState, useEffect } from 'react';
import axios from 'axios';

const useAlbumSearch = (query, pageNumber, pageLimit) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  //reset books list everytime the query changes
  useEffect(() => {
    setAlbums([]);
  }, [query]);

  useEffect(() => {
    console.log('useEffect', loading);
    //set loading true since we are starting to load
    setLoading(true);
    // no error at the beginning
    setError(false);
    let cancel; //cancel func
    //run axios func that returns a promise that will resolve to either a response obj or error obj
    axios({
      method: 'GET',
      url: '/api/albums',
      params: { page: pageNumber, limit: pageLimit },
      //create cancelToken by passing an executor func that receives the 'let cancel' func as param
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setAlbums([...res.data.results]);
        res.data.next ? setHasMore(true) : setHasMore(false);
        ////setHasMore(res.data.docs.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        //check if axios promise has been cancelled and ingore it
        if (axios.isCancel(e)) return;
        setError(true);
      });
    //use return function to cleanup useEfffect before running it next time
    //cancel promise using axios cancel
    //everytime we cancel the promise we need to catch the error
    return () => cancel();
    //run useEffect everytime the query or the pageNumber changes
  }, [query, pageNumber]);

  return { loading, error, albums, hasMore };
};

export default useAlbumSearch;
