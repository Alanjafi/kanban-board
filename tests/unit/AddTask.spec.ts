import { mount } from '@vue/test-utils';
import KanbanBoard from '@/components/KanbanBoard.vue';

describe('KanbanBoard Component', () => {
  it('checks if a new task is added to the column', () => {
    const wrapper = mount(KanbanBoard);
    const newTaskTitle = 'New Task';

    const columnIndex = 0;
    wrapper.vm.addTask(columnIndex, newTaskTitle);

    expect(wrapper.vm.columns[columnIndex].cards.some((card: any) => 
        card.title === newTaskTitle)).toBe(true);
  });
});
