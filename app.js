window.addEventListener('load',() => {
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const list_el = document.querySelector('#tasks');

  form.addEventListener('submit',(e) => {
    e.preventDefault();

    const task = input.value;
    if(!task) {
      alert("Please add a task");
      return;
    } 

    //👇task parent element
    const task_el = document.createElement('div');
    task_el.classList.add('task');
    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
    task_el.appendChild(task_content_el);

    //👇task that are inserted
    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly','readonly');
    task_content_el.appendChild(task_input_el);

    //👇Edit button
    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');
    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    const editLogo = document.createElement('i');
    editLogo.classList.add('fa-solid');
    editLogo.classList.add('fa-pen-nib');
    task_edit_el.appendChild(editLogo);

    //👇Delete Button
    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    const deleteLogo = document.createElement('i');
    deleteLogo.classList.add('fa-solid');
    deleteLogo.classList.add('fa-trash-can');
    task_delete_el.appendChild(deleteLogo);
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_el.appendChild(task_actions_el);
    list_el.appendChild(task_el);

    input.value = '';

    //storage the data inside the Local Storage...
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if(localItems === null) {
      taskList = [];
    } else {
      taskList = localItems;
    }
    taskList.push(task);
    //Local storage only can contain 'strings' so stringify method 
    //will turn everything into strings....
    //setItem('key', 'value')
    localStorage.setItem(task, JSON.stringify(taskList));


    task_edit_el.addEventListener('click',() => {
      if(editLogo.classList.contains("fa-pen-nib")) {
        task_input_el.removeAttribute('readonly');
        task_input_el.focus();
        editLogo.classList.remove('fa-pen-nib');
        editLogo.classList.add('fa-floppy-disk');
      } else {
        task_input_el.setAttribute('readonly','readonly');
        editLogo.classList.remove('fa-floppy-disk');
        editLogo.classList.add('fa-pen-nib');
      }
    });

    task_input_el.addEventListener('change',() => {
      let changedValue = task_input_el.value;
      taskList.length = 0;
      taskList.push(changedValue)
      localStorage.removeItem(task);
      localStorage.setItem(task, JSON.stringify(taskList));
    });

    task_delete_el.addEventListener('click', () => {
      let answer = confirm('Are you sure you want to delete this task?');
      if(answer) {
        list_el.removeChild(task_el);
        localStorage.removeItem(task);
      } else {
        return false;
      }
      
    });
  });
});
