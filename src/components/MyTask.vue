<template>
  <v-card class="custom-card">
    <v-card-title>{{ cards.title }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(card, cardIndex) in cards.cards"
          :key="card.id"
          :draggable="true"
          @dragstart="onDragStart(card)"
          @dragover.prevent
          @drop="onDrop"
        >
          <template v-if="!card.editing">
            <v-list-item-content @click="editCard(card, true)">
              <v-list-item-title>{{ card.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ card.description }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-text-field v-model="card.title" class="new-task-title-input" outlined dense></v-text-field>
              <v-textarea v-model="card.description" label="Description" outlined class="custom-textarea"></v-textarea>
              <v-btn class="custom-button" @click="saveEdit(card)">Save</v-btn>
              <v-btn class="custom-button" @click="editCard(card, false)">Cancel</v-btn>
            </v-list-item-content>
          </template>
          <v-divider v-if="cardIndex < cards.cards.length - 1"></v-divider>
        </v-list-item>
      </v-list>
      <v-text-field v-model="newTaskTitle" label="New Task Title" outlined dense class="custom-text-field"></v-text-field>
      <v-btn class="custom-button" @click="addTask">Add Task</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-btn class="custom-button" @click="removeCards">Remove Card</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

// Define props passed to the component
const props = defineProps<{
  cards: { title: string; cards: Card[] };
  columnIndex: number;
}>();

// Define Card type
interface Card {
  id: number;
  title: string;
  description: string;
  editing: boolean;
}

// Define emits
const emit = defineEmits<{
  (e: 'remove-cards', columnIndex: number): void;
  (e: 'add-task', columnIndex: number, taskTitle: string): void;
  (e: 'drag-start', card: Card, column: { title: string; cards: Card[] }): void;
  (e: 'drop', column: { title: string; cards: Card[] }): void;
  (e: 'edit-card', card: Card, isEditing: boolean): void;
}>();

const newTaskTitle = ref('');

// Handle drag start event
const onDragStart = (card: Card) => {
  emit('drag-start', card, props.cards);
};

// Handle drop event
const onDrop = () => {
  if (props.cards) {
    emit('drop', props.cards);
  }
};

const editCard = (card: Card, isEditing: boolean) => {
  emit('edit-card', card, isEditing);
};

// Save edits made to a card
const saveEdit = (card: Card) => {
  editCard(card, false);
};

// Add new task to the card
const addTask = () => {
  if (!props.cards) {
    return;
  }
  if (newTaskTitle.value.trim() === '') {
    return;
  }
  emit('add-task', props.columnIndex, newTaskTitle.value.trim());
  newTaskTitle.value = '';
};

const removeCards = () => {
  emit('remove-cards', props.columnIndex);
};
</script>

<style scoped>
.custom-card {
  background-color: rgb(251, 237, 193);
  border-radius: 16px;
  padding: 16px;
}

.custom-button {
  background-color: rgba(56, 17, 16, 1);
  color: white;
  border-radius: 16px;
  margin-right: 8px;
}

.v-list-item-content {
  cursor: pointer;
}
</style>
