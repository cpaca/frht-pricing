console.log("Start of script.js")

var LY_PER_JUMP = 495

async function calculate() {
    // Comments copied from Calculation TODOs
    let errElement = document.getElementById("Errors")
    try {
        console.log("Calculate() called")
        errElement.innerHTML = "Thinking..."
        // Read text from "Number of tons"
        // -> turn into number, throw new Error if fail
        let numTons = parseInt(document.getElementById("num-tons").value)
        // Read system name
        let sysName = document.getElementById("sys-name").value
        let isPlanetaryDropoff = document.getElementById("planetaryDropoff").checked

        // Ping spansh for coords
        // -> need to check if len(results)>0
        // -> need to print coordinates and name of "found system"
        let spanshURL = new URL("https://spansh.co.uk/api/search/systems")
        spanshURL.searchParams.append("q", sysName)

        // need to use corsproxy because of github reasons
        let proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(spanshURL)}`

        console.log("Proxy URL:")
        console.log(`${proxyURL}`)
        let response = await fetch(proxyURL)
        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`)
        }

        // PROXY HANDLING:
        let proxyJson = await response.json()
        let status = proxyJson["status"]
        if (status["http_code"] != 200) {
            throw new Error(`HTTP Error. Proxy-Status: ${status["http_code"]}`)
        }
        let spanshData = JSON.parse(proxyJson["contents"])
        // END OF PROXY HANDLING

        let results = spanshData["results"]

        if (results.length < 1) {
            throw new Error(`Spansh error: Returned ${results.length} systems`)
        }

        let result = results[0]

        let realName = result["name"]
        let x1 = result["x"]
        let y1 = result["y"]
        let z1 = result["z"]

        // -> need to print coordinates and name of "found system"
        let sysEle = document.getElementById("System")
        let coordsEle = document.getElementById("Coords")
        sysEle.innerHTML = `<strong>Target system name:</strong> ${realName}`
        coordsEle.innerHTML = `<strong>Target system coordinates:</strong> (${x1}, ${y1}, ${z1})`

        // HQ - HIP 52675
        // HIP 52675: Need Coords
        let x0 = 20.81
        let y0 = 299.72
        let z0 = -153.28

        // distances
        let dx = x1 - x0
        let dy = y1 - y0
        let dz = z1 - z0

        // compare coords of TargetSystem and HIP52675
        // -> divide by 495 for numJumps
        // -> ceil()
        // -> numJumps
        let dist = Math.hypot(dx, dy, dz)
        let numJumps = Math.ceil(dist/LY_PER_JUMP)

        // Change of plans: Keep track of each value
        // so that they can be printed at the end
        let basePrice = 100000
        let jumpFee = 0
        let planetaryFee = 0
        if (numJumps > 1) {
            jumpFee = (numJumps - 1) * 5000
        }
        if (isPlanetaryDropoff) {
            planetaryFee = 10000
        }
        let pricePerTon = basePrice + jumpFee + planetaryFee

        // Output values to user:
        let baseEle = document.getElementById("Base price")
        let jmpPriceEle = document.getElementById("Jump Fee")
        let planetaryEle = document.getElementById("Planetary Fee")
        let totalEle = document.getElementById("Total Per Ton")
        baseEle.textContent = `Base: ${basePrice}/ton`
        jmpPriceEle.textContent = `Distance/FC jumps fee: ${jumpFee}/ton`
        planetaryEle.textContent = `Planetary delivery: ${planetaryFee}/ton`
        totalEle.textContent = `TOTAL: ${pricePerTon}/ton`

        // totalPrice = pricePerTon * numTons
        let totalPrice = pricePerTon * numTons
        let totalPriceEle = document.getElementById("TOTAL PRICE")
        totalPriceEle.textContent = `TOTAL PRICE: ${totalPrice.toLocaleString()}`
        errElement.innerHTML = "Done calculating."
    } catch (error) {
        errElement.innerHTML = "<strong>Error caught</strong>"
        throw error
    }
}

console.log("Functions loaded")

const btn = document.getElementById("calculate")
btn.addEventListener("click", calculate)

console.log("End of script.js")