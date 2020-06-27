const clear = document.getElementById('clear');
const list = document.getElementById('list');
const select = document.getElementById('select');

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
  // comprobar que la fecha es a futuro
  if (new Date(fecha.value).getTime() < new Date().getTime()) {
    alert('la fecha esta pasada');
  } else {
    if (mensaje.value !== '' && fecha.value !== '') {
      var uniq = 'id' + new Date().getTime();
      let data = {
        color: additem.dataset.color,
        done: false,
        fecha: fecha.value,
        id: uniq,
        mensaje: mensaje.value,
      };
      // console.log(data);
      // mandas al localstorage
      addDataToLS(data, uniq);
    } else {
      alert('rellena los campos de fecha y mensaje');
    }
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

  // trash icon
  let icon2 = document.createElement('i');
  icon2.classList.add('far', 'fa-trash-alt');

  div1.appendChild(icon);
  div1.appendChild(p1);

  let p2 = document.createElement('p');
  // interval-------cuenta regresiva------------
  let interval = setInterval((uid) => {
    let lastchild = '';
    if (lastchild == '') {
      lastchild = list.querySelector('li:last-child');
    }

    if (lastchild === null) {
      clearInterval(interval);
      console.log('ya no existe');
    }

    p2.textContent = '';
    p2.classList.add('text');
    p2.classList.add('fecha');
    let reloj = muestraReloj(data.fecha);
    let relojActual;
    if (reloj.remainTime > 0) {
      relojActual = `DL D-${reloj.remainDays} ${reloj.remainHours}:${reloj.remainMinutes}:${reloj.remainSeconds}`;
    } else {
      relojActual = 'deadline past';
      clearInterval(interval);
    }
    p2.textContent = relojActual;
    div1.appendChild(p2);
  }, 1000);

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
  // console.log(lastState);
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

// colores
select.addEventListener('click', (e) => {
  // console.log(e.target.id);
  additem.className = `add-item ${e.target.id}`;
  additem.dataset.color = e.target.id;
});

window.onload = () => {
  list.textContent = '';
  console.log('se ha cargado la página');
  let values = Object.values(localStorage);
  let fechas = [];
  let uids = [];
  for (let element in values) {
    let instance = JSON.parse(values[element]);
    fechas.push(instance.fecha);
    uids.push(instance.id);
    addDataToLS(instance, instance.id);
  }
};

const muestraReloj = (fecha) => {
  const now = new Date();
  const remainTime = (new Date(fecha) - now + 1000) / 1000;
  const remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2);
  const remainMinutes = ('0' + Math.floor((remainTime / 60) % 60)).slice(-2);
  const remainHours = ('0' + Math.floor((remainTime / 3600) % 24)).slice(-2);
  const remainDays = Math.floor(remainTime / (3600 * 24));

  // console.log(remainTime);

  return {
    remainSeconds,
    remainMinutes,
    remainHours,
    remainDays,
    remainTime,
  };
};
