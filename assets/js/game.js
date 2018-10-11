class Pokemon {
    constructor(name, hp, att, def, speed, type, attackName) {
        this.name = name;
        this.baseStats = [hp, att, def, speed];
        this.type = type;
        this.attackName = attackName;
        this.media = {
            backSprite: `assets/images/${name}back.gif`,
            frontSpriteGif: `assets/images/${name}.gif`,
            frontSpriteStill: `assets/images/${name}.png`,
            attackSound: new Audio(`assets/audio/${attackName}.wav`),
            cry: new Audio(`assets/audio/${name}_cry.wav`)
        }
    }
    cry() {
        return this.media.cry.play();
    }
    attackSound() {
        return this.media.attackSound.play();
    }
}

const charmander = new Pokemon('CHARMANDER', 500, 150, 150, 65, 'fire', 'Ember'); //// OP mon for debugging
// const charmander = new Pokemon('CHARMANDER', 195, 52, 43, 65, 'fire', 'Ember');
const bulbasaur = new Pokemon('BULBASAUR', 225, 49, 65, 45, 'grass', 'Vine Whip');
const squirtle = new Pokemon('SQUIRTLE', 220, 48, 65, 43, 'water', 'Bubble');
const pikachu = new Pokemon('PIKACHU', 175, 55, 30, 90, 'electric', 'ThunderShock');
const allMons = [charmander, bulbasaur, squirtle, pikachu];
let remainingMon = [charmander, bulbasaur, squirtle, pikachu];
const typeArray = ['fire', 'grass', 'water', 'electric'];
const typeAdvantages = {
    fire: [0.5, 2, 0.5, 1],
    grass: [0.5, 0.5, 2, 1],
    water: [2, 0.5, 0.5, 1],
    electric: [1, 0.5, 2, 0.5]
}
const player = {
    pokemon: {},
    name: 'player',
    gender: '',
    oakText: 'Oak: Here, take one of these rare pokemon. Choose wisely. You may only choose one!'
};
const cpuOpponent = {
    pokemon: {},
    name: 'cpuOpponent',
    oakText: 'Choose your opponent!'
};

const musicTracks = {
    openingTheme: new Audio("assets/audio/101-opening.mp3"),
    battleTheme: new Audio("assets/audio/115-battle (vs trainer).mp3"),
    victoryTheme: new Audio("assets/audio/116-victory (vs trainer).mp3"),
    defeatTheme: new Audio("assets/audio/131-lavender town's theme.mp3")
};

const generateRandoms = (min, max) => (Math.random() * (max - min) + min);

const gameStart = () => {
    return new Promise((resolve, reject) => {
        resolve("I ran");
    })
};

const animateSprites = () => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < allMons.length; i++) {
            let currentMon = allMons[i];
            $(`#${currentMon.name}`).hover((event) => {
                $(event.currentTarget).attr('src', currentMon.media.frontSpriteGif);
            }, (event) => {
                $(event.currentTarget).attr('src', currentMon.media.frontSpriteStill);
            })
        }
        resolve("Sprites Animated");
    })
};

const generateStats = () => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < allMons.length; i++) {
            let currentMon = allMons[i];
            currentMon.adjustedStats = currentMon.baseStats.map(stat => Math.trunc(stat * generateRandoms(0.75, 1.25)));
        }
        resolve("Stats Generated");
    })
};

const pokeSelect = (user, remainingMon) => {
    return new Promise((resolve, reject) => {
        $('#oakText').text(user.oakText)
        let tentativePick = {}
        let userSelection = {};
        $('.character').click(() => {
            tentativePick = allMons[$(event.currentTarget).attr('index')];
            if (remainingMon.indexOf(tentativePick) != -1) {
                userSelection = tentativePick;
                $('#pokeChoice').empty().text(`You've chosen ${userSelection.name}.`);
                $('.yesNo').show()
                $('#areSure').slideDown();
            } else {
                $('#pokeChoice').empty().text(`You've already chosen this Pokemon. Choose again.`)
                $('.yesNo').hide()
                $('#areSure').slideDown();
                userSelection = {};
            }
        })

        $('#noBtn').click(() => {
            $('#areSure').slideUp(200);
        })

        $('#yesBtn').click(() => {
            $('.character').off('click')
            $('#areSure').slideUp(500);
            user.pokemon = userSelection;
            remainingMon = remainingMon.filter(mon => mon != userSelection)
            resolve(remainingMon)
        })
    })
};

const firstBattleSetup = (remainingMon) => {
    return new Promise((resolve, reject) => {
        $('#oakRow').slideUp();
        $(`#${remainingMon[0].name}Card`).slideUp();
        $(`#${remainingMon[1].name}Card`).slideUp();
        $('#startBtn').slideDown().click(() => {
            musicTracks.battleTheme.play();
            $('.startingSetup').slideUp();
            setTimeout(() => resolve(), 500)
        });
    })
};

const setStage = (userPokemon, cpuPokemon) => {
    return new Promise((resolve, reject) => {
        $('#cpuOpponentPokemonImg').attr('src', cpuPokemon.media.frontSpriteGif).slideDown()
        $('#playerPokemonImg').attr('src', userPokemon.media.backSprite).slideDown()
        $('.battleSetup').fadeIn()
        $('#playerCurrentHP, #playerMaxHp').text(userPokemon.adjustedStats[0])
        $('#cpuOpponentCurrentHP, #cpuOpponentMaxHp').text(cpuPokemon.adjustedStats[0])
        $('#attackName').text(userPokemon.attackName);
        $('#battleText').text('Red wants to battle!').slideDown();
        resolve();
    })
};

const checkIfFNT = (defender) => {
    if (defender.pokemon.adjustedStats[0] <= 0) {
        $(`#${defender.name}CurrentHp`).text('FNT')
        $(`#battleText`).text(`Enemy ${defender.pokemon.name} has fainted!`)
        defender.pokemon.cry();
        return true;
    }
    $(`#${defender.name}CurrentHp`).text(defender.pokemon.adjustedStats[0])
    return false;
};

const printAttackText = (attacker, typeAdvantageModifier) => {
    let typeEffectiveMessage = '';
    if (typeAdvantageModifier === 2) {
        typeEffectiveMessage = "It\'s super effective!";
    } else if (typeAdvantageModifier === 0.5) {
        typeEffectiveMessage = "It\'s not very effective...";
    } else {
        typeEffectiveMessage = '';
    }
    $('#battleText').text(`${attacker.pokemon.name} used ${attacker.pokemon.attackName}! ${typeEffectiveMessage}`);
};

const attack = (attacker, defender) => {
    attacker.pokemon.attackSound();
    let typeAdvantageModifier = typeAdvantages[attacker.pokemon.type][typeArray.indexOf(defender.pokemon.type)];
    printAttackText(attacker, typeAdvantageModifier);
    let power = Math.floor(((attacker.pokemon.adjustedStats[1] - (defender.pokemon.adjustedStats[2] * 0.25)) * typeAdvantageModifier));
    defender.pokemon.adjustedStats[0] -= power;
    return checkIfFNT(defender);
};

const attackSequence = () => {
    return new Promise((resolve, reject) => {
        let firstAttacker = (player.pokemon.adjustedStats[3] > cpuOpponent.pokemon.adjustedStats[3]) ? player : cpuOpponent;
        let secondAttacker = (player.pokemon.adjustedStats[3] < cpuOpponent.pokemon.adjustedStats[3]) ? player : cpuOpponent;
        console.log({
            firstAttacker,
            secondAttacker
        })
        if (attack(firstAttacker, secondAttacker)) {
            console.log('attack 1')
            return resolve(firstAttacker);
        }
        setTimeout(() => {
            if (attack(secondAttacker, firstAttacker)) {
                console.log('attack 2')
                return resolve(secondAttacker);
            }
        }, 2500)
    })
};

const battleSequence = () => {
    return new Promise((resolve, reject) => {
        $('#attackButton').on('click', () => {
            attackSequence()
                .then((winner) => resolve(winner))
        })

    })
};

const changeOpponent = (remainingMon) => {
    cpuOpponent.pokemon = remainingMon[Math.floor(generateRandoms(0, remainingMon.length))]
    $('#cpuOpponentPokemonImg').attr('src', cpuOpponent.pokemon.media.frontSpriteGif).slideDown()
    $('#cpuOpponentCurrentHP, #cpuOpponentMaxHp').text(cpuOpponent.pokemon.adjustedStats[0])
    $('#battleText').text(`Red sent out ${cpuOpponent.pokemon.name}!`).slideDown();
}

const processWinner = (winner) => {
    return new Promise((resolve, reject) => {
        if (winner === player) {
            $('#cpuOpponentPokemonImg').delay(800).slideUp();
            $('#battleText').delay(800).slideUp();
            remainingMon = remainingMon.filter(mon => (mon != player.pokemon) && (mon != cpuOpponent.pokemon))
            setTimeout(() => {
                changeOpponent(remainingMon)
                resolve()
            }, 2000);
        } else {

        }
    })
};

$(document).ready(() => {
    gameStart(true)
        .then(() => animateSprites())
        .then(() => generateStats())
        .then(() => pokeSelect(player, remainingMon))
        .then(remainingMon => pokeSelect(cpuOpponent, remainingMon))
        .then(remainingMon => firstBattleSetup(remainingMon))
        .then(() => setStage(player.pokemon, cpuOpponent.pokemon))
        .then(() => battleSequence())
        .then(winner => processWinner(winner))
        .then(() => battleSequence())
        .then(winner => processWinner(winner))
        .then(() => battleSequence())
        .then(winner => processWinner(winner))
})