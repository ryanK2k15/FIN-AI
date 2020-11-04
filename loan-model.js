const tf = require('@tensorflow/tfjs-node');

const modelUrl = 'http://localhost:5000/tfjs_loan_model/model.json';

let model;

const loadModel = async function () {
   console.log(`loading model from ${modelUrl}`);
	try{		
		model = await (tf.loadLayersModel(modelUrl)).catch(error => { throw error});
	}catch (err) {
    console.log(err);
  }

   return model;
 } 

model = loadModel();

function argMax(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

async function predictSample(sample) {
	try{
		let result = model.predict(tf.tensor(sample, [1, sample.length])).arraySync();
		console.log(argMax(result[0]));
		if(argMax(result[0]) == 1)
			console.log("Approve");
		else
			console.log("Reject");
		
		return argMax(result[0]);
		
	}catch (err) {
		console.log(err);
  }
	
}

module.exports.loadModel = loadModel;
module.exports.predictSample = predictSample;



