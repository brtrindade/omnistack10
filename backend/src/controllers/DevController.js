const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const githubUser = require('../utils/githubUser');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const {github_username, techs, latitude, longitude} = req.body;
    
    let dev = await Dev.findOne({github_username});

    if(!dev) {
      /* forma usada pelo Diego, atualizada para function githubUser abaixo.
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const {name = login, avatar_url, bio} = apiResponse.data;
      */

      const {name, avatar_url, bio} = await githubUser(github_username);
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections(
        {latitude, longitude},
        techsArray,
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
  
    return res.json(dev);
  },

  async update(req, res) {
    const {github_username} = req.params;
    const {techs, latitude, longitude} = req.body;
    const dev = await Dev.findOne({github_username});

    if(dev) {
      const {name, avatar_url, bio} = await githubUser(github_username); 
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev.name = name;
      dev.avatar_url = avatar_url;
      dev.bio = bio;
      dev.techs = techsArray;
      dev.location = location;
      dev.save()
      
      return res.json(dev);
      
    } else {
      return res.status(404).json({ error: 'Dev not found' });
    }
    
  },

  async destroy(req, res) {
    const {github_username} = req.params;
    const dev = await Dev.findOneAndDelete({github_username});
    if(!dev) {
      return res.status(404).json({ error: 'Dev not found' })
    }
    return res.json(dev);
  },
};
