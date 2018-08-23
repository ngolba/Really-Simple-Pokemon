var charmander = {
    name: 'Charmander'.toUpperCase(),
    index: 0,
    hp: 39 * 5,
    currentHp: 39 * 5,
    att: 52,
    def: 43,
    speed: 65,
    backSprite: "assets/images/charmanderback.gif",
    frontSprite: "assets/images/charmander.gif",
    type: 0,
    attackName: 'Ember'
}

var bulbasaur = {
    name: 'Bulbasaur'.toUpperCase(),
    index: 1,
    hp: 45 * 5,
    currentHp: 45 * 5,
    att: 49,
    def: 65,
    speed: 45,
    backSprite: "assets/images/bulbasaurback.gif",
    frontSprite: "assets/images/bulbasaur.gif",
    type: 1,
    attackName: 'Vine Whip'
}

var squirtle = {
    name: 'Squirtle'.toUpperCase(),
    index: 2,
    hp: 44 * 5,
    currentHp: 44 * 5,
    att: 48,
    def: 65,
    speed: 43,
    backSprite: "assets/images/squirtleback.gif",
    frontSprite: "assets/images/squirtle.gif",
    type: 2,
    attackName: 'Bubble'
}

var pikachu = {
    name: 'Pikachu'.toUpperCase(),
    index: 3,
    hp: 35 * 5,
    currentHp: 35 * 5,
    att: 55,
    def: 30,
    speed: 90,
    backSprite: "assets/images/pikachuback.gif",
    frontSprite: "assets/images/pikachu.gif",
    type: 3,
    attackName: 'ThunderShock'
}

var typeAdvantageFire = [.5, 2, .5, 1];
var typeAdvantageGrass = [.5, .5, 2, 1];
var typeAdvantageWater = [2, .5, .5, 1];
var typeAdvantageElectric = [1, .5, 2, .5];

var battleCounter = 0;
var attackCounter = 0

var typeAdvantagePower = function (attacker, defender) {
    switch (attacker.type) {

        case 0:
            return typeAdvantageFire[defender.type];
            break;

        case 1:
            return typeAdvantageGrass[defender.type];
            break;

        case 2:
            return typeAdvantageWater[defender.type];
            break;

        case 3:
            return typeAdvantageElectric[defender.type];
            break;
    }
}


var attack = function (attacker, defender, attackCounter) {
    var power = ((attacker.att - (.5 * defender.def)) * typeAdvantagePower(attacker, defender)) * Math.pow(2, attackCounter);
    defender.currentHp -= power;
    return Math.round(defender.currentHp);
}

var checkIfFNT = function (mon) {
    if (mon.currentHp <= 0) {
        return true;
    } else {
        return false;
    }
}

var pokemonArray = [charmander, bulbasaur, squirtle, pikachu];
var userPokemon = {};
var opponentPokemon;
var secondOpponent;
var thirdOpponent;
var battleRoster = [userPokemon, opponentPokemon];
var userPokemonChosen = 'false';
var opponentPokemonChosen = 'false';
var index = 4;
var pokemonUsed = [];

var changeSprite = function (monId, monName) {
    $(monId).hover(function () {
            $(monId).attr('src', 'assets/images/' + monName + '.gif');
        },
        function () {
            $(monId).attr('src', 'assets/images/' + monName + '.png');
        });
}
var generateRandoms = function (min, max) {
    return Math.random() * (max - min) + min;

}


var generateIvs = function (mon) {
    mon.hp *= generateRandoms(.75, 1.25);
    mon.hp = Math.trunc(mon.hp);
    mon.currentHp = mon.hp;
    mon.att *= generateRandoms(.75, 1.25);
    mon.att = Math.trunc(mon.att);
    mon.def *= generateRandoms(.75, 1.25);
    mon.def = Math.trunc(mon.def);
    mon.speed *= generateRandoms(.75, 1.25);
    mon.speed = Math.trunc(mon.speed);
}

var startGame = function () {

    generateIvs(charmander);
    generateIvs(bulbasaur);
    generateIvs(squirtle);
    generateIvs(pikachu);





    $('.charSelect').click(function () {
        // userPokemon = (pokemonArray[$(this).attr('index')]);
        var userPokemonName = $(this).attr('name');
        $('#areSure').show()
        $('#pokeChoice').text(userPokemonName);
        $(this).attr('userPokemon', true);
        $(this).siblings('.charSelect').attr('userPokemon', false);

        if (userPokemonChosen === 'true') {
            $('.yesNoBttn').each(function () {
                $(this).removeClass('yesNoBttn').addClass('yesNoOpp');
            });
            opponentSelect();
        } else {
            $('.yesNoBttn').click(function () {
                if ($(this).attr('value') === 'Yes') {
                    $('.charSelect').each(function (event) {
                        if ($(this).attr('userPokemon') === 'true') {
                            index = $(this).attr('index');
                            userPokemon = pokemonArray[index];
                            userPokemonChosen = 'true';
                            pokemonUsed.push(userPokemon);
                            $(this).addClass('border border-dark').removeClass('charSelect');
                            $('#areSure').hide();
                            $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your pokémon will be ' + userPokemon.name + '.' + '<p class="card-body pb-0">' + 'Double click your opponent.' + '</p>');
                            $(this).off('click');


                            return;
                        } else {
                            $(this).each(function () {
                                $(this).addClass('opponentChoice').removeClass('charSelect')
                            })
                        }
                    });
                } else {
                    $('#areSure').hide();
                }
            })
            // } else{
            // $('.yesNoBttn').removeClass('yesNoBttn').addClass('yesNoOpp');
            // opponentSelect();
        }
    });
};


var opponentSelect = function () {
    // $('.opponentChoice').each(function () {;
    //     $(this).attr('userPokemon', false);

    // });

    $('.opponentChoice').click(function () {
        $(this).each(function () {
            $(this).attr('userPokemon', true);
            $(this).siblings('.opponentChoice').attr('userPokemon', false);
        });



        var opponentPokemonName = $(this).attr('name');
        $('#areSure').show();
        $('#pokeChoice').text(opponentPokemonName);

        if (opponentPokemonChosen === 'false') {
            $('.yesNoOpp').click(function () {
                if ($(this).attr('value') === 'Yes') {
                    $('.opponentChoice').each(function (event) {
                        if ($(this).attr('userPokemon') === 'true') {
                            index = $(this).attr('index');
                            opponentPokemon = pokemonArray[index];
                            opponentPokemonChosen = 'true';
                            pokemonUsed.push(opponentPokemon);
                            $(this).addClass('border border-danger col-4').removeClass('opponentChoice col-3');
                            $('#areSure').hide();
                            $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your opponent\'s pokémon will be ' + opponentPokemon.name + '.' + '<p class="card-body pb-0">' + 'Click Start to start battle!' + '</p>' + '<button type="button" class="btn btn-danger" id="startButton">' + 'Start!' + '</button>');

                            $('.character').each(function () {
                                $(this).addClass('col-4').removeClass('col-3');
                            })
                            // $('.startingSetup').addClass('justify-content-center');

                            battleStart();
                            // return;
                        } else {
                            $(this).hide();
                        }
                    });
                } else {
                    $('#areSure').hide();
                }
            })

        }

    })
};

var battleTwoSelect = function () {
    var remainingOpponents = [];

    $('.opponentChoice').each(function () {
        remainingOpponents.push($(this).attr('index'))
    });

    console.log(remainingOpponents);

    var nextPokemonIndex = function (array) {
        var index = Math.floor(Math.random() * 1.99);
        console.log(array[index]);
        return array[index];
    }
    ;
    return pokemonArray[nextPokemonIndex(remainingOpponents)];

};

var battleThreeSelect = function (array) {
    for (var i = 0; i < array.length; i++){
    if (pokemonUsed.indexOf(array[i]) === -1) {
        return array[i];
    }
}
};

var battleStart = function () {

    var userTypeAdvantage = (typeAdvantagePower(userPokemon, opponentPokemon));
    var oppTypeAdvantage = (typeAdvantagePower(opponentPokemon, userPokemon));

    var battleTextGenerate = function (userTypeAdvantage, pokemon) {
        switch (userTypeAdvantage) {
            case 2:
                return pokemon.name + ' used ' + pokemon.attackName + '! It\'s super effective!';
                break;
            case 1:
                return pokemon.name + ' used ' + pokemon.attackName + '!';
                break;
            case .5:
                return pokemon.name + ' used ' + pokemon.attackName + '! It\'s not very effective...';
                break;
        }


    }

    if (battleCounter === 0) {

        $('#startButton').click(function () {


            $('.startingSetup').hide();
            $('.battleSetup').fadeIn(500);
            console.log(userPokemon);
            console.log(opponentPokemon);

            $('#battleText').fadeIn(500).delay(1000).fadeOut(500);
            $('#redText').text('Red sent out ' + opponentPokemon.name + '!').delay(2000).fadeIn(500);



            // $('#battleText').delay(1000).text('Red sent out ' + opponentPokemon.name + '!')

            // $('#battleText').text('Red wants to battle!').fadeIn(300).delay(500).fadeOut(300).
            // $('#battleText').text('Red sent out ' + opponentPokemon.name + '!').fadeIn();

            $('.opponentPokemonImg').attr('src', opponentPokemon.frontSprite);
            $('.userPokemonImg').attr('src', userPokemon.backSprite);
            $('#oppCurrentHp').text(opponentPokemon.currentHp);
            $('#oppMaxHp').text(opponentPokemon.hp);
            $('#userCurrentHp').text(userPokemon.currentHp);
            $('#userMaxHp').text(userPokemon.hp);
            $('#attackName').text(userPokemon.attackName);



        })
    } else if (battleCounter === 1) {
        opponentPokemon = battleTwoSelect();
        pokemonUsed.push(opponentPokemon);
        $('#pokeBallThree').attr('src', 'assets/images/pokeballFullFainted.png');
        $('#battleText').hide();
        $('#redText').text('Red sent out ' + opponentPokemon.name + '!').delay(2000).fadeIn(500);
        $('.secondMonImg').delay(6000).slideDown(200).attr('src', opponentPokemon.frontSprite);
        // $('.opponentPokemonImg').delay(3000).slideDown(200).attr('src', opponentPokemon.frontSprite);
        $('.userPokemonImg').attr('src', userPokemon.backSprite);
        $('#oppCurrentHp').text(opponentPokemon.currentHp);
        console.log(opponentPokemon.currentHp);
        $('#oppMaxHp').text(opponentPokemon.hp);
        $('#userCurrentHp').text(userPokemon.currentHp);
        $('#userMaxHp').text(userPokemon.hp);
        $('#attackName').text(userPokemon.attackName);

    } else if (battleCounter === 2){
        $('.secondMonImg').slideUp(1);
        $('#pokeBallTwo').attr('src', 'assets/images/pokeballFullFainted.png');
        opponentPokemon = battleThreeSelect(pokemonArray);
        console.log("Made it here");
        console.log(opponentPokemon);
        $('#battleText').hide();
        $('#redText').text('Red sent out ' + opponentPokemon.name + '!').delay(2000).fadeIn(500);
        $('.thirdMonImg').delay(6000).slideDown(200).attr('src', opponentPokemon.frontSprite);
        // $('.opponentPokemonImg').delay(3000).slideDown(200).attr('src', opponentPokemon.frontSprite);
        $('.userPokemonImg').attr('src', userPokemon.backSprite);
        $('#oppCurrentHp').text(opponentPokemon.currentHp);
        console.log(opponentPokemon.currentHp);
        $('#oppMaxHp').text(opponentPokemon.hp);
        $('#userCurrentHp').text(userPokemon.currentHp);
        $('#userMaxHp').text(userPokemon.hp);
        $('#attackName').text(userPokemon.attackName);

    } else {
        $('*').hide();
        console.log("fail");
    }

    $('.attackButton').click(function () {

        $('#redText').hide();
        $('#userAttackText').hide();
        $('#oppAttackText').hide();

        if (userPokemon.speed > opponentPokemon.speed) {
            attack(userPokemon, opponentPokemon, attackCounter);
            $("#userAttackText").text(battleTextGenerate(userTypeAdvantage, userPokemon)).fadeIn(200).delay(2000).fadeOut(200);
            if (!checkIfFNT(opponentPokemon)) {
                attack(opponentPokemon, userPokemon, 0);
                $("#oppAttackText").text(battleTextGenerate(oppTypeAdvantage, opponentPokemon)).delay(2400).fadeIn(200);
                $('#oppCurrentHp').text(opponentPokemon.currentHp);
                attackCounter++;
                console.log(attackCounter);
            } else {
                $('.opponentPokemonImg').delay(2400).slideUp(300);
                $('#oppCurrentHp').text("FNT");
                $('#oppMaxHp').text();
                $('#battleText').delay(2400).fadeIn(200).text('Enemy ' + opponentPokemon.name + ' has fainted!').delay(500).hide()
                battleCounter++;
                $('.attackButton').off('click');
                battleStart();
            }
        } else {
            attack(opponentPokemon, userPokemon, 0);
            $("#oppAttackText").text(battleTextGenerate(oppTypeAdvantage, opponentPokemon)).fadeIn(200).delay(2000).fadeOut(200)
            attack(userPokemon, opponentPokemon, attackCounter);
            $("#userAttackText").text(battleTextGenerate(userTypeAdvantage, userPokemon)).delay(2400).fadeIn(200);
            attackCounter++;

            if (!checkIfFNT(opponentPokemon)) {
                $('#oppCurrentHp').text(opponentPokemon.currentHp);
            } else {
                $('#userAttackText').delay(2000).fadeOut(200);
                $('.opponentPokemonImg').delay(4800).slideUp(300);
                $('#oppCurrentHp').text("FNT");
                $('#oppMaxHp').text();
                $('#battleText').delay(2400).fadeIn(200).text('Enemy ' + opponentPokemon.name + ' has fainted!').delay(500).hide()
                battleCounter++;
                $('.attackButton').off('click');
                battleStart();
            }

        }
        if (userPokemon.currentHp > 0) {
            $('#userCurrentHp').text(userPokemon.currentHp);
        } else {
            $('.userHpBar').text("FNT");
            $('.battleSetup').hide();
            $('.gameOver').show();

        }
        return;


    });
}





$(document).ready(function () {


    changeSprite('#bulbasaur', 'bulbasaur');
    changeSprite('#charmander', 'charmander');
    changeSprite('#squirtle', 'squirtle');
    changeSprite('#pikachu', 'pikachu');

    $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Here, take one of these rare pokémon.' + '</p>' +
        '<p class="card-body py-0">' + 'Choose wisely. You may only choose one! ' + '</p>');


    startGame();
   

});