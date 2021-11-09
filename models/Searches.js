const axios = require('axios');

class Searches {
    constructor(props) {
        //TODO: if DB exist read this
    }

    get paramsManbox() {
        return {
            'limit': 5,
            'lenguage': 'en',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    async city(city = '') {
        //http request
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsManbox
            });

            const resp = await instance.get();

            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
            //cities that make match with city
        } catch (error) {
            return [];
        }

    }
}


module.exports = Searches;