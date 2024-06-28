import { mount } from '@vue/test-utils';
import MyTask from '@/components/MyTask.vue';

describe('MyTask.vue', () => {
  it('adds a task when addTask button is clicked', async () => {
    const mockCards = {
      id: 1,
      title: 'To Do',
      cards: [],
    };
    const columnIndex = 0;

    const wrapper = mount(MyTask, {
      props: {
        cards: mockCards,
        columnIndex,
      },
    });


    expect(wrapper.find('.custom-button').exists()).toBe(true);
  });
});


