
let totalMatched = 0; //for summary

function setupGameboard(boardId, cardClass, buttonId, triviaDivId, triviaTextId, totalPairs) {
    const gameboard = document.getElementById(boardId);
    const cards = Array.from(document.getElementsByClassName(cardClass));
    const button = document.getElementById(buttonId);
    const triviaDiv = document.getElementById(triviaDivId);
    const triviaText = document.getElementById(triviaTextId);

    // Fisher-Yates Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }




    gameboard.innerHTML = "";
    cards.forEach(card => gameboard.appendChild(card));

    cards.forEach(card => card.addEventListener("click", flipCard));

    let flippedCards = [];
    let lockBoard = false;
    let matchedPairs = 0;

    function flipCard() {
        if (lockBoard || this.classList.contains("flipped")) return;

        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            lockBoard = true;
            setTimeout(checkMatch, 500);
        }
    }


    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.card === card2.dataset.card) {
            card1.removeEventListener("click", flipCard);
            card2.removeEventListener("click", flipCard);
            matchedPairs++; totalMatched++;

            if (totalMatched === 10){
                showSummary();
            }

            if (matchedPairs === totalPairs) {
                showTriviaButton();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
            }, 100);
        }


        flippedCards = [];
        lockBoard = false;
    }



    function showTriviaButton() {
        button.style.display = "block";
        button.style.margin = "20px auto"; // to center the button
        button.addEventListener("click", () => {
            triviaText.style.display = "block";
            triviaDiv.style.display = "block";
        });

    }

    function showSummary() {
        const fieldset = document.querySelector("fieldset.container");
        const content = document.querySelector("p.content");
        const process = document.querySelector("div.process");
    
        fieldset.style.display = "block";
        fieldset.style.margin = "20px auto";
        content.style.display = "block";
        process.style.display = "block";
        process.style.margin = "0 auto";
        
    }
    

    
}




window.onload = function () {
    setupGameboard("gameboard", "card", "firstclick", "trivia1", "triviatext", 4);
    setupGameboard("gameboard2", "card2", "secondclick", "trivia2", "triviatext2", 3);
    setupGameboard("gameboard3", "card3", "thirdclick", "trivia3", "triviatext3", 3);

    
};




