import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './User.scss'
import UserCard from '../../components/userCard/userCard'

@inject('treeHoleStore')
@observer
class User extends Component {

  config = {
    navigationBarTitleText: '个人中心'
  }
  constructor() {
    super(...arguments)
    this.state = {}
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
