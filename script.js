let questions = [
    {
    "question": "Wer hat HTML erfunden?",
    "answer_1": "Robbie Williams",
    "answer_2": "Lady Gaga",
    "answer_3": "Tim Berners-Lee",
    "answer_4": "Justin Bieber",
    "right_answer": 3
},

{
    "question": "Wer hat JavaScript erfunden?",
    "answer_1": "Dagobert Duck",
    "answer_2": "Mark Zuckerberg",
    "answer_3": "Brendan Erich",
    "answer_4": "Micky Maus",
    "right_answer": 3
},

{
    "question": "Welche Firma hat JavaScript ins Leben gerufen?",
    "answer_1": "Sony",
    "answer_2": "Netscape",
    "answer_3": "Facebook",
    "answer_4": "Disney",
    "right_answer": 2
},

{
    "question": "Was ist JavaScript?",
    "answer_1": "Eine Programmiersprache",
    "answer_2": "Eine Boyband",
    "answer_3": "Ein Feuer Pokemon",
    "answer_4": "Ein Schauspieler",
    "right_answer": 1
},

{
    "question": "Welche Antwortmöglichkeit ist ein JavaScript Framework?",
    "answer_1": "Glumanda JS",
    "answer_2": "Pikachu JS",
    "answer_3": "Tauboga JS",
    "answer_4": "Angular JS",
    "right_answer": 4
},
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {
    if(gameIsOver()) {
        showEndScreen();

    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
document.getElementById('endScreen').style = '';
document.getElementById('questionBody').style = 'display: none';

document.getElementById('amount-of-questions').innerHTML = questions.length;
document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
document.getElementById('header-image').src = 'img/Pokal.png';
}

function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idofRightAnswer = `answer_${question['right_answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber)) { // Richtige Frage beantwortet
        console.log('Richtige Antwort!!!');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else{
        console.log('Falsche Antwort!!!');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idofRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }

    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber){
  return selectedQuestionNumber == questions[currentQuestion]['right_answer'];
}

function nextQuestion(){
    currentQuestion++; //z.B. von 0 auf 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame(){
    document.getElementById('header-image').src = 'img/pencil.jpg';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
    document.getElementById('questionBody').style = ''; //questionbody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none'; //Endscreen ausblenden
}