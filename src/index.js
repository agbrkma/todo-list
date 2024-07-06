

window.addEventListener('load', () => {
    showProjects()
    showTodos()
})

function saveProjectsToLocalStorage(projectArr){
    localStorage.setItem('allProjects', JSON.stringify(projectArr.map(project => project.toJSON())))
}

function  getProjectsFromLocalStorage(){
    const plainProjects = JSON.parse(localStorage.getItem('allProjects'))
    const remadeProjects = plainProjects.map(project => Project.fromJSON(project))
    return remadeProjects
}


class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title,
            this.description = description,
            this.dueDate = dueDate,
            this.priority = priority
    }
    editTodo(){
        this.title = prompt(`${this.title}`)
        this.description = prompt(`${this.description}`)
        this.dueDate = prompt(`${this.dueDate}`)
        this.priority = prompt(`${this.priority}`)

        saveProjectsToLocalStorage(allProjects)

        showTodos()
    }

    toJSON(){
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority
        }
    }
    
    static fromJSON(json){
        return Object.assign(new Todo(), json)
    }
}

class Project {
    constructor(name, todos, selected) {
        this.name = name
        this.todos = todos
        this.selected = selected
    }
    setSelected() {
        this.selected = true
    }

    addTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority)
        this.todos.push(todo)
        
        saveProjectsToLocalStorage(allProjects)

    }

    deleteTodo(todoTitle) {
        const selectedProject = allProjects.find(proj => proj.selected === true)
        const deleteIndex = selectedProject.todos.findIndex(todo => todo.title === todoTitle)
        selectedProject.todos.splice(deleteIndex, 1)
    
        saveProjectsToLocalStorage(allProjects)

        showTodos()
    }

    toJSON() {
        return {
            name: this.name,
            selected: this.selected,
            todos: this.todos.map(todo => todo.toJSON())
        };
    }

    static fromJSON(json) {
        const todos = json.todos.map(todoJson => Todo.fromJSON(todoJson))
        return Object.assign(new Project(), {...json, todos})
    }
}


const allProjects = getProjectsFromLocalStorage()


const createNewTodo = () => {
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].selected === true) {

            allProjects[i].addTodo(prompt('Title'), prompt('Description'), prompt('Due Date'), prompt('Priority'))
        }
    }
    saveProjectsToLocalStorage(allProjects)
}

const showTodos = () => {
    const projects = getProjectsFromLocalStorage()
    todosDiv.innerHTML = '';
    projects.map(project => {
        project.selected ?
            project.todos.forEach(todo => {
                const wholeTodo = document.createElement('div')
                wholeTodo.classList.add('todo') 
                const item = document.createElement('h4')
                item.textContent = `${todo.title} Due: ${todo.dueDate}`
                const editBtn = document.createElement('button')
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit-btn')
                editBtn.addEventListener('click', () => {
                    todo.editTodo()
                })
                const deleteBtn = document.createElement('button')
                deleteBtn.textContent = 'X'
                deleteBtn.classList.add('delete-btn')
                deleteBtn.addEventListener('click', () => {
                    project.deleteTodo(todo.title)
                })
                const showDetails = document.createElement('button')
                showDetails.innerHTML = '&#8595'
                showDetails.classList.add('show-details')

                showDetails.addEventListener('click', () => {
                    console.log('clicked show details')
                    const desc = document.createElement('div')
                    desc.textContent = todo.description
                    desc.classList.add('desc')
                    const closeBtn = document.createElement('button')
                    closeBtn.textContent = 'x'
                    closeBtn.className = 'close-desc'
                    desc.append(closeBtn)
                    if(!wholeTodo.classList.contains(desc)){
                        wholeTodo.append(desc)
                    }
                    closeBtn.addEventListener('click', () => {
                        desc.parentNode.removeChild(desc)
                    })
                })
                
                wholeTodo.append(item)
                wholeTodo.append(editBtn)
                wholeTodo.append(showDetails)
                wholeTodo.append(deleteBtn)
                todosDiv.append(wholeTodo)
            }) : project
    })

}


const createNewProject = () => {
    const name = prompt('enter project name')
    const project = new Project(name, [], false)
    allProjects.push(project)
    saveProjectsToLocalStorage(allProjects)
}

const showProjects = () => {
    const projects = getProjectsFromLocalStorage()
    projectsDiv.innerHTML = ''
    projects.map(project => {
        const newProject = document.createElement('h4')
        newProject.textContent = project.name
        newProject.classList.add('project')
        projectsDiv.append(newProject)
    })
}


const addProjectBtn = document.getElementById('addProject')
addProjectBtn.addEventListener('click', () => {
    createNewProject()
    showProjects()
})

const addTodoBtn = document.getElementById('addTodo')
addTodoBtn.addEventListener('click', () => {
    createNewTodo()
    showTodos()
})

const todosDiv = document.getElementById('todos-list')
const projectsDiv = document.getElementById('projects-list')

projectsDiv.addEventListener('click', (e) => {
    allProjects.forEach(proj => {
        proj.selected = false
    })
    

    const clickedProject = e.target.closest('h4')
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].name === clickedProject.textContent) {
            allProjects[i].selected = true   

            saveProjectsToLocalStorage(allProjects)

            showProjects()
            showTodos()
        }
    }   
})

