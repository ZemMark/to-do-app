import { v4 as uuidv4 } from 'uuid';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
const getTodo = ({ id, value, checked }) => `
  <li data-id=${id}>
    <input type="checkbox" data-action="checkbox" ${checked ? 'checked' : ''} />
    <span>${value}</span>
    <button data-action="delete">x</button>
    <button data-action="view">view</button>
  </li>`;
const tasksModal = basicLightbox.create(`
    <div class="modal">
        <p class="modal-text">
            Your first lightbox with just a few lines of code.
            Yes, it's really that simple.
        </p>
        <button class="modal-button" id="close-modal" type="button">ok</button>
    </div>
`);
const refs = {
  form: document.getElementById('form'),
  list: document.getElementById('todo-list'),
  buttonModalClose: tasksModal.element().querySelector('button'),
};
let todos = [];
function saveTasks() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
function toggleCheckboxValue(id) {
  //map returns new old element or new, with switched value of checkbox
  todos = todos.map(el =>
    el.id === id
      ? {
          ...el,
          checked: !el.checked, //switching value of chack box from false to true
        }
      : el
  );
  saveTasks();
  render();
}

function loadTasksFromLocalStorage() {
  console.log(todos);
  try {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
  } catch (error) {
    console.log('error', error);
    todos = [];
  }
}
const handleSubmit = event => {
  const input = event.target.elements.text;
  const value = input.value.trim();
  if (!value) {
    return;
  }
  const newTodo = { id: uuidv4(), value, checked: false };

  event.preventDefault();
  todos.push(newTodo);
  input.value = '';
  render();
};
const deleteTodo = id => {
  todos = todos.filter(todo => todo.id !== id);
  render();
};
const viewTodo = id => {
  console.log();
  tasksModal.show();
  console.log(te);
};
const handleTodoClick = event => {
  const { action } = event.target.dataset;
  const parent = event.target.closest('li');
  const { id } = parent?.dataset || {};

  switch (action) {
    case 'delete':
      deleteTodo(id);
      break;

    case 'view':
      viewTodo(id);
      break;
    case 'checkbox':
      toggleCheckboxValue(id);
      break;
  }
};

const render = () => {
  const itemList = todos.map(todo => getTodo(todo)).join('');

  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', itemList);
  saveTasks();
};

loadTasksFromLocalStorage();
render();

refs.form.addEventListener('submit', handleSubmit);
refs.list.addEventListener('click', handleTodoClick);
refs.buttonModalClose.addEventListener('click', tasksModal.close);
