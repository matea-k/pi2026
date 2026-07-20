let myChart;
let timeLabels = ["0 s", "2 s", "4 s", "6 s", "8 s", "10 s"];
let tempReadings = [0, 0, 0, 0, 0, 0];

// ველოდებით HTML-ის ჩატვირთვას, ვშლით ძველ გრაფიკს და ვქმნით ახალს
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("sensorChart");
    
    // პოულობს და ანადგურებს HTML-ში ჩაწერილ ძველ გრაფიკს, რომ ერორი არ ამოაგდოს
    let existingChart = Chart.getChart(ctx); 
    if (existingChart) {
        existingChart.destroy();
    }
    
    // იქმნება ახალი, ლაივ გრაფიკი
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

// ასინქრონული ფუნქცია Firebase-დან მონაცემების წამოსაღებად
async function get() {
    try {
        let response = await fetch('https://pi2026-40785-default-rtdb.firebaseio.com/.json');
        let data = await response.json();
        
        if (data) {
            let currentTemp = data.dht11 ? data.dht11.temperature : 0;
            let currentHum = data.dht11 ? data.dht11.humidity : 0;
            
            document.getElementById("temperature").textContent = currentTemp + " °C";
            document.getElementById("humidity").textContent = currentHum + "%";
            
            let isAlcohol = data.mq3 ? data.mq3.alcoholDetected : false;
            document.getElementById("alcohol").textContent = isAlcohol ? "Yes" : "No";
            
            if (data.ultrasonic) {
                document.getElementById("distance").textContent = data.ultrasonic.distance.toFixed(1) + " cm";
                document.getElementById("itemDetected").textContent = data.ultrasonic.itemDetected ? "Yes" : "No";
            }

            if (myChart) {
                tempReadings.shift();
                tempReadings.push(currentTemp);
                myChart.update();
            }
        }
    } catch (error) {
        console.error("Firebase-დან მონაცემების წაკითხვის შეცდომა:", error);
    }
}

// რანდომიზატორი ზედა ღილაკისთვის
function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("result").innerHTML = "Random: " + randomNumber;
}

// ავტომატური Live განახლება ყოველ 2 წამში
setInterval(get, 2000);