$(document).ready(function () {
    let clockDiv = $("#clock");
    clockDiv.html(moment().format('LT'));
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDgunXvJKidiY07uCU-yPMM9POARBksQ4Y",
        authDomain: "train-cc2da.firebaseapp.com",
        databaseURL: "https://train-cc2da.firebaseio.com",
        projectId: "train-cc2da",
        storageBucket: "train-cc2da.appspot.com",
        messagingSenderId: "524784163135"
    };
    firebase.initializeApp(config);

    let database = firebase.database();

    let trainName = "";
    let destination = "";
    let firstTrainTime = "";
    let frequency = "";

    $(document).on("click", ".btn", function (e) {
        e.preventDefault();
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val();
        firstTrainTime = parseInt(firstTrainTime);
        frequency = $("#frequencyInput").val();
        frequency = parseInt(frequency);

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        })

    });

    database.ref().on("child_added", function (snapshot) {

        let trainSchedule = $("#trainSchedule");
        let trainObject = {
            name: snapshot.val().trainName,
            destination: snapshot.val().destination,
            frequency: snapshot.val().firstTrainName,
            nextArrival: 0,
            minsAway: 0,
        }

        // function to push data to row
        function pushData(data) {
            
            let trainSchedule = $("#trainSchedule");

            let trainNameDisplay = $("<td></td>");
            let destinationDisplay = $("<td></td>");
            let frequencyDisplay = $("<td></td>");
            let nextArrivalDisplay = $("<td></td>");
            let minutesAwayDisplay = $("<td></td>");

            let trow = $("<tr></tr>");


            trainNameDisplay.text(trainObject.name);
            destinationDisplay.text(trainObject.destination);
            frequencyDisplay.text(trainObject.frequency);
            nextArrivalDisplay.text(trainObject.nextArrival);
            minutesAwayDisplay.text(trainObject.minsAway);

            trow.append(trainNameDisplay, destinationDisplay, frequencyDisplay, nextArrivalDisplay, minutesAwayDisplay);
            trainSchedule.append(trow);


        }
        pushData(snapshot);












        // let trainNameDisplay = $("#trainNameDisplay");
        // let destinationDisplay = $("#destinationDisplay");
        // let frequencyDisplay = $("#frequencyDisplay");
        // let nextArrivalDisplay = $("#nextArrivalDisplay");




        // trainNameDisplay.text(snapshot.val().trainName);
        // destinationDisplay.text(snapshot.val().destination);
        // frequencyDisplay.text(snapshot.val().frequency);

        // let nextArrival = moment(snapshot.val().firstTrainTime).format('h:mm a');
        // // console.log(nextArrival);

        // nextArrivalDisplay.text(nextArrival);

        // //define minutes away here...!!!!!

        // newTrainRow.append(trainNameDisplay, destinationDisplay, frequencyDisplay, nextArrivalDisplay, minutesAwayDisplay);
        // trainSchedule.append("<br>" + newTrainRow);






        // nextArrivalDisplay.append("<br>"+snapshot.val().firstTrainTime);

    });

})