import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAlbums } from './actions/album';
import axios from 'axios';

const useSearchAlbum = (query, pageNumber, pageLimit) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('FilterForm:useEffect', query, pageNumber, pageLimit);
    let cancel; //cancel func
    var CancelToken = new axios.CancelToken((c) => (cancel = c));
    dispatch(getAlbums(pageNumber, pageLimit, query, CancelToken));
    return () => cancel();
  }, [pageNumber, pageLimit, query, dispatch]);

  return null;
};

export default useSearchAlbum;
