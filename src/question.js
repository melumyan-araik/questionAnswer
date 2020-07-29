export class Question {
  static create(question) {
    return fetch("https://questions-answer-app.firebaseio.com/questions.json", {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Tepe": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorege)
      .then(Question.renderList);
  }

  static renderList() {
    let question = getQuestionsFromLocalStorege();
    if (question.length) {
      // question = Question.getList();
      // console.log(question);
      // addToLocalStorege(question);
    }

    const html = question.length
      ? question.map(toCard).join("")
      : ` <div class="mui--text-headline">Вы пока ничего не спрашивали</div>`;

    const list = document.getElementById("list");

    list.innerHTML = html;
  }

  static async getList() {
    const questionsObj = await fetch(
      "https://questions-answer-app.firebaseio.com/questions.json",
      {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());

    const questionsArray = [];
    for (let key in questionsObj) {
      questionsArray.push({ ...questionsObj[key], id: key });
    }
    return questionsArray;
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">У вас нет токена</p>');
    }
    return fetch(
      `https://questions-answer-app.firebaseio.com/questions.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }

        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            }))
          : [];
      });
  }

  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map((q) => `<li>${q.text}</li>`).join("")}</ol>`
      : `<p>Вопросов пока нет</p>`;
  }
}

function addToLocalStorege(question) {
  const all = getQuestionsFromLocalStorege();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}

function getQuestionsFromLocalStorege() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function toCard(question) {
  return `
        <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>
        ${question.text}
        </div>
        <br> 
    `;
}
