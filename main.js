var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// create elements
const graph = {
  "A": ["B", "C"],
  "B": [],
  "C": [],
  "D": ["A"]
}

// render nodes
for (node in graph) {
  addNode(node);
}

// connect nodes
drawEdges();




// Rendering Graph
function drawEdges() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (node in graph) {
    let el = document.querySelector(`#${node}`);
    let elCoords = getElCoords(el);
    console.log("node: ", node);

    graph[node].forEach(neighbour => {
      ctx.beginPath();
      console.log("neighbour: ", neighbour)
      let nEl = document.querySelector(`#${neighbour}`);
      nCoords = getElCoords(nEl);
      console.log(nCoords);
      console.log(elCoords);
      ctx.moveTo(elCoords.x, elCoords.y);
      ctx.lineTo(nCoords.x, nCoords.y)
      ctx.stroke();

    });
  }
}

function getElCoords(el) {
  let rect = el.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2
  }
}

function addNode(node) {
  var el = document.createElement("div");
  var text = document.createTextNode(node);
  el.appendChild(text);
  el.className = "node";
  el.setAttribute("id", node);
  let rX = Math.random() * window.innerWidth;
  let rY = Math.random() * window.innerHeight;
  el.style.left = `${rX}px`
  el.style.top = `${rY}px`
  document.body.appendChild(el);
}




// Drag and Drop
function dropElement(event) {
  isGrabbed = false;
  currEl = undefined
};

function grabElement(event) {
  currEl = event.srcElement;
  isGrabbed = true;
  console.log(currEl)
};


onmousemove = function (event) {
  if (isGrabbed) {
    let rect = currEl.getBoundingClientRect();
    currEl.style.left = `${event.clientX  - rect.width/2}px`;
    currEl.style.top = `${event.clientY  - rect.height/2}px`;
    drawEdges();
  }
}

var currEl, isGrabbed;
document.querySelectorAll(".node").forEach(node => {
  node.addEventListener("mousedown", grabElement);
  node.addEventListener("mouseup", dropElement);
})