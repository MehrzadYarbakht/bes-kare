// JavaScript för att hantera ankomstregistrering på klientsidan

function registerArrival() {
    var visitorName = document.getElementById("visitorName").value;
    
    if (visitorName.trim() === "") {
        alert("Vänligen ange besökarens namn.");
        return;
    }

    // Skicka en förfrågan till servern för att registrera ankomsten
    fetch("/register-arrival", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitorName: visitorName }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        displayVisitorLog(data.visitorLog);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Något gick fel vid registrering av ankomst.");
    });
}

function displayVisitorLog(visitorLog) {
    var logDiv = document.getElementById("visitorLog");
    logDiv.innerHTML = "<h3>Besökslogg:</h3>";

    for (var visitor in visitorLog) {
        var arrivalTime = visitorLog[visitor];
        logDiv.innerHTML += "<p>" + visitor + ": Ankomst " + arrivalTime + "</p>";
    }
}
