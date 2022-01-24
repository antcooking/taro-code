import { useState, useEffect, useCallback } from 'react';
import { Upload, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';

type Iprops = {
	onChange?: (value: string) => void;
	value?: string;
	aspect?: number;
	action?: string;
	crop?: boolean;
};

const ImageUpload = (props: Iprops) => {
	const { onChange, value, aspect = 2, action, crop = false } = props;

	const [fileList, setFileList] = useState<Array<any>>([]);

	useEffect(
		function () {
			if (value) {
				setFileList([
					{
						uid: '-1',
						name: new Date().getTime(),
						status: 'done',
						url: value,
					},
				]);
			} else {
				setFileList([]);
			}
		},
		[value]
	);

	const _onChange = useCallback(
		(params: any) => {
			const { file, fileList } = params;
			if (!file.response) {
				setFileList(fileList);
			} else {
				setFileList([
					{
						uid: '-1',
						name: `image${new Date().getTime()}.png`,
						status: 'done',
						url: file.response.data,
					},
				]);

				if (onChange) {
					onChange(file.response.data);
				}
			}
		},
		[onChange, setFileList]
	);

	const onPreview = useCallback(async (file: any) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		Modal.confirm({
			title: '图片预览',
			width: 520,
			content: <img alt="example" style={{ width: '100%' }} src={src} />,
			okText: '确定',
			cancelText: '取消',
		});
	}, []);

	const imageAction = useCallback(async function (params: any) {
		const { file, onSuccess } = params;

		if (!action) {
			let src = '';
			if (!src) {
				src = await new Promise((resolve) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					// @ts-ignore
					reader.onload = () => resolve(reader.result);
				});
			}
			onSuccess({ status: 200, data: src }, file);
		}
	}, []);

	return (
		<>
			{crop ? (
				<ImgCrop
					quality={0.2}
					rotate
					aspect={aspect}
					modalTitle="图片编辑"
					modalCancel="取消"
					modalOk="确认"
				>
					<Upload
						customRequest={imageAction}
						listType="picture-card"
						fileList={fileList as any}
						onChange={_onChange}
						onPreview={onPreview}
						maxCount={1}
					>
						{fileList.length < 1 && '+ 上传'}
					</Upload>
				</ImgCrop>
			) : (
				<Upload
					customRequest={imageAction}
					listType="picture-card"
					fileList={fileList as any}
					onChange={_onChange}
					onPreview={onPreview}
					maxCount={1}
				>
					{fileList.length < 1 && '+ 上传'}
				</Upload>
			)}
		</>
	);
};

export default ImageUpload;
