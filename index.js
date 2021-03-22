// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
	console.log('Model Loaded!');
	getImage();
}

async function getImage(tag) {
	console.log(tag);
	try {
		const data = await fetch(
			`https://api.giphy.com/v1/gifs/random?api_key=9KxUGtIb2nKpRE9G6h98Py2nqSi96Zls&tag=${tag}`
		);
		const res = await data.json();
		const gif = res.data.image_original_url;
		const app = document.getElementById('app');
		const div = document.createElement('div');
		const pictureElement = document.createElement('img');
		const loading = document.getElementsByClassName('loading');
		pictureElement.src = gif;
		pictureElement.setAttribute('crossOrigin', 'anonymous');
		pictureElement.id = 'gif';
		app.appendChild(div);
		div.appendChild(pictureElement);
		if (pictureElement && loading[0]) {
			console.log(loading[0]);
			loading[0].classList.remove('loading');
		}

		pictureElement.addEventListener('load', () => {
			// Make a prediction with a selected image
			classifier.classify(pictureElement, (err, results) => {
				const label = getLabels(results);

				console.log(label);
				const text = `
				<div>
				${label
					.map(
						(item) =>
							`<button id="button" onClick="getImage('${item}')">${item}</button>`
					)
					.join(' ')}
						</div>`;
				const app = document.getElementById('app');
				app.insertAdjacentHTML('beforeend', text);
			});
		});
	} catch (error) {
		console.log(
			`Something went wrong with the request to the giphy api, ${error}`
		);
	}
}

function getLabels(data) {
	return data.reduce((res, array) => {
		return res.concat(array.label.split(', '));
	}, []);
}
