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
    } else {
      return (this.displayedTasks = this.tasks.filter(
        (task) => task.project === filter
      ))
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
    this.tasks.forEach((task, i) => {
      if (task.index === editedTask.index) {
        this.tasks[i] = editedTask
      }
    })
    return this.tasks
  },
  deleteTask: function (deleteTask) {
    this.tasks = this.tasks.filter((task) => task.index != deleteTask.index)
    return this.tasks.filter(
      (task) => task.project === projectsObject.projectFilter
    )
  },
}

const projectsObject = {
  projects: [],
  projectFilter: 'All Tasks',
  setProjectsFilter: function (filter) {
    this.projectFilter = filter
  },
  getSpecificProject: function (filter) {
    let returnProject = {}
    this.projects.forEach((project) => {
      if (project.index === filter) {
        returnProject = project
      }
    })

    return returnProject
  },
  setEditedProject: function (editedProject) {
    this.projects.forEach((project, i) => {
      if (project.index === editedProject.index) {
        tasksObject.tasks.forEach((task) => {
          if (task.project === this.projects[i].name) {
            task.project = editedProject.name
          }
        })
        this.projects[i] = editedProject
      }
    })

    return this.projects
  },
  deleteProject: function (index) {
    let deletedProject
    const deletePro = this.projects.filter((project) => {
      if (project.index === index) {
        deletedProject = project
      }
      return project.index !== index
    })
    this.projects = deletePro
    tasksObject.tasks = tasksObject.tasks.filter(
      (task) => task.project !== deletedProject.name
    )
    return this.projects
  },
}

// ----------------------------- TASK AND PROJECT CLASS ---------------------------- //

class newTask {
  constructor({ name, description, date, priority, completed }) {
    this.name = name
    this.description = description
    this.date = date
    this.priority = priority
    ;(this.index = tasksObject.getAllTasks().length),
      (this.project = projectsObject.projectFilter)
    this.completed = completed
  }

  addToTaskList(task) {
    tasksObject.tasks.push(task)
  }
}

class projects {
  constructor({ name }) {
    ;(this.name = name), (this.index = projectsObject.projects.length)
  }

  addProject(project) {
    projectsObject.projects.push(project)
    addProjectToSidenavDOM(projectsObject.projects)
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
        completed: 'not-completed',
      }

      const task = new newTask(taskObj)
      // ADD TASK TO LIST
      task.addToTaskList(task)

      div.style.display = 'none'
      const tasksToDisplay = tasksObject.filterTasks(
        projectsObject.projectFilter
      )
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
        project: specificTask.project,
        completed: specificTask.completed,
      }

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
    const projectObj = {
      name: input.value,
    }
    const project = new projects(projectObj)

    project.addProject(project)
    input.value = ''
    addProjectForm.style.display = 'none'
  })
})()

// -------------------------- EXTRA OPTIONS PROJECT TOGGLER ------------------------- //

const toggleProjectOptions = function (ele) {
  const optionsDiv = ele.parentElement
  const tagsElements = optionsDiv.getElementsByTagName('div')[0]
  tagsElements.style.display === 'block'
    ? (tagsElements.style.display = 'none')
    : (tagsElements.style.display = 'block')
}

// -------------------------- RENAME PROJECT ------------------------- //

const renameProject = (a) => {
  a.parentElement.style.display = 'none'
  const index = Number(
    a.parentElement.parentElement.parentElement.getAttribute('data-index')
  )
  const editProject = document.querySelector('.edit-project')
  const editProjectForm = document.querySelector('.edit-project-form')

  editProject.style.display = 'block'
  editProjectForm.addEventListener(
    'submit',
    (e) => {
      e.preventDefault()
      const projectObj = {
        name: e.target.elements['edited-project-name'].value,
        index: index,
      }

      changeTaskHeader(projectObj.name)
      a.parentElement.parentElement.parentElement.style.borderLeft =
        '5px solid var(--green-hover)'

      addProjectToSidenavDOM(projectsObject.setEditedProject(projectObj))
      editProject.style.display = 'none'
      editProjectForm.reset()
    },
    { once: true }
  )
}

// -------------------------- CHANGE TASK HEADER ------------------------- //

const changeTaskHeader = function (text) {
  const taskHeader = document.querySelector('.tasks-header .title')
  taskHeader.textContent = text
}

// -------------------------- ALTERNATE PROJECT ------------------------- //

const alternateTask = function (e) {
  const project = projectsObject.getSpecificProject(
    Number(e.getAttribute('data-index'))
  )

  if (project.name) {
    const projectNameDiv = document.querySelectorAll('.project-name-div')
    projectNameDiv.forEach((div) => (div.style.borderLeft = 'none'))
    e.style.borderLeft = '5px solid var(--green-hover)'
    const selectedProject = e.getElementsByTagName('H4')[0].textContent
    changeTaskHeader(selectedProject)
    projectsObject.setProjectsFilter(selectedProject)
    const tasksToDisplay = tasksObject.filterTasks(selectedProject)
    displayTasks(tasksToDisplay)
  }
}

// -------------------------- DELETE PROJECT ------------------------- //

const deleteProject = (e) => {
  const index = Number(
    e.parentElement.parentElement.parentElement.getAttribute('data-index')
  )
  alternateTask(document.querySelector('.all-tasks'))
  addProjectToSidenavDOM(projectsObject.deleteProject(index))
  // projectsObject.setProjectsFilter('All Tasks')
  // alternateTask()
}

// -------------------------- TASK COMPLETED ------------------------- //

const taskCompleted = (e) => {
  const index = Number(e.parentElement.parentElement.getAttribute('data-index'))
  const task = tasksObject.getSpecificTask(index)

  let checkCompleted = ''
  task.completed === 'not-completed'
    ? (checkCompleted = 'completed')
    : (checkCompleted = 'not-completed')
  const taskObj = {
    ...task,
    completed: checkCompleted,
  }

  tasksObject.setEditedTask(taskObj)
  displayTasks(tasksObject.filterTasks(projectsObject.projectFilter))
}
