// ----------------------------- ALL TASKS ---------------------------- //

const tasksObject = {
  tasks: [],
  getAllTasks: function () {
    return this.tasks
  },
  filterTasks: function (filter) {
    if (filter === 'All Tasks') {
      return this.getAllTasks()
    }
  },
}

// ----------------------------- TASK CLASS---------------------------- //

class newTask {
  constructor({ name, description, date, priority }) {
    this.name = name
    this.description = description
    this.date = date
    this.priority = priority
  }

  addToTaskList(task) {
    tasksObject.tasks.push(task)
  }
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

      // DISPLAY THE RIGHT TASKS 
      const tasksToDisplay = tasksObject.filterTasks('All Tasks')
      displayTasks(tasksToDisplay)
      div.style.display = 'none'
      taskForm.reset()
    },
    { once: true }
  )
}
