const clear = document.getElementById('clear');
const list = document.getElementById('list');
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

// date.textContent = new Date().toLocaleString();
// reset remueve todos los hijos de la lista
clear.addEventListener('click', (e) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorage.clear();
});

// borrar elementos de una lista
let deleteIcons = [];
const updateDelete = () => {
  deleteIcons = document.querySelectorAll('ul.list > li >i.fa-trash-alt');
  // console.log(deleteIcons);
  for (let child of deleteIcons) {
    child.addEventListener('click', (e) => {
      let hijo = e.target;
      let uid = hijo.parentNode.dataset.uid;
      console.log(uid);
      // borrar del localstorage
      localStorage.removeItem(uid);
      list.removeChild(hijo.parentNode);
      // borrar parent node
    });
  }
};

// evento click de tareas completas actualiza estado en local storage
let completeRadius = [];
const updateChilds = () => {
  // llamar a update childs cuando se cree o se borren elementos de la lista
  completeRadius = document.querySelectorAll('ul.list > li >div>i.fa-circle');
  // cambio de clases si se completa la tarea
  for (let child of completeRadius) {
    child.addEventListener('click', (e) => {
      let hijo = e.target;
      let uid = hijo.parentNode.parentNode.dataset.uid;
      // console.log(uid);
      // console.log(hijo.className);
      switch (hijo.className) {
        case 'fas fa-circle complete':
          hijo.classList.replace('fas', 'far');

          let lastState = JSON.parse(localStorage.getItem(uid));
          // console.log(lastState);
          lastState.done = false;
          let newvalue = JSON.stringify(lastState);
          localStorage.setItem(uid, newvalue);

          break;
        case 'far fa-circle':
          hijo.classList.replace('far', 'fas');

          let lastState = JSON.parse(localStorage.getItem(uid));
          // console.log(lastState);
          lastState.done = true;
          let newvalue = JSON.stringify(lastState);
          localStorage.setItem(uid, newvalue);

          break;
        default:
          break;
      }
      hijo.classList.toggle('complete');
      hijo.nextSibling.classList.toggle('complete');
    });
  }
};

// cambio de color de additem
b1.addEventListener('click', (e) => {
  additem.className = 'add-item green';
  additem.dataset.color = 'green';
});
b2.addEventListener('click', (e) => {
  additem.className = 'add-item yellow';
  additem.dataset.color = 'yellow';
});
b3.addEventListener('click', (e) => {
  additem.className = ' add-item orange';
  additem.dataset.color = 'orange';
});
b4.addEventListener('click', (e) => {
  additem.className = ' add-item red';
  additem.dataset.color = 'red';
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
      mensaje: mensaje.value,
      fecha: fecha.value,
      done: false,
      color: additem.dataset.color,
      id: uniq,
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
  console.log();
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
  //-------actualiza botones hijos de la lista completar y borrar--------
  updateChilds();
  updateDelete();
};

/* document.addEventListener('keyup', (e) => {
  if (e.keyCode === '32') {
    window.location.reload();
    console.log('se ha pulsado');
  }
}); */

// --------------arreglar el gulp file y crear la lista desde el local storage al cargar la pagina
window.addEventListener('DOMContentLoaded', () => {
  // traes lo que haya en el LS
  console.log('se ha cargado la página');
  const LS = allStorage();
  // console.log(LS);
  for (let child of LS) {
    let objeto = JSON.parse(child);
    let uid = objeto.id;
    console.log('llega');
    // addDataToLS(child, uid);
  }
  console.log('llega');
});

// trae todo el contenido de local storage
const allStorage = () => {
  let values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
};
