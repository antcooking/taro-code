import { Input } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './groupInput.less';

type Iprops = {
	value: string[];
	onChange: (v: string[]) => void;
};

export default function GroupInput(props: Iprops) {
	const { value, onChange } = props;

	const [value_, setValue] = useState(['']);

	useEffect(
		function () {
			setValue(value || ['']);
		},
		[value]
	);

	const onChange_ = useCallback(
		function (e, index) {
			value_[index] = e.target.value;
			setValue([...value_]);
			onChange(value_);
		},
		[onChange, value_]
	);

	const addItem = useCallback(
		function () {
			value_.push('');
			setValue([...value_]);
		},
		[value_]
	);

	const deleteItem = useCallback(
		function (index) {
			value_.splice(index, 1);
			setValue([...value_]);
		},
		[value_]
	);

	return (
		<div className="groupInput">
			{value_.map((item: string, index: number) => (
				<div className="groupInput-row">
					<Input className="groupInput-Input" value={item} onChange={(e) => onChange_(e, index)} />
					{index === 0 ? (
						<PlusOutlined onClick={addItem} />
					) : (
						<DeleteOutlined onClick={() => deleteItem(index)} />
					)}
				</div>
			))}
		</div>
	);
}
