/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_rocks   : [],
_bullets : [],
_ships   : [],

_bShowRocks : false,

// "PRIVATE" METHODS

_generateRocks : function() {
    var i,
	NUM_ROCKS = 4;

    // TODO: Make `NUM_ROCKS` Rocks!
    for(i = 0; i < NUM_ROCKS; i++){
        var g_rocks = new Rock();
        this._rocks.push(g_rocks);
    }
},

_findNearestShip : function(posX, posY) {

    // TODO: Implement this
    
    // NB: Use this technique to let you return "multiple values"
    //     from a function. It's pretty useful!
    //
    
        var distance = 0;
        var edgeDistance = 0;
        var myFinal;
        //  OVERKILL
        var maxDistance = Number.MAX_SAFE_INTEGER;
        var closestShip,
            closestIndex;
        this._ships.forEach(ship => {
            edgeDistance = util.wrappedDistSq(posX,posY,ship.cx,ship.cy);
            distance = util.distSq(posX,posY,ship.cx,ship.cy);
            if(edgeDistance > distance){
                myFinal = distance;
            } else{
                myFinal = edgeDistance;
            }
            if(myFinal <= maxDistance){
                maxDistance = myFinal;
                closestShip = ship;
                closestIndex = closestShip.indexOf;
            }
        });


    return {
	theShip : closestShip,   // the object itself
	theIndex: closestIndex   // the array index where it lives
    };
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
	fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._rocks, this._bullets, this._ships];
},

init: function() {
    this._generateRocks();

    // I could have made some ships here too, but decided not to.
    //this._generateShip();
},

fireBullet: function(cx, cy, velX, velY, rotation) {
    var fireLaser = new Bullet({
        cx,
        cy,
        velX,
        velY,
        rotation
    });
    this._bullets.push(fireLaser);   
    // TODO: Implement this

},

generateShip : function(descr) {
    // TODO: Implement this
    let tieFighter = new Ship({
        cx : descr.cx,
        cy : descr.cy
    });
    this._ships.push(tieFighter);
},

killNearestShip : function(xPos, yPos) {
    // TODO: Implement this
    
    var nearestShip = this._findNearestShip(xPos,yPos);
    this._ships.splice(nearestShip.theIndex,1);
    
    // NB: Don't forget the "edge cases"
},

yoinkNearestShip : function(xPos, yPos) {
    // TODO: Implement this
    var nearestShip = this._findNearestShip(xPos,yPos);
    nearestShip.theShip.setPos(xPos,yPos);
    // NB: Don't forget the "edge cases"
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},	

toggleRocks: function() {
    this._bShowRocks = !this._bShowRocks;
},

update: function(du) {

    // TODO: Implement this
    for(var i = 0; i < this._rocks.length; i++){
        this._rocks[i].update(du);
    }

    this._ships[0].update(du);

    for(var i = 0; i < this._bullets.length; i++){
        this._bullets[i].update(du);
    }
    // NB: Remember to handle the "KILL_ME_NOW" return value!
    //     and to properly update the array in that case.
},

render: function(ctx) {

    // TODO: Implement this

    for(var i = 0; i < this._rocks.length; i++){
        this._rocks[i].render(ctx);
    }

    for(var i = 0; i < this._ships.length; i++){
        this._ships[i].render(ctx);
    }

    for(var i = 0; i < this._bullets.length; i++){
        this._bullets[i].render(ctx);

    }
    // NB: Remember to implement the ._bShowRocks toggle!
    // (Either here, or if you prefer, in the Rock objects)

}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

entityManager.init();
