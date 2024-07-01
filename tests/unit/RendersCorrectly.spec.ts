import { mount } from '@vue/test-utils';
import KanbanBoard from '@/components/KanbanBoard.vue';

describe('KanbanBoard.vue', () => {
  it('renders the Kanban board', () => {
    const wrapper = mount(KanbanBoard);
    expect(wrapper.exists()).toBe(true);
  });
});
