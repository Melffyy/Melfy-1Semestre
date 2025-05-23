document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".dessert-card");
  const centerX = window.innerWidth / 2 - 130;
  const centerY = window.innerHeight / 2 - 50; 
  const radius = 420; 
  let angleOffset = 0;

  function positionCards() {
    const total = cards.length;
    cards.forEach((card, index) => {
      const angle = (index * (360 / total)) + angleOffset;
      const radians = (angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(radians) - card.offsetWidth / 2;
      const y = centerY + radius * Math.sin(radians) - card.offsetHeight / 2;

      card.style.position = "absolute";
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
    });
  }

  function animateRotation() {
    angleOffset += 1; 
    positionCards();
    requestAnimationFrame(animateRotation);
  }

  positionCards(); 
  animateRotation();
  
//---------------------------------------------------------
  const title = document.querySelector(".intro h2");
  title.classList.add("intro-animate");

  title.addEventListener("animationend", () => {
    title.classList.remove("intro-animate");
    title.classList.add("glow");
  });
});

