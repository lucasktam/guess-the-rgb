function isValidRGB(string){
    if (!string || isNaN(string)) {
        return false;
    }
    const n = Number(string);
    // Check if the number is between 0 and 255 and is an integer
    return n >= 0 && n <= 255 && Number.isInteger(n);
}

function getRandomRGB(){
    return [(Math.random() * 256) | 0, (Math.random() * 256) | 0, (Math.random() * 256) | 0]; // bitwise operation to floor
}


let square = document.getElementById('square');
let squareRGB = getRandomRGB();

square.style.backgroundColor = `rgb(${squareRGB[0]}, ${squareRGB[1]}, ${squareRGB[2]})`;

function clearText(elementId) {
    var inputElement = document.getElementById(elementId);
    
    // Condition: Only clear text if the value is not empty
    if (inputElement.value !== "") {
        inputElement.value = ""; // Clear the text input
    }
}

document.getElementById('submitButton').addEventListener('click', () => {
    document.getElementById('submitButton').disabled = true;
    // Collect data
    const formData = {
        field1: document.getElementById('field1').value,
        field2: document.getElementById('field2').value,
        field3: document.getElementById('field3').value
    };

    if (!isValidRGB(formData.field1) || !isValidRGB(formData.field2) || !isValidRGB(formData.field3)){
        alert("Your numbers must be valid integers in [0, 255]");
        return;
    }

    // Process data (example: log it to console)
    console.log('Form Data:', formData);

    // Add new
    trueRGB = document.createElement("p");
    trueRGB.innerText = `Answer: ${squareRGB[0]}, ${squareRGB[1]}, ${squareRGB[2]}\n\n` +

                        `ΔR = ${Math.abs(squareRGB[0]-Number(formData.field1))}, `+
                         `ΔG = ${Math.abs(squareRGB[1]-Number(formData.field2))}, `+
                         `ΔB = ${Math.abs(squareRGB[2]-Number(formData.field3))}\n\n` +

                         `Total difference: ${Math.abs(squareRGB[0]-Number(formData.field1)) 
                                            + Math.abs(squareRGB[1]-Number(formData.field2)) 
                                            + Math.abs(squareRGB[2]-Number(formData.field3))}\n\n` +

                        `You were ${(((Math.abs(squareRGB[0]-Number(formData.field1)) 
                            + Math.abs(squareRGB[1]-Number(formData.field2)) 
                            + Math.abs(squareRGB[2]-Number(formData.field3))) * 1.0 / (255*3)) * 100).toFixed(2)}% off!`;

    trueRGB.id = "trueRGB";  
    document.body.appendChild(trueRGB);

    let continueButton = document.getElementById("continueButton");
    if (continueButton) {
        document.body.removeChild(continueButton);
    }

    continueButton = document.createElement("button");
    continueButton.id = "continueButton";
    continueButton.style.width = '100px';
    continueButton.style.height = '20px';
    continueButton.textContent = 'Continue';
    continueButton.addEventListener('click', () => {
        clearText("field1");
        clearText("field2");
        clearText("field3");
        squareRGB = getRandomRGB();
        square.style.backgroundColor = `rgb(${squareRGB[0]}, ${squareRGB[1]}, ${squareRGB[2]})`;

        // Remove previous
        let trueRGB = document.getElementById("trueRGB");
        if (trueRGB) {
            document.body.removeChild(trueRGB);
        }

        document.body.removeChild(continueButton);
        document.getElementById('submitButton').disabled = false;
    });

    document.body.appendChild(continueButton);

});