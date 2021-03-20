// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
	console.log('Model Loaded!');
	getImage();
}

async function getImage() {
	try {
		const data = await fetch(
			'https://api.giphy.com/v1/gifs/random?api_key=9KxUGtIb2nKpRE9G6h98Py2nqSi96Zls'
		);
		const res = await data.json();
		const gif = res.data.image_original_url;
		const app = document.getElementById('app');
		const div = document.createElement('div');
		const pictureElement = document.createElement('img');
		pictureElement.src = gif;
		pictureElement.setAttribute('crossOrigin', 'anonymous');
		pictureElement.id = 'gif';
		app.appendChild(div);
		div.appendChild(pictureElement);

		pictureElement.addEventListener('load', () => {
			// Make a prediction with a selected image
			classifier.classify(pictureElement, (err, results) => {
				const label = getLabels(results);
				console.log(label);
				//<img src="${pictureElement}" crossorigin="anonymous" />
				const text = `
		 <div>
			${label.map((item) => `<button onClick={test()}>${item}</button>`).join(' ')}
		</div>
  `;
				const app = document.getElementById('app');
				app.insertAdjacentHTML('afterend', text);
			});
		});
	} catch (error) {
		console.log(
			`Something went wrong with the request to the giphy api, ${error}`
		);
	}
}

function classification(pictureElement) {}

function test() {
	console.log('he');
}

function getLabels(data) {
	return data.reduce((res, array) => {
		return res.concat(array.label.split(', '));
	}, []);
}
