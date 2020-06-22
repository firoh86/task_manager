const form = document.getElementById('form');
const task = document.getElementById('task');
const formButton = document.getElementById('form__button');

// declaraciones, lógica y eventos.

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

formButton.addEventListener('click', (e) => {
  console.log('se ha pulsado el boton');
});
