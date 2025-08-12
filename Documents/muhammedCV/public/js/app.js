particlesJS("tsparticles", {
  "particles": {
    "number": {
      "value": 60
    },
    "color": {
      "value": "#3586ff"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.5
    },
    "size": {
      "value": 3
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#3586ff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1
    }
  },
  "interactivity": {
  "events": {
    "onhover": {
      "enable": true,
      "mode": "repulse"
    },
    "onclick": {
      "enable": true,
      "mode": "grab" // or "repulse", "remove"
    },
    "resize": true
  },
  "modes": {
    "grab": {
      "distance": 140,
      "line_linked": {
        "opacity": 1
      }
    },
    "push": {
      "particles_nb": 4 // How many new ones appear
    },
    "repulse": {
      "distance": 200,
      "duration": 0.4
    }
  }
},
  "retina_detect": true
});
