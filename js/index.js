let elInput = findEl(".js-input");
let elList = findEl(".js-todos-list");

let localData = localStorage.getItem("todos");
let todos = localData ? JSON.parse(localData) : [];

let handelDeleteTodo = (evt) => {
  let filteredArr = [];

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== evt.target.dataset.id) {
      filteredArr.push(todos[i]);
    }
  }

  todos = filteredArr;
  localStorage.setItem("todos", JSON.stringify(filteredArr));
  renderElements(filteredArr);
};

function createTodoItem(todo) {
  let elLi = createEl("li");
  let elCheckboxInput = createEl("input");
  let elText = createEl("p");
  let elDiv = createEl("div");
  let elEditBtn = createEl("button");
  let elDeleteBtn = createEl("button");

  elLi.className = "d-flex align-items-center py-2 px-3 border-bottom";

  elCheckboxInput.type = "checkbox";
  elCheckboxInput.className = "form-check-input mt-0";

  elText.textContent = todo.title;
  elText.className = "m-0 ms-2";

  elDiv.className = "ms-auto";

  elEditBtn.textContent = "Edit";
  elEditBtn.className = "btn btn-success";
  elDeleteBtn.textContent = "Delete";
  elDeleteBtn.className = "btn btn-danger ms-1 delete";
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

  for (let i = 0; i < array.length; i++) {
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

    localStorage.setItem("todos", JSON.stringify(todos));

    renderElements(todos);
    elInput.value = null;
    console.log(todos);
  }
}

elInput.addEventListener("keyup", handelAddTodo);
elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete")) {
    handelAddTodo(evt);
  }
});
renderElements(todos);
