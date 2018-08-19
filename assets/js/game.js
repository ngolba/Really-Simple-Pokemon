$(document).ready(function(){
    
    var changeSprite = function (monId, monName) {
        $(monId).hover(function() {
            $(monId).attr('src', 'assets/images/' + monName + '.gif');
        },
        function() {
            $(monId).attr('src', 'assets/images/' + monName + '.png');
        });
    }

    changeSprite('#bulbasaur', 'bulbasaur');
    changeSprite('#charmander', 'charmander');
    changeSprite('#squirtle', 'squirtle');
    changeSprite('#pikachu', 'pikachu');

    $('#areSure').hide();
    $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Here, take one of these rare pokémon.' + '</p>' +
    '<p class="card-body py-0">' + 'Choose wisely. You may only choose one! ' + '</p>');


    var generateRandoms = function(min, max) {
        return Math.random()*(max-min)+min;

    }


    var generateIvs = function (mon) {
        mon.hp *= generateRandoms(.75, 1.25);
        mon.hp = Math.trunc(mon.hp);
        mon.att *= generateRandoms(.75, 1.25);
        mon.att = Math.trunc(mon.att);
        mon.def *= generateRandoms(.75, 1.25);
        mon.def = Math.trunc(mon.def);
        mon.speed *= generateRandoms(.75, 1.25);
        mon.speed = Math.trunc(mon.speed);
    }

    var charmander = {
        name: 'Charmander',
        hp: 39,
        att: 52,
        def: 43,
        speed: 65
    }

    var bulbasaur = {
        name: 'Bulbasaur',
        hp: 45,
        att: 49,
        def: 65,
        speed: 45
    }

    var squirtle = {
        name: 'Squirtle',
        hp: 44,
        att: 48,
        def: 65,
        speed: 43
    }

    var pikachu = {
        name: 'Pikachu',
        hp: 35,
        att: 55,
        def: 30,
        speed: 90
    }
    generateIvs(charmander);
    generateIvs(bulbasaur);
    generateIvs(squirtle);
    generateIvs(pikachu);

    var userPokemon;
    var pokemonChosen = false;


    $('.charSelect').click(function(event){
        $('#pokeChoice').text($(this).attr('name'));
        $("#areSure").show();
        userPokemon = $(this).attr('name');
        console.log(userPokemon);
    });
    
    $('.yesNo').click(function(event){
        if ($(this).attr('value') === 'Yes'){
            $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your pokémon will be ' + userPokemon + '.' + '<p class="card-body pb-0">' + 'Choose your opponent.' + '</p>');
            $('#areSure').hide();
            pokemonChosen = true;
        } else {
            $('#areSure').hide();
        }
    });

    console.log(pokemonChosen);
    
    
    
    console.log(userPokemon);
    console.log(pokemonChosen);

 







})