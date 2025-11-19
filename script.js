// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");
const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = [];
for(let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00aaff';
  ctx.font = fontSize + 'px Poppins';
  for(let i = 0; i < drops.length; i++) {
    const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

// Resize handler
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const newColumns = canvas.width / fontSize;
  drops.length = 0;
  for(let x = 0; x < newColumns; x++) {
    drops[x] = 1;
  }
});

// Terminal typing effect
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect and music on load
window.addEventListener('load', () => {
  const titleElement = document.querySelector('.title');
  const originalText = titleElement.textContent;
  typeWriter(titleElement, originalText, 100);

  // 🎶 Music Autoplay Fix - محاولة تشغيل الصوت
  const music = document.getElementById('background-music');
  if (music) {
    music.volume = 0.5; // تعيين مستوى الصوت
    music.play().catch(error => {
      // إذا تم حظر التشغيل التلقائي، حاول مرة أخرى عند أول تفاعل للمستخدم
      const attemptPlay = () => {
        music.play().catch(() => { /* تم التشغيل بنجاح */ });
      };
      // أضف مستمعًا لحدث النقر والضغط على المفاتيح (أول تفاعل)
      document.addEventListener('click', attemptPlay, { once: true });
      document.addEventListener('keydown', attemptPlay, { once: true });
    });
  }
});

// Add click sound effect (optional)
document.querySelectorAll('.link-button').forEach(button => {
  button.addEventListener('click', () => {
    // You can add sound effects here if needed
    button.style.transform = 'translateY(-2px) scale(0.98)';
    setTimeout(() => {
      button.style.transform = 'translateY(-2px)';
    }, 100);
  });
});

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg activated
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 3000);
    konamiCode = [];
  }
});
