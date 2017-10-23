$(function() {
    
var dragonAction;
var humanAction;
var dragonHealth;
var fireDamage;
var clawDamage;
var tailSwipeDamage;
var humanHealth;
var magicMissileDamage;
var page;
var statusText;
var descriptionText;
var actionText;
var teleportCounter;
var temp;
var timeCounter;
var healAmount;

function init() {
    page = 1;
    render();
}

function initVarEasy() {
    dragonAction = "";
    humanAction = "";
    dragonHealth = 100;
    fireDamage = 60;
    clawDamage = 8;
    biteDamage = 20;
    tailSwipeDamage = 10;
    humanHealth = 100;
    magicMissileDamage = 5;
    lightningStrikeDamage = 12;
    teleportCounter = 0;
    timeCounter = 0;
    healAmount = 0
    page = 2;
    statusText = 'Easy Mode Selected'
}

function initVarHard() {
    dragonAction = "";
    humanAction = "";
    dragonHealth = 100;
    fireDamage = 200;
    clawDamage = 20;
    biteDamage = 30;
    tailSwipeDamage = 20;
    humanHealth = 100;
    magicMissileDamage = 5;
    lightningStrikeDamage = 12;
    teleportCounter = 1;
    timeCounter = 0;
    healAmount = 0;
    page = 2;
    statusText = 'Hard Mode Selected'
}


function nextTurn() {
    if (dragonHealth <= 0) {
        page = 4;
        dragonHealth = 100;
        render()
    }
    else if (dragonAction === "inhale") {
        breatheFire();
    }   
    else if (humanAction ==='teleport') {
        if (teleportCounter < 3) {
            confused()
        }
        else {
            tailSwipe();
        }
    }
    else {
        randomNumber(0, 4);
        if (temp === 0) reverseTime();
        else if (temp === 1) inhale();
        else if (temp === 2) claw();
        else if (temp === 3) bite();
    }
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    temp = Math.floor(Math.random() * (max - min)) + min;
    console.log(temp)
}

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
            magicMissile();
            page = 3;
            nextTurn();
            render();
        }
        else if ($('input').val() == 2) {
            lightningStrike();
            page = 3;
            nextTurn();
            render();
        }
        else if ($('input').val() == 3) {
            shrinkEnemy();
            page = 3;
            nextTurn();
            render();
        }
        else if ($('input').val() == 4) {
            heal();
            page = 3;
            nextTurn();
            render();
        }
        else if ($('input').val() == 5) {
            teleport();
            page = 3;
            nextTurn();
            render();
        }
    }
    else if (page === 3) {
        if ($('input').val() == 1) {
            magicMissile();
            nextTurn();
            render();
        }
        else if ($('input').val() == 2) {
            lightningStrike();
            nextTurn();
            render();
        }
        else if ($('input').val() == 3) {
            shrinkEnemy();
            nextTurn();
            render();
        }
        else if ($('input').val() == 4) {
            heal();
            nextTurn();
            render();
        }
        else if ($('input').val() == 5) {
            teleport();
            nextTurn();
            render();
        }
        }
    else if (page === 5) {
        if ($('input').val() == 1) {
            page = 1;
            render();
        }
        else {
            console.log("ok")            
    }
    }});

// dragon actions
function reverseTime() {
    timeCounter += 1
    if (dragonAction === "claw") {
        dragonAction = "reverseClaw"
        humanHealth += clawDamage
    }
    else if (dragonAction === "bite") {
        dragonAction = "reverseBite"
        humanHealth += biteDamage
    }
    else if (dragonAction === "breatheFire") {
            dragonAction = "reverseFire";
            humanHealth += fireDamage;
        }
    else dragonAction = "reverseTime";
    if (humanAction === "magicMissile") {
        dragonHealth += magicMissileDamage;
    }
    else if (humanAction === "lightningStrike") {
        dragonHealth += lightningStrikeDamage;
    }
    else if (humanAction === "heal") {
        humanHealth -= healAmount;
    }
}

function inhale() {
    dragonAction = "inhale";
}

function claw() {
    dragonAction = "claw";
    humanHealth = humanHealth - clawDamage;
}

function bite() {
    randomNumber(0, 2);
    if (temp === 0) {
        dragonAction = "biteMissed"
    }
    else {
        dragonAction = "bite";
        humanHealth = humanHealth - biteDamage;
    }
}

function breatheFire() {
    if (humanAction === "teleport") {
        dragonAction = "teleportedFire"
    }
    else {
        dragonAction = "breatheFire";        
        humanHealth = humanHealth - fireDamage;
}}

function confused() {
    dragonAction = 'confused';
}

function tailSwipe() {
    dragonAction = "tailSwipe";
    humanHealth = humanHealth - tailSwipeDamage;
}

// human actions
function magicMissile() {
    humanAction = "magicMissile"
    dragonHealth = dragonHealth - magicMissileDamage;
}

function lightningStrike() {
    if (humanAction === 'lightningStrike') {
        humanAction = 'failed';
    }
    else {
        humanAction = 'lightningStrike';
        dragonHealth = dragonHealth - lightningStrikeDamage;
    }
}

function shrinkEnemy() {
    randomNumber(0, 4);
    if (temp < 2) {
        humanAction = 'shrinkEnemy';
    }
    else if (temp === 2) {
        humanAction = 'shrinkEnemyBad';
        clawDamage += 4;
        biteDamage += 8;
    }
    else {
        humanAction = 'shrinkEnemyGood';
        if (biteDamage > 5) {
            biteDamage -= 5;
        }
        else {
            biteDamage = 1;
        }
}
}

function heal() {
    humanAction = 'heal';
    randomNumber(10, 21);
    healAmount = temp;
    humanHealth += healAmount;
    if (humanHealth > 100) {
        humanHealth = 100;
    }
}

function teleport() {
    humanAction = 'teleport'
    teleportCounter++
}

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
        statusText = "Your Health: " + humanHealth;
        description1Text = 'You approach a mighty dragon in his cave. He appears to be alert and ready to fight.'
        description2Text = 'You have a bunch of spells, but it has been a while since your last fight. Hopefully they all still work.'
        actionText = 'What spell are you going to use? <br> 1. Magic Missile <br> 2. Lightning Strike <br> 3. Shrink Enemy <br> 4. Heal <br> 5. Teleport'
    }
    else if (page === 3) {
        statusText = "Your Health: " + humanHealth;
        if (humanAction === "magicMissile") {
        description1Text = "An entire missile's worth of magical energy shoots from your wand and hits the dragon!"
        }
        else if (humanAction === 'failed') {
            description1Text = 'Your lightning spell fizzles. Maybe it needs some time to recharge?'
        }
        else if (humanAction === 'lightningStrike') {
            description1Text = 'You give the dragon a good zap. It is not pleased.'
        }
        else if (humanAction === 'shrinkEnemy') {
            description1Text = 'You attempt to shrink the dragon. He does not shrink.'
        }
        else if (humanAction === 'shrinkEnemyBad') {
            description1Text = "Well, that's not how you shrink a dragon. If anything, the dragon looks a little bigger."
        }
        else if (humanAction === 'shrinkEnemyGood') {
            description1Text = "You attempt to shrink the dragon. Although the dragon looks mostly the same height, its head does look a little smaller."
        }
        else if (humanAction === 'teleport') {
            description1Text = 'You teleport to the other side of the dragon.'
        }
        else if (humanAction === 'heal') {
            description1Text = 'You heal youself of ' + healAmount + ' points of damage.'
        }
        if (dragonAction === "inhale") {
            description2Text = "The dragon is strongly inhaling..."
        }
        else if (dragonAction === "claw") {
            description2Text = "The dragon claws at you, dealing " + clawDamage + " damage to you.";
        }
        else if (dragonAction === "bite") {
            description2Text = "The dragon bites you, dealing " + biteDamage + " damage to you."
        }
        else if (dragonAction === "biteMissed") {
            description2Text = "The dragon attempts to bite you, but you are too speedy."
        }
        else if (dragonAction === "teleportedFire") {
            description2Text = "The dragon breathes fire, but he misses";
        }
        else if (dragonAction === "breatheFire") {
            description2Text = "The dragon breathes fire, burning you for " + fireDamage + " damage."
            }
        else if (dragonAction === 'confused') {
            description2Text = 'Confused, the dragon looks around, trying to figure out where you went.';
        }
        else if (dragonAction === "tailSwipe") {
            description2Text = "The dragon sweeps you with his tail, knocking you over and dealing " + tailSwipeDamage + " damage to you. You have " + humanHealth + " remaining.";
        }
        else if (dragonAction === "reverseTime") {
            description2Text = "The dragon seems to have brought both of you back in time. But just a little."
        }
        else if (dragonAction === "reverseClaw") {
            description2Text = "The dragon reverses time, and you see the claw marks which the dragon left on you disappear. The dragon looks healthier, too."
        }
        else if (dragonAction === "reverseBite") {
            description2Text = "the dragon reverses time, and the bite marks which it left on you are gone!"
        }
        else if (dragonAction === "reverseFire") {
            description2Text = "the dragon reverses time, and you feel noticeably less charred."
        }
    }

    else if (page === 4) {
        statusText = 'You have killed the dragon';
        description1Text = 'With a loud thud, the dragon drops to the ground.';
        description2Text = 'Upon your return to town, ';
        actionText = 'You win';

    }
    else {
        statusText = 'You Died';
        descriptionText = '';
        actionText = 'Do you want to try again? <br> 1. Yes <br> 2. No';
    }
}

function checkDeath() {
    if (humanHealth < 1) {
        page = 5;
        humanHealth = 100;
    }
}

function render() {
    checkDeath();       
    setTextValues();
    renderPage();
    console.log(dragonAction);
    console.log(dragonHealth);
}

init();

})