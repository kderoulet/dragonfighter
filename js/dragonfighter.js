$(function() {
    
var dragonAction;
var humanAction;
var dragonHealth;
var fireDamage;
var clawDamage;
var tailSwipeDamage;
var humanHealth;
var wandBlastDamage;
var page;
var statusText;
var descriptionText;
var actionText;
var teleportCounter;

function init() {
    page = 1;
    initializeMoves();
    render();
}

function initVarEasy() {
    dragonAction = "";
    humanAction = "";
    dragonHealth = 100;
    fireDamage = 60;
    clawDamage = 15;
    tailSwipeDamage = 10;
    humanHealth = 100;
    wandBlastDamage = 7;
    teleportCounter = 0;
    page = 2;
    statusText = 'Easy Mode Selected'
    

}

function initVarHard() {
    dragonAction = "";
    humanAction = "";
    dragonHealth = 100;
    fireDamage = 200;
    clawDamage = 30;
    tailSwipeDamage = 20;
    humanHealth = 100;
    wandBlastDamage = 7;
    teleportCounter = 1;
    page = 2;
    statusText = 'Hard Mode Selected'
}


function nextTurn() {
    if (dragonHealth <= 0) {
        page = 4

    }
    else if (dragonAction === "inhale") {
        dragonMoves.breatheFire();
        dragonAction = "breatheFire";
    }   
    else if (humanAction = 'teleport') {
        if (teleportCounter < 3) {
            dragonMoves.confused()
        }
        else {
            dragonMoves.tailSwipe();
        }
    }
    else {
        var temp = randomAction(0, 6);
        if (temp === 1) dragonMoves.inhale();
        else if (temp === 2) dragonMoves.claw();
        else if (temp === 3) dragonMoves.fly();
    }
}

function randomAction(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;}

//event listener
$('.input').on('submit', function(evt) {
    evt.preventDefault();
    if (page === 1) {
        if ($('input').val() == 1) {
            initVarEasy();
            render();
        }
        else if ($('input').val() == 2) {
            initVarHard();
            render();      
        }
}
    else if (page === 2) {
        if ($('input').val() == 1) {
            humanAction.wandBlast();
            page = 3
            nextTurn();
            render();
        }
        else if ($('input').val() == 2) {
            humanAction.lightningStrike();
            page = 3
            nextTurn();
            render();
        }
        else if ($('input').val() == 3) {
            humanAction.shrinkEnemy();
            page = 3
            nextTurn();
            render();
        }
        else if ($('input').val() == 4) {
            humanAction.endureFlame();
            page = 3
            nextTurn();
            render();
        }
        else if ($('input').val() == 5) {
            humanAction.teleport();
            page = 3
            nextTurn();
            render();
        }
    }
    else if (page === 3) {
        if ($('input').val() == 1) {
            humanAction.wandBlast();
            nextTurn();
            render();
        }
        else if ($('input').val() == 2) {
            humanAction.lightningStrike();
            nextTurn();
            render();
        }
        else if ($('input').val() == 3) {
            humanAction.shrinkEnemy();
            nextTurn();
            render();
        }
        else if ($('input').val() == 4) {
            humanAction.endureFlame();
            nextTurn();
            render();
        }
        else if ($('input').val() == 5) {
            humanAction.teleport();
            nextTurn();
            render();
        }
}});
    //Do we want an array of objects rather than a big ol' object?
dragonMoves = {
    inhale: function() {
        dragonAction = "inhale";
        description2Text = "The dragon is strongly inhaling...";
    },
    claw: function() {
        dragonAction = "claw";
        humanHealth = humanHealth - clawDamage;
        description2Text = "The dragon claws at you, dealing " + clawDamage + " damage to you. You have " + humanHealth + " remaining.";
    },
    breatheFire: function() {
        dragonAction = "breatheFire";
        if (humanAction === "endureFlame") {
            description2Text = "The dragon breathes fire at you, but your spell shields you from damage.";
            }
        else if (humanAction === "teleport") {
            description2Text = "The dragon breathes fire, but he misses";
        }
        else {
            humanHealth = humanHealth - fireDamage;
            description2Text = "The dragon breathes fire, burning you for " + fireDamage + " damage. You have " + humanHealth + " remaining.";}
    },
    confused: function() {
        dragonAction = 'confused'
        description2Text = 'Confused, the dragon looks around, trying to figure out where you went.';
    },
    tailSwipe: function() {
        dragonAction = "tailSwipe";
        humanHealth = humanHealth - tailSwipeDamage;
        description2Text = "The dragon sweeps you with his tail, knocking you over and dealing " + tailSwipeDamage + " damage to you. You have " + humanHealth + " remaining.";
    }};

humanMoves = {
    wandBlast: function() {
        humanAction = "wandBlast"
        dragonHealth = dragonHealth - wandBlastDamage;
        description1Text = "A blast of magical energy shoots from your wand and hits the dragon! The dragon reacts as if it were stung by a bee.";
    },
    lightningStrike: function () {
        if (humanAction === 'lightningStrike') {
            humanAction = 'failed'
            description1Text = 'Your lightning spell fizzles. Maybe it needs some time to recharge?'
        }
        humanAction = 'lightningStrike'
        dragonHealth = dragonHealth - lightningStrike;
        description1Text = 'You give the dragon a good zap. It is not pleased.'
    },
    shrinkEnemy: function () {
        humanAction = 'shrinkEnemy'
        description1Text = ''
    },
    endureFlame: function() {
        humanAction = "endureFlame"
        description1Text = "You cast endure flame, sheilding you from fire damage for the turn.";
    },
    teleport: function() {
        humanAction = 'teleport'
        description1Text = 'You teleport to the other side of the dragon.';
        teleportCounter++
    }
};

function renderPage() {
    $('.status').html(statusText)
    $('.description1').html(description1Text)
    $('.description2').html(description2Text)
    $('.action').html(actionText)
    $('input').val('');
}

function setTextValues() {
    if (page === 1) {
        statusText = 'Welcome to Game';
        description1Text = '';
        description2Text = '';
        actionText = 'How difficult do you want this? <br> 1. Easy <br> 2. Hard'
    }
    else if (page === 2) {
        description1Text = 'You approach a mighty dragon in his cave. He appears to be alert and ready to fight.'
        description2Text = 'You have a bunch of spells, but it has been a while since your last fight. Hopefully they all still work.'
        actionText = 'What spell are you going to use? <br> 1. Wandblast <br> 2. Lightning Strike <br> 3. Shrink Enemy <br> 4. Endure Flames <br> 5. Teleport'
    }
    else if (page === 3) {

    }
    else if (page === 4) {
        statusText = 'You have killed the dragon'
        description1Text = 'With a loud thud, the dragon drops to the ground.'
        description2Text = 'Upon your return to town, '
        actionText = 'You win'

    }
    else {
        statusText = 'You Died'
        descriptionText = '';
        actionText = 'Do you want to try again? <br> 1. Yes <br> 2. No';
    }
}

function render() {
    setTextValues();
    renderPage();
}

init();

})