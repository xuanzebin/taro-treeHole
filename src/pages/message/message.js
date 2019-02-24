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
    }
  }
  onPullDownRefresh() {
    const { treeHoleStore } = this.props
    Taro.startPullDownRefresh()
    Taro.showNavigationBarLoading()
    treeHoleStore.fetchMessageList().then(() => {
      Taro.stopPullDownRefresh()
      Taro.hideNavigationBarLoading()
    })
  }
  componentWillMount() {
    const { treeHoleStore } = this.props
    treeHoleStore.fetchMessageList()
  }
  componentDidShow() {
  }
  render() {
    const { treeHoleStore: { data: { messageList } } } = this.props
    let card = messageList.map((messageValue, index) => {
      let { objectId, nickName, avatarUrl, city, updatedAt, files, value, message, id } = messageValue
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
          message={message}
          index={index}
        />
      )
    })
    return (
      <View className='message'>
        {card}
      </View>
    )
  }
}
export default Message 
