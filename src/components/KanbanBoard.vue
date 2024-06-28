<template>
  <v-container class="custom-background fixed-size-container">
    <!-- Add New Card Section -->
    <v-row class="no-wrap">
      <v-col cols="12">
        <v-card class="custom-card add-column-card">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Add New Card</span>
            <v-text-field v-model="newColumnName" label="Card Name" outlined dense class="mx-2"></v-text-field>
            <v-btn class="custom-button" @click="addColumn">Add</v-btn> 
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Cards Section -->
    <v-row class="no-wrap">
      <v-col v-for="(cards, columnIndex) in columns" :key="cards.id" class="card-column"> 
        <MyTask :cards="cards" :columnIndex="columnIndex" @remove-cards="removeColumn" @add-task="addTask" @drag-start="onDragStart" @drop="onDrop" @edit-card="editCard" /> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'; 
import MyTask from './MyTask.vue'; 


interface Card {
  id: number;
  title: string;
  description: string;
  editing: boolean;
}

interface Column {
  id: number;
  title: string;
  cards: Card[];
}

const columns: Ref<Column[]> = ref([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, title: 'Task 1', description: 'Description 1', editing: false },
      { id: 2, title: 'Task 2', description: 'Description 2', editing: false },
    ],
  },
  {
    id: 2,
    title: 'Doing',
    cards: [
      { id: 3, title: 'Task 3', description: 'Description 3', editing: false },
    ],
  },
  {
    id: 3,
    title: 'Done',
    cards: [
      { id: 4, title: 'Task 4', description: 'Description 4', editing: false },
    ],
  },
]);

const nextColumnId: Ref<number> = ref(columns.value.length + 1);
const newColumnName: Ref<string> = ref('');
const newTaskTitle: Ref<string[]> = ref(Array(columns.value.length).fill(''));

const draggedCard: Ref<Card | null> = ref(null);
const draggedFromColumn: Ref<Column | null> = ref(null);

const onDragStart = (card: Card, column: Column) => {
  draggedCard.value = card;
  draggedFromColumn.value = column;
};

const onDrop = (targetColumn: Column) => {
  if (draggedCard.value && draggedFromColumn.value) {
    const cardIndex = draggedFromColumn.value.cards.indexOf(draggedCard.value);
    draggedFromColumn.value.cards.splice(cardIndex, 1);
    targetColumn.cards.push(draggedCard.value);
    draggedCard.value = null;
    draggedFromColumn.value = null;
  }
};

const editCard = (card: Card, isEditing: boolean) => {
  card.editing = isEditing;
};

const addColumn = () => {
  if (newColumnName.value.trim() === '') {
    return;
  }
  columns.value.push({
    id: nextColumnId.value++,
    title: newColumnName.value.trim(),
    cards: [],
  });
  newColumnName.value = '';
  newTaskTitle.value.push('');
};

const removeColumn = (index: number) => {
  columns.value.splice(index, 1);
  newTaskTitle.value.splice(index, 1);
};

const addTask = (columnIndex: number, title: string) => {
  if (title.trim() === '') {
    return;
  }
  columns.value[columnIndex].cards.push({
    id: Date.now(),
    title,
    description: '',
    editing: false,
  });
  newTaskTitle.value[columnIndex] = '';
};
</script>

<style scoped>
.fixed-size-container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.no-wrap {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
}

.card-column {
  flex: 0 0 auto;
  width: 250px;
  margin-right: 20px;
}

.custom-card {
  background-color: rgb(251, 237, 193);
  border-radius: 16px;
}

.custom-button {
  background-color: rgba(56, 17, 16, 1);
  color: white;
  border-radius: 16px;
  margin-right: 8px;
}

.add-column-card {
  background-color: rgba(242, 184, 180, 1);
  margin-bottom: 20px;
  width: 50%;
}

.mx-2 {
  margin-left: 10px;
  margin-right: 10px;
}

.d-flex {
  display: flex;
}

.justify-space-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}
</style>