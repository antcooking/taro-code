import React, { useState } from 'react';
// @ts-ignore
import { SketchPicker } from 'react-color';
// @ts-ignore
import reactCSS from 'reactcss';

type Iprops = {
	value?: string;
	onChange?: (e: any) => void;
};

export default function ColorPicker(props: Iprops): JSX.Element {
	const [backgroundColor, setbackgroundColor] = useState<any>();
	const [displayColorPicker, setdisplayColorPicker] = useState(false);

	React.useEffect(
		function () {
			setbackgroundColor(props.value);
		},
		[props.value]
	);

	const styles = reactCSS({
		default: {
			color: {
				width: '70px',
				height: '24px',
				borderRadius: '2px',
				background: `${backgroundColor}`,
				color: '#333',
				textAlign: 'center',
				lineHeight: '24px',
				cursor: 'pointer',
				border: '1px solid #eee',
			},
			swatch: {
				padding: '5px',
				background: '#fff',
				borderRadius: '1px',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
			},
			popover: {
				display: displayColorPicker ? 'block' : 'none',
				position: 'fixed',
				zIndex: 1000,
			},
			cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px',
			},
		},
	});

	const handleClick = () => {
		setdisplayColorPicker(!displayColorPicker);
	};

	const change = (e: any) => {
		setbackgroundColor(e.hex);
		if (props.onChange) props.onChange(e.hex);
	};

	return (
		<div>
			<div style={styles.swatch} onClick={handleClick}>
				<div style={{ display: 'flex', justifyContent: 'center', width: 120, height: 24 }}>
					{backgroundColor ? <div style={styles.color as any} /> : ''}
					<div style={{ marginLeft: 6 }}>{backgroundColor || '设置颜色'}</div>
				</div>
			</div>
			<div style={styles.popover as any}>
				<div style={styles.cover as any} onClick={() => setdisplayColorPicker(false)} />
				<SketchPicker color={backgroundColor || props.value} onChange={change} />
			</div>
		</div>
	);
}
