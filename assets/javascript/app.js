var triviaQuestions = [{
    question: "To what crime family did Niima Outpost's namesake belong?",
    answerList: ["Pizza Huts", "The Sopranos", "The Hutts", "Gambino family"],
    answer: 2
},{
    question: "What did Mother Talzin use to create new legs for Maul?",
    answerList: ["plastic straws", "pieces of destroyed battle droids", "aluminum cans", "glowing crystals"],
    answer: 1
},{
    question: "What Imperial Star Destroyer intercepted Princess Leia’s ship above Tatooine in Star Wars- A New Hope?",
    answerList: ["The Devastator", "The Terminator", "The Kilngons", "Space 1999"],
    answer: 0
},{
    question: "What bounty hunter employed a bowcaster as his weapon of choice?",
    answerList: ["King Henry", "Sleeping Beauty", "Embo", "Count Dooku"],
    answer: 2
},{
    question: "Anakin Skywalker piloted a Y-wing into battle against what massive Separatist warship?",
    answerList: ["The 3 little pigs", "The flying monkeys", "The Malevolence", "The Klingons"],
    answer: 2
},{
    question: "Anakin Skywalker attacked the Malevolence with what Y-wing squadron?",
    answerList: ["Shadow Squadron", "Power Puff squadron", "Emperor Palpatine", "Prince Charles fleet"],
    answer: 0
},{
    question: "On what planet did Cad Banecapture Bolla Ropal",
    answerList: ["Saturn", "Devaron", "Banuu asteroid", "Jupiter"],
    answer: 1
},{
    question: "What ship transported Obi-Wan and Satine Kryze on their journey to Coruscant?",
    answerList: ["Itokawa", "The Challenger", "The Coronet", "AirForce One"],
    answer: 2
},{
    question: "What Jedi Younglings class are seen training with lightsabers in Attack of the Clones?",
    answerList: ["The Clown Clan", "The Bear Clan", "The Flying Monkey Clan", "The Kennedy Clan"],
    answer: 1
},{
    question: "In what Mandalore city did Maul face off against Darth Sidious?",
    answerList: ["Evanston", "Chicago", "Singapore", "Sundari"],
    answer: 3
},{
    question: "Who was the only Rebel to harpoon an AT-AT during the Battle of Hoth?",
    answerList: ["Batman", "RoboCop", "Wes Janson", "Tom Hanks"],
    answer: 2
},{
    question: "What was the name of Admiral Akbar’s command ship in the Battle of Endor?",
    answerList: ["Home Alone", "Home One", "Home Depot", "Home Sense"],
    answer: 1
},{
    question: "What are the primary X-wing squadrons maintained at the Resistance base on D’Qar?",

    answerList: ["Purple Squadrons", "Black and Gold Squadrons", "Gold Squadrons", "Red and BLue"],
    answer: 3
},{
    question: "How many proton torpedoes does a T-65 X-wing starfighter carry?",
    answerList: ["six", "twelve", "zero", "one hundred"],
    answer: 0
},{
    question: "What did Princess Leia tell Luke Skywalker when he saw her being escorted by stormtroopers in Cloud City?",
    
    answerList: ["Where's the beef!", "Hasta la Vista, baby", "It's a Trap!", "Live long and prosper!"],
    answer: 2
}];


var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Yes, the Force is with you!",
    incorrect: "No, I suggest a new strategy, try again!",
    endTime: "Out of time! Use the Force...",
    finished: "Well, Let's see if the force flows within you"
}


$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});


$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});


function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}


function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;
    
    //sets up new questions & answerList
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click',function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}


function countdown(){
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}


function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}


function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();


    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
    //checks to see correct, incorrect, or unanswered
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else{
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }
    
    if(currentQuestion == (triviaQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }	
}


function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();


    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}
