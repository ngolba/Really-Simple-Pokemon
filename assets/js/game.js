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
    attack() {
        return this.media.attackSound.play();
    }
}

const charmander = new Pokemon('CHARMANDER', 195, 52, 43, 65, 'fire', 'Ember');
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
    name: 'cpu',
    oakText: 'Choose your opponent!'
};

var generateRandoms = (min, max) => (Math.random() * (max - min) + min);

const gameStart = () => {
    return new Promise((resolve, reject) => {
        resolve("I ran");
    })
}

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
        console.log(allMons);
        resolve("Stats Generated");
    })
};

const pokeSelect = (user, remainingMon) => {
    return new Promise((resolve, reject) => {
        $('#oakText').text(user.oakText)
        let tentativePick = {}
        let userSelection = {};
        $('.character').click(() => {
            console.log(`${user.name} clicked character`)
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
            console.log(`${user.name} ${user.pokemon.name}`)
            resolve(remainingMon)
        })
    })
};


const firstBattleSetup = (remainingMon) => {
    $('#oakRow').slideUp();
    $(`#${remainingMon[0].name}Card`).slideUp();
    $(`#${remainingMon[1].name}Card`).slideUp();
};
const setStage = (combatants) => {}

$(document).ready(() => {
    gameStart(true)
        .then(() => animateSprites())
        .then(() => generateStats())
        .then(() => pokeSelect(player, remainingMon))
        .then(remainingMon => pokeSelect(cpuOpponent, remainingMon))
        .then(remainingMon => firstBattleSetup(remainingMon))
})












// var openingTheme = new Audio("assets/audio/101-opening.mp3");
// var battleTheme = new Audio("assets/audio/115-battle (vs trainer).mp3")
// var victoryTheme = new Audio("assets/audio/116-victory (vs trainer).mp3");
// var defeatTheme = new Audio("assets/audio/131-lavender town's theme.mp3");


// var typeAdvantageFire = [.5, 2, .5, 1];
// var typeAdvantageGrass = [.5, .5, 2, 1];
// var typeAdvantageWater = [2, .5, .5, 1];
// var typeAdvantageElectric = [1, .5, 2, .5];

// var battleCounter = 0;
// var attackCounter = 0

// var typeAdvantagePower = function (attacker, defender) {
//     switch (attacker.type) {

//         case 0:
//             return typeAdvantageFire[defender.type];
//             break;

//         case 1:
//             return typeAdvantageGrass[defender.type];
//             break;

//         case 2:
//             return typeAdvantageWater[defender.type];
//             break;

//         case 3:
//             return typeAdvantageElectric[defender.type];
//             break;
//     }
// }


// var attack = function (attacker, defender, attackCounter) {
//     var power = ((attacker.att - (.5 * defender.def)) * typeAdvantagePower(attacker, defender)) * Math.pow(2, attackCounter);
//     defender.currentHp -= power;
//     attacker.attackSound.play();
//     return Math.round(defender.currentHp);
// }

// var checkIfFNT = function (mon) {
//     if (mon.currentHp <= 0) {
//         mon.cry.play();
//         return true;
//     } else {
//         return false;
//     }
// }




// var generateRandoms = function (min, max) {
//     return Math.random() * (max - min) + min;

// }


// var generateIvs = function (mon) {
//     mon.hp *= generateRandoms(.75, 1.25);
//     mon.hp = Math.trunc(mon.hp);
//     mon.currentHp = mon.hp;
//     mon.att *= generateRandoms(.75, 1.25);
//     mon.att = Math.trunc(mon.att);
//     mon.def *= generateRandoms(.75, 1.25);
//     mon.def = Math.trunc(mon.def);
//     mon.speed *= generateRandoms(.75, 1.25);
//     mon.speed = Math.trunc(mon.speed);
// }

// var startGame = function () {

//     generateIvs(charmander);
//     generateIvs(bulbasaur);
//     generateIvs(squirtle);
//     generateIvs(pikachu);

//     $('.charSelect').click(function () {
//         // userPokemon = (pokemonArray[$(this).attr('index')]);
//         var userPokemonName = $(this).attr('name');
//         pokemonArray[$(this).attr('index')].cry.play();
//         $('#areSure').show()
//         $('#pokeChoice').text(userPokemonName);
//         $(this).attr('userPokemon', true);
//         $(this).siblings('.charSelect').attr('userPokemon', false);

//         if (userPokemonChosen === 'true') {
//             $('.yesNoBttn').each(function () {
//                 $(this).removeClass('yesNoBttn').addClass('yesNoOpp');
//             });
//             opponentSelect();
//         } else {
//             $('.yesNoBttn').click(function () {
//                 if ($(this).attr('value') === 'Yes') {
//                     $('.charSelect').each(function (event) {
//                         if ($(this).attr('userPokemon') === 'true') {
//                             index = $(this).attr('index');
//                             userPokemon = pokemonArray[index];
//                             userPokemonChosen = 'true';
//                             pokemonUsed.push(userPokemon);
//                             $(this).addClass('border border-dark').removeClass('charSelect');
//                             $('#areSure').hide();
//                             $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your pokémon will be ' + userPokemon.name + '.' + '<p class="card-body pb-0">' + 'Double click your opponent.' + '</p>');
//                             $(this).off('click');


//                             return;
//                         } else {
//                             $(this).each(function () {
//                                 $(this).addClass('opponentChoice').removeClass('charSelect')
//                             })
//                         }
//                     });
//                 } else {
//                     $('#areSure').hide();
//                 }
//             })
//             // } else{
//             // $('.yesNoBttn').removeClass('yesNoBttn').addClass('yesNoOpp');
//             // opponentSelect();
//         }
//     });
// };


// var opponentSelect = function () {
//     // $('.opponentChoice').each(function () {;
//     //     $(this).attr('userPokemon', false);

//     // });

//     $('.opponentChoice').click(function () {
//         $(this).each(function () {
//             $(this).attr('userPokemon', true);
//             $(this).siblings('.opponentChoice').attr('userPokemon', false);
//         });



//         var opponentPokemonName = $(this).attr('name');
//         $('#areSure').show();
//         $('#pokeChoice').text(opponentPokemonName);

//         if (opponentPokemonChosen === 'false') {
//             $('.yesNoOpp').click(function () {
//                 if ($(this).attr('value') === 'Yes') {
//                     $('.opponentChoice').each(function (event) {
//                         if ($(this).attr('userPokemon') === 'true') {
//                             index = $(this).attr('index');
//                             opponentPokemon = pokemonArray[index];
//                             opponentPokemonChosen = 'true';
//                             pokemonUsed.push(opponentPokemon);
//                             $(this).addClass('border border-danger col-4').removeClass('opponentChoice col-3');
//                             $('#areSure').hide();
//                             $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your opponent\'s pokémon will be ' + opponentPokemon.name + '.' + '<p class="card-body pb-0">' + 'Click Start to start battle!' + '</p>' + '<button type="button" class="btn btn-danger" id="startButton">' + 'Start!' + '</button>');

//                             $('.character').each(function () {
//                                 $(this).addClass('col-4').removeClass('col-3');
//                             })
//                             // $('.startingSetup').addClass('justify-content-center');

//                             battleStart();
//                             // return;
//                         } else {
//                             $(this).hide();
//                         }
//                     });
//                 } else {
//                     $('#areSure').hide();
//                 }
//             })

//         }

//     })
// };

// var battleTwoSelect = function () {
//     var remainingOpponents = [];

//     $('.opponentChoice').each(function () {
//         remainingOpponents.push($(this).attr('index'))
//     });

//     console.log(remainingOpponents);

//     var nextPokemonIndex = function (array) {
//         var index = Math.floor(Math.random() * 1.99);
//         console.log(array[index]);
//         return array[index];
//     };
//     return pokemonArray[nextPokemonIndex(remainingOpponents)];

// };

// var battleThreeSelect = function (array) {
//     for (var i = 0; i < array.length; i++) {
//         if (pokemonUsed.indexOf(array[i]) === -1) {
//             return array[i];
//         }
//     }
// };

// var battleStart = function () {

//     var userTypeAdvantage = (typeAdvantagePower(userPokemon, opponentPokemon));
//     var oppTypeAdvantage = (typeAdvantagePower(opponentPokemon, userPokemon));

//     var battleTextGenerate = function (userTypeAdvantage, pokemon) {
//         switch (userTypeAdvantage) {
//             case 2:
//                 return pokemon.name + ' used ' + pokemon.attackName + '! It\'s super effective!';
//                 break;
//             case 1:
//                 return pokemon.name + ' used ' + pokemon.attackName + '!';
//                 break;
//             case .5:
//                 return pokemon.name + ' used ' + pokemon.attackName + '! It\'s not very effective...';
//                 break;
//         }


//     }

//     if (battleCounter === 0) {

//         $('#startButton').click(function () {


//             battleTheme.play();
//             $('.startingSetup').hide();
//             $('.battleSetup').fadeIn(500);
//             console.log(userPokemon);
//             console.log(opponentPokemon);

//             $('#battleText').fadeIn(500).delay(1000).fadeOut(500);
//             $('#redText').text('Red sent out ' + opponentPokemon.name + '!').delay(2000).fadeIn(500);



//             // $('#battleText').delay(1000).text('Red sent out ' + opponentPokemon.name + '!')

//             // $('#battleText').text('Red wants to battle!').fadeIn(300).delay(500).fadeOut(300).
//             // $('#battleText').text('Red sent out ' + opponentPokemon.name + '!').fadeIn();

//             $('.opponentPokemonImg').attr('src', opponentPokemon.frontSprite).slideDown(1000);
//             $('.userPokemonImg').attr('src', userPokemon.backSprite).slideDown(1000);
//             $('#oppCurrentHp').text(opponentPokemon.currentHp);
//             $('#oppMaxHp').text(opponentPokemon.hp);
//             $('#userCurrentHp').text(userPokemon.currentHp);
//             $('#userMaxHp').text(userPokemon.hp);
//             $('#attackName').text(userPokemon.attackName);



//         })
//     } else if (battleCounter === 1) {

//         $('.opponentPokemonImg').delay(5000).slideUp(300);
//         opponentPokemon = battleTwoSelect();
//         userTypeAdvantage = (typeAdvantagePower(userPokemon, opponentPokemon));
//         oppTypeAdvantage = (typeAdvantagePower(opponentPokemon, userPokemon));
//         pokemonUsed.push(opponentPokemon);
//         $('#pokeBallThree').attr('src', 'assets/images/pokeballFullFainted.png');
//         $('#battleText').fadeOut(100);
//         $('#redText').text('Red sent out ' + opponentPokemon.name + '!').delay(7000).fadeIn(500);
//         $('.secondMonImg').delay(6000).slideDown(200).attr('src', opponentPokemon.frontSprite);
//         // $('.opponentPokemonImg').delay(3000).slideDown(200).attr('src', opponentPokemon.frontSprite);
//         $('.userPokemonImg').attr('src', userPokemon.backSprite);
//         $('#oppCurrentHp').text(opponentPokemon.currentHp);
//         console.log(opponentPokemon.currentHp);
//         $('#oppMaxHp').text(opponentPokemon.hp);
//         $('#userCurrentHp').text(userPokemon.currentHp);
//         $('#userMaxHp').text(userPokemon.hp);
//         $('#attackName').text(userPokemon.attackName);

//     } else if (battleCounter === 2) {

//         $('.secondMonImg').delay(5000).slideUp(200);
//         $('#pokeBallTwo').attr('src', 'assets/images/pokeballFullFainted.png');
//         opponentPokemon = battleThreeSelect(pokemonArray);
//         userTypeAdvantage = (typeAdvantagePower(userPokemon, opponentPokemon));
//         oppTypeAdvantage = (typeAdvantagePower(opponentPokemon, userPokemon));
//         console.log("Made it here");
//         console.log(opponentPokemon);
//         $('#battleText').fadeOut(100);
//         $('#redText').text('Red sent out ' + opponentPokemon.name + '!').delay(7000).fadeIn(500);
//         $('.thirdMonImg').delay(8000).slideDown(200).attr('src', opponentPokemon.frontSprite);
//         // $('.opponentPokemonImg').delay(3000).slideDown(200).attr('src', opponentPokemon.frontSprite);
//         $('.userPokemonImg').attr('src', userPokemon.backSprite);
//         $('#oppCurrentHp').text(opponentPokemon.currentHp);
//         console.log(opponentPokemon.currentHp);
//         $('#oppMaxHp').text(opponentPokemon.hp);
//         $('#userCurrentHp').text(userPokemon.currentHp);
//         $('#userMaxHp').text(userPokemon.hp);
//         $('#attackName').text(userPokemon.attackName);

//     } else {

//         $('.thirdMonImg').delay(2000).slideUp(200);
//         $('#pokeBallOne').attr('src', 'assets/images/pokeballFullFainted.png');
//         $('#redText').text('Trainer Red has been defeated. Congratulations!').delay(8000).fadeIn(300);
//         $('.gameOver').delay(12000).fadeIn(600);
//         battleTheme.pause();
//         victoryTheme.play();
//         // alert("You either won or broke something. Congrats or whatever.")
//     }

//     $('.attackButton').click(function () {

//         $('#redText').hide();
//         $('#userAttackText').hide();
//         $('#oppAttackText').hide();
//         $('#battleText').hide();

//         if (userPokemon.speed > opponentPokemon.speed) {
//             attack(userPokemon, opponentPokemon, attackCounter);
//             $("#userAttackText").text(battleTextGenerate(userTypeAdvantage, userPokemon)).fadeIn(200).delay(2000).fadeOut(200);
//             if (!checkIfFNT(opponentPokemon)) {
//                 attack(opponentPokemon, userPokemon, 0);
//                 $("#oppAttackText").text(battleTextGenerate(oppTypeAdvantage, opponentPokemon)).delay(2400).fadeIn(200).delay(2000).fadeOut(200);
//                 $('#oppCurrentHp').text(opponentPokemon.currentHp);
//                 attackCounter++;
//                 console.log(attackCounter);
//             } else {
//                 // $('.opponentPokemonImg').delay(4000).slideUp(300);
//                 $('#oppCurrentHp').text("FNT");
//                 $('#oppMaxHp').text();
//                 $('#battleText').delay(3000).fadeIn(200).text('Enemy ' + opponentPokemon.name + ' has fainted!').delay(2000).fadeOut(200)
//                 battleCounter++;
//                 // $('#battleText').hide()
//                 console.log("made it past battle text hide")
//                 $('.attackButton').off('click');
//                 battleStart();
//             }
//         } else {
//             attack(opponentPokemon, userPokemon, 0);
//             $("#oppAttackText").text(battleTextGenerate(oppTypeAdvantage, opponentPokemon)).fadeIn(200).delay(2000).fadeOut(200)
//             attack(userPokemon, opponentPokemon, attackCounter);
//             $("#userAttackText").text(battleTextGenerate(userTypeAdvantage, userPokemon)).delay(2400).fadeIn(200);
//             attackCounter++;

//             if (!checkIfFNT(opponentPokemon)) {
//                 $('#oppCurrentHp').text(opponentPokemon.currentHp);
//             } else {
//                 $('#userAttackText').delay(2600).fadeOut(200);
//                 // $('.opponentPokemonImg').delay(5200).slideUp(300);
//                 $('#oppCurrentHp').text("FNT");
//                 $('#oppMaxHp').text();
//                 $('#battleText').delay(5200).fadeIn(200).text('Enemy ' + opponentPokemon.name + ' has fainted!').delay(2000).fadeOut(200)
//                 battleCounter++;
//                 $('.attackButton').off('click');
//                 battleStart();
//             }

//         }
//         if (userPokemon.currentHp > 0) {
//             $('#userCurrentHp').text(userPokemon.currentHp);
//         } else {
//             userPokemon.cry.play
//             $('.userHpBar').text("FNT");
//             battleTheme.pause();
//             defeatTheme.play();
//             $('#userAttackText').hide()
//             $('#oppAttackText').hide();
//             $('.userPokemonImg').slideUp(400);
//             $('#battleText').text("You blacked out!").fadeIn(200);
//             $('.battleSetup').delay(2000).css('opacity', '0.2');
//             $('.gameOver').fadeIn(10000);

//         }
//         return;


//     });
// }





// $(document).ready(function () {


//     changeSprite('#bulbasaur', 'bulbasaur');
//     changeSprite('#charmander', 'charmander');
//     changeSprite('#squirtle', 'squirtle');
//     changeSprite('#pikachu', 'pikachu');


//     $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Here, take one of these rare pokémon.' + '</p>' +
//         '<p class="card-body py-0">' + 'Choose wisely. You may only choose one! ' + '</p>');


//     startGame();


// });