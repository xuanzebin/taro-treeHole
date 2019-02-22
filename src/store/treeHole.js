import { observable } from 'mobx'

const treeHoleStore = observable({
  data:{
    userData:null,
    messageList:[]
  },
  updateUserMessage(payload){
    this.data.userData=payload
  },
  addMessageList(payload){
    this.data.messageList.unshift(payload)
  },
  initMessageList(payload){
    this.data.messageList=payload
  }
})
export default treeHoleStore