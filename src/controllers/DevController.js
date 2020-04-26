const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')


module.exports ={

  async index(req,res){
    const devs = await Dev.find()

   return res.json(devs)
  },

  async store(req,res){
    const {github_username,tech,latitude,longitude} = req.body

    let dev = await Dev.findOne({github_username})

    if(!dev){

      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
      const {name = login,bio,avatar_url} = apiResponse.data
    
      const techsArray = parseStringAsArray(tech)
    
      const location = {
        type:'Point',
        coordinates:[latitude,longitude]
      }
    
       dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        tech: techsArray,
        location
      })
    }
    
    return res.json(dev)
  }

 
}