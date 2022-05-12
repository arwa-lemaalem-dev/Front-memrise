<template>
  <div class="card">
    <div class="card-body">
      <h3>To Do List</h3>
      <div class="add-task">
        <input type="text" placeholder="Add new Task" class="task-input" />
        <input type="submit" value="" class="submit-task" title="Add Task" />
      </div>
      <ul class="task-list">
        <li class="task-list-item" v-for="task in tasks" :key="task.name">
          <label class="task-list-item-label">
            <input type="checkbox"/>
            <span class="label">{{task.name}}</span>
          </label>
          <span class="delete-btn" title="Delete Task"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDoList",
  data() {
    return {
      title:'To Do List',
      tasks:[
        {name:'Man. user'},
        {name:'Man. role'},
      ]
    };
  },
  setup() {},
  methods: {},
  mounted() {},
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
.task-input::placeholder{
  color:#272727
}
.task-list-item{
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  padding:10px;
  border-radius: 35px;
  margin-bottom: 12px;
}
.task-list{
  margin-top: 15px;
}
.task-list-item input{
  width: 28px;
  height: 28px;
  border:1px solid #272727;
  border-radius: 50%;
  background-image: url("../assets/images/check.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0;
  transition: 0.2s;
  margin-right:8px;
  flex-shrink: 0;
  appearance: none;
}
.task-list-item input:hover{
  border-color:var(--checkbox-color);
  box-shadow: 0 0 0  3px var(--checkbox-shadow);
}
.task-list-item input:checked{
  background-size:26px;
  border:1px solod var(--checkbox-color);
  background-color: var(--checkbox-color);
}
.task-list-item input:checked + span{
  color: #272727;
  text-decoration: line-through #272727;
}
.task-list-item-label{
  display:flex;
  align-items:flex-start;
  color:#272727;
  margin-right: 8px;
  font-size:14px;
  line-height:24px;
  position: relative;
  transition: 0.2px;
  cursor:pointer
}
.delete-btn{
  margin-left:auto;
  margin-right:5px;
  display:block;
  width:28px;
  height:28px;
  background-image:url("../assets/images/trash.png");
  background-repeat: no-repeat;
  background-size: 28px;
  cursor: pointer;
}
.label{
  padding-left:5px
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
