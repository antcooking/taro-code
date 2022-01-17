import Header from './components/header';
import MenuLeft from './components/menuLeft';
import Container from './components/container';
import FeaturePanel from './components/featurePanel';
import { Provider as CommonProvider } from './store/provider';
import { DragProvider } from './utils/drag';
import '../node_modules/antd/dist/antd.css';
import './style.less';
import './app.less';

export default function App() {
	return (
		<CommonProvider>
			<div className="cookCode-body">
				<Header></Header>
				<div className="cookCode-main">
					<DragProvider>
						<MenuLeft />
						<Container></Container>
						<FeaturePanel />
					</DragProvider>
				</div>
			</div>
		</CommonProvider>
	);
}
