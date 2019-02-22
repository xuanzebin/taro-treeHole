import { AtButton } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'


// @inject('counterStore')
// @observer
class Index extends Component {

  config = {
    navigationBarTitleText: '发送页面'
  }
  constructor(){
  }
  componentWillMount () {
   }


  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    // const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
      1
      </View>
    )
  }
}

export default Index 
