const axios = require('axios');

module.exports = async function githubUser(github_username){
  const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
  const {name = login, avatar_url, bio} = apiResponse.data;
  const githubUser = {
    "name": name,
    "avatar_url": avatar_url,
    "bio": bio,
  }

  return githubUser;
}
