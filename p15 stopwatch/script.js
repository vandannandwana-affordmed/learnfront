class Stopwatch {
  constructor(displayElement) {
    this.display = displayElement;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.intervalId = null;
  }

  start() {
    if (this.intervalId) return;

    this.startTime = Date.now() - this.elapsedTime;
    this.intervalId = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.render();
    }, 10);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.render();
  }

  formatTime(ms) {
    const milliseconds = ms % 1000;
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${String(hours).padStart(2, "0")} : 
            ${String(minutes).padStart(2, "0")} : 
            ${String(seconds).padStart(2, "0")} : 
            ${String(milliseconds).padStart(3, "0")}`;
  }

  render() {
    this.display.textContent = this.formatTime(this.elapsedTime);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const resetBtn = document.getElementById("resetBtn");

  const stopwatch = new Stopwatch(display);

  startBtn.addEventListener("click", () => stopwatch.start());
  stopBtn.addEventListener("click", () => stopwatch.stop());
  resetBtn.addEventListener("click", () => stopwatch.reset());
});
