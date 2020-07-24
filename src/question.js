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
        console.log(response);
      });
  }
}
