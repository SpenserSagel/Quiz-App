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
function randomAnswer(i) {}

function createQuestion(i){

  return `
    <p>${QUESTIONS[i].question}</p>
    <form>
      <fieldset>
        <label class="answers">
          <input type="radio" name="answers" value=${QUESTIONS[i].rightAns} required>
          <span>${QUESTIONS[i].rightAns}</span>
        </label>
        <label class="answers">
          <input type="radio" name="answers" value=${QUESTIONS[i].ans2} required>
          <span>${QUESTIONS[i].ans2}</span>
        </label>
        <label class="answers">
          <input type="radio" name="answers" value=${QUESTIONS[i].ans3} required>
          <span>${QUESTIONS[i].ans3}</span>
        </label>
        <label class="answers">
          <input type="radio" name="answers" value=${QUESTIONS[i].ans4} required>
          <span>${QUESTIONS[i].ans4}</span>
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
    <button class="nextQuestion">next question</button>`;
}

function createWrongAnswer(){
  return `<p>That was the wrong answer.  The right answer was ${QUESTIONS[i].rightAns}</p>
    <button class="nextQuestion">next question</button>`;
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