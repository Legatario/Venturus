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
})

document.addEventListener('click', function(e){
    if(e.target.tagName == 'I'){
        const value = closeBtn.getAttribute('data-item');
        const index = tags.indexOf(value);
        tags = [...tags.slice(0, index),...tags.slice(index,-1)];
        addTags();
        console.log(value);
        
    }
})