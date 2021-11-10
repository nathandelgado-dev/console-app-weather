require('dotenv').config();
require('colors');
const {
    readInput,
    inquirerMenu,
    pause,
    listPlaces
} = require('./helpers/inquirer');
const Searches = require('./models/Searches');


const main = async() => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //show message
                const city = await readInput('Write a City: ');

                //Search places
                const placesFound = await searches.cities(city);
                //Select a place
                const idSelected = await listPlaces(placesFound);
                if (idSelected === 0) continue;
                const placeSelected = placesFound.find(p => p.id = idSelected);
                //Save in DB
                searches.addCitieslog(placeSelected.name);

                //weather
                const weather = await searches.cityWeather(placeSelected.lat, placeSelected.lng);


                //show results
                console.clear();

                console.log('\n Information of city:\n'.green);
                console.log('City: ', (placeSelected.name).yellow);
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperature: ', weather.temp, ('°').yellow);
                console.log('Min: ', weather.min, ('°').yellow);
                console.log('Max: ', weather.max, ('°').yellow);
                console.log('How is weather: ', (weather.desc).yellow);

                break;
            case 2:
                searches.capitalizeLogCities.forEach((place, i) => {
                    const index = `${i + 1}.`.green;
                    console.log(`${index} ${place}`);
                })

                break;

            case 0:

                break;
        }

        await pause();
    }
    while (opt !== 0);


}

main();