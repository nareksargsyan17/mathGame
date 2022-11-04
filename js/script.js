"use strict";


const root = document.querySelector("#root");


const UI = {
    correctAnswer1: document.createElement("div"),
    correctAnswer: document.createElement("div"),
    result: document.createElement("div"),
    userCount: document.createElement("div"),
    counter: document.createElement("div"),
    counterTitle: document.createElement("div"),
    form: document.createElement("form"),
    question: document.createElement("div"),
    answer: document.createElement("div"),
    input: document.createElement("input"),
    button: document.createElement("button"),
    title: document.createElement("p"),

    elementsOptions() {
        this.form.id = "form";
        this.question.id = "questionWindow";
        this.answer.id = "answerWindow";
        this.input.type = "number";
        this.input.placeholder = "Type here your answer...";
        this.button.textContent = "Check";
        this.title.textContent = "JavaScript - Math Game";
        this.result.id = "result";
        this.userCount.id = "userCount";
        this.counterTitle.textContent = "Your points";
        this.counter.id = "counter"
        this.counter.textContent = "1";
        this.correctAnswer.id = "correctAnswer";
        this.correctAnswer1.id = "correctAnswer1";
        this.correctAnswer1.textContent = "-1"
        this.correctAnswer.textContent = "+1" // || Wrong!
    },

    toBuild() {
        root.append(this.title, this.answer);
        this.answer.append(this.result, this.question, this.form);
        this.form.append(this.input, this.button);
        this.result.append(this.userCount);
        this.userCount.append(this.counterTitle, this.counter, this.correctAnswer1, this.correctAnswer);
    },

    start() {
        this.elementsOptions();
        this.toBuild();
    }
};

UI.start();
let trues = 1;
let count = 0;
let sum;
let time;
function randomNum(level, timer) {
    UI.counter.textContent = `${trues}`;
    if (count < 10) {
        count++;
        let num1 = Math.floor(Math.random() * level) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        UI.question.textContent = `${num1} x ${num2}`
        console.log(num1 * num2);
        time = setTimeout(() => {
            trues--;
            setTimeout(() => {
                UI.correctAnswer1.style.opacity = "1";
                setTimeout(() => {
                    UI.correctAnswer1.style.opacity = "0";
                }, 1000)
            }, 100)
            randomNum(level, timer)
        }, timer)
        return sum = num1 * num2;
    } else {
        alert(trues, count);
    }
}
randomNum(20, 10000);
UI.form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(UI.form.firstElementChild.value, sum);
    if (UI.form.firstElementChild.value == sum) {
        trues++;
        console.log(UI.form.firstElementChild.value);
        UI.correctAnswer.style.transform = "translateY(0px)";
        setTimeout(() => {
            UI.correctAnswer.style.opacity = "1";
            setTimeout(() => {
                UI.correctAnswer.style.transform = "translateY(20px)";
                UI.correctAnswer.style.opacity = "0";
            }, 1000)
        }, 100)
    } else {
        trues--;
        UI.correctAnswer1.style.transform = "translateY(0px)";
        setTimeout(() => {
            UI.correctAnswer1.style.opacity = "1";
            setTimeout(() => {
                UI.correctAnswer1.style.transform = "translateY(-20px)";
                UI.correctAnswer1.style.opacity = "0";
            }, 1000)
        }, 100)
    }
    clearTimeout(time)
    randomNum(20, 10000);
    e.target.reset()
})