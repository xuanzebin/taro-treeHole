import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtAvatar, AtCard } from 'taro-ui'
import Card from '../card/card'
import getDateDiff from '../../utils/message'
import './userCard.scss'
@inject('treeHoleStore')
@observer
export default class UserCard extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            urls:[]
        }
    }
    handlePicClick(e) {
        var current = e.target.dataset.src;
        Taro.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.state.urls // 需要预览的图片http链接列表
        })
    }
    componentDidMount() {
        const urls = this.files.map((array) => array.url)
        this.setState({ urls })
    }
    render() {
        const {treeHoleStore: {data: {userData}}} = this.props
        console.log(userData)
        const {avatarUrl, nickName, objectId} = userData
        const {treeHoleStore: {data: {messageList}}} = this.props
        let ownerList = messageList.filter(value=>value.objectId===objectId)
        let card=ownerList.map((messageValue,index)=>{
            let { createdAt, like, show, files, value } = messageValue
            this.files=files
            const picture = files.map((array) => {
                let { url, picID } = array
                return (
                    <Image
                      style='background: #fff;'
                      src={url}
                      key={picID}
                      data-src={url}
                      mode='aspectFill'
                      onClick={this.handlePicClick.bind(this)}
                    />
                )
            })
            let time = getDateDiff(new Date(createdAt).getTime())
            console.log(messageValue)
            return (
              <AtCard
                note={time}
                extra={like.length===0?'':`已获得${like.length}个赞`}
                title={show?'已发布到树洞':'正在审核'}
                thumb='https://upload-images.jianshu.io/upload_images/11958479-114cc5f2af5f6654.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
              >
                <View className='mainText'>
                    {value}
                </View>
                <View className='picture'>
                    {picture}
                </View>
              </AtCard>
            )
        })
        return (
            <View className='user'>
                <View className='userCard'>
                    <AtAvatar
                    circle 
                    image={avatarUrl}
                    size='large'
                    >
                    </AtAvatar>
                    <Text className='nickName'>{nickName}</Text>
                </View>
                <View className='ownerList'>
                    {card}
                </View>
            </View>
        )
    }
}