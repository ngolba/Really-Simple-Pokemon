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







})