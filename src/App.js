import React, { useContext} from 'react';
import './index.css';

import { ActoresContext } from './context/actoresContext';
import UniversosContain from './components/UniversosContainer';
import ActoresListContainer from './components/ActoresListContainer';
import ActoresMultiContainer from './components/ActoresMultiContainer';


function App() {
  const { datosRecopilados } = useContext(ActoresContext);
  
  if (!datosRecopilados) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className='over container mx-auto max-w-7xl px-10 xl:px-0'>
      <UniversosContain />
      <ActoresListContainer />

    </div>
  );
  
}//app

export default App;

