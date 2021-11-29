import Header from './components/header';
import MenuLeft from './components/menuLeft';
import Container from './components/container';
import { DndProvider } from 'react-dnd'
import { Provider } from './store/provider';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../node_modules/antd/dist/antd.css'
import './style.less';
import './app.less';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider>
        <div className="cookCode-body">
          <Header></Header>
          <div className="cookCode-main">
            <MenuLeft />
            <Container></Container>
          </div>
        </div>
      </Provider>
    </DndProvider>
  );
}
