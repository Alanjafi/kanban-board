<template>
  <v-card class="custom-card">
    <v-card-title>{{ cards?.title }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(card, cardIndex) in cards?.cards"
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
              <v-text-field v-model="newTaskTitle" class="new-task-title-input" outlined dense></v-text-field>
              <v-textarea v-model="card.description" label="Description" outlined class="custom-textarea"></v-textarea>
              <v-btn class="custom-button" @click="saveEdit(card)">Save</v-btn>
              <v-btn class="custom-button" @click="editCard(card, false)">Cancel</v-btn>
            </v-list-item-content>
          </template>
          <v-divider v-if="cardIndex < cards?.cards.length - 1"></v-divider>
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

const props = defineProps<{
  cards: Record<string, any>;
  columnIndex: number;
}>();

const emit = defineEmits(['remove-cards', 'add-task', 'drag-start', 'drop', 'edit-card']);

const newTaskTitle = ref('');

const onDragStart = (card: any) => {
  emit('drag-start', card, props.cards);
};

const onDrop = () => {
  if (props.cards) {
    emit('drop', props.cards);
  }
};

const editCard = (card: any, isEditing: boolean) => {
  emit('edit-card', card, isEditing);
};

const saveEdit = (card: any) => {
  editCard(card, false);
};

const addTask = () => {
  if (props.cards) {
    emit('add-task', props.columnIndex, newTaskTitle.value.trim());
    newTaskTitle.value = '';
  }
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
