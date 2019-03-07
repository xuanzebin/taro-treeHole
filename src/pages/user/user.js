import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './User.scss'
import UserCard from '../../components/userCard/userCard'

@inject('treeHoleStore')
@observer
class User extends Component {

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
    return (
      <View className='index'>
        <UserCard/>
      </View>
    )
  }
}

export default User 
