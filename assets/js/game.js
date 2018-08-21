
 

  var charmander = {
    name: 'Charmander',
    index: 0,
    hp: 39,
    att: 52,
    def: 43,
    speed: 65
}

var bulbasaur = {
    name: 'Bulbasaur',
    index: 1,
    hp: 45,
    att: 49,
    def: 65,
    speed: 45
}

var squirtle = {
    name: 'Squirtle',
    index: 2,
    hp: 44,
    att: 48,
    def: 65,
    speed: 43
}

var pikachu = {
    name: 'Pikachu',
    index: 3,
    hp: 35,
    att: 55,
    def: 30,
    speed: 90
}

var pokemonArray = [charmander, bulbasaur, squirtle, pikachu];
var userPokemon = {};
var opponentPokemon;
var battleRoster = [userPokemon, opponentPokemon];
var userPokemonChosen = 'false';
var opponentPokemonChosen = 'false';
var index = 4;

var changeSprite = function (monId, monName) {
    $(monId).hover(function() {
        $(monId).attr('src', 'assets/images/' + monName + '.gif');
    },
    function() {
        $(monId).attr('src', 'assets/images/' + monName + '.png');
    });
}
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

var placeSprites = function(userPokemonImg, userPokemon, opponentPokemonImg, opponentPokemon) {
    $(userPokemonImg).attr('src', 'assets/images/' + userPokemon.name.toLowerCase() + 'back.gif');
    $(opponentPokemonImg).attr('src', 'assets/images/' + opponentPokemon.name.toLowerCase() + '.gif');
    
}

var startGame = function(){

    generateIvs(charmander);
    generateIvs(bulbasaur);
    generateIvs(squirtle);
    generateIvs(pikachu);

  



    $('.charSelect').click(function() {
        // userPokemon = (pokemonArray[$(this).attr('index')]);
        var userPokemonName = $(this).attr('name');
        $('#areSure').show()
        $('#pokeChoice').text(userPokemonName);
        $(this).attr('userPokemon', true);
        $(this).siblings('.charSelect').attr('userPokemon', false);

        if(userPokemonChosen === 'false'){
        $('.yesNoBttn').click(function() {
            if($(this).attr('value') === 'Yes') {
                $('.charSelect').each(function(event){
                    if ($(this).attr('userPokemon') === 'true'){
                        index = $(this).attr('index');
                        userPokemon = pokemonArray[index];
                        userPokemonChosen = 'true';
                        $(this).addClass('border border-dark').removeClass('charSelect');
                        $('#areSure').hide();
                        $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your pokémon will be ' + userPokemon.name + '.' + '<p class="card-body pb-0">' + 'Choose your opponent.' + '</p>');
                        $(this).off('click');
                        return;
                    }else {
                        $(this).addClass('opponentChoice').removeClass('charSelect').removeAttr('userPokemon');
                    }
                });
            }else  {
                $('#areSure').hide();
            }
            })
        } else{
            $('.yesNoBttn').removeClass('yesNoBttn').addClass('yesNoOpp');
            opponentSelect();
        }  
    });    
};


var opponentSelect = function() {
    $('.opponentChoice').each( function() {
        $(this).removeAttr('userPokemon')});

    $('.opponentChoice').click(function() {
        
        
        var opponentPokemonName = $(this).attr('name');
        $('#areSure').show();
        $('#pokeChoice').text(opponentPokemonName);
        $(this).attr('opponentPokemon', true);
        $(this).siblings('.opponentChoice').attr('opponentPokemon', false);

        if(opponentPokemonChosen === 'false'){
            $('.yesNoOpp').click(function() {
                console.log(opponentPokemonChosen);
                if($(this).attr('value') === 'Yes') {
                    $('.opponentChoice').each(function(event){
                        if ($(this).attr('opponentPokemon') === 'true'){
                            console.log("Made it here");
                            index = $(this).attr('index');
                            opponentPokemon = pokemonArray[index];
                            opponentPokemonChosen = 'true';
                            console.log(opponentPokemon);
                            $(this).addClass('border border-danger col-4').removeClass('opponentChoice col-3');
                            $('#areSure').hide();
                            $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your opponent\'s pokémon will be ' + opponentPokemon.name + '.' + '<p class="card-body pb-0">' + 'Click Start to start battle!' + '</p>' + '<button type="button" class="btn btn-danger" id="startButton">' + 'Start!' + '</button>');
                            
                            $('.character').each(function() {
                                $(this).addClass('col-4').removeClass('col-3');
                            })
                            // $('.startingSetup').addClass('justify-content-center');

                            battle();
                            // return;
                        }else {
                            $(this).hide();
                        }
                    });
                }else  {
                    $('#areSure').hide();
                }
                }) 
            // } else {
            //     console.log('failure');
            //     battle();
            } 

    })
};

var battle = function() {
    $('#startButton').click(function() {
        $('.startingSetup').html('');
        // var userPokemonImg = 
        // placeSprites();
        $('.topRow').html(
            '<div class="row w-100">' +
                '<div class="col-6 mx-auto">' +
                '<div class="card">' +
                    '<img class="w-100" src="assets/images/PBC.png" id="arenaImg">' +
                    // '<img class="userPokemonImg">' +
                '</div>' +
                '</div>' +
            '</div>'

        );
    })
};

$(document).ready(function(){
    
  
    changeSprite('#bulbasaur', 'bulbasaur');
    changeSprite('#charmander', 'charmander');
    changeSprite('#squirtle', 'squirtle');
    changeSprite('#pikachu', 'pikachu');

    $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Here, take one of these rare pokémon.' + '</p>' +
    '<p class="card-body py-0">' + 'Choose wisely. You may only choose one! ' + '</p>');

    
    startGame();
    $('.yesNoBttn').click(function() {
        console.log("clicked");
    })
    
    
    

    // $('.charSelect').each(function(){
    //     console.log($(this).attr('name'));
    //     if ($(this).attr('userPokemon') === true){
    //         userPokemon = pokemonArray[$(this).attr('index')];
    //         console.log(userPokemon);
    //     }else {
    //         console.log("Failure");
    //     }
    // });


   

    // $('.charSelect').each(function() {
    //     if ($('.charSelect').attr('userPokemon') === true){
    //         userPokemon = (pokemonArray[$(this).attr('index')]);
    //         console.log(userPokemon);
    //     };
    // });





    /// Working Test 

//     $('.charSelect').click(function(event){
//         $('#pokeChoice').text($(this).attr('name'));
//         $("#areSure").show();
//         userPokemon = pokemonArray[$(this).attr('index')];
//         console.log(userPokemon);
//         $(this).attr('userPokemon', true);
//         $(this).siblings('.charSelect').attr('userPokemon', false);



//         $('.yesNo').click(function(event){
//             if ($(this).attr('value') === 'Yes'){
//                 $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your pokémon will be ' + userPokemon.name + '.' + '<p class="card-body pb-0">' + 'Choose your opponent.' + '</p>');
//                 $('#areSure').hide();
//                 userPokemonChosen = true;
//                 // $(this).attr('userPokemon', 'true');
//                 // if ($('.charSelect').attr('userPokemon') === false){
//                 // $('.charSelect').siblings('.charSelect').addClass('opponentSelect');
//                 // }
//                 $('.charSelect').off('click');
                
//             } else {
//                 $('#areSure').hide();
//                 userPokemon = '';
//                 console.log(userPokemon);
//             }
//     });

//     $('.opponentSelect').click(function(event){
//         $('#pokeChoice').text($(this).attr('name'));
//         $("#areSure").show();
//         opponentPokemon = pokemonArray[$(this).attr('index')];
//         console.log(opponentPokemon);

//         $('.yesNo').click(function(event){
//             if ($(this).attr('value') === 'Yes'){
//                 $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your opponent\'s pokémon will be ' + opponentPokemon.name + '.' + '<p class="card-body pb-0">' + 'Choose your opponent.' + '</p>');
//                 $('#areSure').hide();
//                 opponentPokemonChosen = true;
//                 $('.charSelect').off('click')
//             } else {
//                 $('#areSure').hide();
//             }
//     });
//     });

// });

// ///////////////////////////

//////////////////////// test 2 


    // $('.opponentSelect').click(function(event){
    //     $('#pokeChoice').text($(this).attr('name'));
    //     $("#areSure").show();
    //     opponentPokemon = pokemonArray[$(this).attr('index')];
    //     console.log(opponentPokemon);

    //     $('.yesNo').click(function(event){
    //         if ($(this).attr('value') === 'Yes'){
    //             $('#oakText').html('<p class="card-body pb-0">' + 'Oak: Your opponent\'s pokémon will be ' + opponentPokemon.name + '.' + '<p class="card-body pb-0">' + 'Choose your opponent.' + '</p>');
    //             $('#areSure').hide();
    //             opponentPokemonChosen = true;
    //             $('.charSelect').off('click')
    //         } else {
    //             $('#areSure').hide();
    //         }
    // });
    // });

///////////////////


    
    
    
    // console.log(userPokemon);

 







});
