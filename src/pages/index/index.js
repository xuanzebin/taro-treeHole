import { AtButton } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'


@inject('treeHoleStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  globalData = {
    user: null
  }
  constructor() {
    this.onHandleClick = this.onHandleClick.bind(this)
    const AV = require('leancloud-storage/dist/av-weapp.js');
    this.AV = AV
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

  onHandleClick() {
    const user = this.AV.User.current();
    Taro.getUserInfo({
      success: ({ userInfo }) => {
        user.set(userInfo).save().then(user2 => {
          let userData = user2.toJSON()
          this.globalData.user = userData
          let { avatarUrl, country, updatedAt, nickName, province, objectId, city } = userData
          let userobj = { avatarUrl, country, updatedAt, nickName, province, objectId, city }
          this.updateUserMessage(userobj)
          Taro.switchTab({
            url: '../message/message'
          })
        }).catch(console.error);
      }
    });
  }

  render() {
    return (
      <View className='index'>
        <AtButton type='primary' onClick={this.onHandleClick}>进入树洞</AtButton>
      </View>
    )
  }
}

export default Index 
