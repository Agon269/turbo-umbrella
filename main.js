let quiz = [
  {
    id: 1,
    type: "short_answer",
    question: "Why is the sky blue?",
    answers: [],
    correct_answer: 0,
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Why is the sky blue?",
    answers: [
      { id: 1, answer: "Because of physics" },
      { id: 2, answer: "Because that the way it always was" },
      { id: 3, answer: "I don't know" },
    ],
    correct_answer: 1,
  },
  {
    id: 3,
    type: "multiple_selection_choice",
    question: "Why is the sky blue?",
    answers: [
      { id: 1, answer: "Because of physics" },
      { id: 2, answer: "Because that the way it always was" },
      { id: 3, answer: "I don't know" },
    ],
    correct_answer: 1,
  },
  {
    id: 4,
    type: "long_text",
    question: "Why is the sky blue?",
    answers: [],
    correct_answer: 0,
  },
  {
    id: 5,
    type: "description",
    question: "random text to show to the user",
    answers: [],
    correct_answer: 0,
  },
  {
    id: 6,
    type: "true_false",
    question: "Is the sky blue",
    answers: [],
    correct_answer: 2,
  },
];

let nextButton = document.getElementById("next");
let title = document.getElementById("title");
let selectionList = document.getElementById("selectionList");
let bool = document.getElementById("bool");
let inp = document.getElementById("short");
let text = document.getElementById("long");
let yourAnswers = document.getElementById("yourAnswers");
let questionsDiv = document.getElementById("questionsDiv");
let i = 0;

let answers = {};

//step
nextButton.onclick = function () {
  //get the answers
  if (quiz[i].type == "short_answer") {
    let x = document.getElementsByClassName("current")[0];
    let currentAnswer = x.value;
    let question = quiz[i].question;
    let answer = { [question]: currentAnswer };
    answers = { ...answers, [quiz[i].id]: { ...answer } };
    x.classList.toggle("hidden");
    x.classList.remove("current");
  } else if (
    quiz[i].type == "multiple_choice" ||
    quiz[i].type == "multiple_selection_choice"
  ) {
    let x = document.querySelector(`input[name="question${i}_choice"]`);
    let currentAnswer = x.value;
    let question = quiz[i].question;
    let answer = { [question]: currentAnswer };
    answers = { ...answers, [quiz[i].id]: { ...answer } };
    x.classList.toggle("hidden");
  } else if (quiz[i].type == "long_text" || quiz[i].type == "description") {
    let x = document.getElementsByClassName("current")[0];
    let currentAnswer = x.value;
    let question = quiz[i].question;
    let answer = { [question]: currentAnswer };
    answers = { ...answers, [quiz[i].id]: { ...answer } };
    x.classList.toggle("hidden");
    x.classList.remove("current");
  } else if (quiz[i].type == "true_false") {
    let x = document.querySelector("input[name=bool]");
    let currentAnswer = x.value;
    let question = quiz[i].question;
    let answer = { [question]: currentAnswer };
    answers = { ...answers, [quiz[i].id]: { ...answer } };
    x.classList.toggle("hidden");
  }
  console.log(i);
  ++i;
  if (i > quiz.length - 1) {
    //display answer
    questionsDiv.classList.toggle("hidden");
    yourAnswers.classList.toggle("hidden");
    const myJSON = JSON.stringify(answers, null, "\t");
    document.getElementById("answerObject").innerHTML = myJSON;
    return;
  }
  populateQuestion(i);
};

//generate question
function populateQuestion(qNum) {
  let individualQuestion = quiz[qNum];
  title.innerText = individualQuestion.question;

  //condition to check type of question

  if (individualQuestion.type == "short_answer") {
    selectionList.innerHTML = "";
    short.classList.toggle("hidden");
    short.classList.add("current");
    short.placeholder = "your reason here";
  } else if (
    individualQuestion.type == "multiple_choice" ||
    individualQuestion.type == "multiple_selection_choice"
  ) {
    selectionList.innerHTML = ""; //reset choices list
    for (j in individualQuestion.answers) {
      let radioBtnName = "question" + qNum + "_choice";
      let choiceText = individualQuestion.answers[j].answer;
      selectionList.appendChild(createLi(radioBtnName, choiceText));
    }
  } else if (
    individualQuestion.type == "long_text" ||
    individualQuestion.type == "description"
  ) {
    selectionList.innerHTML = "";
    long.classList.toggle("hidden");
    long.classList.add("current");
    long.placeholder = "your reason here";
  } else if (individualQuestion.type == "true_false") {
    selectionList.innerHTML = "";
    bool.appendChild(createLi("bool", "True"));
    bool.appendChild(createLi("bool", "True"));
  }
}

//multiple choice
function createLi(name, choiceText) {
  let e = document.createElement("li");
  let radioHtml =
    '<input value="' + choiceText + '" type="radio" name="' + name + '"';
  radioHtml += "/>";
  radioHtml += choiceText;
  e.innerHTML = radioHtml;
  return e;
}

//call function at the beginning
populateQuestion(i);
