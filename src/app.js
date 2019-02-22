import 'taro-ui/dist/style/index.scss'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import initAV from './leancloud/app.js'
import treeHoleStore from './store/treeHole'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  treeHoleStore
}

class App extends Component {

  config = {
    tabBar: {
      borderStyle: "white",
      color: "#595959",
      selectedColor: "#1c1b21",
      list: [
        {
          pagePath: "pages/message/message",
          text: "树洞页面",
          // iconPath: "iconfont/home.png",
          // selectedIconPath: "iconfont/home.png"
        },
        {
          pagePath: "pages/information/information",
          text: "发送页面",
          // iconPath: "iconfont/picture.png",
          // selectedIconPath: "iconfont/picture.png"
        }
      ]
    },
    pages: [
      // 'pages/information/information',
      // 'pages/message/message',
      'pages/index/index',
      'pages/message/message',
      'pages/information/information',
      'pages/user/user',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  componentDidMount() {
    initAV()
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
