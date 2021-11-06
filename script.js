(function(){

    
    let qtdCards = parseInt(prompt("Com quantos pares de cartas quer jogar? [2 - 7 cartas]?")) * 2; //let qtdCards = 8;
    let deck = [];
    let firstCard;
    let rodadas = 0;

    while((qtdCards%2) !== 0 || qtdCards < 4 || qtdCards >14)
        qtdCards = parseInt(prompt("Com quantos pares de cartas quer jogar? [2 - 7 cartas]?")) * 2;

    getDeck(qtdCards);
    shuffle();
    putTable();

    
    function turn(event){
        console.log("toim");
        let card = event.currentTarget;
        
        card.querySelector(".front-face.face").classList.add("show");
        card.querySelector(".back-face.face").classList.add("show");

        qtdFliped = document.querySelectorAll(".show").length / 2;

        
        if((qtdFliped % 2) === 0 && (qtdFliped !== 0)){

            rodadas++;

            if (card.querySelector(".front-face.face img").src !== firstCard.querySelector(".front-face.face img").src){
                document.addEventListener("click", handler, true);
                setTimeout(unTurn, 1000, card);
            } else {
                card.removeEventListener('click', turn);
                firstCard.removeEventListener('click', turn);
                setTimeout(checkEndGame, 300);
            }
        } else {
            firstCard = card;
        }
    }





    function checkEndGame() {
        let viradas = document.querySelectorAll(".show").length / 2;
        if (viradas === qtdCards)
            alert(`Você ganhou em ${rodadas} jogadas!`);
    }
    function unTurn(card){
        card.querySelector(".front-face.face").classList.remove("show");
        card.querySelector(".back-face.face").classList.remove("show");
        firstCard.querySelector(".front-face.face").classList.remove("show");
        firstCard.querySelector(".back-face.face").classList.remove("show");

        document.removeEventListener('click', handler, true);
    }
    function putTable (){

        let table = document.querySelector("main");
        deck.forEach(item => {
            table.appendChild(item);
        });
    }
    function getDeck(qtdCards){

        let div, img;

        for(let i=1; i<=qtdCards; i++){
            div = document.createElement("div");
            img = document.createElement("img");
            div.classList.add("card");
            div.setAttribute("data-identifier","card");
            div.innerHTML = `   <div class="back-face face" data-identifier="back-face">
                                    <img class ="back" src="imgs/back.png" alt="">
                                </div>
                                <div class="front-face face" data-identifier="front-face"></div>`;

            if(i%2 === 1)
                img.src = `imgs/card_${((i+1)/2)}.gif`;
            else 
                img.src = `imgs/card_${i/2}.gif`;
            
            div.querySelector(".front-face.face").appendChild(img);
            div.addEventListener('click', turn);
            deck.push(div);
        }
    }
    function shuffle(){
        deck.sort(function(){return Math.random() - 0.5;});
    }
    function handler(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    
})();