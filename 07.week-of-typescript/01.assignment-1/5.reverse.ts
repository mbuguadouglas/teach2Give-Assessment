// Write a program that takes an integer as input and returns an integer with
// reversed digit
// ordering.

// Examples:
// For input 500, the program should return 5.
// For input -56, the program should return -65.
// For input -90, the program should return -9.
// For input 91, the program should return 19.


const userInput = prompt("Input your number here: ")


function reverseInteger(userInput: string): number | string {
    const num = parseInt(userInput)
  
    // Check if conversion was successful (returns NaN if not a number)
    if (isNaN(num)) {
      return "Kindly input a number"
    } else if (userInput.trim() === "") {
      return "Kindly input a value"
    } else {
      const reversedStr = userInput.split("").reverse().join("")
      return parseInt(reversedStr)
    }
  }
  
console.log(reverseInteger(userInput))
  