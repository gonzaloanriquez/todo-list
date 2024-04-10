
let nuevaTarea = document.getElementById('ingreso-nuevaTarea');
const btnNewTask = document.getElementById('btn-newtask');
let listaTareas = [
  { id: 1, nombreTarea: 'Terminar Desafio 5', estado: true },
  { id: 2, nombreTarea: 'Terminar Desafio 6', estado: false },
  { id: 3, nombreTarea: 'Terminar Desafio APIs', estado: false },
];

const renderizarListaTareas = (listaTareas) => {
  let html = '';

  listaTareas.forEach((tarea) => {

    const statusBtnIcon = tarea.estado ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill';
    html += `<tr>
                <td>${tarea.id}</td>
                <td>${tarea.nombreTarea}</td>
                <td><i class="${statusBtnIcon}" onclick="cambiaStatus(${tarea.id})"></i></td>
                <td><i class="bi bi-trash-fill" onclick="borraTarea(${tarea.id})"></i></td>
            </tr>`;
  });

  document.getElementById('lista-tareas').innerHTML = html;
  document.getElementById('total-tareas').innerHTML = listaTareas.length;
  document.getElementById('tareas-cerradas').innerHTML = listaTareas.filter((tarea) => tarea.estado === true).length;
};

const cambiaStatus = (id) => {

  const tarea = listaTareas.find((tarea) => tarea.id === id);
  
  if (tarea) {
    tarea.estado = !tarea.estado;
  } else {
    console.log('Error al cambiar el estado de la tarea 😥');
  }

  renderizarListaTareas(listaTareas);
};

const borraTarea = (id) => {
  const index = listaTareas.findIndex((tarea) => tarea.id === id);

  if (index != -1) {
    listaTareas.splice(index, 1);
  } else {
    console.log('Error cuando borras 😥');
  }

  renderizarListaTareas(listaTareas);
};

const generarId = (listaTareas) => {
  return listaTareas.length ? listaTareas[listaTareas.length - 1].id + 1 : 1;
};

btnNewTask.addEventListener('click', () => {
 
  if (nuevaTarea.value.trim() !== '') {
    const tarea = {
      id: generarId(listaTareas),
      nombreTarea: nuevaTarea.value,
      estado: false,
    };
    
    listaTareas.push(tarea);
    renderizarListaTareas(listaTareas);
    nuevaTarea.value = '';
    nuevaTarea.focus();

  } else {
    nuevaTarea.classList.add('is-invalid');
  }
});
  
nuevaTarea.addEventListener('click', () => {
  nuevaTarea.classList.remove('is-invalid');
});

renderizarListaTareas(listaTareas);