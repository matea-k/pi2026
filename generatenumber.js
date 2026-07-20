let myChart;
let timeLabels = ["0 s", "2 s", "4 s", "6 s", "8 s", "10 s"];
let tempReadings = [0, 0, 0, 0, 0, 0];

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("sensorChart");

    let existingChart = Chart.getChart(ctx); 
    if (existingChart) {
        existingChart.destroy();
    }
    
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

    get();
});

async function get() {
    try {
        let response = await fetch('https://pi2026-40785-default-rtdb.firebaseio.com/.json');
        let data = await response.json();

        console.log("Firebase Data:", data);
        
        if (data) {
            let currentTemp = data.temperature !== undefined ? data.temperature : (data.dht11 ? data.dht11.temperature : 0);
            let currentHum = data.humidity !== undefined ? data.humidity : (data.dht11 ? data.dht11.humidity : 0);
            
            document.getElementById("temperature").textContent = currentTemp + " °C";
            document.getElementById("humidity").textContent = currentHum + "%";
            
            let isAlcohol = data.alcoholDetected !== undefined ? data.alcoholDetected : (data.mq3 ? data.mq3.alcoholDetected : false);
            document.getElementById("alcohol").textContent = isAlcohol ? "Yes" : "No";
            
            let currentDist = data.distance !== undefined ? data.distance : (data.ultrasonic ? data.ultrasonic.distance : 0);
            let isItem = data.itemDetected !== undefined ? data.itemDetected : (data.ultrasonic ? data.ultrasonic.itemDetected : false);
            
            document.getElementById("distance").textContent = currentDist.toFixed(1) + " cm";
            document.getElementById("itemDetected").textContent = isItem ? "Yes" : "No";

            if (myChart) {
                tempReadings.shift();
                tempReadings.push(currentTemp);
                myChart.update();
            }
        }
    } catch (error) {
        console.error("can't read data from Firebase:", error);
    }
}

function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("result").innerHTML = "Random: " + randomNumber;
}
setInterval(get, 2000);