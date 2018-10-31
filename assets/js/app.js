
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAG4gzw5iKGXC27phNqs2e2kbY6h5PxDvg",
    authDomain: "ucb-joshm-test.firebaseapp.com",
    databaseURL: "https://ucb-joshm-test.firebaseio.com",
    projectId: "ucb-joshm-test",
    storageBucket: "ucb-joshm-test.appspot.com",
    messagingSenderId: "873174398034"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var destination = $("#role-input").val().trim();
  var firstTrain = $("#start-input").val().trim();
  var frequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train Schedule Successfully Added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNameResult = childSnapshot.val().trainName;
  var destinationResult = childSnapshot.val().destination;
  var frequencyResult = childSnapshot.val().frequency;
  var firstTrainTime = childSnapshot.val().firstTrain;

  // Employee Info
  

// Calculation for Next Arrival and Minutes Away

var startTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(startTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequencyResult;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequencyResult - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainNameResult),
    $("<td>").text(destinationResult),
    $("<td>").text(frequencyResult),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
 
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
