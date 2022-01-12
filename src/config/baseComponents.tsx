const baseIcons = {
	div: <svg viewBox="0 0 1024 1024" width="30" height="30"><path d="M382.504104 74.244997H126.903419c-35.16227 0-63.779865 28.617595-63.779865 63.779864v255.616043c0 35.16227 28.617595 63.76553 63.779865 63.76553h255.601708c35.16227 0 63.779865-28.60326 63.779865-63.76553V138.024861c-0.001024-35.161246-28.618619-63.779865-63.780888-63.779864z m5.635464 319.395907c0 3.094181-2.526949 5.62113-5.635464 5.621131H126.903419c-3.108516 0-5.635465-2.526949-5.635465-5.621131V138.024861a5.640584 5.640584 0 0 1 5.635465-5.635465h255.601708a5.640584 5.640584 0 0 1 5.635465 5.635465v255.616043zM893.465884 74.244997H637.849841c-35.16227 0-63.779865 28.617595-63.779865 63.779864v255.616043c0 35.16227 28.617595 63.76553 63.779865 63.76553H893.465884c35.16227 0 63.779865-28.60326 63.779864-63.76553V138.024861c0-35.161246-28.617595-63.779865-63.779864-63.779864z m5.635465 319.395907c0 3.094181-2.526949 5.62113-5.635465 5.621131H637.849841c-3.108516 0-5.635465-2.526949-5.635465-5.621131V138.024861a5.640584 5.640584 0 0 1 5.635465-5.635465H893.465884a5.640584 5.640584 0 0 1 5.635465 5.635465v255.616043zM382.504104 565.304494H126.903419c-35.16227 0-63.779865 28.617595-63.779865 63.779865v255.616043c0 35.16227 28.617595 63.779865 63.779865 63.779864h255.601708c35.16227 0 63.779865-28.617595 63.779865-63.779864V629.084359c-0.001024-35.161246-28.618619-63.779865-63.780888-63.779865z m5.635464 319.395908a5.640584 5.640584 0 0 1-5.635464 5.635464H126.903419a5.640584 5.640584 0 0 1-5.635465-5.635464V629.084359a5.640584 5.640584 0 0 1 5.635465-5.635465h255.601708a5.640584 5.640584 0 0 1 5.635465 5.635465v255.616043zM893.465884 565.304494H637.849841c-35.16227 0-63.779865 28.617595-63.779865 63.779865v255.616043c0 35.16227 28.617595 63.779865 63.779865 63.779864H893.465884c35.16227 0 63.779865-28.617595 63.779864-63.779864V629.084359c0-35.161246-28.617595-63.779865-63.779864-63.779865z m5.635465 319.395908a5.640584 5.640584 0 0 1-5.635465 5.635464H637.849841a5.640584 5.640584 0 0 1-5.635465-5.635464V629.084359a5.640584 5.640584 0 0 1 5.635465-5.635465H893.465884a5.640584 5.640584 0 0 1 5.635465 5.635465v255.616043z"></path></svg>,
	text: <svg viewBox="0 0 1024 1024" width="30" height="30"><path d="M672 288H352c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 12.8-9.6 22.4v64c0 19.2 12.8 32 32 32s32-16 32-32v-32h96v320h-32c-16 0-32 12.8-32 32s12.8 32 32 32h128c16 0 32-12.8 32-32s-12.8-32-32-32h-32V352h96v32c0 19.2 12.8 32 32 32s32-16 32-32v-64c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6z"></path><path d="M896 128H128c-35.2 0-64 28.8-64 64v640c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V192c0-35.2-28.8-64-64-64z m0 672c0 16-12.8 32-32 32H160c-19.2 0-32-16-32-32V224c0-16 12.8-32 32-32h704c19.2 0 32 16 32 32v576z"></path></svg>,
	img: <svg viewBox="0 0 1024 1024" width="30" height="30"><path d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z" p-id="4773"></path><path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4774"></path><path d="M32 128v768h960V128H32z m896 704H96V192h832v640z"></path></svg>
}

export const baseComponents = [
	{
		type: 'div',
		elementType: 'block',
		name: '元素',
		placeholder: null,
		icon: baseIcons.div,
		props: {},
		style: {
			minHeight: 100,
			width: 375,
		},
	},
	{
		type: 'span',	
		elementType: 'inline',
		name: '文本',
		icon: baseIcons.text,
		placeholder: '文本输入',
		props: {},
		style: {},
	},
	{
		type: 'img',
		elementType: 'block',
		name: '图片',
		props: {
			src:"data:image/png;base64,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"
		},
		icon: baseIcons.img,
		hasNoChildren: true,
		style: {
			display: 'block',
			minHeight: 100,
			width: '100%',
		},
	},
]