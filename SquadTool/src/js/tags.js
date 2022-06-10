// criação de tags

const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');

var tags = [];

function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class','tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeBtn = document.createElement('i');
    closeBtn.setAttribute('class','fa-solid');
    closeBtn.classList.add('fa-xmark');
    closeBtn.setAttribute('data-item', label);

    div.appendChild(span);
    div.appendChild(closeBtn);

    return div;
}

function restory(){
    document.querySelectorAll('.tag').forEach(function(tag){
        tag.parentElement.removeChild(tag);
    })
}

function addTags(){
    restory();
    tags.slice().reverse().forEach(function(tag){
        const input = createTag(tag);
        tagContainer.prepend(input);
    })
}

input.addEventListener('keyup', function(e){
    if(input.value !=''){
        if(e.key == 'Enter' || e.key == ';'){
            if(e.key == ';'){
                tags.push(input.value.slice(0,-1));
                addTags();
                input.value = '';
            }
            else{
                tags.push(input.value);
                addTags();
                input.value = '';
            }

            }

        }
    })

    // Deletando tags

    document.addEventListener('click', function(e){
        if(e.target.tagName == 'I'){
            const value = e.target.getAttribute('data-item');
            console.log(value);
            const index = tags.indexOf(value);
            console.log(index);
            delete tags[index]
            console.log(tags);
            addTags();   
        }
    })

    // Validação de campo e salvar na memoria

    const inputElement = document.querySelector('#teamName');
    const addTaskButton = document.querySelector('.button');
    

    const validateInput = () => inputElement.value.trim().length > 0

    const handleAddTask = () =>{
        const inputValid = validateInput();
    
        if(!inputValid){
            return inputElement.classList.add("error");
        }

        updateLocalStorage();

        alert("team created successfully");

    }

    const handleInputChange = () => {
        const inputValid = validateInput();
    
        if(inputValid){
            return inputElement.classList.remove("error");
        }
    }

    // Salvando em localStorage

    const updateLocalStorage = () =>{

        var tasks = localStorage.getItem("tasks");
        var content = {description: inputElement.value}
        

        if(tasks){
            var json = JSON.parse(tasks);
            json.push(content);
            json = JSON.stringify(json);
            localStorage.setItem("tasks",json);
            
        }
        else{
            localStorage.setItem("tasks",JSON.stringify([content]));
        }

}

    addTaskButton.addEventListener("click", () => handleAddTask());

    inputElement.addEventListener('change', () => handleInputChange());