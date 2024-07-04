class Todo {
    constructor() {

        constructor(title, description, dueDate, priority); {
            this.title = title,
                this.description = description,
                this.dueDate = dueDate,
                this.priority = priority

        }
    }
}

class Project {
    constructor(name, todos, selected){
        this.name = name
        //an array of todos for the given project
        this.todos = todos
        this.selected = false
    }
    setSelected(){
        this.selected = true
    }
    
    addTodo(todo){
        this.todos.push(todo)
    }
}

const allProjects = []




function createNewProject(){
    //change to some type of form
    const name = prompt('enter project name')
    const project = new Project(name, [])
    allProjects.push(project)

    const newProject = document.createElement('h4')
    newProject.textContent = name
    newProject.classList.add('project')
    projectsDiv.append(newProject)
    console.log(allProjects)
}

const addProjectBtn = document.getElementById('addProject')
addProjectBtn.addEventListener('click', () => createNewProject())

const addTodoBtn = document.getElementById('addTodo')
addTodoBtn.addEventListener('click', () => createNewTodo())

const projectsDiv = document.getElementById('projects-div')
projectsDiv.addEventListener('click', (e) => {
    //when clicking on a project, set its selected value to true and others to false
    allProjects.forEach(proj => {
        proj.selected = false
    })

    // console.log(e.target.closest('h4').textContent)
    const clickedProject = e.target.closest('h4')
    for(let i = 0; i < allProjects.length; i++){
        if(allProjects[i].name === clickedProject.textContent){
            allProjects[i].setSelected()

        }
    }
    console.log(allProjects)
})