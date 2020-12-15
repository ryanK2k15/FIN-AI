document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = document.getElementById("input").value;
			//document.getElementById("user").innerHTML = input;
			output(input);   
    }
  });
});


const trigger = [
//0 
["hi", "hi there", "hey", "hola", "hello", "hood day"],
//1
["how are you", "how are things"],
//2
["what is going on", "what is up"],
//3
["happy", "good", "well", "fantastic", "cool"],
//4
["bad", "bored", "tired", "sad"],
//5
["how can you help me", "what can you do?", "what help do you provide?", "how can you be helpful?", "what support is offered"],
//6
["i want to check loan suitabilty", "how to check if I qualify for a loan?", "help with loan application", "where can I apply for a loan?", "how do I apply for a loan?", "i want a loan", "i want to apply for a loan"],
//7
["how do I know how much my house is worth?", "how much should I pay for a particular house", "what type of house can I buy?", "what is my house value", "how much is my house", 
"i want to buy a house", "i want to sell my house"],
//8
["thanks", "thank you"],
//9
["bye", "see you later", "goodbye", "nice chatting to you"]
];

const reply = [
//0 
["Hello!", "Hi!", "Hey!", "Hi there!"], 
//1
[
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
//2
["I am working" ],
//3
["Glad to hear that"],
//4
["Sorry to hear that"],
//5
["I can guide you through your loan application and help you determine what price you should pay for a house", "I offer support for loan applications and house value"],
//6
["You can fill out the loan application by following this link --> www.finai/loan_application.com", "Fill out the application form and my friend will determine your suitability"],
//7
["You can check your house value by entering details here --> www.finai/house_value.com", "To get an idea of the price you should pay for a house, you should fill in the details in the house price section on the website"],
//8
["You're welcome", "No problem"],
//9
["Goodbye", "See you later"]
];

const alternative = [
  "Please repeat that",
  "Can you say that again please",
  "Try again", 
  "I do not understand"
];

function compare(triggerArray, replyArray, text) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == text) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  return item;
}

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/([.*+?^$|(){}\[\]])/ , "");


  //compare arrays
  //then search keyword
  //then random alternative

  if (compare(trigger, reply, text)) {
    product = compare(trigger, reply, text);
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  //document.getElementById("chatbot").innerHTML = product;
   
  //clear input value
  document.getElementById("input").value = "";
  addChat(input, product);
}

const robot = ["How do you do, fellow human", "I am not a bot"];


function addChat(input, product) {
  const mainDiv = document.getElementById("chatarea");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.innerHTML = `Chatbot: <span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  speak(product);
}

function speak(string) {
  const u = new SpeechSynthesisUtterance();
  allVoices = speechSynthesis.getVoices();
  u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
  u.text = string;
  u.lang = "en-US";
  u.volume = 1; //0-1 interval
  u.rate = 1;
  u.pitch = 1; //0-2 interval
  speechSynthesis.speak(u);
}