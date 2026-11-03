let timer;
let timeLeft = 25 * 60; // Default 25 menit
let isRunning = false;
let sessionCount = 0;
let currentMode = 'work';

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const workBtn = document.getElementById('work-btn');
const breakBtn = document.getElementById('break-btn');
const sessionInfo = document.getElementById('session-info');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'BEGIN';
  } else {
    isRunning = true;
    startBtn.textContent = 'PAUSE';
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert(currentMode === 'work' ? 'Waktu kerja selesai! Istirahat sejenak.' : 'Istirahat selesai! Kembali fokus.');
        if (currentMode === 'work') {
          sessionCount++;
          sessionInfo.textContent = `${sessionCount}/4 SESSIONS`;
        }
        startBtn.textContent = 'BEGIN';
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = 'BEGIN';
  timeLeft = currentMode === 'work' ? 25 * 60 : 5 * 60;
  updateDisplay();
}

function setMode(mode) {
  currentMode = mode;
  if (mode === 'work') {
    workBtn.classList.add('active');
    breakBtn.classList.remove('active');
    timeLeft = 25 * 60;
  } else {
    breakBtn.classList.add('active');
    workBtn.classList.remove('active');
    timeLeft = 5 * 60;
  }
  resetTimer();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
workBtn.addEventListener('click', () => setMode('work'));
breakBtn.addEventListener('click', () => setMode('break'));

updateDisplay();