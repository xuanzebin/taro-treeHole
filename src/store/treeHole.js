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
  switchPrivate(index,id){
    let messageList=JSON.parse(JSON.stringify(this.data.messageList))
    messageList[index].privateMessage=!messageList[index].privateMessage
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
          let { data, show, hideName } = message.attributes
          let messageData = JSON.parse(data)
          messageData.createdAt = message.createdAt
          messageData.id = message.id
          messageData.show = show
          messageData.hideName = hideName
          return messageData
        })
        this.data.messageList=messageDataList
      })
      .catch(console.error);
  },
  updateMessage(messageList,index){
    const AV = require('leancloud-storage/dist/av-weapp.js')
    var updateMessage = AV.Object.createWithoutData('message', messageList[index].id)
    updateMessage.set('data', JSON.stringify(messageList[index]))
    return updateMessage.save()
  },
  deleteMessage(id,index) {
    const AV = require('leancloud-storage/dist/av-weapp.js')
    var todo = AV.Object.createWithoutData('message', id)
    todo.destroy().then((success) => {
        // 删除成功
        let array = this.data.messageList[index].files.map((value) => {
            let picID = value.picID
            var file = AV.File.createWithoutData(picID);
            return file.destroy()
        })
        Promise.all(array).then((success) => {
            console.log('删除成功！')
            let messageList=JSON.parse(JSON.stringify(this.data.messageList))
            messageList.splice(index, 1)
            this.data.messageList=messageList
        })
    }, function (error) {
        // 删除失败
        alert('删除失败，请重试！')
    })
  }
})
export default treeHoleStore