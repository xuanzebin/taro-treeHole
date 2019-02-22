import { AtButton } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Card from '../../components/card/card'

import './index.scss'


// @inject('counterStore')
// @observer
class Index extends Component {

  config = {
    navigationBarTitleText: '树洞页面',
    backgroundTextStyle: 'dark',
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
      <View className='message'>
        <Card></Card>
      </View>
    )
  }
}

export default Index 
