(function(){

    let qtdCards;
    let deck;
    let firstCard;
    let rodadas;
    let ClockId;
    let sound;
    let qtdFliped;
    //Como uso essa variavel de segundo em segundo, achei q ela deveria ser global...
    let clock = document.querySelector(".chronometer");
    
    startGame();

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function startGame(){
        document.querySelector("main").innerHTML = '';
        deck = [];
        firstCard = null;
        rodadas = 0;
        clock.innerHTML = '000';
        qtdFliped = 0;

        qtdCards = parseInt(prompt("Com quantos pares de cartas quer jogar? [2 - 7 pares]?")) * 2;

        while((qtdCards%2) !== 0 || qtdCards < 4 || qtdCards >14)
            qtdCards = parseInt(prompt("Com quantos pares de cartas quer jogar? [2 - 7 pares]?")) * 2;


        getDeck(qtdCards);
        shuffle();
        putTable();
        startClock();
    
    }
    function turn(event){

        let card = event.currentTarget;
        
        card.querySelector(".front-face.face").classList.add("show");
        card.querySelector(".back-face.face").classList.add("show");

        qtdFliped = document.querySelectorAll(".show").length / 2;

        
        if((qtdFliped % 2) === 0 && (qtdFliped !== 0)){

            rodadas++;

            if (card.querySelector(".front-face.face img").src !== firstCard.querySelector(".front-face.face img").src){
                document.addEventListener("click", handler, true);
                playWrong();
                setTimeout(unTurn, 1000, card);
            } else {
                keepCorrect(card);
                playGotcha();
                setTimeout(checkEndGame, 300);
            }
        } else {
            firstCard = card;
        }
    }


    function checkEndGame() {
        let viradas = document.querySelectorAll(".show").length / 2;
        let tempo = parseInt(clock.innerHTML);
        let escolha;
        if (viradas === qtdCards){
            stopClock();
            escolha = prompt(`Você ganhou em ${rodadas} jogadas e
${tempo} segundos!
Deseja jogar novamente? (sim/não)`);
            if(escolha === 'sim' || escolha === 's')
                startGame();
        }
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
    function keepCorrect(card){
        let front = card.querySelector(".front-face.face.show");
        let front2 = firstCard.querySelector(".front-face.face.show");
        card.removeEventListener('click', turn);
        front.classList.add("correct");
        firstCard.removeEventListener('click', turn);
        front2.classList.add("correct");
    }
    function playGotcha(){
        sound = document.getElementById('gotcha');
        sound.volume = 0.2;
        sound.play();
    }
    function playWrong(){
        sound = document.getElementById('wrong');
        sound.volume = 0.2;
        sound.play();
    }
    function startClock(){
        clock.classList.add("showClock");
        ClockId = setInterval(tik, 1000);
    }
    function tik(){
        let time = parseInt(clock.innerHTML);
        clock.innerHTML = pad(time+1);
    }
    function stopClock(){
        clearInterval(ClockId);
    }
    function handler(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    function pad(num) {
        let s = "0000" + num;
        return s.substr(s.length-3);
    }
    
})();
