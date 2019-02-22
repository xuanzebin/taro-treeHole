import { observable } from 'mobx'

const treeHoleStore = observable({
  data:{
    userData:null
  },
  updateUserMessage(payload){
    this.data.userData=payload
  },
  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default treeHoleStore