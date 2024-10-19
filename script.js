var lastSwipe, swipe, lastKey, key, headX = 0, headY= 0, foodX = 100, foodY = 100, bodySize = 1, containerWidth = 700, containerHeight = 800;
var button = document.getElementById("button");
var score = document.getElementById("score");
score.innerHTML = "0";
var container = document.getElementById("container");
var head = document.getElementById("headCell");
head.style.left = "0px";
head.style.top = "0px";
var food = document.getElementById("food");


function changeButtonState()
{
    if (button.innerHTML == "Pause")
    {
        button.innerHTML = "Resume";
        button.style.backgroundColor = "#000";
        button.style.color = "#fff";
    }
    else
    {
        button.innerHTML = "Pause";
        button.style.backgroundColor = "#fff";
        button.style.color = "#000";
    }
}

var id = setInterval(frame, 100);
var gameOver = false;

var arrayOfCells = [head];

function frame()
{

    for (var i = 1; i < bodySize; i++)
    {
        var nthCell = arrayOfCells[i];

        if ( nthCell.style.left == head.style.left && nthCell.style.top == head.style.top )
        {
            gameOver = true;
            nthCell.style.backgroundColor = "#ffff00";
        }
    }

    if (gameOver)
    {
        var gameOverDiv = document.getElementById("gameOver");
        gameOverDiv.innerHTML = "GAME OVER";
        gameOverDiv.style.display = "block";
        clearInterval(id);
    }
    else
    {
        if (button.innerHTML == "Pause") // It means the game is going on.
        {
            var lastPositionOfHead = {x:head.style.left, y:head.style.top}; // We are gonna turn the snake. We better store its current head position to pass it to the next cell;

            //////// LOGIC FOR TURNING (START) ///////////////
            {
                
            ////////////// For PC //////////////
            document.onkeydown = checkKey;

            lastKey = key;
            function checkKey(e)
            {

                if (e.keyCode == '38' && lastKey != "bottom")
                {
                    key = "top";
                }
                else if (e.keyCode == '39' && lastKey != "left")
                {
                    key = "right";
                }
                else if (e.keyCode == '40' && lastKey != "top")
                {
                    key = "bottom";
                }
                else if (e.keyCode == '37' && lastKey != "right") 
                {
                    key = "left";
                }
            }
            
            ////////////// For Mobile //////////////
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);

            var xDown = null;
            var yDown = null;

            function getTouches(evt)
            {
                return evt.touches ||             // browser API
                    evt.originalEvent.touches; // jQuery
            }

            function handleTouchStart(evt) 
            {
                const firstTouch = getTouches(evt)[0];
                xDown = firstTouch.clientX;
                yDown = firstTouch.clientY;
            };

            function handleTouchMove(evt) 
            {
                if (!xDown || !yDown) 
                {
                    return;
                }

                var xUp = evt.touches[0].clientX;
                var yUp = evt.touches[0].clientY;

                var xDiff = xDown - xUp;
                var yDiff = yDown - yUp;
                lastSwipe = swipe;
                if (Math.abs(xDiff) > Math.abs(yDiff)) /*most significant*/
                {
                    if ((xDiff > 0) && (lastSwipe != "right"))
                    {
                        /* left swipe */
                        swipe = "left";
                    }
                    else if ((xDiff < 0) && (lastSwipe != "left")) 
                    {
                        /* right swipe */
                        swipe = "right";
                    }
                }
                else
                {
                    if ((yDiff > 0) && (lastSwipe != "bottom"))
                    {
                        /* up swipe */
                        swipe = "top";
                    }
                    else if ((yDiff < 0) && (lastSwipe != "top")) 
                    {
                        /* down swipe */
                        swipe = "bottom";
                    }
                }
                /* reset values */
                xDown = null;
                yDown = null;
            };


            if (swipe == "top" || key == "top")
            {
                headY -= 20;
                if (headY == -20)
                {
                    headY += containerHeight;
                }
                head.style.top = headY + "px";
            } 
            else if (swipe == "right" || key == "right") 
            {
                headX += 20;
                if (headX == containerWidth)
                {
                    headX -= containerWidth;
                }
                head.style.left = headX + "px";
            }
            else if (swipe == "bottom" || key == "bottom")
            {
                headY += 20;
                if (headY == containerHeight)
                {
                    headY -= containerHeight;
                }
                head.style.top = headY + "px";
            }
            else if (swipe == "left" || key == "left")
            {
                headX -= 20;
                if (headX == -20)
                {
                    headX += containerWidth;
                }
                head.style.left = headX + "px";
            }

            //////////// LOGIC FOR TURNING (END) ///////////////
            }
            // We moved a frame and Head has got new position.

            if ((headX == foodX) && (headY == foodY)) 
            {
                score.innerHTML = "" + bodySize;
                
                
                // Finding new random position for food
                var positionForNewFoodFound = false;

                while ( !positionForNewFoodFound )
                {
                    foodX = Math.floor(Math.random() * (containerWidth / 20)) * 20;
                    foodY = Math.floor(Math.random() * (containerHeight / 20)) * 20;

                    positionForNewFoodFound = true;

                    for (var i = 0; i < bodySize; i++)
                    {
                        var nthCellX = arrayOfCells[i].style.left;
                        var nthCellY = arrayOfCells[i].style.top;

                        if ((foodX + "px" == nthCellX) && (foodY + "px" == nthCellY))
                        {
                            positionForNewFoodFound = false;
                            break;
                        }
                    }
                }

                food.style.left = foodX + "px";
                food.style.top = foodY + "px";


                // Adding new cell to Snake's body
                var newCell = document.createElement("div");
                newCell.setAttribute("class", "cell"); // for css and stuff
                document.getElementById("container").appendChild( newCell );

                arrayOfCells.push( newCell );

                bodySize++;
            }


            if (bodySize > 1) {
                
                var takeNewPositionFromHere = lastPositionOfHead;
                var putYourOldPositionHere;

                for (var i = 1; i < bodySize; i++) {
                    
                    putYourOldPositionHere = {x: arrayOfCells[i].style.left, y: arrayOfCells[i].style.top};

                    arrayOfCells[i].style.left = takeNewPositionFromHere.x;
                    arrayOfCells[i].style.top = takeNewPositionFromHere.y;

                    takeNewPositionFromHere = putYourOldPositionHere; // The next cell will take its new position from what the the previous cell has left for it.

                }
            }
        }
    }
}
