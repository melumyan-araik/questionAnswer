import "./style.css";
import { isValid } from "./utils";
import { Question } from "./question";

const form = document.getElementById("form");
const input = form.querySelector("#questions-input");
const submitBtn = form.querySelector("#submit-btn");

form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;
    // request to server to save questions
    Question.create(question).then(() => {
      input.value = "";
      input.className = "";
      input.disabled = false;
    });
  }
}
