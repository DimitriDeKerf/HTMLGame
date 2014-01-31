/**
 * Created by Dimi on 31/01/14.
 */

var canvas;
var context;
var planets;

$(document).ready(function() {
    canvas = $("#canvas")[0];
    var FPS = 30;
    var totalPlanets = 2;
    var colors = ["red", "blue"];
    var firstPlanet = null;
    var secondPlanet = null;

    //Context wordt gebruikt om elementen te tekenen
    context = canvas.getContext("2d");

    //Breedte en hoogte van het canvas
    var canvasWidth = $("#canvas").width();
    var canvasHeight = $("#canvas").height();

    planets = [];

    //Planeten
    for (var i = 0; i < totalPlanets; i++) {
        var x = Math.random() * canvasWidth;
        var y = Math.random() * canvasHeight;
        var radius = (Math.random() * 20) + 20;
        if (i == 0) {
            planets.push(new Planet(x, y, radius, true))
        } else {
            planets.push(new Planet(x, y, radius, false))
        }
    }

    //Het canvas periodiek updaten
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);

    //De waarden updaten van de elementen
    function update() {

    }

    //Elementen tekenen
    function draw() {
        //Vorig beeld wissen
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        //Zwarte achtergrond
        context.fillStyle = "black"
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        //Planeten
        var colorCounter = 0;
        planets.forEach(function(planet) {
            drawPlanet(planet, colors[colorCounter]);
            colorCounter++;
            if (colorCounter == 2) {
                colorCounter = 0;
            }
        })
    }

    //Muisklik
    canvas.onmousedown = function(e) {
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;

        if (firstPlanet == null) {
            planets.forEach(function(planet) {
                if (Math.pow(mouseX-planet.x,2) + Math.pow(mouseY-planet.y,2) < Math.pow(planet.radius,2)) {
                    firstPlanet = planet;
                }
            })
        } else {
            planets.forEach(function(planet) {
                if (Math.pow(mouseX-planet.x,2) + Math.pow(mouseY-planet.y,2) < Math.pow(planet.radius,2)) {
                    secondPlanet = planet;
                }
            });

            //Schip verplaatsen
            if (secondPlanet != null && secondPlanet.ship == false) {
                firstPlanet.ship = !firstPlanet.ship;
                secondPlanet.ship = !secondPlanet.ship;
                firstPlanet = null;
                secondPlanet = null;
            }
        }
    };
});

function Planet(x, y, radius, ship) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ship = ship;
}

//Planeten tekenen
function drawPlanet(planet, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(planet.x, planet.y, planet.radius, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
    if (planet.ship) {
        drawShip(planet);
    }
}

function drawShip(planet) {
    context.fillStyle = "green";
    context.fillRect(planet.x + planet.radius + 5, planet.y, 10, 10);
}
