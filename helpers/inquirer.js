const inquirer = require('inquirer');
require('colors');

const question = [{
    type: 'list',
    name: 'option',
    message: 'What do you like to do?',
    choices: [{
            value: 1,
            name: `${'1.'.green} Select a city`
        },
        {
            value: 2,
            name: `${'2.'.green} Cities log`
        },
        {
            value: 0,
            name: `${'0.'.green} Exit`
        }
    ]
}]

const inquirerMenu = async() => {
    console.clear();
    console.log('======================'.green);
    console.log('   Select an option'.bold);
    console.log('======================\n'.green);

    const { option } = await inquirer.prompt(question);

    return option;
}

const pause = async() => {
    console.log('');

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'Enter'.green} to continue.\n`
    }]

    await inquirer.prompt(question);
}

const readInput = async(message) => {

    const question = [{
        type: 'input',
        name: 'description',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'No exist description'
            }
            return true;
        }
    }]

    const { description } = await inquirer.prompt(question);
    return description;
}

const listPlaces = async(places = []) => {
    const choices = places.map((place, i) => {
        const index = `${i + 1}.`.green;
        return {
            value: place.id,
            name: `${index} ${place.name}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0. '.green + 'Cancel'
    })

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Select a Place!',
        choices
    }]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const listCheckTasks = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const index = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${index} ${task.description}`,
            checked: (task.dateCompleted) ? true : false
        }
    });

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select one or more tasks to complete',
        choices
    }]

    const { ids } = await inquirer.prompt(questions);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    listCheckTasks
}