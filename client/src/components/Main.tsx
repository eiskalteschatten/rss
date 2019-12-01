import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';

import { dispatch } from '../store';
import { articleGetAllUnread } from '../store/actions/articleActions';

const Main: React.FC = () => {
  useEffect(() => {
    dispatch(articleGetAllUnread());
  }, []);

  return (<>
    main
  </>);
}

export default Main;
