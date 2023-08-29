// on cree la classe contenant les differantes variables

class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  // function qui determinera si l'utilisateur a bien repondu
  isCorrectAnswer(choice) {
    // si le choix correspond a la bonne methode
    return choice === this.answer;
  }
}

// la classe question
const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

// la classe quiz
class Quiz {
  // toutes les questions seront prisent en constructeur
  constructor(questions) {
    this.score = 0;
    this.questions = questions;

    // a quel index de la qestion on est ?
    this.currentQuestionIndex = 0;
  }
  //methode pour savoir sur quel question on est
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  // l'operation se termine quant l'index de la question a atteind la taille du tableau
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// affichage du quiz
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);

    element.innerHTML = text;
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },

  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    //Affichage choix + prise en compte du choix
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quiz.currentQuestionIndex + 1} sur ${quiz.questions.length}`
    );
  },
  endQuiz: function () {
    let endQuizHTML = `
    <h1> Quizz termine !  </h1>
    <h3> Votre score est de : ${quiz.score} /  ${quiz.questions.length} </h3>`;
    this.elementShown("quiz", endQuizHTML);
  },
};

// logic du jeu
quizApp = () => {
  if (quiz.hasEnded()) {
    // ecran de fin
    display.endQuiz();
  } else {
    // afficher questions, choix, progression
    display.question();
    display.choices();
    display.progress();
  }
};

// creer un nouveau  quiz
//instentier un nouvel objet
let quiz = new Quiz(questions);

quizApp();
