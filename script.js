'use strict';

// Deklarerar element i variabler
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Här deklarerar jag variabler så att de kan nås inom alla scopes. Har jag dem bara inom funktionen nedan som körs när man startar sidan kan variablerna inte nås i funktionerna som lyssnar efter knapptryck, så jag behöver bara ha deklarerat den variabel innan.
let scores, currentScore, activePlayer, playing;

// Startvillkor
// Här nollställs hela spelet utifrån de tomma variablerna jag deklarerade ovan.
const init = function () {
    scores = [0, 0];
    playing = true;
    activePlayer = 0;
    currentScore = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};

// Kör startvillkoren så att varje gång man laddar om sidan nollställs allt.
init();

 // Byter den aktiva spelare med toggle. Om jag rollar 1 kommer den att byta style för båda spelarna, vilket betyder att den aktiva spelaren tappar stylen och den nya får den.
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// Tärningsfunktion
btnRoll.addEventListener('click', function() {
    if (playing) {
        //1. Genererar ett random nummer mellan 1-6 och tar bort alla decimaler genom trunc
        const dice = Math.trunc(Math.random() * 6) + 1;
        
        //2. Tar bort hidden från tärningen och visar den
        diceEl.classList.remove('hidden');
        // Ändrar src på bilden utifrån namnet på tärningarna, som alla har en siffra i namnet
        diceEl.src = `dice-${dice}.png`;
        
        //3. Ser till att det inte har rollats en etta
        if (dice !== 1) {
            // Lägger till tärningskastet till den nuvarande poängen
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
        } else {
            // Funktion för att byta spelare. Se ovan!
            switchPlayer()
        }
    }
});

// Behåll poäng-funktion
btnHold.addEventListener('click', function () {
    // Ett boolean-värde som kollar om vi spelar. Playing har true/false, och genom att skriva in playing i alla eventlisteners kollar vi om spelet är aktivt. Längre ner i koden ändras playing till false om någon har vunnit, vilket resulterar i att man inte kan trycka på några knappar längre ftersom funktionen bara körs --- if (playing) --- om playing är true.
    if (playing) {
        
        // Lägger till nuvarande poängen till den aktiva spelarens totala poäng.
        scores[activePlayer] += currentScore;
        // Active player kommer vara indexet i scores-arrayen. Sen läggs currentScore till i det element som matchar current player.
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        
        // Att behålla poäng nollställer den nuvarande poängen och lägger till den aktiva spelarens totala poäng.
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
        
        // Kollar om poängen är större eller lika med 100.
        if (scores[activePlayer] >= 50) {
            // Detta avslutar spelet
            playing = false; // Här ändras playing till false för att blockera knapp-funktionerna från att köras. Detta eftersom alla funktionen har en if-sats som kollar om playing är true.

            // Tar bort stylen som är active player och lägger till en style för vinnaren.
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEl.classList.add('hidden');
            
        } else {
            switchPlayer()
        }
    }
});

// Här nollställer jag hela spelet och JavaScript återkallar init-funktionen
btnNew.addEventListener('click', init);

// Detta var vad jag skrev när jag inte hade gjort enn funktion för att nollställa spelet
// btnNew.addEventListener('click', function () {
//     // Sätter playing till true  så man kan klicka på knapparna igen.
//     playing = true;

//     // Döljer tärningen vid nytt game
//     diceEl.classList.add('hidden');

//     // Nollställer alla poängräknare
//     currentScore = 0;
//     score0El.textContent = 0;
//     score1El.textContent = 0;
//     currentScore0.textContent = 0;
//     currentScore1.textContent = 0;

//     // Måste ta bort vinnar-stylen om någon har vunnit.
//     player0.classList.remove('player--winner');
//     player1.classList.remove('player--winner');

//     // Återställer stylen så att startspelaren får aktive-player style, och tar bort från p2.
//     player0.classList.add('player--active');
//     player1.classList.remove('player--active');

//     // Sätter activePlayer till 0 så att poängenräknaren alltid börrjar från player 1.
//     activePlayer = 0;

//     // Måste nollställa scores också, annars när man trycker på Hold så får man sina föregående poäng plus det som current visar
//     scores = [0, 0];
// })