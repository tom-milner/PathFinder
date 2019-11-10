var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// create elements
const graph = {
  "A": ["B", "C", "D", "E"],
  "B": [],
  "C": [],
  "D": [],
  "E": ["F", "G"],
  "F": [],
  "G": []
}

// render nodes
addNodes();

// connect nodes
drawEdges();



// Rendering Graph
function drawEdges() {
  // remove weights
  document.querySelectorAll(".weight").forEach(el => el.remove())
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

      ctx.moveTo(elCoords.x, elCoords.y);
      ctx.lineTo(nCoords.x, nCoords.y)
      ctx.stroke();
      drawMagnitude(elCoords, nCoords);
    });
  }
}

function drawMagnitude(coords1, coords2) {

  let dX = coords2.x - coords1.x;
  let dY = coords2.y - coords1.y;
  let mag = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

  let textX = coords1.x + dX / 2;
  let textY = coords1.y + dY / 2;

  var textEl = document.createElement("div");
  var text = document.createTextNode(Math.floor(mag) / 10);
  textEl.appendChild(text);
  textEl.className = "weight";
  console.log(textX, textY);
  textEl.style.left = `${textX}px`;
  textEl.style.top = `${textY}px`;

  document.body.appendChild(textEl);
}

function getElCoords(el) {
  let rect = el.getBoundingClientRect();
  return {
    x: rect.x + (rect.width / 2),
    y: rect.y + (rect.height / 2)
  }
}

function addNodes() {
  for (node in graph) {
    var el = document.createElement("div");
    var text = document.createTextNode(node);
    el.appendChild(text);
    el.className = "node";
    el.setAttribute("id", node);
    let rX = 100 + Math.random() * (window.innerWidth - 200);
    let rY = 100 + Math.random() * (window.innerHeight - 200);
    el.style.left = `${rX}px`
    el.style.top = `${rY}px`
    document.body.appendChild(el);
  }
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
    currEl.style.left = `${event.clientX -rect.width/2}px`;
    currEl.style.top = `${event.clientY - rect.height/2 }px`;
    drawEdges();
  }
}

var currEl, isGrabbed;
document.querySelectorAll(".node").forEach(node => {
  node.addEventListener("mousedown", grabElement);
  node.addEventListener("mouseup", dropElement);
})