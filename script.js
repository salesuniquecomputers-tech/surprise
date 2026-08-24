const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const finalMessage = document.getElementById("finalMessage");
const particlesBox = document.getElementById("particles");

let isOpen = false;


/* =====================================
   OPEN / CLOSE
===================================== */

openBtn.addEventListener("click", function () {

  isOpen = !isOpen;

  if (isOpen) {

    envelope.classList.add("open");

    openBtn.innerHTML =
      "💖 Close Letter";

    finalMessage.classList.add("show");

    createParticles(45);

    playChime();

  } else {

    envelope.classList.remove("open");

    openBtn.innerHTML =
      "💌 Open Letter";

    finalMessage.classList.remove("show");
  }

});


/* =====================================
   GOLDEN PARTICLES
===================================== */

function createParticles(amount) {

  for (let i = 0; i < amount; i++) {

    const particle =
      document.createElement("div");

    particle.className =
      "particle";

    const symbols = [
      "✦",
      "✧",
      "⋆",
      "✦",
      "♥️"
    ];

    particle.innerHTML =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.fontSize =
      (7 + Math.random() * 17) + "px";

    particle.style.animationDuration =
      (5 + Math.random() * 7) + "s";

    particle.style.animationDelay =
      Math.random() * 2 + "s";

    particlesBox.appendChild(particle);


    setTimeout(function () {

      particle.remove();

    }, 13000);
  }
}


/* =====================================
   CONTINUOUS PARTICLES
===================================== */

setInterval(function () {

  if (isOpen) {

    createParticles(2);

  }

}, 650);


/* =====================================
   SOFT CHIME
===================================== */

function playChime() {

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    const audio =
      new AudioContext();

    const oscillator =
      audio.createOscillator();

    const gain =
      audio.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.setValueAtTime(
      523.25,
      audio.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
      783.99,
      audio.currentTime + 0.45
    );


    gain.gain.setValueAtTime(
      0.0001,
      audio.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.10,
      audio.currentTime + 0.04
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audio.currentTime + 0.8
    );


    oscillator.connect(gain);

    gain.connect(
      audio.destination
    );


    oscillator.start();

    oscillator.stop(
      audio.currentTime + 0.8
    );

  }

  catch (error) {

    console.log(
      "Audio not supported"
    );

  }

}


/* =====================================
   STARTING PARTICLES
===================================== */

createParticles(20);
