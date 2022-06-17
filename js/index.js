let elInput = findEl('.js-input');
let elList = findEl('.js-todos-list');

let localData = localStorage.getItem('todos');
let todos = localData ? JSON.parse(localData) : [];

function createTodoItem(todo) {
  let elLi = createEl('li');
  let elCheckboxInput = createEl('input');
  let elText = createEl('p');
  let elDiv = createEl('div');
  let elEditBtn = createEl('button');
  let elDeleteBtn = createEl('button');

  elLi.className = 'd-flex align-items-center py-2 px-3 border-bottom';
  elCheckboxInput.checked = todo.isCompleted;
  elCheckboxInput.type = 'checkbox';
  elCheckboxInput.className = 'form-check-input mt-0 completed';
  elCheckboxInput.dataset.id = todo.id;

  elText.textContent = todo.title;

  elText.className = 'm-0 ms-2';
  if (todo.isCompleted) {
    elText.classList.add('text-decoration-line-through');
    elText.classList.add('text-muted');
  }

  elDiv.className = 'ms-auto';

  elEditBtn.textContent = 'Edit';
  elEditBtn.className = 'btn btn-success edit';
  elEditBtn.dataset.id = todo.id;
  elDeleteBtn.textContent = 'Delete';
  elDeleteBtn.className = 'btn btn-danger ms-1 delete';
  elDeleteBtn.dataset.id = todo.id;

  elDiv.appendChild(elEditBtn);
  elDiv.appendChild(elDeleteBtn);
  elLi.appendChild(elCheckboxInput);
  elLi.appendChild(elText);
  elLi.appendChild(elDiv);
  elList.appendChild(elLi);
}

function renderElements(array) {
  elList.innerHTML = null;

  for (var i = 0; i < array.length; i++) {
    createTodoItem(array[i]);
  }
}

function handelAddTodo(evt) {
  if (evt.keyCode === 13) {
    let newTodo = {
      id: uuid.v4(),
      title: elInput.value,
      isCompleted: false,
    };

    todos.unshift(newTodo);

    localStorage.setItem('todos', JSON.stringify(todos));

    renderElements(todos);
    elInput.value = null;
  }
}

let handelDeleteTodo = (evt) => {
  let filteredArr = [];

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== evt.target.dataset.id) {
      filteredArr.push(todos[i]);
    }
  }

  todos = filteredArr;
  localStorage.setItem('todos', JSON.stringify(filteredArr));
  renderElements(filteredArr);
};

let handelEditTodo = (evt) => {
  let foundTodoIndex = todos.findIndex(
    (element) => element.id === evt.target.dataset.id
  );
  let editText = prompt("O'zgartir", todos[foundTodoIndex].title);
  todos[foundTodoIndex].title = editText;

  renderElements(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
};

let handelCompletedTodo = (evt) => {
  let foundTodoIndex = todos.findIndex(
    (element) => element.id === evt.target.dataset.id
  );
  todos[foundTodoIndex].isCompleted = evt.target.checked;

  renderElements(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
};

elInput.addEventListener('keyup', handelAddTodo);
elList.addEventListener('click', (evt) => {
  if (evt.target.matches('.delete')) return handelDeleteTodo(evt);
  if (evt.target.matches('.edit')) return handelEditTodo(evt);
  if (evt.target.matches('.completed')) return handelCompletedTodo(evt);
});

renderElements(todos);
