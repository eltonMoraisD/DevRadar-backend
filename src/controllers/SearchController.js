const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	async index(req, res) {
		//buscar todos devs num raio 10km
		//filtrar por tecnologias

		const { latitude, longitude, tech } = req.query;

		const techsArray = parseStringAsArray(tech);

		const devs = await Dev.find({
			tech: {
				$in: techsArray
			},
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [ longitude, latitude ]
						//	$maxDistance: 10000
					}
				}
			}
		});

		console.log(techsArray);
		return res.json({ devs });
	}
};
