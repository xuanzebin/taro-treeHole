import { AtDivider, AtBadge } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Card from '../../components/card/card'

import './message.scss'

@inject('treeHoleStore')
@observer
class Message extends Component {

  static defaultProps = {
    treeHoleStore: null
  }
  config = {
    navigationBarTitleText: '树洞页面',
    backgroundTextStyle: 'dark',
    enablePullDownRefresh: true,
  }
  constructor() {
    super(...arguments)
    this.state = {
      shouldRefresh:true
    }
  }
  onPullDownRefresh() {
    const { treeHoleStore } = this.props
    let shouldRefresh=this.state.shouldRefresh
    if (shouldRefresh){
      shouldRefresh=false
      Taro.startPullDownRefresh()
      this.setState({
        shouldRefresh:false
      })
      treeHoleStore.fetchMessageList().then(() => {
        Taro.stopPullDownRefresh()
        this.setState({
          shouldRefresh:true
        })
      })
    }
  }
  componentWillMount() {
    const { treeHoleStore } = this.props
    treeHoleStore.fetchMessageList()
  }
  componentDidShow() {
  }
  getDateDiff(dateTimeStamp){
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let now = new Date().getTime()
    let diffValue = now - dateTimeStamp
    if(diffValue < -20000){return;}
    let monthC =diffValue/month
    let weekC =diffValue/(7*day)
    let dayC =diffValue/day
    let hourC =diffValue/hour
    let minC =diffValue/minute
    let result
    if(monthC>=1){
      result="" + parseInt(monthC) + "月前"
    }
    else if(weekC>=1){
      result="" + parseInt(weekC) + "周前"
    }
    else if(dayC>=1){
      result=""+ parseInt(dayC) +"天前"
    }
    else if(hourC>=1){
      result=""+ parseInt(hourC) +"小时前"
    }
    else if(minC>=1){
      result=""+ parseInt(minC) +"分钟前"
    }else
    result="刚刚"
    return result
  }
  render() {
    const { treeHoleStore: { data: { messageList } } } = this.props
    let card = messageList.map((messageValue, index) => {
      let { objectId, nickName, avatarUrl, city, createdAt, files, value, message, id } = messageValue
      let time=this.getDateDiff(new Date(createdAt).getTime())
      return (
        <Card
          owner={objectId}
          key={id}
          nickName={nickName}
          avatarUrl={avatarUrl}
          city={city}
          time={time}
          files={files}
          value={value}
          message={message}
          index={index}
        />
      )
    })
    return (
      <View className='message'>
        {card}
        <AtDivider 
          content='没有更多了' 
          fontColor='#2d8cf0' 
          lineColor='#2d8cf0' 
          fontSize='25'
          className='messageDivider'
        />
      </View>
    )
  }
}
export default Message 
