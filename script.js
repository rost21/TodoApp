//генерация id
const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

function deleteDashboard(id){

    console.log("id: "+id);
    var get = localStorage.getItem('arr');
    var array = JSON.parse(get);

    array.forEach((item) => {
        array = array.filter(item => item.item_id != id);
    });
    
    console.log("After: ");
    console.log(array);

    localStorage.setItem('arr', JSON.stringify(array));

    var blockContent = document.querySelector("#block-content");
    while (blockContent.firstChild) {
        blockContent.removeChild(blockContent.firstChild);
    }
   
    createDashboard();
}

//удаление task'a
function deleteTask(id) {
    console.log("id: "+id);
    var get = localStorage.getItem('arr');
    var array = JSON.parse(get);

    array.forEach(item =>{
        item.tasks.forEach(task => {
            item.tasks = item.tasks.filter(task => task.task_id != id);
        });
    });

    console.log("After: ");
    console.log(array);

    localStorage.setItem('arr',JSON.stringify(array));

    var blockContent = document.querySelector("#block-content");
    while (blockContent.firstChild) {
        blockContent.removeChild(blockContent.firstChild);
    }
   
    createDashboard();
}

//при активном чекбоксе перечеркивание название task'a
function changeCheckbox(e) {
    (e.checked == true) ? e.nextSibling.nextSibling.firstChild.style.textDecoration = "line-through" : e.nextSibling.nextSibling.firstChild.style.textDecoration = "none";
    console.log(e.nextSibling.nextSibling.firstChild);
}

//показать sidebar
function showAddSidebar(){
    var blockAdd = document.querySelector("#block-add");

    if (blockAdd.style.display == "none") {
        blockAdd.style.display = "flex";
    } else {
        blockAdd.style.display = "none";
    }
}

//скрыть sidebar
function hideAddSidebar(){    
    var blockAdd = document.querySelector("#block-add");

    if (blockAdd.style.display == "flex") {
        blockAdd.style.display = "none";
    } else {
        blockAdd.style.display = "flex";
    }
}

//добавить dashboard
function addDashboard() {
    var addTitle = document.querySelector("#add-title").value;
    var addTask = document.querySelector("#add-task").value;

    var get = localStorage.getItem('arr');
    var array = JSON.parse(get);

    array.push({
        item_id: generateId(),
        title: addTitle,
        tasks: [
            {
                task_id: generateId(),
                selected: false,
                name: addTask,
            }
        ],
    });

    
    console.log("After:");
    console.log(array);

    localStorage.setItem('arr',JSON.stringify(array));
    hideAddSidebar();

    var blockContent = document.querySelector("#block-content");
    while (blockContent.firstChild) {
        blockContent.removeChild(blockContent.firstChild);
    }
   
    createDashboard();

    document.querySelector("#add-title").value = "";
    document.querySelector("#add-task").value = "";
}

//изменить название dashboard'a
function changeTitle(e,id){
    console.log(id);
    var get = localStorage.getItem('arr');
    var array = JSON.parse(get);

    array.map((item) => {
        if(item.item_id == id) { 
            return Object.assign(item, {title: e.value});
        }
        return item;
    });
   
    console.log("After:");
    console.log(array);
    localStorage.setItem('arr',JSON.stringify(array));
}

//добавить task
function addTask(e,id){

    if(e.value !== "") {
        console.log(e.value);
        console.log(id);
        var get = localStorage.getItem('arr');
        var array = JSON.parse(get);

        array.map((item) => {
            if(item.item_id == id) {
                    return item.tasks.push({
                        task_id: generateId(),
                        selected: false,
                        name: e.value,
                    });
            }
            return item;
        });

        console.log(array);
        localStorage.setItem('arr', JSON.stringify(array));
    }
    
   var blockContent = document.querySelector("#block-content");
   while (blockContent.firstChild) {
       blockContent.removeChild(blockContent.firstChild);
   }
  
   createDashboard();
}

//изменить название task'a
function changeTask(e,id){
    console.log(e.value);
    console.log(id);
    var get = localStorage.getItem('arr');
    var array = JSON.parse(get);

    array.map(item => {
        item.tasks.map(task => {
            if (task.task_id == id){
                return Object.assign(task, {name : e.value});
            }
            return task;
        });
        return item;
    });

    console.log("After:");
    console.log(array);
    localStorage.setItem('arr', JSON.stringify(array));
}

//прорисовка всех dashboard'ов
function createDashboard(){

    if(JSON.parse(localStorage.getItem('arr')) == null ) {
        localStorage.setItem('arr', JSON.stringify([
            {
                item_id: generateId(),
                title: 'title01',
                tasks: [
                    {
                        task_id: generateId(),
                        selected: false,
                        name: 'task01',
                    },
                ]
            }
        ]));
    } else {
        var get = localStorage.getItem('arr');
        var array = JSON.parse(get);
    }
    
    array.forEach((item)=>  {
        var html= new DOMParser().parseFromString(`
            <div class="block-item" id="${item.item_id}">
                <div class="trash-icon"  onclick="deleteDashboard(${item.item_id})"><img src="images/trash.png" width="19px" height="19px"/></div><br/>
                <input class="item-name" value="${item.title}" onblur="changeTitle(this,${item.item_id})"/>
                               
                <div class="tasks">
                </div>

                <input class="add-todo" placeholder="Add to-do" onblur="addTask(this,${item.item_id})"/>
            </div>`,"text/html").body.firstChild;

        item.tasks.forEach((task,j)=> {

            var checked;

            if(item.tasks[j].selected == true){
                checked ='checked';
            } else {
                checked = '';
            }
            var task = new DOMParser().parseFromString(`
            <div class="task">
                <input type="checkbox" id="${item.tasks[j].task_id}" ${checked} onchange="changeCheckbox(this)"  >
                
                <label for="${item.tasks[j].task_id}" ><input class="task-name" type="text" value="${item.tasks[j].name}" onblur="changeTask(this,${item.tasks[j].task_id})" /></label><br/>
                <div class="delete-task" onclick="deleteTask(${item.tasks[j].task_id})" ><img src="images/trash.png" width="19px" height="19px"/></div>
                
            </div>`,"text/html").body.firstChild 

            html.querySelector(".tasks").appendChild(task);
        });

        document.querySelector("#block-content").appendChild(html);
    });
}