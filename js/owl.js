// OWL APPEAR CLOSE TO EDGE OF WINDOW

document.addEventListener("mousemove", function (event) {
    const winWidth = window.innerWidth;
    const x = event.pageX;
    const y = event.screenY;

    const distFromEdge5 = (winWidth * 5) / 100;  
    const distFromEdge95 = (winWidth * 95) / 100;
  
    const owlLeft = document.querySelectorAll(".owl-left");
    const owlRight = document.querySelectorAll(".owl-right");
  
    const yValues = Array.from({length:75},(v,k)=>k+1)
  
    const randomY = yValues[Math.floor(Math.random() * yValues.length)];
  
    if (x <= distFromEdge5 && y > 200 && winWidth > 860) {
      owlLeft.forEach((tag) => {
        tag.style.transform = `translate(100%, 0) rotate(35deg)`;
      });
    }
  
    if (x > distFromEdge5 && winWidth > 860) {
      owlLeft.forEach((tag) => {
        tag.style.top = randomY + `%`;
        tag.style.transform = `translate(0, 0) rotate(0)`;
      });
    }
  
    if (x >= distFromEdge95 && y > 200 && winWidth > 860) {
      owlRight.forEach((tag) => {
        tag.style.transform = `translate(-100%, 0) rotate(-35deg)`;
      });
    }
  
    if (x < distFromEdge95 && winWidth > 860) {
      owlRight.forEach((tag) => {
        tag.style.top = randomY + `%`;
        tag.style.transform = `translate(0, 0) rotate(0)`;
      });
    }
  
    document.addEventListener("scroll", function () {
      owlLeft.forEach((tag) => {
        tag.style.transform = `translate(0, 0)`;
      });
  
      owlRight.forEach((tag) => {
        tag.style.transform = `translate(0, 0)`;
      });
    });
  });



// FOOTPRINT STAMPS

let number = 0
const stamps = [
    "assets/footprint.svg",
    "assets/footprint2.svg"
]
const winWidth = window.innerWidth;

const stampsTag = document.querySelector("div.stamps")

const degrees = Array.from({length:360},(v,k)=>k+1)

const addStamp = function (x, y) {
    // GET RANDOM VALUE FROM DEGREES ARRAY AND APPLY TO STAMP IMG
    const randomDegree = degrees[Math.floor(Math.random() * degrees.length)]
    
    const img = document.createElement("img")
    img.setAttribute("src", stamps[number])
    img.setAttribute("alt", "" )
    
    img.style.left = (x - window.innerWidth /2) + "px"
    img.style.top = y + "px"

    
    
    img.style.transform = "translate(-50%, -50%) rotate(" + randomDegree + "deg)"
  
    stampsTag.appendChild(img)

    number = number + 1
    if (number > stamps.length - 1) {
        number = 0
    }

}


// SET THE EVENT TO ADD STAMPS TO PAGE

// OPTION 1 - SET INTERVAL AND LIMIT THE TIMES IT RUNS THE FUNCTION

// var counter = 0;

// var looper = setInterval(function(){ 
//     counter++;

//     if (window.innerWidth > 860) {
//       addStamp()
//     }

//     if (counter >= 100) {
//         clearInterval(looper);
//     }

// }, 3000);

// OPTION 2 - STAMPS APPEAR ON MOUSE EVENT

document.addEventListener("click", function(event) {
    let x = event.pageX
    let y = event.pageY  
    const docHeight = document.body.offsetHeight

    if (y >= docHeight - 40) {
      y = y - 40 
    }
    addStamp(x, y)
    
})








