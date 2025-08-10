const text = document.querySelector('.text');
const totalTime = 19000; // 4 + 7 + 8 seconds = 19s
const breatheTime = 4000;
const holdTime = 7000;
const exhaleTime = 8000;


function relaxCycle() {
  text.innerText = 'Breathe In...';
  
  setTimeout(() => {
    text.innerText = 'Hold...';

    setTimeout(() => {
      text.innerText = 'Breathe Out...';
    }, holdTime);
  }, breatheTime);
}

relaxCycle();
setInterval(relaxCycle, totalTime);
