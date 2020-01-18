import React, {useState, useEffect } from 'react';
import DevEditForm from '../../components/DevEditForm';
import api from '../../services/api';

import './styles.css';

function DevEdit({history, match}) {
  const [dev, setDev] = useState(null);

  useEffect(() => {
    async function getDev() {
      const response = await api.get(`/devs/${match.params.id}`);
      setDev(response.data);
      console.log(response.data)
    }

    getDev();
  }, [match.params.id]);

  async function handleEditDev(data) {
    await api.put(`/devs/${match.params.id}`, data);

    history.push('/');
  }

  if(!dev) {
    return null
  }

  return(
    <div className="container">
      <main className="edit-dev">
        <strong>Editar</strong>
        <DevEditForm dev={dev} onSubmit={handleEditDev} />
      </main>

    </div>
  )
}

export default DevEdit;
