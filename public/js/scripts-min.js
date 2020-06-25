"use strict";function _createForOfIteratorHelper(e,t){var a;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var d,l=!0,o=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return l=e.done,e},e:function(e){o=!0,d=e},f:function(){try{l||null==a.return||a.return()}finally{if(o)throw d}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var clear=document.getElementById("clear"),list=document.getElementById("list"),b1=document.getElementById("green"),b2=document.getElementById("yellow"),b3=document.getElementById("orange"),b4=document.getElementById("red"),additem=document.getElementById("add-item"),mensaje=document.getElementById("mensaje"),fecha=document.getElementById("fecha"),addbutton=document.getElementById("addToDo");clear.addEventListener("click",(function(e){for(;list.firstChild;)list.removeChild(list.firstChild);localStorage.clear()}));var deleteIcons=[],updateDelete=function(){var e,t=_createForOfIteratorHelper(deleteIcons=document.querySelectorAll("ul.list > li >i.fa-trash-alt"));try{for(t.s();!(e=t.n()).done;){e.value.addEventListener("click",(function(e){var t=e.target,a=t.parentNode.dataset.uid;console.log(a),localStorage.removeItem(a),list.removeChild(t.parentNode)}))}}catch(e){t.e(e)}finally{t.f()}},completeRadius=[],updateChilds=function(){var e,t=_createForOfIteratorHelper(completeRadius=document.querySelectorAll("ul.list > li >div>i.fa-circle"));try{for(t.s();!(e=t.n()).done;){e.value.addEventListener("click",(function(e){var t=e.target;switch(t.className){case"fas fa-circle complete":t.classList.replace("fas","far");break;case"far fa-circle":t.classList.replace("far","fas")}t.classList.toggle("complete"),t.nextSibling.classList.toggle("complete")}))}}catch(e){t.e(e)}finally{t.f()}};b1.addEventListener("click",(function(e){additem.className="add-item green",additem.dataset.color="green"})),b2.addEventListener("click",(function(e){additem.className="add-item yellow",additem.dataset.color="yellow"})),b3.addEventListener("click",(function(e){additem.className=" add-item orange",additem.dataset.color="orange"})),b4.addEventListener("click",(function(e){additem.className=" add-item red",additem.dataset.color="red"})),addbutton.addEventListener("click",(function(e){if(""===additem.getAttribute("data-color")&&(additem.dataset.color="green"),""!==mensaje.value&&""!==fecha.value){var t="id"+(new Date).getTime(),a={mensaje:mensaje.value,fecha:fecha.value,done:!1,color:additem.dataset.color,id:t};console.log(a),addDataToLS(a,t)}else alert("rellena los campos de fecha y mensaje")}));var addDataToLS=function(e,t){console.log(),localStorage.setItem(t,JSON.stringify(e));var a=document.createDocumentFragment(),r=document.createElement("li");r.classList.add("item"),r.classList.add(e.color),r.dataset.uid=t;var n=document.createElement("div");n.classList.add("item__block");var d=document.createElement("i");d.classList.add("far","fa-circle");var l=document.createElement("p");l.classList.add("text"),l.textContent=e.mensaje;var o=document.createElement("p");o.classList.add("text"),o.textContent=e.fecha;var c=document.createElement("i");c.classList.add("far","fa-trash-alt");var i=document.createElement("p");n.appendChild(d),n.appendChild(l),n.appendChild(o),r.appendChild(n),r.appendChild(c),a.appendChild(r),list.appendChild(a),additem.dataset.color="",mensaje.value="",i.value="",additem.className="add-item ",additem.dataset.color="",updateChilds(),updateDelete()};