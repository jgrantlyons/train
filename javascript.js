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
    // let scheduleRowCounter = 0;

    $(document).on("click", ".btn", function (e) {
        e.preventDefault();
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val();
        firstTrainTime = parseInt(firstTrainTime);
        frequency = $("#frequencyInput").val();
        frequency = parseInt(frequency);

        // console.log(trainName, destination, firstTrainTime, frequency);

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        })

        // $("#submitForm").find().empty();
    });

    database.ref().on("child_added", function(snapshot){

        console.log(snapshot.val().destination);
        let trainNameDisplay = $("#trainNameDisplay");
        let destinationDisplay = $("#destinationDisplay");
        let frequencyDisplay = $("#frequencyDisplay");
        let nextArrivalDisplay = $("#nextArrivalDisplay");

        trainNameDisplay.text(snapshot.val().trainName);
        destinationDisplay.text(snapshot.val().destination);
        frequencyDisplay.text(snapshot.val().frequency);
        nextArrivalDisplay.text(snapshot.val().firstTrainTime);

        
    });


})