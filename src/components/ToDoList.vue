<template>
  <div class="card">
    <div class="card-body">
      <h3>To Do List</h3>
      <select
        class="form-select"
        aria-label="Default select example"
        @change="getTasksOfProject()"
        v-model="project_id"
      >
        <option disabled>Choisir un projet :</option>
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.name_project }}
        </option>
      </select>
      <div class="add-task" v-if="changed === true">
        <input
          type="text"
          placeholder="Add new Task"
          class="task-input"
          autocomplete="off"
          v-model="new_task"
          id="task"
          @keyup.enter="newItem"
        />
        <input type="submit" value=" " class="submit-task" @click="newItem" />
      </div>
      <div v-else>
        <img src="@/assets/images/to_do_list.png" alt="" />
      </div>
      <ul class="task-list">
        <li class="task-list-item" v-for="task in tasks" :key="task.name">
          <label class="task-list-item-label">
            <input
              type="checkbox"
              :checked="task.status == 1"
              @click="updateStateTask(task.id)"
            />
            <span class="label">{{ task.name }}</span>
          </label>
          <button
            :style="
              task.current_task == 1 ? 'background-color:green;color:white' : ''
            "
            class="current-task-btn"
            title="Current Task"
            @click="setCurrentTask(task.id)"
          >
            Current
          </button>
          <span
            class="delete-btn"
            title="Delete Task"
            @click="deleteItem(task)"
            >{{ task.del }}</span
          >
        </li>
      </ul>
      <div class="filter-btn" v-if="this.tasks.length >= 1">
        <button type="submit" class="filter-btn-btn">All</button>
        <button type="submit" class="filter-btn-btn">Complete</button>
        <button type="submit" class="filter-btn-btn">Incomplete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "@/axios";
export default {
  name: "ToDoList",
  data() {
    return {
      title: "To Do List",
      new_task: null,
      tasks: [],
      projects: [],
      project_id: "Choisir un projet :",
    };
  },
  methods: {
    getListProjects: function () {
      let response = axiosClient.get("/auth/show-projects");
      const list_projects = Promise.resolve(response);
      list_projects.then((value) => {
        if (value.data["status"] == 200) {
          this.projects = value.data["projects"];
        }
      });
    },
    getTasksOfProject: function () {
      let response = axiosClient.get("/auth/show-tasks-project", {
        params: {
          project_id: this.project_id,
        },
      });
      const list_projects = Promise.resolve(response);
      list_projects.then((value) => {
        if (value.data["status"] == 200) {
          this.tasks = value.data["tasks"];
        }
      });
    },
    newItem: function () {
      if (this.changed == true) {
        if (!this.new_task) {
          return;
        }
        let response = axiosClient.post("/auth/add-task", {
          project_id: this.project_id,
          title: this.new_task,
        });
        const add_task = Promise.resolve(response);
        add_task.then((value) => {
          if (value.data["status"] == 201) {
            this.getTasksOfProject();
            // this.tasks.push({
            //   name: this.new_task,
            //   del: "",
            // });
            this.new_task = "";
            this.$toast.show("Tâche créé avec succès", {
              type: "success",
              position: "top-right",
            });
          }
        });
      } else {
        this.$toast.show("Choisir un projet s'il vous plait !!", {
          type: "error",
          position: "top-right",
        });
        this.new_task = "";
      }
    },
    deleteItem: function (task) {
      let response = axiosClient.post("/auth/delete-task", {
        task_id: this.tasks[this.tasks.indexOf(task)].id,
      });
      const delete_task = Promise.resolve(response);
      delete_task.then((value) => {
        if (value.data["status"] == 200) {
          this.tasks.splice(this.tasks.indexOf(task), 1);
          this.$toast.show("Tâche supprimée avec succès", {
            type: "success",
            position: "top-right",
          });
        }
      });
    },
    updateStateTask: function (id) {
      let response = axiosClient.post("/auth/update-task", {
        task_id: id,
      });
      const update_task = Promise.resolve(response);
      update_task.then((value) => {
        if (value.data["status"] != 200) {
          this.$toast.show(
            "Erreur de serveur , Actualiser la page s'il vous plait",
            {
              type: "error",
              position: "top-right",
            }
          );
        }
      });
    },
    setCurrentTask: function (id) {
      let response = axiosClient.post("/auth/update-task-current", {
        task_id: id,
      });
      const update_task_current = Promise.resolve(response);
      update_task_current.then((value) => {
        if (value.data["status"] == 200) {
          this.getTasksOfProject();
        } else {
          this.$toast.show(
            "Erreur de serveur , Actualiser la page s'il vous plait",
            {
              type: "error",
              position: "top-right",
            }
          );
        }
      });
    },
  },
  computed: {
    changed() {
      return this.project_id !== "Choisir un projet :";
    },
  },
  mounted() {
    //rempllir liste des projets dans select
    this.getListProjects();
  },
};
</script>
<style scoped>
.card {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin: 4%;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.4);
}
.add-task {
  height: 40px;
  font-size: 14px;
  display: flex;
}
.filter-btn-btn {
  background-color: #ffe0ea;
  border: 0px;
  border-radius: 10px;
  margin-left: 3%;
  margin-right: 3%;
  padding: 1% 2%;
}
.current-task-btn {
  border: 1px solid green;
  background-color: transparent;
  color: green;
  border-radius: 20px;
  font-size: 15px;
  display: block;
  margin-left: auto;
  margin-right: 30px;
  position: relative;
}
.current-task-btn:focus {
  background-color: green;
  color: white;
}
.delete-btn {
  /* margin-left: auto; */
  margin-right: 2px;
  display: block;
  width: 28px;
  height: 28px;
  padding-left: 5%;
  background-image: url("../assets/images/trash.png");
  background-repeat: no-repeat;
  background-size: 28px;
  cursor: pointer;
}
.form-select {
  background-color: transparent;
  margin-top: 5%;
  margin-bottom: 3%;
  border: 1px solid #272727;
  border-radius: 10px;
}
.form-select:focus {
  border: 1px solid #272727;
  box-shadow: none;
}
option {
  background-color: #d1d1d4;
  border-radius: 10px;
}
.task-input {
  width: 100%;
  padding: 0 5px;
  outline: none;
  border: none;
  border-bottom: 1px solid #272727;
  background-color: transparent;
  margin-right: 18px;
  color: #272727;
  box-shadow: none;
  border-radius: 0;
}
.task-input::placeholder {
  color: #272727;
}
.task-list-item {
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 35px;
  margin-bottom: 12px;
}
.task-list {
  margin-top: 15px;
  margin-right: 5px;
}
.task-list-item input {
  width: 28px;
  height: 28px;
  border: 1px solid #272727;
  border-radius: 50%;
  background-image: url("../assets/images/check.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0;
  transition: 0.2s;
  margin-right: 8px;
  flex-shrink: 0;
  appearance: none;
}
.task-list-item input:hover {
  border-color: var(--checkbox-color);
  box-shadow: 0 0 0 3px var(--checkbox-shadow);
}
.task-list-item input:checked {
  background-size: 26px;
  border: 1px solod var(--checkbox-color);
  background-color: var(--checkbox-color);
}
.task-list-item input:checked + span {
  color: #272727;
  text-decoration: line-through #272727;
}
.task-list-item-label {
  display: flex;
  align-items: flex-start;
  color: #272727;
  margin-right: 8px;
  font-size: 14px;
  line-height: 24px;
  position: relative;
  transition: 0.2s;
  cursor: pointer;
}
.label {
  padding-left: 5px;
  width: 85%;
  text-transform: capitalize;
}
.submit-task {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  background: var(--add-button);
  color: #272727;
  background-image: url("../assets/images/add.png");
  background-size: 25px;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 12px 0 var(--add-button-shadow);
}
</style>
