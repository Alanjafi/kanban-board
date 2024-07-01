import { mount } from '@vue/test-utils';
import KanbanBoard from '@/components/KanbanBoard.vue';

describe('KanbanBoard.vue', () => {
  it('removes a column', async () => {
    const wrapper = mount(KanbanBoard);
    const initialColumnCount = wrapper.vm.columns.length;

    await wrapper.vm.removeColumn(0);

    expect(wrapper.vm.columns.length).toBe(initialColumnCount - 1);
  });
});
