const FUNCTION_PREFIX = 'FUNCTION_PREFIX';

export function stringify(
	obj: Record<string, unknown>,
	space?: number | string,
	error?: (err: Error | unknown) => {}
): string | undefined {
	try {
		return JSON.stringify(
			obj,
			(_, v) => {
				if (typeof v === 'function') {
					return `${FUNCTION_PREFIX}${v}`;
				}

				return v;
			},
			space
		);
	} catch (err) {
		console.info(err, 'err');
		error && error(err);
	}

	return;
}

export function parse(jsonStr: string, error?: (err: Error | unknown) => {}) {
	try {
		return JSON.parse(jsonStr, (_, value) => {
			if (value && typeof value === 'string') {
				return value.indexOf(FUNCTION_PREFIX) > -1
					? new Function(`return ${value.replace(FUNCTION_PREFIX, '')}`)()
					: value;
			}
			return value;
		});
	} catch (err) {
		console.info(err, 'err');
		error && error(err);
	}
}

export default function deepCopy(obj: any) {
	return parse(stringify(obj) || '');
}
