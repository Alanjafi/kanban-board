import { mount } from '@vue/test-utils';
import KanbanBoard from '@/components/KanbanBoard.vue';

describe('KanbanBoard.vue', () => {
  it('moves a task to another column', async () => {
    const wrapper = mount(KanbanBoard);
    const [sourceColumn, targetColumn] = wrapper.vm.columns;
    const card = sourceColumn.cards[0];

    await wrapper.vm.onDragStart(card, sourceColumn);
    await wrapper.vm.onDrop(targetColumn);

    expect(sourceColumn.cards.includes(card)).toBe(false);
    expect(targetColumn.cards.includes(card)).toBe(true);
  });
});
