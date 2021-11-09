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
                const placesFound = await searches.city(city);
                //Select a place
                const idSelected = await listPlaces(placesFound);

                const placeSelected = placesFound.find(p => p.id = idSelected);



                //weather

                //show results
                console.log('\n Information of city:\n'.green);

                console.log('City: ', placeSelected.name);
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperature: ', );
                console.log('Min: ', );
                console.log('Max: ', );

                break;
            case 2:
                console.log('Option 2');

                break;

            case 0:
                console.log('Option exit');

                break;
            default:
                break;
        }

        await pause();
    }
    while (opt !== 0);


}

main();