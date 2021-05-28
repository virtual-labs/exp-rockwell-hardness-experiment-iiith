'use strict';

document.addEventListener('DOMContentLoaded', function () {

	const playPauseButton = document.getElementById('play/pause');
	const restartButton = document.getElementById('restart');

	playPauseButton.addEventListener('click', function() { playPause()});
	restartButton.addEventListener('click', function() {restart();});

	function restart() 
	{ 
		window.clearTimeout(tmHandle); 

		knob = [
			[knob_startx ,knob_starty],
			[knob_startx + knob_width1 ,knob_starty],
			[knob_startx + knob_width2 ,knob_starty + knob_length],
			[knob_startx + knob_width1 - knob_width2,  knob_starty + knob_length]
		]
		tmHandle = window.setTimeout(draw, 1000 / fps);
		playflag = 0;
		playPause();
		
	}

	function playPause()
	{
		if(playflag)
		{
			window.clearTimeout(tmHandle);
			document.getElementById("play/pause").innerHTML = "Play";
			playflag = 0;
		}
		else
		{
			window.clearTimeout(tmHandle); 
			tmHandle = setTimeout(draw, 1000 / fps);
			document.getElementById("play/pause").innerHTML = "Pause";
			playflag = 1;
		}
	}
	const canvas = document.getElementById("main");
	canvas.width = 1200;
	canvas.height = 600;
	canvas.style = "border:3px solid";
	const ctx = canvas.getContext("2d");

	const fill = "#D3D3D3";
	let fps = 12;

	const top_startx = 550
	const top_starty = 100
	const top_width1 = 100
	const top_width2 = 80
	const top_length1 = 50
	const top_length2 = 80
	let playflag = 1

	let topknob = [
		[top_startx , top_starty],
		[top_startx + top_width1 , top_starty],
		[top_startx + top_width1 ,top_starty + top_length1],
		[top_startx + top_width2 , top_starty + top_length1],
		[top_startx + top_width2 , top_starty + top_length1 + top_length2],
		[top_startx + (top_width1 - top_width2), top_starty + top_length1 + top_length2],
		[top_startx + (top_width1 - top_width2), top_starty + top_length1],
		[top_startx , top_starty + top_length1]

	]

	const bottom_startx = 530
	const bottom_starty = 280
	const bottom_width1 = 140
	const bottom_width2 = 100
	const bottom_width3 = 60
	const bottom_length1 = 60
	const bottom_length2 = 50
	const bottom_length3 = 80


	let bottomknob = [
		[bottom_startx , bottom_starty],
		[bottom_startx + bottom_width1 , bottom_starty],
		[bottom_startx + bottom_width1 ,bottom_starty + bottom_length1],
		[bottom_startx + bottom_width2 , bottom_starty + bottom_length1],
		[bottom_startx + bottom_width2 , bottom_starty + bottom_length1 + bottom_length2],
		[bottom_startx + bottom_width3 , bottom_starty + bottom_length1 + bottom_length2],
		[bottom_startx + bottom_width3 , bottom_starty + bottom_length1 + bottom_length2 + bottom_length3],
		[bottom_startx + (bottom_width1 - bottom_width3) , bottom_starty + bottom_length1 + bottom_length2 + bottom_length3],
		[bottom_startx + (bottom_width1 - bottom_width3) , bottom_starty + bottom_length1 + bottom_length2],
		[bottom_startx + (bottom_width1 - bottom_width2), bottom_starty + bottom_length1 + bottom_length2],
		[bottom_startx + (bottom_width1 - bottom_width2), bottom_starty + bottom_length1],
		[bottom_startx , bottom_starty + bottom_length1]
	]

	const slabx = 530
	const slaby = 470
	const slab_width = 140
	const slab_length = 40

	let slab = [
		[slabx ,slaby],
		[slabx + slab_width ,slaby],
		[slabx + slab_width ,slaby+ slab_length],
		[slabx, slaby + slab_length]
		
	]

	const knob_startx = 570
	const knob_starty = 170
	const knob_width1 = 60
	const knob_width2 = 32
	const knob_length = 55

	let knob = [
		[knob_startx ,knob_starty],
		[knob_startx + knob_width1 ,knob_starty],
		[knob_startx + knob_width2 ,knob_starty + knob_length],
		[knob_startx + knob_width1 - knob_width2,  knob_starty + knob_length]
	]
	function drawStatic(ctx, obj,color) //for drawing the topknob
	{
		ctx.save();
		ctx.fillStyle = color;
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(obj[0][0], obj[0][1]);

		for(let i = 0; i < obj.length; ++i)
		{
			const next = (i + 1) % obj.length;
			ctx.lineTo(obj[next][0], obj[next][1]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = "30px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Rockwell Hardness Value : 54.89 HRC", 380,50);
		ctx.stroke();

		ctx.fillStyle = fill;
		drawStatic(ctx, bottomknob,"#c2c9d1");
		drawStatic(ctx, slab,"black");
		drawStatic(ctx,knob,"black")
		drawStatic(ctx, topknob,"#c2c9d1s");
		
		let v = knob;
		v[0][1] += 1;
		v[1][1] +=1;
		v[2][1] +=1;
		v[3][1] +=1;
		
		if(v[0][1] < 230)
			tmHandle = window.setTimeout(draw, 1000 / fps);
	}
	let tmHandle = window.setTimeout(draw, 1000 / fps);
});
