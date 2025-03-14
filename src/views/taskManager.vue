<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Project Creation Form -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Create New Project</h2>
          <button @click="toggleProjectForm" class="text-gray-400 hover:text-gray-200">
            {{ isProjectFormVisible ? '−' : '+' }}
          </button>
        </div>
        <form @submit.prevent="createProject" v-if="isProjectFormVisible">
          <input
            v-model="newProjectTitle"
            placeholder="Project Title"
            required
            class="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
          />
          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add Project
          </button>
        </form>
      </div>

      <!-- Task Creation Form -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-md" v-if="projects.length > 0">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Add New Task</h2>
          <button @click="toggleTaskForm" class="text-gray-400 hover:text-gray-200">
            {{ isTaskFormVisible ? '−' : '+' }}
          </button>
        </div>
        <form @submit.prevent="createTask" v-if="isTaskFormVisible">
          <select
            v-model="newTaskProjectId"
            required
            class="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
          >
            <option value="" disabled selected>Select Project</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
              {{ project.title }}
            </option>
          </select>
          <input
            v-model="newTaskTitle"
            placeholder="Task Title"
            required
            class="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
          />

          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add Task
          </button>
        </form>
      </div>

      <!-- Dashboard - All Projects and Tasks -->
      <div class="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">All Projects Dashboard</h2>
        <div v-if="projects.length === 0" class="text-center text-gray-400 py-8">
          No projects yet. Create your first project above!
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="project in projects"
            :key="project.id"
            class="border border-gray-700 rounded-lg overflow-hidden"
          >
            <div class="bg-blue-800 text-white p-4 flex justify-between items-center">
              <h3 class="font-semibold">{{ project.title }}</h3>
              <button
                @click="deleteProject(project.id)"
                class="bg-indigo-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>

            <div class="p-4">
              <div
                v-if="getProjectTasks(project.id).length === 0"
                class="text-center text-gray-400 py-4"
              >
                No tasks in this project yet.
              </div>

              <div
                v-for="task in getProjectTasks(project.id)"
                :key="task.id"
                class="mb-3 p-3 rounded shadow-sm"
                :class="{
                  'bg-gray-700': task.completed,
                  'border-l-4 border-blue-500': !task.completed,
                  'border-l-4 border-yellow-500': !task.completed,
                  'border-l-4 border-red-500': !task.completed,
                  'border-l-4 border-gray-500': task.completed,
                }"
              >
                <div class="flex justify-between items-center mb-2">
                  <label class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      :checked="task.completed"
                      @change="toggleTaskStatus(task.id)"
                      class="h-4 w-4"
                    />
                    <span
                      class="font-medium"
                      :class="{ 'line-through text-gray-400': task.completed }"
                    >
                      {{ task.title }}
                    </span>
                  </label>
                  <div class="flex justify-end content-center">
                    <button
                      @click="deleteTask(task.id)"
                      class="bg-indigo-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProjectTitle: '',
      newTaskProjectId: '',
      newTaskTitle: '',

      projects: [],
      tasks: [],
      isProjectFormVisible: true,
      isTaskFormVisible: true,
    }
  },
  created() {
    // Load data from localStorage when the component is created
    this.loadData()
  },
  methods: {
    createProject() {
      const newProject = {
        id: Date.now(),
        title: this.newProjectTitle,
      }
      this.projects.push(newProject)
      this.newProjectTitle = ''
      this.saveData() // Save data to localStorage
    },
    createTask() {
      const newTask = {
        id: Date.now(),
        projectId: this.newTaskProjectId,
        title: this.newTaskTitle,

        completed: false,
      }
      this.tasks.push(newTask)
      this.newTaskTitle = ''

      this.saveData() // Save data to localStorage
    },
    deleteProject(projectId) {
      this.projects = this.projects.filter((project) => project.id !== projectId)
      this.tasks = this.tasks.filter((task) => task.projectId !== projectId)
      this.saveData() // Save data to localStorage
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.saveData() // Save data to localStorage
    },
    toggleTaskStatus(taskId) {
      const task = this.tasks.find((task) => task.id === taskId)
      if (task) {
        task.completed = !task.completed
        this.saveData() // Save data to localStorage
      }
    },
    getProjectTasks(projectId) {
      return this.tasks.filter((task) => task.projectId === projectId)
    },
    toggleProjectForm() {
      this.isProjectFormVisible = !this.isProjectFormVisible
    },
    toggleTaskForm() {
      this.isTaskFormVisible = !this.isTaskFormVisible
    },
    saveData() {
      // Save projects and tasks to localStorage
      localStorage.setItem('projects', JSON.stringify(this.projects))
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    loadData() {
      // Load projects and tasks from localStorage
      const savedProjects = localStorage.getItem('projects')
      const savedTasks = localStorage.getItem('tasks')
      if (savedProjects) {
        this.projects = JSON.parse(savedProjects)
      }
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks)
      }
    },
  },
}
</script>

<style>
/* Optional: Add custom styles if needed */
</style>
