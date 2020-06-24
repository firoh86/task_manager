const clear = document.getElementById('clear');
const dataelement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

date.textContent = new Date().toLocaleString();

// -------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // traes lo que haya en el LS
  console.log('se ha cargado la página');
});

document.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    window.location.reload();
  }
});
