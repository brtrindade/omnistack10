import React, {useState} from 'react';

import './styles.css'

function DevForm({onSubmit, dev}) {
  const [techs, setTechs] = useState(dev.techs.join(', '));
  const [longitude, setLongitude] = useState(dev.location.coordinates[0]);
  const [latitude, setLatitude] = useState(dev.location.coordinates[1]);

  function getLocation(e) {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username: dev.github_username,
      techs,
      latitude,
      longitude,
    });
  }

  return(
    <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required 
              value={dev.github_username}
              disabled
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required 
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number"
                name="latitude" 
                id="latitude" 
                required value={latitude} 
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)} 
              />
            </div>
          </div>
          <button onClick={getLocation}>Obter Localização</button>
          <button type="submit">Salvar</button>
        </form>
  )
}

export default DevForm;
