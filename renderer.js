// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 800, 600);