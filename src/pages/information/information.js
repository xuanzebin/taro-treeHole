import { AtForm, AtButton, AtImagePicker, AtTextarea, AtSwitch } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CreateNames from '../../utils/createName'

import './information.scss'


@inject('treeHoleStore')
@observer
class Information extends Component {

  static defaultProps = {
    treeHoleStore: null
  }
  config = {
    navigationBarTitleText: '树洞留言'
  }
  constructor() {
    super(...arguments)
    this.state = {
      nameSwitchCheck: false,
      citySwitchCheck: false,
      submitCheck: false,
      value: '',
      files: [],
      pickerDisabled: true,
      hideNameList: [
        'https://upload-images.jianshu.io/upload_images/11958479-fbee2630d3be61e6.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'https://upload-images.jianshu.io/upload_images/11958479-ac9407120618e4d1.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'https://upload-images.jianshu.io/upload_images/11958479-dd53abe8766384f4.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'https://upload-images.jianshu.io/upload_images/11958479-58a5d9a8fab9c412.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'https://upload-images.jianshu.io/upload_images/11958479-855fd75bf7e70b6c.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      ]
    }
  }
  componentWillReact() {
    console.log('componentWillReact')
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }
  addMessageList(data) {
    const { treeHoleStore } = this.props
    treeHoleStore.addMessageList(data)
  }
  interactive() {
    Taro.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 1000,
      complete: () => {
        setTimeout(() => {
          Taro.switchTab({
            url: '../message/message'
          })
          this.emptyData()
        }, 500)
      }
    })
  }
  onSubmit() {
    if (this.state.submitCheck) return
    this.setState({
      submitCheck: true
    })
    let { files, value } = this.state
    const { treeHoleStore: { data: { userData } } } = this.props
    let { avatarUrl, nickName, objectId, city } = userData
    if (this.state.nameSwitchCheck) {
      nickName = CreateNames()
      avatarUrl = this.state.hideNameList[parseInt(Math.random() * 5)]
    }
    if (this.state.citySwitchCheck) {
      city = '你猜'
    }
    const AV = require('leancloud-storage/dist/av-weapp.js')
    files.map(tempFilePath => () => new AV.File('filename', {
      blob: {
        uri: tempFilePath.url,
      },
    }).save()).reduce(
      (m, p) => m.then(v => AV.Promise.all([...v, p()])),
      AV.Promise.resolve([])
    ).then((filesUrl) => {
      let filesMessage = filesUrl.map(file => {
        return {
          url: file.url(),
          picID: file.id
        }
      })
      let messageData = {
        avatarUrl,
        nickName,
        objectId,
        city,
        value,
        privateMessage: false,
        files: filesMessage,
        like: [],
        message: []
      }
      let Message = AV.Object.extend('message')
      let query = new Message()
      query.set('data', JSON.stringify(messageData))
      query.set('show', false)
      let hideName
      if (this.state.nameSwitchCheck) {
        query.set('hideName', true)
        hideName = true
      } else {
        query.set('hideName', false)
        hideName = false
      }
      query.save().then((todo) => {
        messageData.createdAt = todo.createdAt
        messageData.messageID = todo.id
        messageData.hideName = hideName
        this.addMessageList(messageData)
        this.interactive()
      })
    }).catch(console.error);
  }
  onReset() {
    this.setState({
      value: ''
    })
  }
  onChange(files) {
    if (files.length >= 9) {
      this.setState({
        pickerDisabled: false,
        files: files.slice(0, 9)
      })
      console.log('无法继续添加图片了')
    } else {
      this.setState({
        pickerDisabled: true,
        files
      })
    }
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    console.log(index, file)
  }
  handleChangeName(nameSwitchCheck) {
    this.setState({
      nameSwitchCheck
    })
  }
  handleChangeCity(citySwitchCheck) {
    this.setState({
      citySwitchCheck
    })
  }
  emptyData() {
    this.onReset()
    this.setState({
      files: [],
      submitCheck: false
    })
  }
  render() {
    return (
      <View className='index'>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtTextarea
            name='value'
            value={this.state.value}
            className='treeHoleInput'
            onChange={this.handleChange.bind(this)}
            maxLength={200}
            height={300}
            placeholder='写下你想丢给树洞的话吧'
          />
          <AtImagePicker
            multiple
            length={3}
            files={this.state.files}
            onChange={this.onChange.bind(this)}
            onFail={this.onFail.bind(this)}
            onImageClick={this.onImageClick.bind(this)}
            showAddBtn={this.state.pickerDisabled}
          />
          <AtSwitch title='是否开启神秘功能' checked={this.state.nameSwitchCheck} onChange={this.handleChangeName} />
          <AtSwitch title='是否隐藏地区' checked={this.state.citySwitchCheck} onChange={this.handleChangeCity} />
          <AtButton
            type='primary'
            formType='submit'
            className='submitButton'
            disabled={!this.state.value && this.state.files.length === 0}
          >
            发送
          </AtButton>
          <AtButton
            type='secondary'
            formType='reset'
            className='resetButton'
            disabled={!this.state.value && this.state.files.length === 0}
          >
            清空
          </AtButton>
        </AtForm>
      </View>
    )
  }
}

export default Information 
