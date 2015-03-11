var gl;
var points;

var program;

// User Score

var userScore = 0;

// Ground Square Speed

var GroundSquareSpeed = .005;
var GroundSquareSpeedSm = .005;

// Loss & win Check

var lossCheck = 0;
var winCheck = 0;

// Character Position Control

var x = 0;
var y = 0;

var xLeft = 0;
var xRight = 0;
var yTop = 0;
var yBottom = 0;

// Square Object Position

var xGroundSquare = 1;
var yGroundSquare = -.7;

// Square Object Position

var xGroundSquareSm1 = 1;
var yGroundSquareSm1 = -.8;

var xGroundSquareSm2 = 1.7;
var yGroundSquareSm2 = -.8;

var xGroundSquareSm3 = 2.4;
var yGroundSquareSm3 = -.8;

// Ground Location

var ground = .8;

// Variables used in checking character jump

var check = 0;
var jumpCheck = 0;
var clickCheck = 2;

// Variables used in checking character's horizontal position

var left = 0;
var right = 0;

// Buffer for character

var bufferId;
var vPosition;

//Buffer for floor

var bufferIdFloor;
var vPositionFloor;

// Buffer for ground object square

var bufferIdObjGroundSquare;
var vPositionObjGroundSquare;

// Buffer for ground object square small 1

var bufferIdObjGroundSquareSm1;
var vPositionObjGroundSquareSm1;

// Buffer for ground object square small 2

var bufferIdObjGroundSquareSm2;
var vPositionObjGroundSquareSm2;

// Buffer for ground object square small 3

var bufferIdObjGroundSquareSm3;
var vPositionObjGroundSquareSm3;

// vertices for objects and character

var vertices = new Float32Array([-.05, -.05 - ground, 0, .05 - ground, .05, -.05 - ground]);
var mapFloor = new Float32Array([-1, -.05 - ground, 1, -.05 - ground, 1, -1, -1, -1]);

var groundObjSquare = new Float32Array([.5 + xGroundSquare, .1 - ground, .7 + xGroundSquare, .1 - ground, .7 + xGroundSquare, -.05 - ground, .5 + xGroundSquare, -.05 - ground]);

var groundObjSquareSm1 = new Float32Array([.5 + xGroundSquareSm1, 0 - ground, .6 + xGroundSquareSm1, 0 - ground, .6 + xGroundSquareSm1, -.05 - ground, .5 + xGroundSquareSm1, -.05 - ground]);
var groundObjSquareSm2 = new Float32Array([.5 + xGroundSquareSm2, 0 - ground, .6 + xGroundSquareSm2, 0 - ground, .6 + xGroundSquareSm2, -.05 - ground, .5 + xGroundSquareSm2, -.05 - ground]);
var groundObjSquareSm3 = new Float32Array([.5 + xGroundSquareSm3, 0 - ground, .6 + xGroundSquareSm3, 0 - ground, .6 + xGroundSquareSm3, -.05 - ground, .5 + xGroundSquareSm3, -.05 - ground]);

// Random Number

var randomNum = getRandomInt();


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	// For Character
    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// For Floor
	// Load the data into the GPU
	
	bufferIdFloor = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mapFloor), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	
	vPositionFloor = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionFloor );
	
	// For Ground Object Square
	// Load the data into the GPU
	
	bufferIdObjGroundSquare = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquare );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(groundObjSquare), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	
	vPositionObjGroundSquare = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjGroundSquare, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjGroundSquare );
	
	// For Ground Objects Square Small 1
	// Load the data into the GPU
	
	bufferIdObjGroundSquareSm1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquareSm1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(groundObjSquareSm1), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	
	vPositionObjGroundSquarSm1 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjGroundSquarSm1, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjGroundSquarSm1 );
	
	// For Ground Objects Square Small 2
	// Load the data into the GPU
	
	bufferIdObjGroundSquareSm2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquareSm2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(groundObjSquareSm2), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	
	vPositionObjGroundSquarSm2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjGroundSquarSm2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjGroundSquarSm2 );
	
	// For Ground Objects Square Small 3
	// Load the data into the GPU
	
	bufferIdObjGroundSquareSm3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquareSm3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(groundObjSquareSm3), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	
	vPositionObjGroundSquarSm3 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjGroundSquarSm3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjGroundSquarSm3 );
	
	document.onkeydown = handleKeyDown;
  	document.onkeyup = handleKeyUp;

    render();
};



function render() {
	
	//Draws Character
	
	drawCharacter()
	
	// Draws the floor
	
	drawFloor();
	
	if (randomNum <= .5)
	{
		// Draws the Ground Square Object
			
		drawGroundSquareObject();		
	
		
		// Checks Collisions and win condition
		
		if ( (xGroundSquare <= xLeft && xLeft <= (xGroundSquare + .2) && yBottom <= yGroundSquare) && winCheck != 1 
		  || (xGroundSquare <= xRight && xRight <= (xGroundSquare + .2) && yBottom <= yGroundSquare) && winCheck != 1)
		{
				lossCheck = 1;
				loss();
		} 
		
		if(userScore >= 10 && lossCheck != 1)
		{
			winCheck = 1;
			win();	
		}
	}
	
	if (randomNum >= .5)
	{
		// Draws Multiple Small Ground Square Objects
		
		drawMultSquareGrndObject();	
	
		// Small Square 1
		
		if ( (xGroundSquareSm1 <= xLeft && xLeft <= (xGroundSquareSm1 + .1) && yBottom <= yGroundSquareSm1) && winCheck != 1 
		  || (xGroundSquareSm1 <= xRight && xRight <= (xGroundSquareSm1 + .1) && yBottom <= yGroundSquareSm1) && winCheck != 1)
		{
				lossCheck = 1;
				loss();
		} 
		
		if(userScore >= 10 && lossCheck != 1)
		{
			winCheck = 1;
			win();	
		}
		
		// Small Square 2
		
		if ( (xGroundSquareSm2 <= xLeft && xLeft <= (xGroundSquareSm2 + .1) && yBottom <= yGroundSquareSm2) && winCheck != 1 
		  || (xGroundSquareSm2 <= xRight && xRight <= (xGroundSquareSm2 + .1) && yBottom <= yGroundSquareSm2) && winCheck != 1)
		{
				lossCheck = 1;
				loss();
		} 
		
		if(userScore >= 10 && lossCheck != 1)
		{
			winCheck = 1;
			win();	
		}
		
		// Small Square 3
		
		if ( (xGroundSquareSm3 <= xLeft && xLeft <= (xGroundSquareSm3 + .1) && yBottom <= yGroundSquareSm3) && winCheck != 1 
		  || (xGroundSquareSm3 <= xRight && xRight <= (xGroundSquareSm3 + .1) && yBottom <= yGroundSquareSm3) && winCheck != 1)
		{
				lossCheck = 1;
				loss();
		} 
		
		if(userScore >= 10 && lossCheck != 1)
		{
			winCheck = 1;
			win();	
		}
	}
	
	// Checks Score
	
	score();
	
	// Calls the render function again
	
	requestAnimFrame( render );
}

function drawCharacter() {
	
	xLeft = -.05 + x;
	xRight = .05 + x;
	yTop = .05 + y - ground;
	yBottom = -.05 + y - ground;
	
	// Restores values into the character vertices
	
	vertices = new Float32Array(
	[  xLeft, yBottom, 
		   x,  yTop, 
	  xRight, yBottom]);	
	  
	 // Checks chracter jump
	  
	 if (check == 1 && jumpCheck == 0)
	 {
		y += .07; 
		
		if (y >= .4)
		{
			jumpCheck = 1;
			clickCheck = 1;
		}
		
	 } else if (jumpCheck == 1)
	 {
		 y -= .07;
		 if (y <= 0)
		 {
			 check = 0;
			 jumpCheck = 0;
		 }
	 }
	 
	 if (right == 1 && x >= -.95)
	 {
		x -= .05;
	 }
	 
	 if (left == 1 && x <= .95)
	 {
		x += .05;
	 }

	// Load the data into the GPU
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}

var currentlyPressedKeys = {};

function handleKeyDown(event) {
	
    currentlyPressedKeys[event.keyCode] = true;

    if (String.fromCharCode(event.keyCode) == "W") 
	{	
	  	check = 1;	
    }
	else if (String.fromCharCode(event.keyCode) == "D")
	{
		left = 1;
	}
	else if (String.fromCharCode(event.keyCode) == "A")
	{
		right = 1;
	}
	 
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
	
	if (String.fromCharCode(event.keyCode) == "W") 
	{	
	  	clickCheck = 0;
    }
	else if (String.fromCharCode(event.keyCode) == "D")
	{
		left = 0;
		clickCheck = 1;
	}
	else if (String.fromCharCode(event.keyCode) == "A")
	{
		right = 0;
		clickCheck = 1;
	}
}

function drawFloor() {
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
		
}

function drawGroundSquareObject() {
			 
	 // Restores values into the character vertices
	 
	 groundObjSquare = new Float32Array(
	 [xGroundSquare, yGroundSquare, 
	 .2 + xGroundSquare, yGroundSquare, 
	 .2 + xGroundSquare, yGroundSquare - .15, 
	 xGroundSquare, yGroundSquare - .15]);
	 
	 // Moves the Ground Square Object
	 
	 xGroundSquare -= GroundSquareSpeed;
	 
	 //Resets the object once off screen
	 
	 if (xGroundSquare <= -1.2)
	 {
		 xGroundSquare = 1;
		 userScore += 1;
		 GroundSquareSpeed += .005;
		 randomNum = getRandomInt();
	 }
	
	// Load the data into the GPU
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquare );
    gl.bufferData( gl.ARRAY_BUFFER, groundObjSquare, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    gl.vertexAttribPointer( vPositionObjGroundSquare, 2, gl.FLOAT, false, 0, 0 );

    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function drawMultSquareGrndObject() {
			 
	 // Restores values into the character vertices
	 
	 groundObjSquareSm1 = new Float32Array(
	 [xGroundSquareSm1, yGroundSquareSm1, 
	 .1 + xGroundSquareSm1, yGroundSquareSm1, 
	 .1 + xGroundSquareSm1, yGroundSquareSm1 - .15, 
	 xGroundSquareSm1, yGroundSquareSm1 - .15]);
	 
	 // Moves the Ground Square Object
	 
	 xGroundSquareSm1 -= GroundSquareSpeedSm;
	
	// Load the data into the GPU
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquareSm1 );
    gl.bufferData( gl.ARRAY_BUFFER, groundObjSquareSm1, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    gl.vertexAttribPointer( vPositionObjGroundSquareSm1, 2, gl.FLOAT, false, 0, 0 );

    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	/////////////////////////////////////
	
	// Restores values into the character vertices
	 
	 groundObjSquareSm2 = new Float32Array(
	 [xGroundSquareSm2, yGroundSquareSm2, 
	 .1 + xGroundSquareSm2, yGroundSquareSm2, 
	 .1 + xGroundSquareSm2, yGroundSquareSm2 - .15, 
	 xGroundSquareSm2, yGroundSquareSm2 - .15]);
	 
	 // Moves the Ground Square Object
	 
	 xGroundSquareSm2 -= GroundSquareSpeedSm;
	 
	// Load the data into the GPU
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquareSm2 );
    gl.bufferData( gl.ARRAY_BUFFER, groundObjSquareSm2, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    gl.vertexAttribPointer( vPositionObjGroundSquareSm2, 2, gl.FLOAT, false, 0, 0 );

    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	/////////////////////////////////////
	
	// Restores values into the character vertices
	 
	 groundObjSquareSm3 = new Float32Array(
	 [xGroundSquareSm3, yGroundSquareSm3, 
	 .1 + xGroundSquareSm3, yGroundSquareSm3, 
	 .1 + xGroundSquareSm3, yGroundSquareSm3 - .15, 
	 xGroundSquareSm3, yGroundSquareSm3 - .15]);
	 
	 // Moves the Ground Square Object
	 
	 xGroundSquareSm3 -= GroundSquareSpeedSm;
	 
	 //Resets the object once off screen
	 
	 if (xGroundSquareSm3 <= -1.2)
	 {
		 xGroundSquareSm1 = 1.0;
		 xGroundSquareSm2 = 1.7;
		 xGroundSquareSm3 = 2.4;
		 userScore += 1;
		 GroundSquareSpeedSm += .005;
		 randomNum = getRandomInt();
	 }
	
	// Load the data into the GPU
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjGroundSquareSm3 );
    gl.bufferData( gl.ARRAY_BUFFER, groundObjSquareSm3, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    gl.vertexAttribPointer( vPositionObjGroundSquareSm3, 2, gl.FLOAT, false, 0, 0 );

    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
}

function loss() {
	mapFloor = new Float32Array([-1, 15 - ground, 1, 15 - ground, 1, -1, -1, -1]);
	
	// For Floor
	// Load the data into the GPU
	
	bufferIdFloor = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mapFloor), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	
	vPositionFloor = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionFloor );
	
	document.getElementById("display").innerHTML = "YOU LOSE";
	
	setTimeout(restart, 2000);
}

function win() {
	mapFloor = new Float32Array([-1, 15 - ground, 1, 15 - ground, 1, -1, -1, -1]);
	
	// For Floor
	// Load the data into the GPU
	
	bufferIdFloor = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mapFloor), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	
	vPositionFloor = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionFloor );
	
	document.getElementById("display").innerHTML = "YOU WIN";
	
	setTimeout(restart, 2000);
}

function score() {	
	document.getElementById("score").innerHTML = userScore;
}

function restart() {
	location.reload(true);
}

function getRandomInt() {
    return Math.random();
}
