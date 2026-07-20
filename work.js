async function getLiveFirebaseData() {
    try {
        // აქ პირდაპირ შენს Firebase-ის ბაზას მივმართავთ
        let response = await fetch('https://pi2026-40785-default-rtdb.firebaseio.com/.json');
        let data = await response.json();
        
        // რეალური მონაცემების დასმა HTML-ში
        // შენი პითონის კოდის მიხედვით "hc-sr04"-ის ნაცვლად ბაზაში ახლა "ultrasonic" გქვია
        document.getElementById("temperature").textContent = data.dht11.temperature;
        document.getElementById("humidity").textContent = data.dht11.humidity;
        document.getElementById("alcohol").textContent = data.mq3.alcoholDetected;
        document.getElementById("distance").textContent = data.ultrasonic.distance.toFixed(1); // ვამრგვალებთ 1 მეათედამდე
        document.getElementById("itemDetected").textContent = data.ultrasonic.itemDetected;

    } catch (error) {
        console.error("ვერ ვუკავშირდები Firebase-ს:", error);
    }
}

// საიტის გახსნისთანავე პირველივე წამს წამოიღებს მონაცემებს
getLiveFirebaseData();

// შემდეგ კი ყოველ 2 წამში ავტომატურად შეამოწმებს ბაზას. 
// როგორც კი Raspberry-ზე სენსორი შეიცვლება, ეკრანზეც Live-ში განახლდება!
setInterval(getLiveFirebaseData, 2000);