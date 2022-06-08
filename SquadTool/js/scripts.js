const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

const tasksContainer = document.querySelector('.tasks-container')


const validateInput = () => inputElement.value.trim().length > 0


const handleAddTask = () =>{
    const inputValid = validateInput();

    if(!inputValid){
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskP = document.createElement('p');
    taskP.innerText = inputElement.value;

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-solid');
    deleteItem.classList.add('fa-trash');

    const editItem = document.createElement('i');
    editItem.classList.add('fa-solid');
    editItem.classList.add('fa-pen');
    

    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskP));

    taskItemContainer.appendChild(taskP);
    taskItemContainer.appendChild(deleteItem);
    taskItemContainer.appendChild(editItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();
}

const handleDeleteClick = (taskItemContainer, taskP) =>{
    const tasks = tasksContainer.childNodes;

    for (const task of tasks){
        const currentTaskBeingClicked = task.firstChild.isSameNode(taskP)
        if (currentTaskBeingClicked){
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
}

const handleInputChange = () => {
    const inputValid = validateInput();

    if(inputValid){
        return inputElement.classList.remove("error");
    }
}

// salva os inputs em localStorage

const updateLocalStorage = () =>{

    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [... tasks].map(task => {
        const content = task.firstChild;

        return {description: content.innerText};

    });

    
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refresh = () =>{

    const tasksFromlocalStore = JSON.parse(localStorage.getItem('tasks'))
    if(!tasksFromlocalStore) return;
    
    for (const task of tasksFromlocalStore){
        const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskP = document.createElement('p');
    taskP.innerText = task.description;

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-solid');
    deleteItem.classList.add('fa-trash');

    const editItem = document.createElement('i');
    editItem.classList.add('fa-solid');
    editItem.classList.add('fa-pen');

    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskP));

    taskItemContainer.appendChild(taskP);
    taskItemContainer.appendChild(deleteItem);
    taskItemContainer.appendChild(editItem);

    tasksContainer.appendChild(taskItemContainer);

    }

    

}

refresh();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());