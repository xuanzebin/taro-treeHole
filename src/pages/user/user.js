import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtAvatar } from 'taro-ui'

import './User.scss'
import UserCard from '../../components/userCard/userCard'

@inject('treeHoleStore')
@observer
class User extends Component {
  static defaultProps = {
    treeHoleStore: null
  }
  config = {
    navigationBarTitleText: '个人中心',
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
  render() {
    const { treeHoleStore: { userData } } = this.props
    const { avatarUrl, nickName, objectId } = userData
    const { treeHoleStore: {  messageList  } } = this.props
    const ownerCard = messageList.map((messageValue, messageIndex) => {
      let messageID = messageValue.objectId
      return messageID === objectId ? <UserCard index={messageIndex} key={messageValue.id}></UserCard> : null
    })
    return (
      <View className='user'>
        <View className='userCard'>
          <AtAvatar
            circle
            image={avatarUrl}
            size='large'
          >
          </AtAvatar>
          <Text className='nickName'>{nickName}</Text>
        </View>
        <View className='ownerList'>
          {ownerCard}
        </View>
      </View>
    )
  }
}

export default User 
