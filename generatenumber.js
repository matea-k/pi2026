
function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("result").innerHTML = randomNumber;
}
fetch('pi2026-40785-default-rtdb-export.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById("humidity").textContent = data.dht11.humidity;
    document.getElementById("temperature").textContent = data.dht11.temperature
    document.getElementById("distance").textContent = data["hc-sr04"].distance
    document.getElementById("object").textContent = data["hc-sr04"].object
    document.getElementById("alcohol").textContent = data["hc-sr04"].alcohol
  })
  .catch(error => console.error("there is error", error));