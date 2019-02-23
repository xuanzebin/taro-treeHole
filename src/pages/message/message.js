import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Card from '../../components/card/card'

import './message.scss'

@inject('treeHoleStore')
@observer
class Message extends Component {

  static defaultProps = {
    treeHoleStore: null
  }
  config = {
    navigationBarTitleText: '树洞页面',
    backgroundTextStyle: 'dark',
    enablePullDownRefresh: true,
  }
  constructor() {
    super(...arguments)
    this.state = {
      messageList:[]
    }
  }
  onPullDownRefresh() {
    Taro.startPullDownRefresh()
    Taro.showNavigationBarLoading()
    this.fetchMessageData().then(()=>{
      Taro.stopPullDownRefresh()
      Taro.hideNavigationBarLoading()
    })
  }
  fetchMessageData(){
    const AV = require('leancloud-storage/dist/av-weapp.js')
    const { treeHoleStore } = this.props
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
        treeHoleStore.initMessageList(messageDataList)
        this.setState({
          messageList:messageDataList
        })
      })
      .catch(console.error);
  }
  componentWillMount() {
    this.fetchMessageData()
  }
  componentDidShow(){
    let { treeHoleStore: { data: { messageList } } } = this.props
    this.setState({
      messageList
    }) 
  }
  render() {
    let card = this.state.messageList.length !== 0 ? this.state.messageList.map((messageValue) => {
      let { objectId, nickName, avatarUrl, city, updatedAt, files, value, like, message,id } = messageValue
      return (
        <Card
          owner={objectId}
          key={id}
          nickName={nickName}
          avatarUrl={avatarUrl}
          city={city}
          updatedAt={updatedAt}
          files={files}
          value={value}
          like={like}
          message={message}
        />
      )
    }) : ''
    // <View className='empty'><Text>树洞等你来填满呢</Text></View>
    return (
      <View className='message'>
        {card}
      </View>
    )
  }
}
export default Message 
