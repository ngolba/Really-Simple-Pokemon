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
        hp: 39,
        att: 52,
        def: 43,
        speed: 65
    }

    var bulbasaur = {
        hp: 45,
        att: 49,
        def: 65,
        speed: 45
    }

    var squirtle = {
        hp: 44,
        att: 48,
        def: 65,
        speed: 43
    }

    var pikachu = {
        hp: 35,
        att: 55,
        def: 30,
        speed: 90
    }
    generateIvs(charmander);
    generateIvs(bulbasaur);
    generateIvs(squirtle);
    generateIvs(pikachu);

    $('.charSelect').click(function(event){
        $('#pokeChoice').text('');
        $("#areSure").show();

    })







})