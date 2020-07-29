import "./style.css";
import { isValid, createModal } from "./utils";
import { Question } from "./question";
import { getAuthForm, authWithEmailAndPassword } from "./auth";

const form = document.getElementById("form");
const input = form.querySelector("#questions-input");
const submitBtn = form.querySelector("#submit-btn");
const modalBtn = document.getElementById("modal-btn");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
modalBtn.addEventListener("click", openModal);
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

function openModal() {
  createModal("Авторизация", getAuthForm());
  document
    .getElementById("auth")
    .addEventListener("submit", authFormHandler, { once: false });
}

function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector("#auth-submit-btn");
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => {
      btn.disabled = false;
    });
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Ошибка!", content);
  } else {
    createModal("Список вопросов", Question.listToHTML(content));
  }
}
