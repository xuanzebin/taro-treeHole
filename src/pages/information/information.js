import { AtForm, AtButton, AtImagePicker, AtTextarea } from 'taro-ui'
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
      value: '',
      files: [],
      pickerDisabled:true
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
    let value = this.state.value
    let files = this.state.files
    const { treeHoleStore: { data: { userData } } } = this.props
    let { avatarUrl, updatedAt, nickName, objectId, city } = userData
    let messageData = { avatarUrl, updatedAt, nickName, objectId, city, value, files, like: 0, message: 0 }
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
        pickerDisabled:false
      })
      console.log('无法继续添加图片了')
    } else {
      this.setState({
        pickerDisabled:true
      })
    }
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    console.log(index, file)
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
