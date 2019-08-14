let i = 0;
let score = 0;

function pushStart(){
  $(".startSection").on("click", ".startButton", event => {
    $(".startSection").addClass("hidden");
    $(".question").removeClass("hidden");
    updateScore();
  });
}

//TODO: randomize answer order
//returns an array of answers in random order
function randomAnswer(i) {
  let answers = [];
  let isFilled = [false,false,false,false];
  let j = 0;
  while(j<4){
    let rand = Math.floor(Math.random()*4);
    if(!(isFilled[rand])){
      if(rand==0){
        answers.push(QUESTIONS[i].rightAns);
      }
      else if(rand==1){
        answers.push(QUESTIONS[i].ans2);
      }
      else if(rand==2){
        answers.push(QUESTIONS[i].ans3);
      }
      else if(rand==3){
        answers.push(QUESTIONS[i].ans4);
      }
      isFilled[rand]=true;
      j++;
    }
  }
  return answers;
}

function createQuestion(i){
  answers = randomAnswer(i);
  return `
    <p>${QUESTIONS[i].question}</p>
    <form>
      <fieldset>
        <label class="answers">
          <input type="radio" name="answers" value='${answers[0]}' required>
          <span>${answers[0]}</span>
        </label>
        <label class="answers">
          <input type="radio" name="answers" value='${answers[1]}' required>
          <span>${answers[1]}</span>
        </label>
        <label class="answers">
          <input type="radio" name="answers" value='${answers[2]}' required>
          <span>${answers[2]}</span>
        </label>
        <label class="answers">
          <input type="radio" name="answers" value='${answers[3]}' required>
          <span>${answers[3]}</span>
        </label>
        <button type="submit" class = "answerButton">submit</button>
      </fieldset>
    </form>`;
}

function isRight(ans){
  if(ans==QUESTIONS[i].rightAns){return true;}
  else return false;
}

function createRightAnswer(){
  return `
    <p>You got the answer</p>
    <button class="nextQuestion">next question</button>
    <img class="rightImg" src="https://naibuzz.com/wp-content/uploads/2016/10/Rhett-and-Link-Good-Mythical-Morning.jpg" alt="You Right!" />`;
}

function createWrongAnswer(){
  return `<p>That was the wrong answer.  The right answer was ${QUESTIONS[i].rightAns}</p>
    <button class="nextQuestion">next question</button>
    <img class="wrongImg" src="https://newmediarockstars.com/wp-content/uploads/2015/07/Screen-Shot-2015-07-17-at-1.12.52-PM.png" alt="You Wrong!" />`;
}

function updateScore(){
  console.log("update ran");
  $(".score").text('score:' + score + '/10');
  $(".count").text('question:' + (i+1));
}

function createEnd(){
  return `<p>This is the end</p>
    <button class="startOver">start over?</button>`;
}

function renderQuestion(i){
  console.log("renderQ called");
  $(".question").html(createQuestion(i));

}

function renderAnswer(ans){
  console.log("renderans called");
  if(isRight(ans)){
    score++;
    $(".question").html(createRightAnswer());
  }
  else{
    $(".question").html(createWrongAnswer());
  }
}

function checkRadios(){       
  console.log("checkRADS");
  let radios = $("input[name='answers']");
    checked = radios.filter(":checked");
    return checked.val();

}

function runQuestions(){
    renderQuestion(i);
    $(".question").on("submit", event =>{
      event.preventDefault();
      answer = checkRadios();
      renderAnswer(answer);
    i++;
    });
    $(".question").on("click",".nextQuestion", event =>{
      updateScore();
      if(i<10){
        console.log(i, " question count");
        renderQuestion(i);
      }
      else{endQuiz();}
    });
}

function endQuiz(){
  $(".question").html(createEnd());
  $(".question").on("click",".startOver", event =>{
    i=score=0;
    $(".startSection").removeClass("hidden");
    $(".question").addClass("hidden");
    renderQuestion(i);
  });
}

function runQuiz(){
  pushStart();
  runQuestions();
}


$(runQuiz);