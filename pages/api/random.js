const API_KEY = process.env.YELP_KEY;
const yelp = require('yelp-fusion');
const client = yelp.client(API_KEY);
const getRandomValues = require('get-random-values')
let last = 0;

export default function handler(req, res) {
    let cs = (x, y) => x + (y - x + 1) * getRandomValues(new Uint8Array(1))[0] / 2 ** 8 | 0
    return new Promise((resolve) => {
        const location = req.query.location;
        const meal = req.query.meal;
        const distance = req.query.distance;
        const dist = parseInt(distance) * 1600;
        const offset = cs(0, 30 * parseInt(distance));
        // Call yelp api with user's input, choose a psuedo random place to eat
        client.search({
            term: meal,
            location: location,
            radius: dist,
            limit: 50,
            offset: offset,
        }).then(response => {
            if (response.jsonBody) {
                const total = response.jsonBody.businesses.length;
                let rand = cs(0, total - 1);
                if (last != rand) {
                    last = rand;
                } else {
                    rand = cs(0, total - 1);
                }
                if (total === 0) {
                    res.status(400).send({ error: 'No Results, Try Increasing Distance' });
                } else {
                    res.status(200).json(response.jsonBody.businesses[rand])
                }
            } else {
                res.status(400).send({ error: 'Bad API Call' });
            }
            resolve();
        }).catch(e => {
            res.status(400).send({ error: 'Location Not Found' });
            resolve();
        });
    });
}
