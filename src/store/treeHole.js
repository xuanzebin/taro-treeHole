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
    let messageList=JSON.parse(JSON.stringify(this.data.messageList))
    messageList.unshift(payload)
    this.data.messageList=messageList
  },
  initMessageList(payload){
    this.data.messageList=payload
  },
  addLike(index,id){
    let messageList=JSON.parse(JSON.stringify(this.data.messageList))
    messageList[index].like.push(id)
    this.updateMessage(messageList,index).then(()=>{
      this.data.messageList=messageList
    })
  },
  reduceLike(index,likeIndex){
    let messageList=JSON.parse(JSON.stringify(this.data.messageList))
    messageList[index].like.splice(likeIndex,1)
    this.updateMessage(messageList,index).then(()=>{
      this.data.messageList=messageList
    })
  },
  fetchMessageList(){
    const AV = require('leancloud-storage/dist/av-weapp.js')
    return new AV.Query('message')
      .descending('createdAt')
      .find()
      .then(messageList => {
        let messageDataList = messageList.map(message => {
          let { data } = message.attributes
          let messageData = JSON.parse(data)
          messageData.id = message.id
          return messageData
        })
        this.data.messageList=messageDataList
        console.log(messageDataList)
      })
      .catch(console.error);
  },
  updateMessage(messageList,index){
    const AV = require('leancloud-storage/dist/av-weapp.js')
    var updateMessage = AV.Object.createWithoutData('message', messageList[index].id)
    updateMessage.set('data', JSON.stringify(messageList[index]))
    return updateMessage.save()
  }
})
export default treeHoleStore