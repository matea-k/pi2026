function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("result").innerHTML = randomNumber;
}

function get() {
    // ლოკალური JSON-ის ნაცვლად, ჯავასკრიპტი თავად აგენერირებს რანდომულ მნიშვნელობებს სენსორებისთვის:
    let randomTemp = (Math.random() * (35 - 20) + 20).toFixed(1); // 20-დან 35 გრადუსამდე
    let randomHum = Math.floor(Math.random() * (80 - 40) + 40);   // 40-დან 80 პროცენტამდე
    let randomDist = (Math.random() * (200 - 10) + 10).toFixed(1); // 10-დან 200 სმ-მდე
    let randomObj = Math.random() > 0.5 ? "true" : "false";       // კი ან არა
    let randomAlc = Math.random() > 0.5 ? "true" : "false";       // კი ან არა

    // მნიშვნელობების ჩასმა HTML-ში
    document.getElementById("temperature").textContent = randomTemp;
    document.getElementById("humidity").textContent = randomHum;
    document.getElementById("distance").textContent = randomDist;
    document.getElementById("itemDetected").textContent = randomObj;
    document.getElementById("alcohol").textContent = randomAlc;
}
setInterval(function() {
    generateNumber(); 
    get();            
}, 2000);