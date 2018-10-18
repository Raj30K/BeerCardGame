var flipped_Beers = [];
var flipped_counter = 0;
var beers_card_ids = [];
var attempts_counter = 0;

// To randomize the beer collection array for every new game.
function setBeerCollectionData() {
    shuffleArray(beer_Collection);
}

// Use this to shuffle any array.
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

/*
* this mainly creates the card slots inside the main container. All the inner elements are divs.
* Also assignes a particular id to an element and add onclick events to every div.
* */
function generateMemoryCards() {
    flipped_counter = 0;
    var output = '';
    setBeerCollectionData(beer_Collection);
    for (var i = 0; i < beer_Collection.length; i++) {
        output += '<div id = "BeerCard_' + i + '" onClick = "showBeerCard(this,\'' + beer_Collection[i] + '\')">Click Me</div>';
    }
    document.getElementById('mainContainer').innerHTML = output;
    setCounter();
}

/*
* This calculates the whether the player finds a match after selecting two cards, if not then resets the cards to initial state.
* Also checks if the number of cards selected by the user is equal to the total cards availabe, then ends the current game play.
* */
function showBeerCard(card, beer) {
    if (card.innerHTML === "Click Me" && flipped_Beers.length < 2) {
        attempts_counter = attempts_counter + 1;
        setCounter();
        card.style.background = "#fff";
        card.innerHTML = "";
        var imgLoc = "../imgs/" + beer + ".jpg";
        card.style.backgroundImage = 'url(\'' + imgLoc + '\')';
        card.style.backgroundRepeat = "no-repeat";
        card.style.backgroundSize = "100% 100%";
        addEffectsToCards(card);
        if (flipped_Beers.length === 0) {
            flipped_Beers.push(beer);
            beers_card_ids.push(card.id);
        } else if (flipped_Beers.length === 1) {
            flipped_Beers.push(beer);
            beers_card_ids.push(card.id);
            if (flipped_Beers[0] === flipped_Beers[1]) {
                flipped_counter += 2;
                flipped_Beers = [];
                beers_card_ids = [];
                if (flipped_counter === beer_Collection.length) {
                    setTimeout(setGameAgain, 2000);
                }
            } else {
                function flipCardBackIfNotSame() {
                    var card_1 = document.getElementById(beers_card_ids[0]);
                    var card_2 = document.getElementById(beers_card_ids[1]);
                    card_1.style.background = "#ffff00";
                    card_1.innerHTML = "Click Me";
                    card_2.style.background = "#ffff00";
                    card_2.innerHTML = "Click Me";
                    beers_card_ids = [];
                    flipped_Beers = [];
                    resetEffectsToCards(card_1);
                    resetEffectsToCards(card_2);
                }

                setTimeout(flipCardBackIfNotSame, 1000);
                //flipCardBackIfNotSame();
            }
        }
    }
}

/*
* this is used to reset the game round.
* */
function setGameAgain() {
    alert("You Won!! Please click OK to play again");
    document.getElementById('mainContainer').innerHTML = "";
    attempts_counter = 0;
    generateMemoryCards();
}

// For counting the number of user attempts
function setCounter() {
    document.getElementById("counter").innerText = "Counter : " + attempts_counter;
}

function addEffectsToCards(card) {
    card.style.transformStyle = "preserver-3d";
    card.style.transition = "all .5s";
    card.style.transform = "rotate(360deg)";
}

function resetEffectsToCards(card) {
    card.style.transformStyle = "preserver-3d";
    card.style.transition = "all .3s";
    card.style.transform = "rotate(0deg)";
}
