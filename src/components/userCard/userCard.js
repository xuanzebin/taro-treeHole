import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtCard, AtTag, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
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
            urls:[],
            modalOpen:false
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
    onPrivateClick(e) {
        const { treeHoleStore } = this.props
        const index = this.props.index
        const { id } = this.props.treeHoleStore.messageList[index]
        treeHoleStore.switchPrivate(index,id)
    }
    onDeleteClick(e) {
        this.setState({
            modalOpen:true
        })
    }
    onConfirm(e) {
        const {treeHoleStore} = this.props
        let id=e.target.dataset.id
        let index=e.target.dataset.index
        treeHoleStore.deleteMessage(id,index)
        this.setState({
            modalOpen:false
        })
    }
    onCancel() {
        this.setState({
            modalOpen:false
        })
    }
    render() {
        if (!this.props.treeHoleStore.messageList[this.props.index]) return true
        const { createdAt, like, show, files, value, hideName, privateMessage, id } = this.props.treeHoleStore.messageList[this.props.index]
        
        this.files=files
        let length=like.length
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
                    {hideName?(
                    <AtTag 
                        name='hideName' 
                        type='primary' 
                        size='small'
                        circle
                        disabled
                    >
                        已匿名
                    </AtTag>):''}
                    {show?<AtTag 
                        name='private' 
                        type='primary' 
                        size='small'
                        circle
                        active={privateMessage}
                        onClick={this.onPrivateClick.bind(this)}
                    >
                        {privateMessage?'取消仅自己可见':'点击仅自己可见'}
                    </AtTag>:''}
                    <View className='mainContent'>
                        <View className='mainText'>
                            {value}
                        </View>
                        <View className='picture'>
                            {picture}
                        </View>
                        <Text 
                            className='deleteButton'
                            onClick={this.onDeleteClick.bind(this)}
                            data-index={this.props.index}
                            data-id={id}
                        >
                            删除
                        </Text>
                        <AtModal
                            isOpened={modalOpen}
                            title='--------\n\r确认删除吗?\n\r--------'
                            cancelText='取消'
                            confirmText='确认'
                            // onClose={ this.handleClose }
                            onCancel={ this.onCancel.bind(this) }
                            onConfirm={ this.onConfirm.bind(this) }
                            data-index={this.props.index}
                            data-id={id}
                        />
                    </View>
                </AtCard>
            </View>
        )
    }
}