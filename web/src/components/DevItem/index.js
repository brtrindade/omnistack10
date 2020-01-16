import React, {useState} from 'react';
import api from '../../services/api';

import './styles.css';

function DevItem({dev}) {
  const [show, setShow] = useState(false)

  async function handleExclude(dev) {
    await api.delete(`/devs/${dev.github_username}`);
  }

  return(
    <li className="dev-item" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
        {show && (<button className="exclude" onClick={() => handleExclude(dev)}>X</button>) }
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
    </li>
  )
}

export default DevItem;
