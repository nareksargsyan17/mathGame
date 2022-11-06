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
    page1: document.createElement("div"),
    elementsOptions() {
        this.form.id = "form";
        this.question.id = "questionWindow";
        this.answer.id = "answerWindow";
        this.input.type = "number";
        this.input.placeholder = "0";
        this.button.textContent = "Check";
        this.title.textContent = "JavaScript - Math Game";
        this.result.id = "result";
        this.userCount.id = "userCount";
        this.counterTitle.textContent = "Your points";
        this.counter.id = "counter";
        this.counter.textContent = "1";
        this.correctAnswer.id = "correctAnswer";
        this.correctAnswer1.id = "correctAnswer1";
        this.correctAnswer1.textContent = "-1";
        this.correctAnswer.textContent = "+1";
        this.page1.id = "page1"
    },

    toBuild() {
        document.body.prepend(this.page1);
        root.append(this.title, this.answer);
        this.answer.append(this.result, this.question, this.form);
        this.form.append(this.input, this.button);
        this.result.append(this.userCount);
        this.userCount.append(this.counterTitle, this.counter, this.correctAnswer1, this.correctAnswer);
    },
    forPage1() {
        this.page1.innerHTML = `
        <span>Select the level</span>
        <form>
            <label for="simple">
                <input type="radio" name="fav_language" id="simple" value="simple">
                Simple
            </label><br>
            <label for="medium">
                <input type="radio" name="fav_language" id="medium" value="medium">
                Medium
            </label><br>
            <label for="hard">
                <input type="radio" name="fav_language" id="hard" value="hard">
                Hard
            </label><br>
        </form>
        `
    },
    ending() {
        document.body.insertAdjacentHTML("afterbegin", `
        <div id="end">
        <p>Your Points!!</p>
        <p>50</p>
    </div>` )
    },
    start() {
        this.forPage1()
        this.elementsOptions();
        this.toBuild();
        this.ending()
    }
};

UI.start();
const form = document.querySelector("#page1 > form");
const start = document.querySelector("#start");
const exit = document.querySelector("#exit");
const end = document.querySelector("#end");
let level;
let timer;
start.addEventListener("click", () => {
    start.nextElementSibling.style.display = "inline-block";
    start.style.display = "none";
    UI.page1.style.display = "none";
    root.style.display = "block";
    if (form[2].checked) {
        level = 30;
        timer = 9000;
    }
    else if (form[1].checked) {
        level = 20;
        timer = 9500;
    } else {
        level = 10;
        timer = 10000;
    }
    startMath(level, timer)
})
let trues = 1;
let count = 0;
let sum;
let time;
function startMath(level, timer) {
    clearTimeout(time)
    UI.counter.textContent = `${trues}`;
    if (count < 10) {
        count++;
        let num1 = Math.floor(Math.random() * level) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        UI.question.textContent = `${num1} x ${num2}`;
        time = setTimeout(() => {
            trues--;
            setTimeout(() => {
                UI.correctAnswer1.style.opacity = "1";
                setTimeout(() => {
                    UI.correctAnswer1.style.opacity = "0";
                }, 1000);
            }, 100);
            startMath(level, timer);
        }, timer);
        return sum = num1 * num2;
    } else {
        root.style.display = "none";
        exit.style.display = "none";
        end.style.display = "block";
        end.lastElementChild.textContent = trues;
        count = 0;
        trues = 1;
        window.addEventListener("click", (e) => {
            if (e.target == document.body && count == 0) {
                end.style.display = "none";
                UI.page1.style.display = "block";
                start.style.display = "inline-block";
            }
        })
        clearTimeout(time)
    }
}

UI.form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (UI.form.firstElementChild.value == sum) {
        trues++;
        UI.correctAnswer.style.transform = "translateY(0px)";
        setTimeout(() => {
            UI.correctAnswer.style.opacity = "1";
            setTimeout(() => {
                UI.correctAnswer.style.transform = "translateY(20px)";
                UI.correctAnswer.style.opacity = "0";
            }, 1000);
        }, 100);
    } else {
        trues--;
        UI.correctAnswer1.style.transform = "translateY(0px)";
        setTimeout(() => {
            UI.correctAnswer1.style.opacity = "1";
            setTimeout(() => {
                UI.correctAnswer1.style.transform = "translateY(-20px)";
                UI.correctAnswer1.style.opacity = "0";
            }, 1000);
        }, 100);
    }
    clearTimeout(time);
    startMath(level, timer);
    e.target.reset();
});
exit.addEventListener("click", () => {
    start.style.display = "inline-block";
    exit.style.display = "none";
    form.parentElement.style.display = "block";
    root.style.display = "none";
    clearTimeout(time);
})
