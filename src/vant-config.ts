import {
    Swipe,
    SwipeItem,
    Lazyload,
    NavBar,
    Sticky,
    Button,
    Popup,
    Loading,
    PullRefresh,
    Tabbar,
    Search,
    TabbarItem,
    Icon,
    Slider,
    Toast,
    Tab,
    Tabs,
    ShareSheet,
    SwipeCell,
    Dialog
} from 'vant'
import type { LazyloadOptions } from 'vant/lib/lazyload/vue-lazyload'
import type { App } from 'vue'

const vantComponents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    Button,
    PullRefresh,
    Popup,
    Loading,
    Sticky,
    Lazyload,
    Swipe,
    SwipeItem,
    Slider,
    Toast,
    Tab,
    Tabs,
    ShareSheet,
    SwipeCell,
    Dialog
]

export default {
    install(app :App) {
        vantComponents.forEach(Component => {
            app.use(Component)
        })
    }
}