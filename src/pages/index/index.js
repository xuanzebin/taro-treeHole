import { AtButton } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'


@inject('treeHoleStore')
@observer
class Index extends Component {

  static defaultProps = {
    treeHoleStore: null
  }
  config = {
    navigationBarTitleText: '进入树洞'
  }
  globalData = {
    user: null
  }
  constructor() {
    const AV = require('leancloud-storage/dist/av-weapp.js');
    this.AV = AV
    this.state={}
  }
  componentWillMount() {
    this.AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
    }).catch(console.error);
  }
  componentWillReact() {
    console.log('componentWillReact')
  }

  updateUserMessage(payload) {
    const { treeHoleStore } = this.props
    treeHoleStore.updateUserMessage(payload)

  }

  onHandleClick(e) {
    const user = this.AV.User.current();
    user.set(e.detail.userInfo).save().then(user2 => {
      let userData = user2.toJSON()
      this.globalData.user = userData
      let { avatarUrl, country, nickName, updatedAt, province, objectId, city } = userData
      let userobj = { avatarUrl, country, updatedAt, nickName, province, objectId, city }
      this.updateUserMessage(userobj)
      Taro.switchTab({
        url: '../message/message'
        // url: '../information/information'
      })
    })
  }
  render() {
    return (
      <View className='index'>
        <AtButton 
          type='primary' 
          openType='getUserInfo'
          onGetUserInfo={this.onHandleClick.bind(this)}
        >
          进入树洞
        </AtButton>
      </View>
    )
  }
}

export default Index 
