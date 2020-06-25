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
// evento click de tareas completas

let completeRadius = [];
const updateChilds = () => {
  // llamar a update childs cuando se cree o se borren elementos de la lista
  completeRadius = document.querySelectorAll('ul.list > li >div>i.fa-circle');
  console.log(completeRadius);

  // cambio de clases si se completa la tarea
  for (let child of completeRadius) {
    child.addEventListener('click', (e) => {
      let hijo = e.target;
      console.log(hijo.className);
      switch (hijo.className) {
        case 'fas fa-circle complete':
          hijo.classList.replace('fas', 'far');
          break;
        case 'far fa-circle':
          hijo.classList.replace('far', 'fas');
          break;
        default:
          break;
      }
      hijo.classList.toggle('complete');
      hijo.nextSibling.classList.toggle('complete');
    });
  }
};

// -------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // traes lo que haya en el LS
  console.log('se ha cargado la página');
});

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

  // trash icon
  let icon2 = document.createElement('i');
  icon2.classList.add('far', 'fa-trash-alt');

  div1.appendChild(icon);
  div1.appendChild(p1);
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
  // falta completar tareas y borrar tareas
  // completar tareas con class complete
  //-------actualiza hijos de la lista--------
  updateChilds();
};

/* document.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    window.location.reload();
  }
}); */
