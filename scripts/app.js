// G L O B A L   V A R I A B L E S
let isHidden = true;
let isImportant = true;


var hideIcon = `<i class="far fa-eye-slash"></i>`
var showIcon = `<i class="far fa-eye"></i>`

const allTasks = {
    nextTaskId: 1,
    tasks: [],
}


// D E S T R U C T U R E
var { nextTaskId, tasks } = allTasks;


// H I D E   S H O W   T A S K   I N F O
function hideShow() {
    // S H O W   T A S K   I N F O
    if (isHidden === true) {
        $("#details").show('slide',{direction:'right'},500);
        $("#btnHideShow")
            .html(hideIcon + "Hide Task Info")
            .removeClass("btn-secondary")
            .addClass("btn-primary");
        isHidden = false;

    } else {
        // H I D E   T A S K   I N F O
        $("#details").hide('slide',{direction:'right'},500);
        $("#btnHideShow")
            .html(showIcon + "Show Task Info")
            .removeClass("btn-primary")
            .addClass("btn-secondary");
        isHidden = true;
    }
}


// U P D A T E   T A S K   I D
function updateTaskId() {
    $("#taskId").val(nextTaskId);
}


// I M P O R T A N T   H A N D L E R
function importantHandler() {
    // I M P O R T A N T
    if (isImportant == false) {
        isImportant = true;
        $("#iconImp").removeClass("far").addClass("fas");

    } else if (isImportant == true) {
        isImportant = false;
        $("#iconImp").removeClass("fas").addClass("far");
    }
}


// D A T E   P I C K E R
function getDate() {
    $(".date").datepicker();
}


// C R E A T E   &   E D I T   T A S K
function createTask(e) {
    e.preventDefault();

    var inputTaskId = $("#taskId").val();
    var inputTask = $("#task").val();
    var inputImportant = isImportant;
    var inputStartDate = $("#taskStartDate").val();
    var inputEndDate = $("#taskEndDate").val();
    var inputStatus = $("#taskStatus").val();
    var inputDescription = $("#taskDescription").val();

    // U P D A T E   T A S K
    for (var i = 0; i < tasks.length; i ++) {
        var task = tasks[i];

        if (task.taskId == inputTaskId) {
            task.task = inputTask;
            task.important = inputImportant;
            task.startDate = inputStartDate;
            task.dueDate = inputEndDate;
            task.status = inputStatus;
            task.description = inputDescription;

            if (isImportant == true) {
                importantHandler();
            }
            
            $(".form-control").val("");
            $(".form-select").val("");
            $("#taskSubmit").val("Add Task");


            displayAllTasks();

            return;
        }
    }

    var newTask = new Task(inputTaskId, inputTask, inputImportant, inputStartDate, inputEndDate, inputStatus, inputDescription);
        
    tasks.push(newTask);

    
    if (isImportant == true) {
        importantHandler();
    }
    
    $(".form-control").val("");
    $(".form-select").val("");

    nextTaskId ++;
    updateTaskId();
    
    displayOneTask(newTask);
}


// D I S P L A Y   O N E   T A S K
function displayOneTask(task) {
    $("#noTasks").remove();
    var importantIcon = `<i id="" class="far fa-star mx-2"></i>`

    if (task.important == true) {
        importantIcon = `<i id="" class="fas fa-star mx-2"></i>`
    }

    var oneTask = `
        <div class="oneTask my-4 pt-3 d-flex align-items-center justify-content-between shadow px-3">
            <p class="">${importantIcon}</p>
            <p class="">${task.task}</p>
            <p class=""><i class="fas fa-calendar-alt">${task.dueDate}</i></p>
            <p class=""><i class="fas fa-info-circle" onclick="getOneTask(${task.taskId})"></i> Info</p>
            <p class=""><i class="complete far fa-square" onclick="completeTask(${task.taskId})"> Complete</i></p>
        </div>
    `;

    if (task.status !== "complete") {
        $("#allTasks").append(oneTask);
    }
}

// D I S P L A Y   A L L   T A S K S
function displayAllTasks() {
    $("#allTasks").html("");

    for (var i = 0; i < tasks.length; i ++) {
        displayOneTask(tasks[i]);
    }
}


// G E T   O N E   T A S K
function getOneTask(taskId) {
    for (var i = 0; i < tasks.length; i ++) {
        var task = tasks[i];

        if (task.taskId == taskId) {
            $("#taskId").val(task.taskId);
            $("#task").val(task.task);
            $("#iconImp").val(task.important);
            $("#taskStartDate").val(task.startDate);
            $("#taskEndDate").val(task.dueDate);
            $("#taskStatus").val(task.status);
            $("#taskDescription").val(task.description);
            $("#taskSubmit").val("Update Task");
        }
    }
}


// C O M P L E T E   T A S K
function completeTask(taskId) {
    for (var i = 0; i < tasks.length; i ++) {
        var task = tasks[i];

        if (task.taskId == taskId) {
            tasks[i].status = "complete"
        }
    }

    displayAllTasks();
}


// I N I T
function init() {
    console.log("Document ready.");

    // E V E N T   L I S T E N E R S
    $("#btnHideShow").click(hideShow);
    $("#iconImp").click(importantHandler);
    $(".date").click(getDate);
    $("#taskSubmit").click(createTask);
    $(".complete").on('click', completeTask);

    // F U N C T I O N S
    updateTaskId();
    hideShow();
    importantHandler();
    getDate();
}

window.onload = init;