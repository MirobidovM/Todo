let elInput = findEl(".js-input");
let elList = findEl(".js-todos-list");

let localData = localStorage.getItem("todos");
let todos = JSON.parse(localData) ? JSON.parse(localData) : [];

console.log(JSON.parse(localData));

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
  elDeleteBtn.className = "btn btn-danger ms-1";

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

let i = todos[-1] ? todos[-1].id : 1;
function handelAddTodo(evt) {
  if (evt.keyCode === 13) {
    let newTodo = {
      id: ++i,
      title: elInput.value,
      isCompleted: false,
    };

    console.log(i);
    todos.unshift(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

    renderElements(todos);
    elInput.value = null;
    console.log(todos);
  }
}

elInput.addEventListener("keyup", handelAddTodo);
renderElements(todos);
