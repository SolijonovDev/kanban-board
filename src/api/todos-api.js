import { $api } from ".";

export const Api = {
  async fetchTodos() {
    const { data } = await $api.get('datas');
    return data;
  },
  async updateTodos(object) {
    await $api.put('datas', object);
  },
  async addTodo(todo) {
    const res = await $api.post('todo', todo);
    return res;
  }
}