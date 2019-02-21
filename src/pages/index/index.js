import { AtButton } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'


@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  globalData={
    user:null
  }
  constructor(){
    this.onHandleClick=this.onHandleClick.bind(this)
    const AV = require('leancloud-storage/dist/av-weapp.js');
    this.AV=AV
  }
  componentWillMount () {
    this.AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
    }).catch(console.error);
   }


  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }
  onHandleClick(){
    const user = this.AV.User.current();
    // 调用小程序 API，得到用户信息
    Taro.getUserInfo({
      success: ({userInfo}) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user2 => {
          // 成功，此时可在控制台中看到更新后的用户信息
          this.globalData.user = user2.toJSON();
          console.log(this.globalData.user)
        }).catch(console.error);
      }
    });
  }

  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Text>欢迎来到树洞!</Text>
        <AtButton type='primary' onClick={this.onHandleClick}>进入树洞</AtButton>
      </View>
    )
  }
}

export default Index 
