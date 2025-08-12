const wall = document.querySelector('.spotlight-wall');
const grid = document.getElementById('cards');
const cards = [...grid.querySelectorAll('.card')];

function setSpotlight(e){
  const r = wall.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  wall.style.setProperty('--x', `${x}px`);
  wall.style.setProperty('--y', `${y}px`);
  // 3D tilt based on distance from center
  const cx = r.width / 2, cy = r.height / 2;
  const dx = (x - cx) / cx, dy = (y - cy) / cy;
  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const ccx = rect.left + rect.width/2 - r.left;
    const ccy = rect.top  + rect.height/2 - r.top;
    const ddx = (x - ccx) / rect.width;
    const ddy = (y - ccy) / rect.height;
    card.style.setProperty('--ry', `${-ddx * 8}deg`);
    card.style.setProperty('--rx', `${ddy * 8}deg`);
  });
}

['mousemove','touchmove'].forEach(evt=>{
  wall.addEventListener(evt, (e)=>{
    const p = e.touches?.[0] || e;
    setSpotlight(p);
  }, {passive:true});
});

// nice initial position
requestAnimationFrame(()=>{
  const r = wall.getBoundingClientRect();
  wall.style.setProperty('--x', `${r.width*0.65}px`);
  wall.style.setProperty('--y', `${r.height*0.35}px`);
});



// const wall = document.querySelector('.spotlight-wall');
// const grid = document.getElementById('cards');
// const cards = [...grid.querySelectorAll('.card')];

// function setSpotlight(e){
//   const r = wall.getBoundingClientRect();
//   const x = e.clientX - r.left;
//   const y = e.clientY - r.top;
//   wall.style.setProperty('--x', `${x}px`);
//   wall.style.setProperty('--y', `${y}px`);

//   cards.forEach((card) => {
//     const rect = card.getBoundingClientRect();
//     const ccx = rect.left + rect.width/2 - r.left;
//     const ccy = rect.top  + rect.height/2 - r.top;
//     const ddx = (x - ccx) / rect.width;
//     const ddy = (y - ccy) / rect.height;
//     // ↓ softer tilt
//     card.style.setProperty('--ry', `${-ddx * 3}deg`);
//     card.style.setProperty('--rx', `${ddy * 3}deg`);
//   });
// }

// ['mousemove','touchmove'].forEach(evt=>{
//   wall.addEventListener(evt, (e)=>{
//     const p = e.touches?.[0] || e;
//     setSpotlight(p);
//   }, {passive:true});
// });

// // reset tilt when leaving the wall
// wall.addEventListener('mouseleave', () => {
//   cards.forEach(c => {
//     c.style.setProperty('--ry','0deg');
//     c.style.setProperty('--rx','0deg');
//   });
// });

// // nice initial position
// requestAnimationFrame(()=>{
//   const r = wall.getBoundingClientRect();
//   wall.style.setProperty('--x', `${r.width*0.65}px`);
//   wall.style.setProperty('--y', `${r.height*0.35}px`);
// });
