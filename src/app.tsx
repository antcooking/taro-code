import Header from './components/header';
import MenuLeft from './components/menuLeft';
import Container from './components/container';
import { Provider } from './store/provider';
import '../node_modules/antd/dist/antd.css'
import './style.less';
import './app.less';

export default function App() {
  return (
    <Provider>
      <div className="cookCode-body">
        <Header></Header>
        <div className="cookCode-main">
          <MenuLeft />
          <Container></Container>
        </div>
      </div>
    </Provider>
  );
}
