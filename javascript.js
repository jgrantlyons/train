$(document).ready(function () {

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
    let scheduleRowCounter = 0;

    $(document).on("click", ".btn", function (e) {
        e.preventDefault();
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val();
        firstTrainTime = parseInt(firstTrainTime);
        frequency = $("#frequencyInput").val();
        frequency = parseInt(frequency);

        // console.log(trainName, destination, firstTrainTime, frequency);

        database.ref().set({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            freqency: frequency
        })

    });

    database.ref().on("value", function(snapshot){

        console.log(snapshot.val());
        
        let newRow = $("<div class=row></div>");
        let newDivCol3 = $("<div class=col-3></div>");
        let newDivCol4 = $("<div class=col-2></div>");
        
        $("#trainSchedule").append(newRow).attr("id", scheduleRowCounter);

        $("#"+scheduleRowCounter).append(newDivCol3.text(snapshot.val().trainName));
        $("#"+scheduleRowCounter).append(newDivCol3.text(snapshot.val().destination));
        $("#"+scheduleRowCounter).append(newDivCol2.text(snapshot.val().frequency));
        $("#"+scheduleRowCounter).append(newDivCol2); //next arrival
        $("#"+scheduleRowCounter).append(newDivCol2); //minutes away


        scheduleRowCounter++;


        // $("#trainNameDisplay").append(newDiv.text(snapshot.val().trainName));
        // $("#destinationDisplay").append(newDiv.text(snapshot.val().destination));
        // $("#frequencyDisplay").append(newDiv.text(snapshot.val().frequency));
        
    });


})