	var elementTune = document.getElementById("tune");
	// var tune = elementTune.value;

	var nameTonica = document.getElementById("nameTonica");
	var nameGamma = document.getElementById("nameGamma"); 
	var stops = document.getElementById("stops");
	var numberOfString = 6;
	var numberOfStop = getStops();
	// var note = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",  "A",  "A#",  "B"];

//====Gamma============================//
	// var minor = [0, 2, 3, 5, 7, 8, 10];  
	// var major = [0, 2, 4, 5, 7, 9, 11];
//=====================================//

	var gammaList = {
		"minor-n": [0, 2, 3, 5, 7, 8, 10],
		"major-n": [0, 2, 4, 5, 7, 9, 11],
		"minor-h": [0, 2, 3, 5, 7, 8, 11],
		"major-h": [0, 2, 4, 5, 7, 8, 11],
		"minor-penta": [0, 3, 5, 7, 10],
		"major-penta": [0, 2, 4, 7, 9]
	};

		createGrif(numberOfString, numberOfStop);
		setLineForMarker(numberOfStop)
		setMarker();

	// создание грифа

	function createGrif (numberOfString, numberOfStop) {
		for (var i = 0;i < numberOfString; i++){
			createElement("grif", "string")
			for(var j = 0; j < numberOfStop ; j++) {
				createElement("string", "stop")
			}
		}
	}
	
	// создание ладов

	function createElement (parentClass, childClass) {
		
		var parentElement = document.getElementsByClassName(parentClass);
		var newElement = document.createElement("div");
	
		newElement.className = (childClass);

		for (var i = 0;i < parentElement.length; i++){
			parentElement[i].appendChild(newElement);
		}
	}

	// создание элементов маркировки (для нумерции) ладов
	
	function setLineForMarker (numberOfStop) {
		createElement("grif", "marks")
		for(var i = 0; i < numberOfStop ; i++) {
			createElement("marks", "mark-stop")
		}
	}

	// нумерация ладов

	function setMarker( ) {
		var marks = document.getElementsByClassName("mark-stop");
		var markStopArrey = [1, 3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
		for(var i = 0; i < marks.length; i++){
			marks[i].innerHTML = i;
		}
	}

	// реверс массива струн

	function getIndexStringRevers () {

		var getElementString = document.getElementsByClassName("string");
		var arreyIndexString = [];

		for(var i=0; i < getElementString.length; i++)	{
			arreyIndexString.push(i);
		}
		
		var arreyIndexStringReverse = arreyIndexString.reverse();

		return arreyIndexStringReverse;
	}

	// console.log(getIndexStringRevers())
	
	// установка нот на лады по всему грифу

	function setNoteOnStopAll () {

		var allString = document.getElementsByClassName("string");
		var nameStringArray = getNameString(getNoteOnString(getTune())).reverse();

		for (var i = 0; i < allString.length; i++) {
			
			var oneString = allString[i];
			var allStopOnString = oneString.getElementsByClassName("stop");
			var noteOnString = getNoteOnString(nameStringArray[i]);
			
			for (var k = 0; k<allStopOnString.length; k++) {
				allStopOnString[k].innerHTML = noteOnString[k];
			}		
			// console.log([i, noteOnString, nameStringArray[i], allStopOnString])
		}
	}	

 	setNoteOnStopAll();

 	// получение последовательности нот на струе

	function getNoteOnString(tuneOpenString){
		
		var note = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",  "A",  "A#",  "B"];
		var noteOnString = note.slice(findValue(note, tuneOpenString))
		var secondPartNote = note.slice(0, findValue(note, tuneOpenString))

		noteOnString = noteOnString.concat(secondPartNote);
		noteOnString = noteOnString.concat(noteOnString); 
		noteOnString.push(tuneOpenString)

		return noteOnString;
	}
	
	// console.log(getNoteOnString("E"))
// console.log(tune.value)

	// получение имени струны

	function getNameString (noteOnString) {

		var nameString = [];

		for(var i = 0; i < noteOnString.length; i++) {

			if (nameString.length < numberOfString ) {

				if ( i%5 === 0 && nameString.length < numberOfString-2 ) {
					nameString.push(noteOnString[i])
				}

				if ( i % 5 === 4 && nameString.length >= numberOfString-2) {
					nameString.push(noteOnString[i])
				}
			}
		}
		return nameString;
	}

	// console.log(getNameString(getNoteOnString(tune)))

	// получение нот на всех струнах

	function getNoteAllString() {
		var nameString = getNameString(getNoteOnString(getTune/*tune*/));
		var noteAllString = [];
		for(var i = 0; i < nameString.length; i++) {
			noteAllString.push(getNoteOnString(nameString[i]))
			console.log(getNoteOnString(nameString[i]))
		}
		return noteAllString;
	}

// console.log(getNoteAllString())

	// установка нот гаммы на струну

	function setNoteGammaOnString (tonica, gamma) {

		var noteOnGammaArray = getNoteGamma(tonica, gamma);
		var elementStop = document.getElementsByClassName('stop');

		for(var i=0; i < elementStop.length; i++) {
			elementStop[i].style.color = "#000"
			for (var k = 0; k < noteOnGammaArray.length; k++) {
				if (elementStop[i].outerText == noteOnGammaArray[k]) {
					elementStop[i].style.color = "#fff";
				} 
			}
		}
	}

	// console.log(getNoteGamma("E", minor))
	// setNoteGammaOnString();

	// получение нот гаммы

	function getNoteGamma (tonica, gamma) {
		
		var noteGamma = [];
		
		for(var i = 0; i < gamma.length; i++) {
			var k = gamma[i];
			noteGamma.push(getNoteOnString(tonica)[k])
		}
		return noteGamma;
	}

	// console.log(getNoteGamma("A", minor))

	// поиск по массиву элемента имеющего указанное значение

	function findValue (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) {
      	return i;
      };
    }
  }
  
  function a () {
  	var tonica = getTonica();
  	var gamma = getGamma();

  }

	function getTune () {
		return elementTune.value;
	}
	// получение гаммы

	function getGamma() {

		function getTonica() {

			return nameTonica.value;
		}

		gamma = nameGamma.value;
		for( var i in gammaList) {
			if(gamma === i ) {
				gamma = gammaList[i];
			}
		}
		setNoteGammaOnString(getTonica(), gamma)
	}

	getGamma();

	function getStops () {
		var stopValue = parseInt(stops.value);
		return stopValue + 1;
	}
	stops.addEventListener("change", function(){
		console.log(stops.value)
		createGrif(numberOfString, getStops());
	});
	elementTune.addEventListener("change", setNoteOnStopAll);
	nameTonica.addEventListener("change", getGamma);
	nameGamma.addEventListener("change", getGamma);
