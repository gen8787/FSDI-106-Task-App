// G L O B A L   V A R I A B L E S
let isHidden = true;
let isImportant = false;

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


// I M P O R A N T   H A N D L E R
function importantHandler() {
    // N O T   I M P O R T A N T
    if (isImportant === false) {
        $("#iconImp").removeClass("fas").addClass("far");
        isImportant = true;

    } else {
        // I M P O R T A N T
        $("#iconImp").removeClass("far").addClass("fas");
        isImportant = false;
    }
}


// D A T E   P I C K E R
function getDate() {
    $(".date").datepicker();
}


// I N I T
function init() {
    console.log("Document ready.");

    // E V E N T   L I S T E N E R S
    $("#todo").keypress(function(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            e.preventDefault();
            createTodo();
        }
    });

    $("#btnHideShow").click(hideShow);
    $("#iconImp").click(importantHandler);
    $(".date").click(getDate);

    hideShow();
    importantHandler();
    getDate();
}

window.onload = init;