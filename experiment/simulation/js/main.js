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
			[knobStartX ,knobStartY],
			[knobStartX + knobWidth1 ,knobStartY],
			[knobStartX + knobWidth2 ,knobStartY + knobLength],
			[knobStartX + knobWidth1 - knobWidth2,  knobStartY + knobLength]
		];
		tmHandle = window.setTimeout(draw, 1000 / fps);
		playFlag = 0;
		playPause();
		
	}

	function playPause()
	{
		if(playFlag)
		{
			window.clearTimeout(tmHandle);
			document.getElementById("play/pause").innerHTML = "Play";
			playFlag = 0;
		}
		else
		{
			window.clearTimeout(tmHandle); 
			tmHandle = setTimeout(draw, 1000 / fps);
			document.getElementById("play/pause").innerHTML = "Pause";
			playFlag = 1;
		}
	}
	const canvas = document.getElementById("main");
	canvas.width = 1200;
	canvas.height = 600;
	canvas.style = "border:3px solid";
	const ctx = canvas.getContext("2d");

	const fill = "#D3D3D3";
	let fps = 12;

	const topStartX = 550;
	const topStartY = 100;
	const topWidth1 = 100;
	const topWidth2 = 80;
	const topLength1 = 50;
	const topLength2 = 80;
	let playFlag = 1;

	let topKnob = [
		[topStartX , topStartY],
		[topStartX + topWidth1 , topStartY],
		[topStartX + topWidth1 ,topStartY + topLength1],
		[topStartX + topWidth2 , topStartY + topLength1],
		[topStartX + topWidth2 , topStartY + topLength1 + topLength2],
		[topStartX + (topWidth1 - topWidth2), topStartY + topLength1 + topLength2],
		[topStartX + (topWidth1 - topWidth2), topStartY + topLength1],
		[topStartX , topStartY + topLength1]

	];

	const bottomStartx = 530;
	const bottomStarty = 280;
	const bottomWidth1 = 140;
	const bottomWidth2 = 100;
	const bottomWidth3 = 60;
	const bottomLength1 = 60;
	const bottomLength2 = 50;
	const bottomLength3 = 80;


	let bottomKnob = [
		[bottomStartx , bottomStarty],
		[bottomStartx + bottomWidth1 , bottomStarty],
		[bottomStartx + bottomWidth1 ,bottomStarty + bottomLength1],
		[bottomStartx + bottomWidth2 , bottomStarty + bottomLength1],
		[bottomStartx + bottomWidth2 , bottomStarty + bottomLength1 + bottomLength2],
		[bottomStartx + bottomWidth3 , bottomStarty + bottomLength1 + bottomLength2],
		[bottomStartx + bottomWidth3 , bottomStarty + bottomLength1 + bottomLength2 + bottomLength3],
		[bottomStartx + (bottomWidth1 - bottomWidth3) , bottomStarty + bottomLength1 + bottomLength2 + bottomLength3],
		[bottomStartx + (bottomWidth1 - bottomWidth3) , bottomStarty + bottomLength1 + bottomLength2],
		[bottomStartx + (bottomWidth1 - bottomWidth2), bottomStarty + bottomLength1 + bottomLength2],
		[bottomStartx + (bottomWidth1 - bottomWidth2), bottomStarty + bottomLength1],
		[bottomStartx , bottomStarty + bottomLength1]
	];

	const slabX = 530;
	const slabY = 470;
	const slabWidth = 140;
	const slabLength = 40;

	let slab = [
		[slabX ,slabY],
		[slabX + slabWidth ,slabY],
		[slabX + slabWidth ,slabY+ slabLength],
		[slabX, slabY + slabLength]
		
	];

	const knobStartX = 570;
	const knobStartY = 170;
	const knobWidth1 = 60;
	const knobWidth2 = 32;
	const knobLength = 55;

	let knob = [
		[knobStartX ,knobStartY],
		[knobStartX + knobWidth1 ,knobStartY],
		[knobStartX + knobWidth2 ,knobStartY + knobLength],
		[knobStartX + knobWidth1 - knobWidth2,  knobStartY + knobLength]
	];
	function drawStatic(ctx, obj,color) //for drawing the topKnob
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
		drawStatic(ctx, bottomKnob,"#c2c9d1");
		drawStatic(ctx, slab,"black");
		drawStatic(ctx,knob,"black")
		drawStatic(ctx, topKnob,"#c2c9d1s");
		
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
