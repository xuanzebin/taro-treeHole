import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtCard } from 'taro-ui'
import getDateDiff from '../../utils/message'
import './userCard.scss'
@inject('treeHoleStore')
@observer
export default class UserCard extends Component {
    static defaultProps = {
        userData: []
    }
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
        let { createdAt, like, show, files, value } = this.props.treeHoleStore.data.messageList[this.props.index]
        this.files=files
        let length=like.length
        console.log(like,value)
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
        return (
            <View className='userCard'>
                <AtCard
                    note={time}
                    extra={length===0?'':`已获得${length}个赞`}
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
            </View>
        )
    }
}