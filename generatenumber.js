/* 📊 GLOBAL VARIABLES FOR REAL-TIME CHARTING 📊 */
let myChart;
let timeLabels = ["0 s", "2 s", "4 s", "6 s", "8 s", "10 s"];
let tempReadings = [0, 0, 0, 0, 0, 0];

/* 🚀 INITIALIZE APPLICATION & DATA VISUALIZATION 🚀 */
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("sensorChart");
    
    // 🧹 Clean up any existing chart instance to prevent duplicate rendering bugs!
    let existingChart = Chart.getChart(ctx); 
    if (existingChart) {
        existingChart.destroy();
    }
    
    // 🎨 Creating the beautifully tailored live analytics line graph
    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: timeLabels,
            datasets: [{
                label: "Temperature (°C)",
                data: tempReadings,
                borderWidth: 2,
                tension: 0.3,
                borderColor: "#ff4757",
                backgroundColor: "rgba(255, 71, 87, 0.1)"
            }]
        },
        options: {
            responsive: true
        }
    });

    // ⚡ Initial trigger to fetch telemetry immediately on page load
    get();
});

/* 🛰️ TELEMETRY FETCH ENGINE (FIREBASE INTERACTION) 🛰️ */
async function get() {
    try {
        // 📡 Reaching out to Firebase Realtime Database
        let response = await fetch('https://pi2026-40785-default-rtdb.firebaseio.com/.json');
        let data = await response.json();
        
        // 🧪 Visualizing live incoming JSON tree in the developer console
        console.log("🔥 IoT Stream Connected:", data);
        
        if (data) {
            // 🌡️ 1. DHT11 Node: Process Environmental Metrics
            let currentTemp = data.dht11 ? data.dht11.temperature : 0;
            let currentHum = data.dht11 ? data.dht11.humidity : 0;
            
            if(document.getElementById("temperature")) document.getElementById("temperature").textContent = currentTemp + " °C";
            if(document.getElementById("humidity")) document.getElementById("humidity").textContent = currentHum + "%";
            
            // 🧪 2. MQ3 Node: Checking Alcohol Concentration Levels
            let isAlcohol = data.mq3 ? data.mq3.alcoholDetected : false;
            let alcoholText = (isAlcohol === true || isAlcohol === 1 || isAlcohol === "true") ? "Yes" : "No";
            if(document.getElementById("alcohol")) document.getElementById("alcohol").textContent = alcoholText;
            
            // 📏 3. HC-SR04 Node: Computing High-Precision Ultrasonic Distance
            let currentDist = 0;
            let isItem = false;
            
            if (data["hc-sr04"]) {
                currentDist = data["hc-sr04"].distance !== undefined ? data["hc-sr04"].distance : 0;
                isItem = data["hc-sr04"].itemDetected !== undefined ? data["hc-sr04"].itemDetected : false;
            }

            let itemText = (isItem === true || isItem === 1 || isItem === "true") ? "Yes" : "No";

            if(document.getElementById("distance")) document.getElementById("distance").textContent = Number(currentDist).toFixed(1) + " cm";
            if(document.getElementById("itemDetected")) document.getElementById("itemDetected").textContent = itemText;

            // 📈 Dynamic update routine for the dashboard graph
            if (myChart) {
                tempReadings.shift();
                tempReadings.push(currentTemp);
                myChart.update();
            }
        }
    } catch (error) {
        // 🚨 Critical exception handler for network interruptions
        console.error("❌ Telemetry Stream Error:", error);
    }
}

/* 🎲 UTILITY LOGIC: RANDOM COMPONENT ENGINE 🎲 */
function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("result").innerHTML = "Random: " + randomNumber;
}

/* ⏱️ ULTRA-FAST REFRESH CYCLE (1.5s FREQUENCY) ⏱️ */
setInterval(get, 1500);