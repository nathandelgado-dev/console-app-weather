require('colors');
const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');



const main = async() => {
    let opt;

    do {
        opt = await inquirerMenu();
        console.log({ opt });


        switch (opt) {
            case 1:
                console.log('Option City');

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
    } while (opt !== 0);


}

main();