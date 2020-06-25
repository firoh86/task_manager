const clear = document.getElementById('clear');
const list = document.getElementById('list');
const select = document.getElementById('select');
// -------------color buttons----------------------------------
const b1 = document.getElementById('green');
const b2 = document.getElementById('yellow');
const b3 = document.getElementById('orange');
const b4 = document.getElementById('red');
// --------------------info to past throw-----------------------
const additem = document.getElementById('add-item');
const mensaje = document.getElementById('mensaje');
const fecha = document.getElementById('fecha');
const addbutton = document.getElementById('addToDo');

// reset remueve todos los hijos de la lista
clear.addEventListener('click', (e) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorage.clear();
});

// formulario
addbutton.addEventListener('click', (e) => {
  // color por default verde si no asignaste uno
  if (additem.getAttribute('data-color') === '') {
    additem.dataset.color = 'green';
  }

  if (mensaje.value !== '' && fecha.value !== '') {
    var uniq = 'id' + new Date().getTime();
    let data = {
      color: additem.dataset.color,
      done: false,
      fecha: fecha.value,
      id: uniq,
      mensaje: mensaje.value,
    };
    console.log(data);
    // mandas al localstorage
    addDataToLS(data, uniq);
  } else {
    alert('rellena los campos de fecha y mensaje');
  }
});

// añade elementos a la lista
const addDataToLS = (data, uid) => {
  // to localstorage
  localStorage.setItem(uid, JSON.stringify(data));

  // to the app (añades el uid al LI)
  let docFragment = document.createDocumentFragment();

  let li1 = document.createElement('li');
  li1.classList.add('item');
  li1.classList.add(data.color);
  li1.dataset.uid = uid;

  let div1 = document.createElement('div');
  div1.classList.add('item__block');

  let icon = document.createElement('i');
  icon.classList.add('far', 'fa-circle');

  let p1 = document.createElement('p');
  p1.classList.add('text');
  p1.textContent = data.mensaje;

  let p2 = document.createElement('p');
  p2.classList.add('text');
  p2.textContent = data.fecha;

  // trash icon
  let icon2 = document.createElement('i');
  icon2.classList.add('far', 'fa-trash-alt');

  let fecha = document.createElement('p');

  div1.appendChild(icon);
  div1.appendChild(p1);
  div1.appendChild(p2);
  li1.appendChild(div1);
  li1.appendChild(icon2);

  docFragment.appendChild(li1);

  list.appendChild(docFragment);

  // reset de values
  additem.dataset.color = '';
  mensaje.value = '';
  fecha.value = '';
  additem.className = 'add-item ';
  additem.dataset.color = '';
};

// controlador de botones en lista
list.addEventListener('click', (e) => {
  if (e.target.tagName == 'I') {
    if (e.target.classList.contains('fa-circle')) taskComplete(e.target);
  }
  if (e.target.classList.contains('fa-trash-alt')) {
    deleteTask(e.target);
  }
});

const taskComplete = (hijo) => {
  hijo.classList.contains('far')
    ? hijo.classList.replace('far', 'fas')
    : hijo.classList.replace('fas', 'far');
  hijo.classList.toggle('complete');
  hijo.nextSibling.classList.toggle('complete');
  // actualiza tarea en local storage
  let uid = hijo.parentNode.parentNode.dataset.uid;
  let lastState = JSON.parse(localStorage.getItem(uid));
  console.log(lastState);
  lastState.done == false ? (lastState.done = true) : (lastState.done = false);
  let newvalue = JSON.stringify(lastState);
  localStorage.setItem(uid, newvalue);
};

const deleteTask = (hijo) => {
  let uid = hijo.parentNode.dataset.uid;
  // borrar del localstorage
  localStorage.removeItem(uid);
  list.removeChild(hijo.parentNode);
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('se ha cargado la página');
  let values = Object.values(localStorage);
  for (let element in values) {
    let instance = JSON.parse(values[element]);
    addDataToLS(instance, instance.id);
  }
  // console.log(values);
  // llama a la cuenta regresiva para actualizar al iniciar la app
});

// colores
select.addEventListener('click', (e) => {
  console.log(e.target.id);
  additem.className = `add-item ${e.target.id}`;
  additem.dataset.color = e.target.id;
});

// cuentas regresivas

/* document.addEventListener('keyup', (e) => {
  if (e.keyCode == '32') {
    window.location.reload();
    console.log('se ha pulsado');
  }
}); */
