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
    this.data.messageList.push(payload)
  }
})
export default treeHoleStore