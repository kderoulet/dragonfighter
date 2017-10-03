// (function () {
//     'use strict';
    
var dragonAction = "";
var humanAction = "";
var dragonHealth = 100;
var fireDamage = 40;
var clawDamage = 10;
var tailSwipeDamage = 10;
var flying = false;
var humanHealth = 100;
var wandBlastDamage = 7;


function nextTurn() {
if (dragonAction === "inhale") {
    breatheFire();
    dragonAction = "breatheFire";
} else randomAction(0, );}

function randomAction(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;}


    //Do we want an array of objects rather than a big ol' object?
    
var dragonMoves = {
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
            console.log("You dodged the dragon's fire!");
            }
        else if (humanAction === "teleport") {
            console.log("The dragon breathes fire, but he misses")
        }
        else {
            humanHealth = humanHealth - fireDamage;
            console.log("The dragon breathes fire, burning you for " + fireDamage + " damage. You have " + humanHealth + " remaining.")}},
     tailSwipe: function() {
        dragonAction = "tailSwipe";
        humanHealth = humanHealth - tailSwipeDamage;
         console.log("The dragon sweeps you with his tail, knocking you over and dealing " + tailSwipeDamage + " damage to you. You have " + humanHealth + " remaining.")}
    };

var humanMoves = {
    wandBlast: function() {
        humanAction = "wandBlast"
        dragonHealth = dragonHealth - wandBlastDamage;
        console.log("A blast of magical energy shoots from your wand and hits the dragon! The dragon reacts as if it were stung by a bee.")
    },
    endureFlame: function() {
        humanAction = "endureFlame"
        console.log("You cast endure flame, sheilding you from fire damage for the turn.")
    }
    

}

// })();