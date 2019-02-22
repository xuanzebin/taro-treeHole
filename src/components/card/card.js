import Taro, { Component } from '@tarojs/taro'
import { View, Text, Label, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtAvatar ,AtIcon} from 'taro-ui'
import './card.scss'

@inject('treeHoleStore')
@observer
export default class Card extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }
    render(){
        const { treeHoleStore: { data:{userData} } } = this.props
        // console.log(userData)
        return (
            <View className='card'>
                <View className='header'>
                    <AtAvatar image="https://wx.qlogo.cn/mmopen/vi_32/icAemsOXUK2x0gol6a5iceZANkXRgHfSDj1MGBKMCic7ic3VaSJmibT5TDZnRDLCibwKEf7HEz10RNHwehzHqL3zwb4A/132"></AtAvatar>
                    <View className='header_message'>
                        <Text className='header_message_name'>Benectic</Text>
                        <Text className='header_message_other'>18分钟前 来自 你猜-</Text>
                    </View>
                </View>
                <View className='mainText'>
                    正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文
                </View>
                <View className='footer'>
                    <View className='icon like'>
                        <AtIcon value='heart-2' size='20'></AtIcon>
                        <Text className='number'>1</Text>
                    </View>
                    <View className='icon message'>
                        <AtIcon value='message' size='20'></AtIcon>
                        <Text className='number'>1</Text>
                    </View>
                </View>
            </View>
        )
    }
}