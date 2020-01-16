import React from 'react';
import DevEditForm from '../../components/DevEditForm';
import api from '../../services/api';

import './styles.css';

function DevEdit({history}) {
  async function handleEditDev(data) {
    await api.put(`/devs/${data.github_username}`, data);

    history.push('/');
  }

  return(
    <div className="container">
      <main className="edit-dev">
        <strong>Editar</strong>
        <DevEditForm onSubmit={handleEditDev} />
      </main>

    </div>
  )
}

export default DevEdit;