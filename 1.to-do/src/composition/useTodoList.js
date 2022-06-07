import { ref, watchEffect } from "vue";
import * as todoStorage from "../util/todoStorage";

export default function useTodoList() {
  const todosRef = ref(todoStorage.fetch());
  console.log("todosRef");
  console.log(todosRef);
  window.todosRef = todosRef; // 测试
  watchEffect(() => {
    todoStorage.save(todosRef.value);
  });

  return {
    todosRef,
  };
}
