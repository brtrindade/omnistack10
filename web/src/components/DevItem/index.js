import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

function DevItem({dev, callback}) {
  const [show, setShow] = useState(false)

  async function handleExclude(dev) {
    await api.delete(`/devs/${dev.github_username}`);
    callback();
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

      <footer>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        {show && (
          <Link to={`/devs/${dev._id}`}>
            <button className="edit">Editar</button>
          </Link>
        )}
      </footer>
    </li>
  )
}

export default DevItem;
