const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')


module.exports = {
  async index(req, res){
    //buscar todos devs num raio 10km
    //filtrar por tecnologias

    const {latitude, longitude,techs} = req.query

    const techsArray = parseStringAsArray(techs)

    const devs = await Dev.find({
      tech:{
        $in: techsArray
      },
      location:{
        $near: {
          $geometry:{
            type: 'Point',
            coordinates: [longitude,latitude]
            
          },
        $maxDistance:100
        },
      },
    })

    console.log(techsArray)
    return res.json({devs})

  }
}