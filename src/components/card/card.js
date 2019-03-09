import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtAvatar, AtIcon } from 'taro-ui'
import './card.scss'

@inject('treeHoleStore')
@observer
export default class Card extends Component {
    static defaultProps = {
        files: [],
        objectId: null
    }
    constructor() {
        super(...arguments)
        this.state = {
            urls: []
        }
    }
    handlePicClick(e) {
        var current = e.target.dataset.src;
        Taro.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.state.urls // 需要预览的图片http链接列表
        })
    }
    componentWillMount() {
        const { files } = this.props
        const urls = files.map((array) => array.url)
        this.setState({ urls })
    }
    clickLike() {
        const { 
            index,
            treeHoleStore, 
            treeHoleStore: { userData }
        } = this.props
        const like =treeHoleStore.messageList[index].like
        const id = userData.objectId
        const likeIndex = like.indexOf(id)
        if (likeIndex === -1) {
            treeHoleStore.addLike(index, id)
        } else {
            treeHoleStore.reduceLike(index, likeIndex)
        }
    }
    render() {
        if (!this.props.treeHoleStore.messageList[this.props.index]) return true
        const { files } = this.props
        const { treeHoleStore: {  userData: { objectId } } } = this.props
        const { like } = this.props.treeHoleStore.messageList[this.props.index]
        const length = like.length
        const likeCheck = like.indexOf(objectId)
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
        return (
            <View className='card'>
                <View className='header'>
                    <AtAvatar image={this.props.avatarUrl}></AtAvatar>
                    <View className='header_message'>
                        <Text className='header_message_name'>{this.props.nickName}</Text>
                        <Text className='header_message_other'>{this.props.time+' '} 来自 {' '+this.props.city}</Text>
                    </View>
                </View>
                <View className='mainText'>
                    {this.props.value}
                </View>
                <View className='picture'>
                    {picture}
                </View>
                <View className='footer'>
                    <View className='icon like' onClick={this.clickLike.bind(this)}>
                        <AtIcon value='heart-2' size='24' color={likeCheck !== -1 ? '#FE4950' : ''}></AtIcon>
                        <Text className={`number ${likeCheck !== -1 ? 'active' : ''}`}>{length === 0 ? '' : length}</Text>
                    </View>
                </View>
            </View>
        )
    }
}