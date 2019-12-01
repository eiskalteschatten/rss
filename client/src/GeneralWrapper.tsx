import React from 'react';
import { useSelector } from 'react-redux';

// import { State } from './store';
import Loader from './components/Loader';
import Booting from './components/Booting';

const GeneralWrapper: React.FC = () => {
  const isBooting = true;//useSelector((state: State) => state.app.isBooting);

  if (isBooting) {
    return (<Booting />);
  }

  return (<>
    <Loader />

  </>);
}

export default GeneralWrapper;
