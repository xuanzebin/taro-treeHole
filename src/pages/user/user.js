import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
// import { observer, inject } from '@tarojs/mobx'

import './User.scss'


// @inject('counterStore')
// @observer
class User extends Component {

  config = {
    navigationBarTitleText: '个人页面'
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
      3
      </View>
    )
  }
}

export default User 
