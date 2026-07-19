function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("result").innerHTML = randomNumber;
}

function get() {
    fetch('simple.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("humidity").textContent = data.dht11.humidity;
            document.getElementById("temperature").textContent = data.dht11.temperature;
            document.getElementById("distance").textContent = data["hc-sr04"].distance;
            document.getElementById("object").textContent = data["hc-sr04"].itemDetected;
            document.getElementById("alcohol").textContent = data["mq3"].alcoholDetected;
        })
        .catch(error => console.error("there is error", error));
}