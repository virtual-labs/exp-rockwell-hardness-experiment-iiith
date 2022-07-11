'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', restart);

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', play);

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', pause);

    const slider = document.getElementById('speed');
    const output = document.getElementById('demo_speed');
    output.innerHTML = (slider.value) / 4;
    slider.oninput = function() {
        output.innerHTML = (this.value) / 4;
        FPS = originalFPS * (output.innerHTML);
        restart();
    };

    function restart() {
        window.clearTimeout(tmHandle);
        window.clearTimeout(tms);
        setAll();
        play();
    }

    function play() {
        tmHandle = window.setTimeout(draw, 1000 / FPS);
        pauseButton.removeAttribute("disabled");
        restartButton.removeAttribute("disabled");
        playButton.setAttribute("disabled", "true");
    }

    function setAll() {
        knob = [
            [knobStartX, knobStartY],
            [knobStartX + knobWidth1, knobStartY],
            [knobStartX + knobWidth2, knobStartY + knobLength],
            [knobStartX + knobWidth1 - knobWidth2, knobStartY + knobLength]
        ];
    }

    function pause() {
        window.clearTimeout(tmHandle);
        pauseButton.setAttribute("disabled", "true");
        playButton.removeAttribute("disabled");
    }

    const canvas = document.getElementById("main");
    canvas.width = 450;
    canvas.height = 500;
    // canvas.style = "border:3px solid;";
    const ctx = canvas.getContext("2d");

    const originalFPS = 10;
    let FPS = 10;
    let tms;

    const topStartX = 100;
    const topStartY = 100;
    const topWidth1 = 100;
    const topWidth2 = 80;
    const topLength1 = 50;
    const topLength2 = 80;

    const topKnob = [
        [topStartX, topStartY],
        [topStartX + topWidth1, topStartY],
        [topStartX + topWidth1, topStartY + topLength1],
        [topStartX + topWidth2, topStartY + topLength1],
        [topStartX + topWidth2, topStartY + topLength1 + topLength2],
        [topStartX + (topWidth1 - topWidth2), topStartY + topLength1 + topLength2],
        [topStartX + (topWidth1 - topWidth2), topStartY + topLength1],
        [topStartX, topStartY + topLength1]

    ];

    const bottomStartx = 80;
    const bottomStarty = 310;
    const bottomWidth1 = 140;
    const bottomWidth2 = 100;
    const bottomWidth3 = 60;
    const bottomLength1 = 60;
    const bottomLength2 = 50;
    const bottomLength3 = 80;

    const bottomKnob = [
        [bottomStartx, bottomStarty],
        [bottomStartx + bottomWidth1, bottomStarty],
        [bottomStartx + bottomWidth1, bottomStarty + bottomLength1],
        [bottomStartx + bottomWidth2, bottomStarty + bottomLength1],
        [bottomStartx + bottomWidth2, bottomStarty + bottomLength1 + bottomLength2],
        [bottomStartx + bottomWidth3, bottomStarty + bottomLength1 + bottomLength2],
        [bottomStartx + bottomWidth3, bottomStarty + bottomLength1 + bottomLength2 + bottomLength3],
        [bottomStartx + (bottomWidth1 - bottomWidth3), bottomStarty + bottomLength1 + bottomLength2 + bottomLength3],
        [bottomStartx + (bottomWidth1 - bottomWidth3), bottomStarty + bottomLength1 + bottomLength2],
        [bottomStartx + (bottomWidth1 - bottomWidth2), bottomStarty + bottomLength1 + bottomLength2],
        [bottomStartx + (bottomWidth1 - bottomWidth2), bottomStarty + bottomLength1],
        [bottomStartx, bottomStarty + bottomLength1]
    ];

    const slabX = 80;
    const slabY = 500;
    const slabWidth = 140;
    const slabLength = 40;

    const slab = [
        [slabX, slabY],
        [slabX + slabWidth, slabY],
        [slabX + slabWidth, slabY + slabLength],
        [slabX, slabY + slabLength]

    ];

    const knobStartX = 120;
    const knobStartY = 170;
    const knobWidth1 = 60;
    const knobWidth2 = 32;
    const knobLength = 55;

    let knob = [];

    const testX = 120;
    const testY = 280;
    const testWidth = 60;
    const testHeight = 30;

    const test = [
        [testX, testY],
        [testX + testWidth, testY],
        [testX + testWidth, testY + testHeight],
        [testX, testY + testHeight]
    ];

    const centerX = 250;
    const centerY = 200;
    const radius = 50;
    const boxWidth = 100;
    let tmHandle;

    const zoomHeight = 30;
    const box = [
        [centerX, centerY - radius],
        [centerX + boxWidth, centerY - radius],
        [centerX + boxWidth, centerY + radius],
        [centerX, centerY + radius],
    ];

    const zoomTest = [
        [centerX, centerY - zoomHeight],
        [centerX + boxWidth, centerY - zoomHeight],
        [centerX + boxWidth, centerY + zoomHeight],
        [centerX, centerY + zoomHeight],
    ];
    setAll();
    init();

    function init() {
        drawStatic(ctx, bottomKnob, data.colors.stand);
        drawStatic(ctx, slab, data.colors.slab);
        drawStatic(ctx, test, data.colors.test);
        drawStatic(ctx, knob, data.colors.slab);
        drawStatic(ctx, topKnob, data.colors.stand);
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Rockwell Hardness Tester", 50, 50);
        ctx.stroke();
    }

    function drawStatic(ctx, obj, color) //for drawing the topKnob
    {
        ctx.save();
        ctx.fillStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(obj[0][0], obj[0][1]);

        for (let i = 0; i < obj.length; ++i) {
            const next = (i + 1) % obj.length;
            ctx.lineTo(obj[next][0], obj[next][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    function drawCircle(ctx, x, y, radius, flag, color) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        if (flag === 0) {
            ctx.fill();
        }
        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        init();
        let reference = knob;
        reference[0][1] += 1;
        reference[1][1] += 1;
        reference[2][1] += 1;
        reference[3][1] += 1;

        if (reference[0][1] < 230) {
            tmHandle = window.setTimeout(draw, 1000 / FPS);
        } else {
            zoom();
            pauseButton.setAttribute("disabled", "true");
        }
    }

    function zoom() {
        drawStatic(ctx, box, data.colors.bg);
        drawStatic(ctx, zoomTest, data.colors.test);
        drawCircle(ctx, centerX + boxWidth / 2, centerY, 5, 0, data.colors.testDark);
        ctx.moveTo(testX + testWidth / 2, testY);
        ctx.lineTo(centerX, centerY + radius);
        ctx.moveTo(testX + testWidth / 2, testY);
        ctx.lineTo(centerX, centerY - radius);
        ctx.stroke();
    }
});
