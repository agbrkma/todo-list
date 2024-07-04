class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title,
            this.description = description,
            this.dueDate = dueDate,
            this.priority = priority
    }
}

class Project {
    constructor(name) {
        this.name = name
        this.todos = []
        this.selected = false
    }
    setSelected() {
        this.selected = true
    }

    addTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority)
        this.todos.push(todo)
    }
}

const allProjects = [];

const createNewTodo = () => {

    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].selected === true) {

            allProjects[i].addTodo(prompt('Title'), prompt('Description'), prompt('Due Date'), prompt('Priority'))
        }
    }

}

const showTodos = () => {
    allProjects.map(project => {
        project.selected ?
            project.todos.forEach(todo => {
                const singleTodo = document.createElement('div')
                const item = document.createElement('h4')
                item.textContent = todo.title
                todosDiv.append(item)
            }) : project
    })

}


const createNewProject = () => {
    //change to some type of form
    const name = prompt('enter project name')
    const project = new Project(name, [])
    allProjects.push(project)
}

const showProjects = () => {

    allProjects.map(project => {
        const newProject = document.createElement('h4')
        newProject.textContent = project.name
        newProject.classList.add('project')
        projectsDiv.append(newProject)
    })
    console.log(allProjects)
}


const addProjectBtn = document.getElementById('addProject')
addProjectBtn.addEventListener('click', () => {
    createNewProject()
    projectsDiv.innerHTML = ''
    showProjects()
})

const addTodoBtn = document.getElementById('addTodo')
addTodoBtn.addEventListener('click', () => {

    createNewTodo()
    console.log(allProjects)

})

const todosDiv = document.getElementById('todos-list')

const projectsDiv = document.getElementById('projects-list')
projectsDiv.addEventListener('click', (e) => {
    allProjects.forEach(proj => {
        proj.selected = false
    })

    // console.log(e.target.closest('h4').textContent)
    const clickedProject = e.target.closest('h4')
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].name === clickedProject.textContent) {
            allProjects[i].setSelected()
            clickedProject.setAttribute('style', 'background-color: green')
        }


    }
    console.log(allProjects)
})