/* TODO:
Need a text input w/ label that says "System name"
-> input type = search, to remove newline objects
Need a text input w/ label that says "Number of tons"
-> input type = number
Need a checkbox w/ label that says "Planetary drop-off location"
Need a button that says "Calculate"
See "Warning TODOs"
Need a box for Errors:

Calculation TODOs:
Read text from "Number of tons"
-> turn into number, throw new Error if fail
Read system name
Ping spansh for coords
-> need to check if len(results)>0
-> need to print coordinates and name of "found system"
HIP 52675: Need Coords

compare coords of TargetSystem and HIP52675
-> divide by 495 for numJumps
-> ceil()
-> numJumps

pricePerTon = 100k
if numJumps > 1:
    pricePerTon += (numJumps - 1) * 5k
if planetaryDeliveries:
    pricePerTon += 10k

totalPrice = pricePerTon * numTons

Warning TODOs:
-> This is just an estimate: These do not represent real FRHT prices!
-> To err on the side of caution, this calculator uses 495Ly/jump, but real prices use actual # of FC jumps

*/
console.log("Start of script.js")

async function calculate() {
    console.log("Calculate() called")
}


console.log("End of script.js")