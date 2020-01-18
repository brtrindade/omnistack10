import React, {useState, useEffect} from 'react';

import api from '../../services/api';

import './styles.css';

import DevForm from '../../components/DevForm';
import DevItem from '../../components/DevItem';


function Main() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs() {
    const response = await api.get('/devs');
    
    setDevs(response.data);
  }

  function handleUpdateDevs() {
    loadDevs();
  }

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    const hasDev = devs.filter(dev => (dev.github_username === data.github_username));
    
    if(hasDev.length === 0) {
      setDevs([...devs, response.data])
    }
  }

  return (
    <>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
          <DevItem key={dev._id} dev={dev} callback={handleUpdateDevs}/>
          ))}          
        </ul>
      </main>
    </>
  );
}

export default Main;
