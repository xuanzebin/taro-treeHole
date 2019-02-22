import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Card from '../../components/card/card'

import './message.scss'


@inject('treeHoleStore')
@observer
class Message extends Component {

  config = {
    navigationBarTitleText: '树洞页面',
    backgroundTextStyle: 'dark',
  }
  constructor() {
    super(...arguments)
  }
  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }
  componentDidMount() { }

  componentWillUnmount() { }
  componentDidShow(){
  }
  render() {
    const { treeHoleStore: { data: { messageList } } } = this.props
    let listCheck
    if (messageList.length === 0) {
      listCheck = false
    } else {
      listCheck = true
    }
    const card = messageList.map((value) => {
      console.log(value)
      return (
        <Card
          key={value.objectId}
          nickName={value.nickName}
          avatarUrl={value.avatarUrl}
          city={value.city}
          updatedAt={value.updatedAt}
          files={value.files}
          value={value.value}
          like={value.like}
          message={value.message}
        />
      )
    })
    return (
      <View className='message'>
        {listCheck ? card : <View className='empty'><Text>树洞等你来填满呢</Text></View>}
      </View>
    )
  }
}

export default Message 
