// reference to the HTML canvas element with the id "calculator."
const canvas = document.getElementById("calculator");
// 2D drawing context for the canvas.
const ct = canvas.getContext("2d");
// Initializing the outcome variable to store the calculation outcome.
let outcome= "";
// Defined an array of button objects that represent the calculator Buttons.
const calButtons = [
  // Each button is defined with properties like label, position (x, y), size (width, height), class, and color.
  {
     label: "", x: 2, y: 100, width: 65, height: 60, color:"rgba(94,96,102,255)"
    },
  {
     label: "", x: 70, y: 100, width: 65, height: 60 ,color:"rgba(94,96,102,255)"
    },
  { 
    label: "C", x: 138, y: 100, width: 65, height: 60,color:"rgba(94,96,102,255)" 
  },
  { 
    label: "%", x: 206, y: 100, width: 65, height: 60,color:"rgba(94,96,102,255)"
  },
  { 
    label: "/", x: 275, y: 100, width: 70, height: 60 ,color:"rgba(255,159,11,255)"
  },
  { 
    label: "(", x: 2, y: 162, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "7", x: 70, y: 162, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "8", x: 138, y: 162, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "9", x: 206, y: 162, width: 65, height: 60,color:"rgba(121,122,126,255)"
  },
  { 
    label: "*", x: 275, y: 162, width: 70, height: 60,color:"rgba(255,159,11,255)"
  },
  { 
    label: ")", x: 2, y: 224, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "4", x: 70, y: 224, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "5", x: 138, y: 224, width: 65, height: 60,color:"rgba(121,122,126,255)"
  },
  { 
    label: "6", x: 206, y: 224, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "-", x: 275, y: 224, width: 70, height: 60 ,color:"rgba(255,159,11,255)"
  },
  { 
    label:"Back", x:2, y: 286, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "1", x: 70, y: 286, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "2", x: 138, y: 286, width: 65, height: 60,color:"rgba(121,122,126,255)"
  },
  { 
    label: "3", x: 206, y: 286, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "+", x: 275, y: 286, width: 70, height: 60 ,color:"rgba(255,159,11,255)"
  },
  { 
    label: "0", x: 2, y: 348, width: 200, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: ".", x: 206, y: 348, width: 65, height: 60 ,color:"rgba(121,122,126,255)"
  },
  { 
    label: "=", x: 275, y: 348, width: 70, height: 60 ,color:"rgba(255,159,11,255)"
  },
];

// Defined an array of circle objects for the top-left corner of the calculator.
const Colours = [
  { color: "red", x: 20, y: 20, radius: 8 },
  { color: "yellow", x: 50, y: 20, radius: 8 },
  { color: "green", x: 80, y: 20, radius: 8 },
  
];
// Function to draw circles in the top-left corner.
function drawColours() {
  Colours.forEach((circle) => {
    ct.beginPath();
    ct.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ct.fillStyle = circle.color;
    ct.fill();
    ct.closePath();
  });
}

// Initialized the expression variable to store the user's input.
let exp = "";

// Function to design and draw calculator buttons.
function designcalButtons() {
  ct.font = "bold 20px Times New Roman";
  drawColours();
  // Iterating through the array of buttons and draw each one.
  calButtons.forEach((button) => {
    ct.fillStyle=button.color;
     ct.textAlign="center";
   
    ct.fillRect(button.x, button.y, button.width, button.height);
    ct.fillStyle = "white";
    
    
    const textX = button.x + button.width / 2;
    const textY = button.y + button.height / 2;
    
    ct.fillText(button.label, textX, textY);
  
  });
}
// Defined the position for displaying the user's input expression.
const expDisplay = { x: canvas.width - 200, y: 50 }; 

// Function to draw the user's input expression and calculation outcome.
function drawexp() {
  ct.fillStyle = "white";
  ct.font = "20px Times New Roman";
  ct.textAlign = "left"; // Align the text to the left
  
  ct.clearRect(expDisplay.x, expDisplay.y - 20, canvas.width, 50); // Clear the previous expression area
  
  // Draw the user's input expression and outcome.
  ct.fillText(exp, expDisplay.x, expDisplay.y);
  
  ct.font = "bold 25px Times New Roman";
  ct.fillText(outcome, expDisplay.x, expDisplay.y+25);

}

 // Function to clear the calculator display.
function displayClear(clearexp = false) {
  
  ct.clearRect(0, 0, canvas.width, canvas.height);
 
  drawexp();
  designcalButtons();
  if (clearexp) {
     // Clears the user's input expression and outcome.
    exp = "";
    outcome = "";
  }
}

// Function to evaluate the user's input exp.
function evalExp() {
  try {
    outcome = eval(exp);
    displayClear();
    
    drawexp();
  } catch (error) {
    displayClear();
    exp = "Invalid exp";
    drawexp();
  }
}

function eval(exp) {
  try {
    const outcome = evaluate(exp);
     // To check if the outcome is not a number (NaN)
    if (isNaN(outcome)) {    
      return "Invalid exp"; // Returns an error message for an invalid expression
    } else {
      return outcome; // Returns the valid outcome of the expression
    }
  } catch (error) {
    return "Invalid exp"; // Handles any evaluation errors and return an error message
  }
}
// Function to evaluate a valid mathematical expression
function evaluate(exp) {
  try {
    // Defined an array of supported mathematical operations
    const operations = ["+", "-", "*", "/", "%"];
     // Initialized the output and operator stacks to handle the expression evaluation
    const output = [];
    const operationstack = [];
    // Defined operator precedence to ensure correct evaluation order
    const precedence = 
    {
      "+": 1, "-": 1, "*": 2, "/": 2, "%": 2,
    };
// regexxized the input expression to separate numbers, operations, and parentheses
    const regex = exp.match(/(\d+(\.\d+)?)|(\+|\-|\*|\/|\%|\(|\))/g);

// Checkg if there are no valid regex, indicating an invalid exp
    if (!regex) {
      throw "Invalid exp";
    }
 // Iterating through each regexx in the exp
    for (let regexx of regex) {
      if (!isNaN(regexx)) {

        // If the regexx is a number, pushing it to the output queue
        output.push(parseFloat(regexx));
      } else if (operations.includes(regexx)) {

        // If the regexx is an operator, handling operator precedence and shunting yard algorithm
        while (
          operationstack.length > 0 &&
          precedence[operationstack[operationstack.length - 1]] >= precedence[regexx]
        ) {
           // Poping operations from the operator stack to the output queue based on precedence
          output.push(operationstack.pop());
        }
        operationstack.push(regexx);
      } else if (regexx === "(") {

         // If the regexx is an opening parenthesis, push it to the operator stack
        operationstack.push(regexx);
      } else if (regexx === ")") {
         // If the regexx is a closing parenthesis, process operations back to the opening parenthesis
        while (operationstack.length > 0 && operationstack[operationstack.length - 1] !== "(") {

         
          output.push(operationstack.pop());
        }
        // Checking for mismatched parentheses or invalid expression
        if (operationstack.length === 0 || operationstack[operationstack.length - 1] !== "(") {
          throw "Invalid exp";
        }
        // Poping the opening parenthesis from the stack
        operationstack.pop(); 
      }
    }
// Processing any remaining operations in the stack
    while (operationstack.length > 0) {
      if (operationstack[operationstack.length - 1] === "(" || operationstack[operationstack.length - 1] === ")") {
        throw "Invalid exp";
      }
      output.push(operationstack.pop());
    }
 // Evaluating the expression based on the RPN (Reverse Polish Notation) in the output queue
    const outcomeStack = [];
    for (let regexx of output) {
      if (!isNaN(regexx)) {
        outcomeStack.push(regexx);
      } else if (operations.includes(regexx)) {
        if (outcomeStack.length < 2)
         {
          throw "Invalid exp";
        }
        const b = outcomeStack.pop();
        const a = outcomeStack.pop();
        if (regexx === "+") {
          outcomeStack.push(a + b);
        } else if (regexx === "-") 
        {
          outcomeStack.push(a - b);
        } else if (regexx === "*")
         {
          outcomeStack.push(a * b);
        } else if (regexx === "/") 
        {
          outcomeStack.push(a / b);
        } else if (regexx === "%") 
        {
          outcomeStack.push(a % b);
        }
      }
    }
 // Checking the validity of the final outcome and operator stack
    if (outcomeStack.length !== 1 || operationstack.length > 0) {
      throw "Invalid exp";
    }

    // Returning the final outcome of the evaluated expression
    return outcomeStack[0];
  } catch (error) 
  {
    return "Invalid exp";
  }
}

// Function for handling the user's button clicks.
function handleButtonClick(x, y) {
  calButtons.forEach((button) => {
    if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
      if (button.label === "=") 
      {
        evalExp();
        displayClear();
      } else if (button.label === "Back")
       {
        if (outcome !== "") {
            // If there's a outcome, clear both outcome and expression
          //  exp = "";
           outcome = "";
         } else 
         {  
           exp = exp.slice(0, -1);
         }
       
        displayClear();
      }
       else if (button.label === "+" || button.label === "-" || button.label === "*" || button.label === "/") {
        exp += " " + button.label + " ";
        displayClear();
      }
      else if (button.label === "%") 
      {
        exp += " % ";
        displayClear();
        drawexp();
       }
        else if (button.label === ".") 
        {
        exp += button.label;
        displayClear();
      } 
      else if (button.label === "(")
       {
        exp += button.label;
        displayClear();
        drawexp();
      } 
      else if (button.label === ")")
       {
        exp += button.label;
        displayClear();
        drawexp();
      }
      else if (button.label === "C")
       { // Clear button
        displayClear(true); // Pass true to clear the expression
        drawexp();
      }
      else if (/^\d$/.test(button.label)) 
      { // Check if the button label is a digit
        exp += button.label;
        displayClear();
      }
    }
  });
}

canvas.addEventListener("click", function (e) {
  const x = e.clientX - canvas.getBoundingClientRect().left;
  const y = e.clientY - canvas.getBoundingClientRect().top;
  handleButtonClick(x, y);
});

displayClear();
designcalButtons();

