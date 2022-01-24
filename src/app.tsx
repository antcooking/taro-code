import { Provider as CommonProvider } from './store/provider';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Edite from './pages/edite/index';
import ComonentsManage from './pages/components-manage';
import '../node_modules/antd/dist/antd.css';
import './style.less';
import './app.less';

export default function App() {
	return (
		<HashRouter>
			<CommonProvider>
				<Routes>
					<Route path="/" element={<Edite />} />
					<Route path="/edite" element={<Edite />} />
					<Route path="/comonents-manage" element={<ComonentsManage />} />
				</Routes>
			</CommonProvider>
		</HashRouter>
	);
}
