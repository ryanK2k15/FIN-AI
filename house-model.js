const tf = require('@tensorflow/tfjs-node');

const modelUrl = 'http://localhost:5000/house-pricer-js/model.json';

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
	// try{
	// model.then(model => {
	// let result = model.predict(tf.tensor(sample, [1, sample.length])).arraySync();
	// console.log(result);
	// return result;
// }, function (err) {
    // console.log(err);
// });
	// }catch (err) {
		// console.log(err);
  // }
  let result = tf.tensor(sample, [1, sample.length]).arraySync();
	return result;
/*  	try {
	model.then(model => {
	let result = model.predict(tf.tensor(sample, [1, sample.length])).arraySync();
	//console.log(result);
	//console.log(result);
	const promise1 = new Promise((resolve, reject) => {
		resolve(result);
	});

	promise1.then((value) => {
		console.log("P:",value[0]);
			return value[0];
	});
	});
	}catch (err) {
		console.log(err);
	}   */
/* 	model.then(model =>  {
        const tensor = tf.tensor(sample, [1, sample.length]);
        const prediction = model.predict(tensor);
        return Promise.resolve(prediction.data());
   });
   
   model.then(res => console.log(res)).catch(err => console.log(err)); */

 
	 /* try{
		 model.then(model => {
		let result = model.predict(tf.tensor(sample, [1, sample.length]));
		console.log("hm.js", result[0]);
		console.log(typeof(result));
		(async () => {
			const answerdata = await result.data()
			// get the first element
			console.log(answerdata[0])
			var answerArray = Array.from(answerdata);
			console.log(answerArray)
			return answerArray[0];
		})()
		
		
	});
	 }catch (err) {
		console.log(err);
  }   */
/*   try{
  model.then(() => {
  return new Promise((resolve, reject) => {
    let result = model.predict(tf.tensor(sample, [1, sample.length])).arraySync();
  }).then((result) => {
    return result[0];
  });
  });
  }
  catch (err) {
		console.log(err);
  } */
}
const sample = [3, 1, 2300, 15000, 2, 0, 1, 3, 7, 2000, 300,
         1989, 0, 1900, 12000]
predictSample(sample);
module.exports.loadModel = loadModel;
module.exports.predictSample = predictSample;



