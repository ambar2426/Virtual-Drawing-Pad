// Get elements
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color");
const brushSize = document.getElementById("brush-size");

// Set initial values
let painting = false;
let erasing = false;
canvas.width = 500;
canvas.height = 400;
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = colorPicker.value;

// Start drawing
function startPosition(e) {
    painting = true;
    draw(e);
}

// End drawing
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// Draw on the canvas
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize.value;
    ctx.strokeStyle = erasing ? "#ffffff" : colorPicker.value;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Toggle eraser mode
function toggleEraser() {
    erasing = !erasing;
}

// Clear the entire canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
colorPicker.addEventListener("change", () => (ctx.strokeStyle = colorPicker.value));
brushSize.addEventListener("input", () => (ctx.lineWidth = brushSize.value));
