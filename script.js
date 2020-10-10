var head = document.getElementById("body0");
var food = document.getElementById("food");
var xnum = 100;
var ynum = 100;
var px = 0;
var py = 0;
var kee;
var bodySize = 1;
var lef = 200;
var to = 200;


var id = setInterval(frame, 150);
function frame() {
    if ((px == 1200) && (py == 700)) {
        clearInterval(id);
    } else {


        document.onkeydown = checkKey;

        function checkKey(e) {
            e = e || window.event;

            if (e.keyCode == '38') {
                kee = "top";
            }
            else if (e.keyCode == '39') {
                kee = "right";
            }
            else if (e.keyCode == '40') {
                kee = "bottom";
            }
            else if (e.keyCode == '37') {
                kee = "left";
            }
        }
        var pxPast = [], pyPast = [];
        for (var i1 = 0; i1 < bodySize; i1++) {
            var ppx = document.getElementById("body" + i1).style.left;
            var ppy = document.getElementById("body" + i1).style.top;
            pxPast[i1] = ppx;
            pyPast[i1] = ppy;
        }
        if (kee == "top") {
            py -= 10;
            if (py == -10) {
                py += to;
            }
            head.style.top = py + "px";
        } else if (kee == "right") {
            px += 10;
            if (px == lef) {
                px -= lef;
            }
            head.style.left = px + "px";
        }
        else if (kee == "bottom") {
            py += 10;
            if (py == to) {
                py -= to;
            }
            head.style.top = py + "px";
        }
        else if (kee == "left") {
            px -= 10;
            if (px == -10) {
                px += lef;
            }
            head.style.left = px + "px";
        }

        numNotFound = true;
        if ((px == xnum) && (py == ynum)) {
            while(numNotFound){
                numNotFound = false;
                xnum = Math.floor(Math.random() * (lef/10)) * 10;
                ynum = Math.floor(Math.random() * (to/10)) * 10;
                for(var i3 = 0;i3<bodySize;i3++){
                    var checkX = document.getElementById("body"+i3).style.left;
                    var checkY = document.getElementById("body"+i3).style.top;
                    if(((xnum+"px")==checkX)&&((ynum+"px")==checkY)){
                        numNotFound = true;
                    }
                }
            }
            food.style.left = xnum + "px";
            food.style.top = ynum + "px";

            var sbody = document.createElement("div");
            sbody.setAttribute("id", ("body" + bodySize));
            sbody.setAttribute("class", "body");
            document.getElementById("box").appendChild(sbody);
            bodySize++;
        }
        if(bodySize>1){
            for (var i2 = 1; i2 < bodySize ; i2++) {
                var nbody = document.getElementById("body"+i2);
                nbody.style.top = pyPast[i2 - 1];
                nbody.style.left = pxPast[i2 - 1];
            }
        }
    }
    var score = document.getElementById("score");
    score.innerHTML = ""+bodySize-1;
}
