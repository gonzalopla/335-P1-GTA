var langtonAnt = (function(){
    var      UP= 0,
       LEFT=3,  RIGHT=1,
           BOTTOM=2,    
        ctx,
        antSize = 5,
        grid,
        width,
        height,
        
        timer,
        
        steps = 0,
        stepCallback,
        rule = undefined,
    
    ant = {
        dir : undefined,
	prevdir : undefined,
        x : undefined, 
        y: undefined,
	prevx : undefined,
	prevy : undefined,
	prevc : undefined,
        
        init : function(x,y){
            this.dir = UP;
            this.x = x;
            this.y = y;
        },
        
        move : function(){

	this.prevx=this.x;
	this.prevy=this.y;

	// Keeps direction integer in range
	if (this.dir === -1){
	this.dir = 3;
	}
	else if (this.dir === 4){
	this.dir = 0;
	}

            if (!(this.dir % 2)){
                this.y -= this.dir - 1;
            }else{
                this.x += this.dir - 2;
            }
        }, 
        turnLeft  : function(){
	this.prevdir = this.dir;
            this.dir = this.dir - 1;
        },
        turnRight : function(){
	this.prevdir = this.dir;
            this.dir = this.dir + 1;
        }

    };
    var initGrid = function(){
            for (var i=0;i<grid.length;i++){
                grid[i] = 0;
            }
    };
    var callSteps = function(){
      if (stepCallback !== undefined){
        stepCallback(steps);
      }
    }
    return {
      steps : 1,
      init : function(canvas, callback){
            stepCallback = callback;
            ctx =  canvas.getContext("2d");


 var ctxWidth  = canvas.width,
                ctxHeight = canvas.height;
  width = ctxWidth / antSize;
            height = ctxHeight / antSize;                    
            
            grid = new (Int8Array || Array)(height + width * height);
            this.reset();
        },
        
            
        update : function(){
            var posInGrid = ant.y + ant.x * height;
            if (posInGrid > grid.length || posInGrid < 0){ 
                clearInterval(timer);
                return true;
            }
            // Change color   
	grid[posInGrid] = (grid[posInGrid] + 1) % rule.color.length;
           var cell = grid[posInGrid];

           // Draw the Rect
           ctx.fillStyle = rule.color[cell];
    
           ctx.fillRect(ant.x * antSize, ant.y * antSize, antSize, antSize);

	// Removes old ant
	// RIGHT
	if(ant.prevdir == 3){
	ctx.beginPath();
	ctx.moveTo(ant.prevx * antSize, ant.prevy * antSize);
	ctx.lineTo(ant.prevx * antSize +5, ant.prevy * antSize +3);
	ctx.lineTo(ant.prevx * antSize, ant.prevy * antSize +5);
	ctx.closePath();
	ctx.fillStyle = rule.color[ant.prevc];
	ctx.fill();
	ant.prevc = cell;
	}
	// UP
	else if(ant.prevdir == 2){
	ctx.beginPath();
	ctx.moveTo(ant.prevx * antSize, ant.prevy * antSize+5);
	ctx.lineTo(ant.prevx * antSize + 5, ant.prevy * antSize + 5);
	ctx.lineTo(ant.prevx * antSize + 3, ant.prevy * antSize);
	ctx.closePath();
	ctx.fillStyle = rule.color[ant.prevc];
	ctx.fill();
	ant.prevc = cell;
	}
	// DOWN
	else if(ant.prevdir == 0){
	ctx.beginPath();
	ctx.moveTo(ant.prevx * antSize, ant.prevy * antSize);
	ctx.lineTo(ant.prevx * antSize +5, ant.prevy * antSize);
	ctx.lineTo(ant.prevx * antSize + 3, ant.prevy * antSize +5);
	ctx.closePath();
	ctx.fillStyle = rule.color[ant.prevc];
	ctx.fill();
	ant.prevc = cell;
	}
	// LEFT
	else{
	ctx.beginPath();
	ctx.moveTo(ant.prevx * antSize +5, ant.prevy * antSize);
	ctx.lineTo(ant.prevx * antSize +5, ant.prevy * antSize +5);
	ctx.lineTo(ant.prevx * antSize, ant.prevy * antSize + 3);
	ctx.closePath();
	ctx.fillStyle = rule.color[ant.prevc];
	ctx.fill();
	ant.prevc = cell;
	}
            // Fill the ant
	// RIGHT
	if(ant.dir == 3){
	ctx.beginPath();
	ctx.moveTo(ant.x * antSize, ant.y * antSize);
	ctx.lineTo(ant.x * antSize + 5, ant.y * antSize + 3);
	ctx.lineTo(ant.x * antSize, ant.y * antSize + 5);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();
	}
	// UP
	else if(ant.dir == 2){
	ctx.beginPath();
	ctx.moveTo(ant.x * antSize, ant.y * antSize+5);
	ctx.lineTo(ant.x * antSize +5, ant.y * antSize +5);
	ctx.lineTo(ant.x * antSize +3, ant.y * antSize);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();
	}
	// DOWN
	else if(ant.dir == 0){
	ctx.beginPath();
	ctx.moveTo(ant.x * antSize, ant.y * antSize);
	ctx.lineTo(ant.x * antSize+5, ant.y * antSize);
	ctx.lineTo(ant.x * antSize+3, ant.y * antSize+5);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();
	}
	// LEFT
	else{
	ctx.beginPath();
	ctx.moveTo(ant.x * antSize + 5, ant.y * antSize);
	ctx.lineTo(ant.x * antSize + 5, ant.y * antSize + 5);
	ctx.lineTo(ant.x * antSize, ant.y * antSize + 3);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();
	}

            // Turn the ant based on the rules
            if (rule.dir[cell] === "l"){
                ant.turnLeft();
            }else{
                ant.turnRight();
            }

            ant.move();

            steps++;
            callSteps();
        },
        
        stop : function(){
          clearInterval(timer);
        },
        
        reset : function(){
          steps = 0;
          this.stop();
          callSteps();
          initGrid();

          ant.init(Math.floor(width/2), Math.floor(height/2));
        },
        
        start : function(newRule){
          if (newRule !== undefined)
            rule = newRule;
          timer = setInterval(function(){
              for (var i=0;i<this.steps;i++){
                if (this.update() === true) break;
               }
            }.bind(this), 1000);
        },
        
        restart : function(newRule){
            this.reset();
            this.start(newRule);
        },
        
        ruleToHTML : function(visRule){
            var html = '<a href="#" onClick=\'langtonAnt.restart('+JSON.stringify(visRule)+');\' class="rule">';
            if (visRule.dir.length === visRule.color.length){
                for (var i=0;i<visRule.dir.length;i++){
                    html += '<span style="background-color:'+visRule.color[i]+';" class="ruleBox">'+visRule.dir[i].toUpperCase()+'</span>';
                }
             }
            return html+"</a>";
        }
    }
})();

var rulesArray = [
  {
    dir   : ["r","r","l","l"],
    color : ["black", "red","yellow","blue"]
   }
];

var span = document.getElementById("s");
var rules = document.getElementById("rules");

langtonAnt.init(document.getElementById("c"), function(s){
  span.innerHTML = s;
});

rules.innerHTML += rulesArray.map(langtonAnt.ruleToHTML.bind(langtonAnt))
  .reduce(function(prev,current) {
  return prev + current + ''; 
}, '');     

document.getElementById("steps").onchange = function(e){
  langtonAnt.steps = parseInt(e.target.value)
};


document.getElementById('newrule').addEventListener('keyup', function(e){
  if (/^\s*[rl]+\s*$/i.test(e.target.value)) {
    var directions = e.target.value.toLowerCase().trim().split('');
    var colors = randomColor({
       count: directions.length,
       hue: 'dark',
       format: 'hex'
    });
    langtonAnt.restart({
      dir : directions,
      color: colors
    });
  }
}, false);

langtonAnt.start(rulesArray[0]);

