const colorQuery = document.querySelector('color-query');
const colorSet = document.querySelector('color-set');
const oklchGenerator = document.querySelector('oklch-generator');
const ranges = document.querySelectorAll('input[type=range]');
ranges.forEach((range) => {
	range.addEventListener('input', (event) => updateSettings(event.target));
	updateSettings(range, false);
});
updateColorQuery();

function updateSettings(element, updateQuery = true) {
	oklchGenerator.dataset[element.dataset.name] = element.value / 100;
	if (!updateQuery) return;
	updateColorQuery();
}

function updateColorQuery() {
	let text = [];
	const chroma = oklchGenerator.dataset.chroma;
	const lightness = oklchGenerator.dataset.lightness;
	const hueShift = oklchGenerator.dataset.hue;
	colorSet.querySelectorAll('*').forEach((color) => {
		const baseHue = parseFloat(
			getComputedStyle(color).getPropertyValue('--hue').trim()
		);
		const shiftedHue = (baseHue + parseInt(hueShift)) % 360;
		const hue = parseFloat(shiftedHue.toFixed(4));
		text.push(`oklch(${lightness} ${chroma} ${hue});`);
	});
	colorQuery.innerText = text.join('\n');
}
