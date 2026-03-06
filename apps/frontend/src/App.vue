<template>
  <div id="app">
    <h1>Realtime Projects Manager</h1>
    
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab', { active: currentTab === tab.id }]"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <UserList v-if="currentTab === 'users'" />
      <ProjectList v-if="currentTab === 'projects'" />
      <TaskList v-if="currentTab === 'tasks'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserList from './components/UserList.vue';
import ProjectList from './components/ProjectList.vue';
import TaskList from './components/TaskList.vue';

const tabs = [
  { id: 'users', name: 'Users' },
  { id: 'projects', name: 'Projects' },
  { id: 'tasks', name: 'Tasks' }
];

const currentTab = ref('users');
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.tab {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  border-radius: 4px;
}

.tab:hover {
  background: #f0f0f0;
}

.tab.active {
  background: #007bff;
  color: white;
}

.content {
  min-height: 400px;
}
</style>