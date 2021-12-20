const fs = require('fs');
const axios = require('axios');

class Searches {

    logCities = [];
    dbPath = process.env.DB_PATH;
    constructor() {
        this.readDB();
    }

    get capitalizeLogCities() {
        return this.logCities.map(place => {
            let words = place.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.substring(1));

            return words.join(' ');
        });
    }

    get paramsManbox() {
        return {
            'limit': 5,
            'lenguage': 'en',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get paramsOpenweather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }

    async cities(city = '') {
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

    async cityWeather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenweather, lat, lon }
            });
            const resp = await instance.get();
            const { weather, main } = resp.data

            return ({
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            });
        } catch (err) {
            console.log(err);
            console.log('Not find it');
        }
    }

    addCitieslog(place = '') {
        if (this.logCities.includes(place.toLowerCase())) return;
        this.logCities = this.logCities.splice(0, 4);
        this.logCities.unshift(place.toLowerCase());

        this.saveDB();
    }

    saveDB() {
        const payload = {
            log: this.logCities
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.logCities = data.log;
        //debe existir
        //cargar la 
    }
}
module.exports = Searches;