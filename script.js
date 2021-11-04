(function(){

    let cards = parseInt(prompt("Com quantas cartas quer jogar [4 - 14 cartas]?"));

    while((cards%2) !== 0 || cards < 4 || cards >14)
        cards =  parseInt(prompt("Com quantas cartas quer jogar [4 - 14 cartas]?"));

    showCards();






    function showCards (cards){
        
    }




})();