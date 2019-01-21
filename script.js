const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  var arr = [
    {
        item_id: generateId(),
        title: 'title01',
        tasks: [
            {
                task_id: generateId(),
                selected: false,
                name: 'task01',
            },
            {
                task_id: generateId(),
                selected: false,
                name: 'task02',
            }
        ],
    },
    {
        item_id: generateId(),
        title: 'title02',
        tasks: [
            {
                task_id: generateId(),
                selected: false,
                name: 'task11',
            },
            {
                task_id: generateId(),
                selected: false,
                name: 'task12',
            },
            {
                task_id: generateId(),
                selected: false,
                name: 'task13',
            },
            {
                task_id: generateId(),
                selected: false,
                name: 'task14',
            }
        ],
    },
    {
        item_id: generateId(),
        title: 'title03',
        tasks: [
            {
                task_id: generateId(),
                selected: false,
                name: 'task21',
            }
        ],
    }
];

function deleteDashboard(id){
    
    console.log("Before: ")
    console.log(arr);
    console.log("id: "+id);
 
    arr.forEach(function(item){
        arr = arr.filter(item => item.item_id != id);
    });
    

    console.log("After: ");
    console.log(arr);

    var blockContent = document.querySelector("#block-content");
    while (blockContent.firstChild) {
        blockContent.removeChild(blockContent.firstChild);
    }
   
    createDashboard();
    
}

function deleteTask(id) {
    console.log("Before: ")
    console.log(arr);
    console.log("id: "+id);

    arr.forEach(function(item){
        item.tasks.forEach((task)=> {
            item.tasks = item.tasks.filter(task => task.task_id != id);
        });
    });

    console.log("After: ");
    console.log(arr);

    var blockContent = document.querySelector("#block-content");
    while (blockContent.firstChild) {
        blockContent.removeChild(blockContent.firstChild);
    }
   
    createDashboard();
}

function changeCheckbox(e) {
    (e.checked == true) ? e.nextSibling.nextSibling.firstChild.style.textDecoration = "line-through" : e.nextSibling.nextSibling.firstChild.style.textDecoration = "none";
    console.log(e.nextSibling.nextSibling.firstChild);

}


function showAddSidebar(){
    var blockAdd = document.querySelector("#block-add");

    if (blockAdd.style.display == "none") {
        blockAdd.style.display = "flex";
    } else {
        blockAdd.style.display = "none";
    }
}

function hideAddSidebar(){    
    var blockAdd = document.querySelector("#block-add");

    if (blockAdd.style.display == "flex") {
        blockAdd.style.display = "none";
    } else {
        blockAdd.style.display = "flex";
    }
}

function addDashboard() {
    var addTitle = document.querySelector("#add-title").value;
    var addTask = document.querySelector("#add-task").value;

    arr.push({
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
    console.log(arr);

    hideAddSidebar();

    var blockContent = document.querySelector("#block-content");
    while (blockContent.firstChild) {
        blockContent.removeChild(blockContent.firstChild);
    }
   
    createDashboard();

    document.querySelector("#add-title").value = "";
    document.querySelector("#add-task").value = "";
}




function changeTitle(e,id){

    var newTitle = e.value;
    console.log(id);

   arr.forEach((item) => {
    if(item.item_id == id) {
        var oldTitle = item.title;
        console.log(oldTitle);
        console.log(newTitle);
        item.title = e.value;   
    }
   });
   
  console.log("After:");
  console.log(arr);

}

function addTask(e,id){

    if(e.value !== "") {
        console.log(e.value);
        console.log(id);

        arr.forEach((item) => {
            if(item.item_id == id) {

                    item.tasks.push({
                        task_id: generateId(),
                        selected: false,
                        name: e.value,
                    })
            }
        });
    }
    //e.value ="";
    /*var task= new DOMParser().parseFromString(`
            <input type="text" class="add-task" />
            `,"text/html").body.firstChild;

    document.querySelector(".tasks").insertBefore(task,document.querySelector(e));
    */
    
   var blockContent = document.querySelector("#block-content");
   while (blockContent.firstChild) {
       blockContent.removeChild(blockContent.firstChild);
   }
  
   createDashboard();

}


function changeTask(e,id){
    console.log(e.value);
    console.log(id);

    arr.forEach((item) => {
        item.tasks.forEach((task) => {
            if(task.task_id == id)
                task.name = e.value; 
        });
    });

    console.log("After:");
    console.log(arr);
}

function createDashboard(){

    arr.forEach((item,i)=>  {
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

