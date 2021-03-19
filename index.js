// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
	console.log('Model Loaded!');
}

// Make a prediction with a selected image
classifier.classify(document.getElementById('image'), (err, results) => {
	const label = getLabels(results);
	const text = `
    <p>${label}</p>
  `;
	const app = document.getElementById('app');
	app.insertAdjacentHTML('afterend', text);
	console.log(label);
});

function getLabels(data) {
	return data.reduce((res, array) => {
		return res.concat(array.label.split(', '));
	}, []);
}
