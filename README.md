# task_manager

El ejercicio se basa en crear una lista de tareas en JS vanilla.

Creación de tareas, con prioridad basada en colores y una cuenta regresiva en base a una fecha de inserción.
Cada elemento de la lista cuenta con su cuenta regresiva individual, que se para al llegar a 0 "deadline".
Y que limpia el intervalo en cuyo caso de que se haya terminado el tiempo o se borre la tarea.

VOLCADO EN LOCALSTORAGE:  
  La app cuenta con un volcado de datos con id unico en local storage.
Cada vez que se crea una tarea, automaticamente se vuelva en LS.
Cuando la aplicación recarga o vuelve a abrirse, toma el volcado de LS
para autorellenarse con las tareas que se habian creado anteriormente.

PUNTOS DE CONTROL:  
  Se establecen puntos de control para el usuario:
Los campos de nombre de la tarea y fecha no pueden estar vacios.
El campo de fecha debe ser posterior al momento actual.
Se asignará un color de prioridad baja si el usuario no ha seleccionado uno especifico.
