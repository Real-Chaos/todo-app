// ----------------------------- ALL TASKS ---------------------------- //

const tasksObject = {
  tasks: [],
  displayedTasks: [],
  getAllTasks: function () {
    return this.tasks
  },

  filterTasks: function (filter) {
    if (filter === 'All Tasks') {
      return this.getAllTasks()
    }
  },
  getSpecificTask: function (filter) {
    let returnTask = {}
    this.tasks.forEach((task) => {
      if (task.index === filter) {
        returnTask = task
      }
    })

    return returnTask
  },
  setEditedTask: function (editedTask) {
    console.log(editedTask)
    const filter = this.tasks.filter((task) => task.index != editedTask.index)
    console.log(filter)
    this.tasks = [...filter, editedTask]
    return this.tasks
  },
  deleteTask: function(deleteTask) {
    this.tasks = this.tasks.filter((task) => task.index != deleteTask.index)
    return this.tasks
  }
}

// ----------------------------- TASK AND PROJECT CLASS ---------------------------- //

class newTask {
  constructor({ name, description, date, priority }) {
    this.name = name
    this.description = description
    this.date = date
    this.priority = priority
    this.index = tasksObject.getAllTasks().length
  }

  addToTaskList(task) {
    tasksObject.tasks.push(task)
  }
}


class projects {
  constructor(name) {
    this.name = name
    this.projectsArray = []
  }

  addProject(project) {
    this.projectsArray.push(project)
    addProjectToSidenavDOM(this.projectsArray)
  }
}

// ----------------------------- FUNCTIONS TO CALL------------------------------ //

const recallFunctions = () => {
  const tasksToDisplay = tasksObject.filterTasks('All Tasks')
  displayTasks(tasksToDisplay)
}

// ----------------------------- ADD SUBMIT FORM ------------------------------ //

const addTask = function () {
  const taskForm = document.querySelector('.add-task-form')
  const div = document.querySelector('.add-task-form-div')

  taskForm.addEventListener(
    'submit',
    (e) => {
      e.preventDefault()
      const taskObj = {
        name: e.target.elements.taskName.value,
        description: e.target.elements.description.value,
        date: e.target.elements.date.value,
        priority: e.target.elements.priority.value,
      }

      const task = new newTask(taskObj)
      // ADD TASK TO LIST
      task.addToTaskList(task)

      div.style.display = 'none'
      const tasksToDisplay = tasksObject.filterTasks('All Tasks')
      displayTasks(tasksToDisplay)
      taskForm.reset()
    },
    { once: true }
  )
}

// ----------------------------- EDIT TASK ------------------------------ //

const editTask = (e) => {
  let taskIndex = Number(
    e.parentElement.parentElement.getAttribute('data-index')
  )
  const specificTask = tasksObject.getSpecificTask(taskIndex)
  editTaskFormDOM(specificTask)

  const taskForm = document.querySelector('.edit-task-form')
  const div = document.querySelector('.edit-tasks-form-div')
  console.log(taskForm)
  taskForm.addEventListener(
    'submit',
    (e) => {
      e.preventDefault()
      const taskObj = {
        name: e.target.elements.taskName.value,
        description: e.target.elements.description.value,
        date: e.target.elements.date.value,
        priority: e.target.elements.priority.value,
        index: specificTask.index,
      }

      console.log(taskObj)
      displayTasks(tasksObject.setEditedTask(taskObj))
      div.style.display = 'none'
      taskForm.reset()
    },
    { once: true }
  )
}

// ----------------------------- DELETE TASK ------------------------------ //


const deleteTask = (e) => {
  let taskIndex = Number(
    e.parentElement.parentElement.getAttribute('data-index')
  )
  const specificTask = tasksObject.getSpecificTask(taskIndex)
  displayTasks(tasksObject.deleteTask(specificTask))
}

// ----------------------------- ADD PROJECT ------------------------------ //

const addProjectToSidenav = (function () {
  const addProjectForm = document.querySelector('.add-project-form')
  const input = document.querySelector('#project-name')
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const project = new projects(input.value)
    project.addProject(project)
    input.value = ''
    toggleProjectOptions()
  })
})()