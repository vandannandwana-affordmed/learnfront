function increment() {
    currentCount.textContent++;
}

function decrement() {
    if (currentCount.textContent == 0) {
        return;
    }
    currentCount.textContent--;
}

function reset() {
    currentCount.textContent = 0;
}

incrementButton = document.getElementById("increment");
decrementButton = document.getElementById("decrement");
resetButton = document.getElementById("reset");
currentCount = document.getElementById("count");

incrementButton.addEventListener("click", increment);
decrementButton.addEventListener("click", decrement);
resetButton.addEventListener("click", reset);

