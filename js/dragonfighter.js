$(function() {
    
var dragonAction;
var humanAction;
var dragonHealth;
var fireDamage;
var clawDamage;
var tailSwipeDamage;
var flying;
var humanHealth;
var wandBlastDamage;
var page;
var statusText;
var descriptionText;
var actionText;
var humanMoves = {};
var dragonMoves = {};

function init() {
    page = 1;
    render();
}

function initVarEasy() {
    dragonAction = "";
    humanAction = "";
    dragonHealth = 100;
    fireDamage = 60;
    clawDamage = 15;
    tailSwipeDamage = 10;
    flying = false;
    humanHealth = 100;
    wandBlastDamage = 7;
    page = 2;
}
function initVarHard() {
    dragonAction = "";
    humanAction = "";
    dragonHealth = 100;
    fireDamage = 200;
    clawDamage = 30;
    tailSwipeDamage = 20;
    flying = false;
    humanHealth = 100;
    wandBlastDamage = 7;
    page = 2;
}


function nextTurn() {
if (dragonAction === "inhale") {
    breatheFire();
    dragonAction = "breatheFire";
} else randomAction(0, 6);}

function randomAction(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;}

//event listener
$('.input').on('submit', function(evt) {
    evt.preventDefault();
    if (page === 1) {
        console.log($('input').val())    
        if ($('input').val() == 1) {
            initVarEasy();
            page++;        
        }
        else if ($('input').val() == 2) {
            initVarHard();
            page++;        
        }
}
    if (page === 2) {
        if ($('input').val() == 1) {
            $('.description').text('Now it must be working')
                    
        }
        else if ($('input').val() == 2) {
            initVarHard();
            $('.description').text('But for real now')        
        }
    }
});
    //Do we want an array of objects rather than a big ol' object?
    
dragonMoves = {
    inhale: function() {
        dragonAction = "inhale";
        console.log("The dragon is strongly inhaling...")
    },
    claw: function() {
        dragonAction = "claw";
        humanHealth = humanHealth - clawDamage;
        console.log("The dragon claws at you, dealing " + clawDamage + " damage to you. You have " + humanHealth + " remaining.")
    },
    fly: function() {
        dragonAction = "fly"
        flying = true;
        console.log("The dragon flies into the air!");
    },
    breatheFire: function() {
        dragonAction = "breatheFire";
        if (humanAction === "endureFlame") {
            description2Text = "You dodged the dragon's fire!";
            }
        else if (humanAction === "teleport") {
            description2Text = "The dragon breathes fire, but he misses";
        }
        else {
            humanHealth = humanHealth - fireDamage;
            description2Text = "The dragon breathes fire, burning you for " + fireDamage + " damage. You have " + humanHealth + " remaining."}
    },
     tailSwipe: function() {
        dragonAction = "tailSwipe";
        humanHealth = humanHealth - tailSwipeDamage;
        description2Text = "The dragon sweeps you with his tail, knocking you over and dealing " + tailSwipeDamage + " damage to you. You have " + humanHealth + " remaining."
    }};

humanMoves = {
    wandBlast: function() {
        humanAction = "wandBlast"
        dragonHealth = dragonHealth - wandBlastDamage;
        description1Text = "A blast of magical energy shoots from your wand and hits the dragon! The dragon reacts as if it were stung by a bee."
    },
    endureFlame: function() {
        humanAction = "endureFlame"
        description1Text = "You cast endure flame, sheilding you from fire damage for the turn."
    }
};

function renderPage() {
    $('.status').text(statusText)
    $('.description1').text(description1Text)
    $('.description2').text(description2Text)
    $('.action').text(actionText)
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

    }
    else if (page === 3) {

    }
    else if (page === 4) {

    }
    else {
        statusText = 'You Died'
        descriptionText = '';
        actionText = 'Do you want to try again? <br> 1. Yes <br> 2. No';
    }
}

function render() {
    setTextValue();
    renderPage();
}

init();

})