import { animals } from "./carddeatils/carddetails.js";

const game = document.querySelector('.game-screen');
    let cards = [...animals, ...animals];
let flippedCards = [];
let lockboard=true;
let matchedpair=0;
let time=0;
let timerinterval;
function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}
console.log(cards)
function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.name = card.name;
    cardElement.innerHTML = `
        <div class="card-face">
            <div class="inner-card">
                <img src="Untitled design.jpg" class="image">
            </div>
            <div class="outer-card">
                <img src="${card.src}" class="image">
            </div>
        </div>`;
        cardElement.addEventListener('click',()=>flipEvent(cardElement));
    return cardElement;
}
function flipEvent(cardElement){
    if(lockboard || cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {

        return;
    }
    else{
        cardElement.classList.add('flipped')
        flippedCards.push(cardElement);
        
        if(flippedCards.length===2){
            const [first,second]=flippedCards;
            if(first.dataset.name===second.dataset.name){
                matchedpair++;
                first.classList.add('matched');
                second.classList.add('matched');
                
                flippedCards=[];
                document.querySelector('.user-score').innerHTML=matchedpair;                
                if(matchedpair===4){
                    document.querySelector('.game-screen').classList.add('you-win');
                    document.querySelector('.game-screen').innerHTML=`YOU WIN IN ${time} seconds`;
                    document.querySelector('.start-game').innerHTML='PLAY AGAIN';
                    document.querySelector('.user-score').innerHTML='SCORE';
                    matchedpair=0;
                    lockboard=true;
                    cardElement.classList.remove('matched');
                    endtimer();
                }
            }
            else{
                lockboard=true;
                setTimeout(()=>{
                flippedCards=[]
                first.classList.remove('flipped');
                second.classList.remove('flipped'); 
                lockboard=false;   
            },1000);
            }
        }
    }
    
    console.log(flippedCards)
}
function playGame() {
    shuffle(cards).forEach((animal) => {
        const cardElement = createCard(animal);
        game.appendChild(cardElement);
    });
}
playGame()
function timer(){
    timerinterval=
    setInterval(()=>{
        time++;
        document.querySelector('.timer-setting').innerHTML=time;
    },1000)
}
function endtimer(){
    time=0;
    document.querySelector('.timer-setting').innerHTML='Timer';
    clearInterval(timerinterval);
}
document.querySelector('.start-game').addEventListener('click',()=>{
    if(document.querySelector('.start-game').innerHTML==='STOP'){
        document.querySelector('.game-screen').innerHTML='';
        document.querySelector('.start-game').innerHTML='START';
        document.querySelector('.user-score').innerHTML='SCORE';
        matchedpair=0;
        lockboard=true;
        endtimer();
        playGame();
    }
    else if(document.querySelector('.start-game').innerHTML==='PLAY AGAIN'){
        document.querySelector('.game-screen').classList.remove('you-win');
        document.querySelector('.game-screen').innerHTML='';
        document.querySelector('.start-game').innerHTML='STOP';
        lockboard=false;
        timer();
        playGame();
    }
    else{
        document.querySelector('.start-game').innerHTML='STOP';
        lockboard=false;
        timer()
    }
})
