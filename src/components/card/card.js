import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtAvatar, AtIcon } from 'taro-ui'
import './card.scss'

@inject('treeHoleStore')
@observer
export default class Card extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            urls: []
        }
    }
    handlePicClick(e) {
        console.log(e.target)
        var current = e.target.dataset.src;
        Taro.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.state.urls // 需要预览的图片http链接列表
        })
    }
    render() {
        const { files } = this.props
        const urls = files.map((array) => array.url)
        this.setState({ urls })
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
                        <Text className='header_message_other'>18分钟前 来自 {this.props.city}</Text>
                    </View>
                </View>
                <View className='mainText'>
                    {this.props.value}
                </View>
                <View className='picture'>
                    {picture}
                </View>
                <View className='footer'>
                    <View className='icon like'>
                        <AtIcon value='heart-2' size='24'></AtIcon>
                        <Text className='number'>{this.props.like.length === 0 ? '' : this.props.like.length}</Text>
                    </View>
                    <View className='icon message'>
                        <AtIcon value='message' size='24'></AtIcon>
                        <Text className='number'>{this.props.message.length === 0 ? '' : this.props.message.length}</Text>
                    </View>
                </View>
            </View>
        )
    }
}