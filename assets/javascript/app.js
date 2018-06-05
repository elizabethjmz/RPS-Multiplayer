/**************** GLOBAL VARIABLES ****************/
    var num_of_users = 2;
    var users = [];
    var userId=0;
    var options = ["../RPS-Multiplayer/assets/images/Paper.png"
    , "../RPS-Multiplayer/assets/images/Rock.png"
    , "../RPS-Multiplayer/assets/images/Scissors.png"];
    var option_val= ["paper", "rock", "scissors"];
    var show = $(".images"); 
    wins1=0;
    wins2=0;
    loss1=0;
    loss2=0;

     // Initialize Firebase
     var config = {
        apiKey: "AIzaSyBK6HOcxnnvmJ7Y4BjatyqH1fcOKYlBMoQ",
        authDomain: "rock-paper-scissors-595c1.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-595c1.firebaseio.com",
        projectId: "rock-paper-scissors-595c1",
        storageBucket: "rock-paper-scissors-595c1.appspot.com",
        messagingSenderId: "295132163732"
     };
     
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

/******************* FUNCTIONS *******************/

    //Function to display icons for players
    var showIcons = function(playerName){
        show.empty();
        console.log("pictures are displayed");
        for (var i=0; i< options.length; i++) {
            var imgTags= $("<img>");
            imgTags.addClass("pic-image");
            imgTags.attr("src" , options[i]);
            imgTags.attr("value", option_val[i]);
            imgTags.attr("height" , "50px");
            imgTags.attr("width" , "50px");
            imgTags.css({"margin-left" : "20px", "margin-right" : "20px"});
            show.append(imgTags);
            console.log(show.append(imgTags));
        }
    }

    var checkValues = function(option1, option2){

        /*
        if (option1=='rock'&& option2=='rock') || (option1=='paper'&& option2=='paper') || (option1=='scissors'&& option2=='scissors')
        {

        }
        */

    }

    //Function to save user info into firebase

    function writeUserData(userId,name) {
        database.ref('users/').push({
          username: name,
          UserID: userId
        });
    }

/********************* CALLS *********************/

   
    //Load game once user clicks on Start button
    $("#start").on("click", function(event) {
        event.preventDefault();
        //Storing username to firebase
        var inputName = $("#name").val().trim();
        //users = inputName;
        users.push(inputName);
        userId+=1;
        console.log("Users:" + users);

        database.ref().on("value", function(snapshot) {

            if (snapshot.child("userId").exists() && snapshot.child("username").exists()) {
                alert("Here creates the users in db");
            }
          
          }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          });


        writeUserData(inputName);
        showIcons();
    });
    