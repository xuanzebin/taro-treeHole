import { AtForm, AtButton, AtImagePicker, AtTextarea,AtSwitch } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './information.scss'


@inject('treeHoleStore')
@observer
class Information extends Component {

  config = {
    navigationBarTitleText: '发送页面'
  }
  constructor() {
    super(...arguments)
    this.state = {
      nameSwitchCheck:false,
      citySwitchCheck:false,
      value: '',
      files: [],
      pickerDisabled: true,
      hideNameList:[
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
  onSubmit() {
    console.log(this.state.value)
    let { files, value } = this.state
    const { treeHoleStore: { data: { userData } } } = this.props
    let { avatarUrl, updatedAt, nickName, objectId, city } = userData
    if (this.state.nameSwitchCheck) {
      nickName='匿名'
      avatarUrl=this.state.hideNameList[parseInt(Math.random()*5)]
    }
    if (this.state.citySwitchCheck) {
      city='你猜'
    }
    let messageData = { 
      avatarUrl, 
      updatedAt, 
      nickName, 
      objectId, 
      city, 
      value, 
      files, 
      like: 0, 
      message: 0 
    }
    this.addMessageList(messageData)
  }
  onReset() {
    this.setState({
      value: ''
    })
  }
  onChange(files) {
    this.setState({
      files
    })
    if (files.length === 9) {
      this.setState({
        pickerDisabled: false
      })
      console.log('无法继续添加图片了')
    } else {
      this.setState({
        pickerDisabled: true
      })
    }
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    console.log(index, file)
  }
  handleChangeName(nameSwitchCheck){
    this.setState({
      nameSwitchCheck
    })
  }
  handleChangeCity(citySwitchCheck){
    this.setState({
      citySwitchCheck
    })
  }
  render() {
    // const { counterStore: { counter } } = this.props
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
            length={3}
            files={this.state.files}
            onChange={this.onChange.bind(this)}
            onFail={this.onFail.bind(this)}
            onImageClick={this.onImageClick.bind(this)}
            showAddBtn={this.state.pickerDisabled}
          />
          <AtSwitch title='是否匿名' checked={this.state.nameSwitchCheck} onChange={this.handleChangeName} />
          <AtSwitch title='是否隐藏地区' checked={this.state.citySwitchCheck} onChange={this.handleChangeCity} />
          <AtButton
            type='primary'
            formType='submit'
            className='submitButton'
          >
            发送
          </AtButton>
          <AtButton
            type='secondary'
            formType='reset'
            className='resetButton'
          >
            清空
          </AtButton>
        </AtForm>
      </View>
    )
  }
}

export default Information 
