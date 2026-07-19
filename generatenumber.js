
function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("result").innerHTML = randomNumber;
}   
function get() {
fetch('pi2026-40785-default-rtdb-export.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById("humidity").textContent = data.dht11.humidity;
    document.getElementById("temperature").textContent = data.dht11.temperature
    document.getElementById("distance").textContent = data["hc-sr04"].distance
    document.getElementById("itemDetected").textContent = data["hc-sr04"].itemDetected
    document.getElementById("alcohol").textContent = data["mq3"].alcohol
  })
  .catch(error => console.error("there is error", error))}