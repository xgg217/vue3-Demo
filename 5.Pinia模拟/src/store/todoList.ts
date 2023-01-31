import { defineStore } from 'pinia'

type Todo = {
  id: number
  text: string // 内容
  isFinished: boolean // 是否完成
}

type State = {
  todoList: Todo[]
  filter: 'all' | 'finished' | 'unfinished',
  nextId: number
}


export const useTodoListStore = defineStore('totoList', {
  // 其他配置...
  state: (): State => {
    return {
      todoList: [],
      filter: 'all',
      nextId: 0,
    }
  },

  getters: {
    // 已经完成的todo
    finishedTodos(): Todo[] {
      return this.todoList.filter(todo => todo.isFinished)
    },

    // 未完成的todo
    unfinishedTodos(): Todo[]{
      return this.todoList.filter(todo => !todo.isFinished)
    },

    // 根据filter过滤后的todo
    filteredTodos(): Todo[] {
      // 已经完成的todo
      if(this.filter === 'finished'){
        return this.finishedTodos
      }

      // 未完成的todo
      if(this.filter === 'unfinished'){
        return this.unfinishedTodos
      }

      // 全部todo
      return this.todoList
    }
  },

  actions: {
    // 添加todo
    addTodo(text:string) {
      this.todoList.push({
        id: this.nextId++,
        text,
        isFinished: false,
      })
    },

    // 调整todo状态
    toggleTode(id: number) {
      this.todoList = this.todoList.map(todo => {
        if(todo.id === id) {
          todo.isFinished = !todo.isFinished
        }
        return todo
      })
    },

    // 删除todo
    removeTode(id: number) {
      this.todoList = this.todoList.filter(todo => todo.id !== id)
    }
  }
})
