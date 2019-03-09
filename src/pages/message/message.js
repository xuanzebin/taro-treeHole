import { AtDivider } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Card from '../../components/card/card'
import getDateDiff from '../../utils/message.js'
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
      shouldRefresh: true
    }
  }
  onPullDownRefresh() {
    const { treeHoleStore } = this.props
    let shouldRefresh = this.state.shouldRefresh
    if (shouldRefresh) {
      shouldRefresh = false
      Taro.startPullDownRefresh()
      this.setState({
        shouldRefresh: false
      })
      treeHoleStore.fetchMessageList().then(() => {
        Taro.stopPullDownRefresh()
        this.setState({
          shouldRefresh: true
        })
      })
    }
  }
  componentWillMount() {
    const { treeHoleStore } = this.props
    treeHoleStore.fetchMessageList()
  }
  render() {
    const { treeHoleStore: {  messageList  } } = this.props
    let card = messageList.map((messageValue, index) => {
      let { objectId, show, nickName, avatarUrl, city, createdAt, files, value, message, id, privateMessage } = messageValue
      let time = getDateDiff(new Date(createdAt).getTime())
      return show && !privateMessage ? <Card
          owner={objectId}
          key={id}
          nickName={nickName}
          avatarUrl={avatarUrl}
          city={city}
          time={time}
          files={files}
          value={value}
          message={message}
          index={index}
        /> : null
    })
    return (
      <View className='message'>
        {card}
        <AtDivider
          content='没有更多了'
          fontColor='#2d8cf0'
          lineColor='#2d8cf0'
          fontSize='25'
          className='messageDivider'
        />
      </View>
    )
  }
}
export default Message 
