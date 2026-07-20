async function getLiveFirebaseData() {
    try {
        let response = await fetch('https://pi2026-40785-default-rtdb.firebaseio.com/.json');
        let data = await response.json();
        

        document.getElementById("temperature").textContent = data.dht11.temperature;
        document.getElementById("humidity").textContent = data.dht11.humidity;
        document.getElementById("alcohol").textContent = data.mq3.alcoholDetected;
        document.getElementById("distance").textContent = data.ultrasonic.distance.toFixed(1);
        document.getElementById("itemDetected").textContent = data.ultrasonic.itemDetected;

    } catch (error) {
        console.error("can't get connection with Firebase:", error);
    }
}

getLiveFirebaseData();

setInterval(getLiveFirebaseData, 2000);