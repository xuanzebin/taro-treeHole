import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Card from '../../components/card/card'

import './message.scss'


@inject('treeHoleStore')
@observer
class Message extends Component {

  config = {
    navigationBarTitleText: '树洞页面',
    backgroundTextStyle: 'dark',
  }
  constructor() {
    super(...arguments)
  }
  componentWillMount() {
    const AV = require('leancloud-storage/dist/av-weapp.js')
    const { treeHoleStore } = this.props
    new AV.Query('message')
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
      })
      .catch(console.error);
  }
  componentDidShow() {
    const { treeHoleStore: { data: { messageList } } } = this.props
    console.log(messageList)
  }
  render() {
    const { treeHoleStore: { data: { messageList } } } = this.props
    let listCheck
    if (messageList.length === 0) {
      listCheck = false
    } else {
      listCheck = true
    }
    const card = messageList.map((messageValue) => {
      let { objectId, nickName, avatarUrl, city, updatedAt, files, value, like, message } = messageValue
      return (
        <Card
          key={objectId}
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
    })
    return (
      <View className='message'>
        {listCheck ? card : <View className='empty'><Text>树洞等你来填满呢</Text></View>}
      </View>
    )
  }
}

export default Message 
