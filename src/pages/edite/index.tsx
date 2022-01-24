import Header from '../../components/header';
import MenuLeft from '../../components/menuLeft';
import Container from '../../components/container';
import FeaturePanel from '../../components/featurePanel';
import MouseMark from '../../components/mouseMark';
import { DragProvider } from '../../utils/drag';

export default function Edite() {
	return (
		<div className="cookCode-body">
			<Header></Header>
			<div className="cookCode-main">
				<DragProvider>
					<MenuLeft />
					<Container></Container>
					<FeaturePanel />
					<MouseMark />
				</DragProvider>
			</div>
		</div>
	);
}
