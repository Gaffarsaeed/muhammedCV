document.addEventListener("DOMContentLoaded", () => {
    const splash = document.querySelector('.splash-container');
  
    setTimeout(() => {
      splash.classList.add('fade-out');
    }, 6000);
  
    splash.addEventListener('animationend', () => {
      window.location.href = "/home";
    });
  });
  

  