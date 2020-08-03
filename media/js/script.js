let appState = {
	synonims : {
		"en" : {
			"hi" : [/he(l+)o/ig, /howdy/ig],
			"bye" : [/(good)?bye/ig],
			"state" : [/how\s+are\s+you(\?)?/ig]
		},
		"ru" : {
			"hi" : [/прив(е+т)?/ig],
			"state" : [/как\s+(дела|жизнь)/ig],
			"anal" : [/го анал/i]
		}
	},
	answers : {
		"en" : {
			"hi" : ["hi", "hello", "howdy"],
			"bye" : ["bye", "goodbye", "bye-bye"],
			"state" : ["i am fine", "fine thank you", "cool, you?"]
		},
		"ru" : {
			"hi" : ["привет", "здравствуй", "здравствуйте", "здарова", "дарова", "ку"],
			"state" : ["норм а у тебя", "хорошо а у тебя", "потихоньку", "отлично"],
			"anal" : ["go, un", "yes, un", "го, un", "давай, un"]
		}
	},
	debug : true,
	lang : "ru"
}

function getSynonims(){
	return appState.synonims[appState.lang];
}

function getAnswers(){
	return appState.answers[appState.lang];
}

function tokenize(text){
	let synonimsKeys = Object.keys(getSynonims());

	synonimsKeys.forEach(synonimKey => {
		let synonims = getSynonims()[synonimKey];
		synonims.forEach(synonim => {
			if(!synonim.test(text))return;
			if(appState.debug == true)
				console.log('найдено и заменено совпадение с синонимом ' + synonimKey);
			text = text.replace(synonim, synonimKey);
		});
	});

	return text;
}

function generateAnswers(text){
	let answersArray = [];
	let synonimsKeys = Object.keys(getSynonims());

	synonimsKeys.forEach(synonimKey => {
		if(!new RegExp(synonimKey).test(text)) return;

		let answers = getAnswers()[synonimKey];
		let answersLength = getAnswers()[synonimKey].length;
		let answer = answers[Math.floor(Math.random()*answersLength)];

		if(appState.debug == true)
			console.log("Answer", answers, answer);

		answersArray.push(answer);
	});

	if(appState.debug == true)
			console.log(answersArray);

	return answersArray;
}

function renderAnswers(answersArray){
	answersArray.forEach(answer => {
		answersul.innerHTML += '<li class="suzie-answer"><p>' + answer + '</p></li>';
	});
}

function parse(){
	let text = textinput.value;

	answersul.innerHTML += '<li class="my-question"><p>' + text + '</p></li>'

	textinput.value = '';
	text = tokenize(text);

	renderAnswers(generateAnswers(text));

	if(appState.debug == true)
		console.log(text);
}