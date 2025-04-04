const questions=[
    {
        question:'Which country is known as the "Land of the Rising Sun"?',
        answer:[
            {text:"a. China", correct:false},
            {text:"b. Japan", correct:true},
            {text:"c. South Korea", correct:false},
            {text:"d. Thailand", correct:false},
        ]
    },
    {
        question:'Who was the first President of the United States?',
        answer:[
            {text:"a. Abraham Lincoln", correct:false},
            {text:"b. George Washington", correct:true},
            {text:"c. Thomas Jefferson", correct:false},
            {text:"d. John Adams", correct:false},
        ]
    },
    {
        question:'What is the capital city of Canada?',
        answer:[
            {text:"a. Toronto", correct:true},
            {text:"b. Vancouver", correct:false},
            {text:"c. Montreal", correct:false},
            {text:"d. Ottawa", correct:false},
        ]
    },
    {
        question:'Which element has the chemical symbol "O"?',
        answer:[
            {text:"a. Oxygen", correct:true},
            {text:"b. Osmium", correct:false},
            {text:"c. Ozone", correct:false},
            {text:"d. Omnium", correct:false},
        ]
    },
    {
        question:'In which year did World War II end?',
        answer:[
            {text:"a. 1939", correct:false},
            {text:"b. 1940", correct:false},
            {text:"c. 1945", correct:true},
            {text:"d. 1950", correct:false},
        ]
    },
    {
        question:'What is the largest continent by area?',
        answer:[
            {text:"a. Africa", correct:true},
            {text:"b. Asia", correct:false},
            {text:"c. Europe", correct:false},
            {text:"d. North America", correct:false},
        ]
    },
    {
        question:'Who is the author of the book "1984"?',
        answer:[
            {text:"a. Aldous Huxley", correct:false},
            {text:"b. George Orwell", correct:true},
            {text:"c. Ernest Hemingway", correct:false},
            {text:"d. F. Scott Fitzgerald", correct:false},
        ]
    },
    {
        question:'Which of the following is the currency of the United Kingdom?',
        answer:[
            {text:"a. Euro", correct:false},
            {text:"b. Pound Sterling", correct:true},
            {text:"c. Dollar", correct:false},
            {text:"d. Franc", correct:false},
        ]
    },
    {
        question:'Which of the following countries is landlocked?',
        answer:[
            {text:"a. Brazil", correct:false},
            {text:"b. Australia", correct:false},
            {text:"c. Nepal", correct:true},
            {text:"d. Argentina", correct:false},
        ]
    },
    {
        question:'Who was the first woman to win a Nobel Prize?',
        answer:[
            {text:"a. Marie Curie", correct:true},
            {text:"b. Florence Nightingale", correct:false},
            {text:"c. Rosa Parks", correct:false},
            {text:"d. Mother Teresa", correct:false},
        ]
    },
];

const question=document.getElementById("question");
const answerButton=document.getElementById("ans_btn");
const nextButton=document.getElementById("next_btn");

let currentQuestionIndex=0;
let score=0;

function quizStart(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    question.innerHTML=questionNo + ". " + currentQuestion.question; //Display Question

    currentQuestion.answer.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);  //Display Options

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event){
    const selectBtn=event.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    });
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    question.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        quizStart();
    }
})

quizStart();