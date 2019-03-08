import 'taro-ui/dist/style/index.scss'
import './app.scss'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
// import initAV from './leancloud/app.js'
import treeHoleStore from './store/treeHole'


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
          iconPath: "asset/index.png",
          selectedIconPath: "asset/indexSelect.png"
        },
        {
          pagePath: "pages/information/information",
          text: "树洞留言",
          iconPath: "asset/send.png",
          selectedIconPath: "asset/sendSelect.png"
        },
        {
          pagePath: "pages/user/user",
          text: "个人中心",
          iconPath: "asset/person.png",
          selectedIconPath: "asset/personSelect.png"
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
      navigationBarBackgroundColor: "#6190E8",
      backgroundTextStyle: 'light',
      // navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  }
  componentDidMount() {
    const AV = require('leancloud-storage/dist/av-weapp.js')
    let APP_ID = 's31J1OQP9GG3Wx3JIhT4pUCB-gzGzoHsz'
    let APP_KEY = 'FvNACBhf4Jq53f57y4CFbYnF'
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
