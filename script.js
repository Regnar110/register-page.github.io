const usersDataBase = []; 
const inputSubmitButton = document.getElementById("submitButton");
const inputName = document.getElementById("registerName");
const inputLogin = document.getElementById("registerLogin");
const inputPasswordOne = document.getElementById("passwordOne");
const inputPasswordTwo = document.getElementById("passwordTwo");
const inputMail = document.getElementById("registerMail");
const inputBirthDate = document.getElementById("registerBirthDate");
const mailRegularExpression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// REGISTER INPUT

const checkValues = () => {
	removeErrors();
	let a = 0;
	inputName.value.length > 2 ? a = a + 1 : wrongName();
	inputLogin.value.length > 5 ? a = a + 1 : wrongLogin();
	inputPasswordOne.value === inputPasswordTwo.value && inputPasswordOne.value.length > 8 ? a = a + 1 : wrongPassword();
	mailRegularExpression.test(inputMail.value) == true ? a = a + 1 : wrongMail();
	a === 4 ? checkIfLoginAndMailExist(): console.error("function checkValues test failed - alerts visible");
	return a;
}
const setToDefault = () =>{ //Ustawienie wartości pól input na puste po wprowadzeniu danych i ich zatwierdzeniu
	inputName.value = "";
	inputLogin.value = "";
	inputPasswordOne.value = "";
	inputPasswordTwo.value = "";
	inputBirthDate.value = "";
	inputMail.value = "";
}

const pushDataToBase = () => {  // przekazanie wprowadzonych danych do userDataBase
	const templateObjForArray = {
		userName: inputName.value, 
		userLogin: inputLogin.value, 
		userPassword: inputPasswordOne.value,
	 	userMail: inputMail.value, 
	 	userBirth: inputBirthDate.value,
 }
usersDataBase.push(templateObjForArray);
turnOnLoader()
setTimeout(() => {
	turnOffLoader();
	createOutput();
}, 5000);
setToDefault();
}

const checkIfLoginAndMailExist = () => {
	const checkLogin = usersDataBase.some((arrayIndex) => arrayIndex.userLogin == inputLogin.value);
	const checkMail = usersDataBase.some((arrayIndex) => arrayIndex.userMail == inputMail.value);
	checkLogin === true || checkMail === true ? mailAndLoginExist() : pushDataToBase();
}
// funkcje wskazujące błąd

const mailAndLoginExist = () => {
	const registerList = document.getElementById("liList");
	inputMail.classList.add("notCorrect");
	inputLogin.classList.add("notCorrect");
	let exist = document.createElement("p");
	exist.classList.add("fieldNotCorrect");
	exist.textContent ="Login lub E-Mail istnieją już w bazie użytkowników!";
	registerList.appendChild(exist);
}

const wrongName = () => {
	const nameParagraph = document.getElementById("nameP");
	inputName.classList.add("notCorrect");
	inputName.value = "";
	let wrongNameP = document.createElement("p");
	wrongNameP.textContent = "* wprowadzone imię jest zbyt krótkie!";
	wrongNameP.classList.add("fieldNotCorrect");
	nameParagraph.appendChild(wrongNameP);
}
const wrongLogin = () => {
	const loginParagraph = document.getElementById("loginP");
	inputLogin.classList.add("notCorrect");
	inputLogin.value = "";
	let wrongLoginP = document.createElement("p");
	wrongLoginP.textContent = "* Wprowadzony login jest za krótki!"
	wrongLoginP.classList.add("fieldNotCorrect");
	loginParagraph.appendChild(wrongLoginP);
}
const wrongPassword = () => {
	const passTwoParagraph = document.getElementById("passTwoP");
	const passOneParagraph = document.getElementById("passOneP");
	const wrongPassArray = [passTwoParagraph, passOneParagraph];
	inputPasswordOne.classList.add("notCorrect");
	inputPasswordTwo.classList.add("notCorrect");
	inputPasswordOne.value = "";
	inputPasswordTwo.value = "";
	for(i=0;i<wrongPassArray.length;i++){
		let wrongPassP = document.createElement("p");
		wrongPassP.textContent = "* Wpowadzono błędne hasła! Sprawdź ich poprawność!"
		wrongPassP.classList.add("fieldNotCorrect");
		wrongPassArray[i].appendChild(wrongPassP);
	}
}
const wrongMail = () => {
	const mailParagraph = document.getElementById("mailP");
	inputMail.classList.add("notCorrect");
	inputMail.value = "";
	let wrongMailP = document.createElement("p");
	wrongMailP.textContent = "* Wprowadzono błędny e-mail!"
	wrongMailP.classList.add("fieldNotCorrect");
	mailParagraph.appendChild(wrongMailP);
}


//usuwanie błędów przy każdym razie keidy sprawdzane są wartości pól input
const removeErrors = () => {
	const tablicaParagrafId = ["nameP", "loginP", "passTwoP", "passOneP", "mailP"];
	const tablicaInputId = ['registerName', 'registerLogin', 'passwordOne', 'passwordTwo', 'registerMail'];
	for (i = 0; i < tablicaParagrafId.length; i++) {
		let loopingItemOne = document.getElementById(tablicaParagrafId[i]);
		let itemAmount = loopingItemOne.childElementCount;
		if(itemAmount === 2){
			let firstClassToDelete = loopingItemOne.lastChild;
			let inputItem = document.getElementById(tablicaInputId[i]);
			inputItem.classList.remove("notCorrect");
			loopingItemOne.removeChild(firstClassToDelete);
		} else {
				console.error("function removeError - missing target")
			}
		}
}

//REGISTER OUTPUT's

const createOutput = () => {
	const registerOutputField = document.getElementById("regOutput");
	const toDoArr = ["outputLi", "outputDataFromUserBase", "showOrHidePasswordBtn"];
	for(i = 0; i < toDoArr.length; i++) {
		if(i <= 1){
			let newOutputLi = document.createElement("li");
			newOutputLi.classList.add(toDoArr[0]);
			newOutputLi.textContent = i === 0 ? "Twój login to:" : "Twoje hasło to:";
			let createdParent = registerOutputField.appendChild(newOutputLi);
			const createOutputFromBase = parent => {
				parent = createdParent;
				let pCHildOfLiParent = document.createElement("p");
				pCHildOfLiParent.classList.add(i === 0 ? toDoArr[i + 1] : toDoArr[i]);
				pCHildOfLiParent.textContent = i === 0 ? usersDataBase[usersDataBase.length-1].userName : usersDataBase[usersDataBase.length-1].userPassword;
				parent.appendChild(pCHildOfLiParent);
			}
			createOutputFromBase();
		} else if(i === 2) {
			let btnLi = document.createElement("li");
			btnLi.classList.add('outputLi');
			let btnParent = registerOutputField.appendChild(btnLi);
			const createdBtnParent = createdBtnParent => {
				createdBtnParent = btnParent;
				let btn = document.createElement("button");
				btn.setAttribute("id", "clearBtn");
				btn.textContent = "wyczyść";
				createdBtnParent.appendChild(btn);
				btn.addEventListener('click', clearOutput)
			}
			createdBtnParent();
		}
	}
}

const clearOutput = () => {
	const parent = document.getElementById("regOutput");
	const childCount = parent.childElementCount;
	for(i=0; i < childCount; i++) {
		parent.removeChild(parent.lastChild);
	}
}

// OUTPUT LOADER

const turnOnLoader = () => {
	const loaderGrandParent = document.getElementById("regOutput");
	let loaderParent = document.createElement("div");
	loaderParent.classList.add("loaderParent");
	let parent = loaderGrandParent.appendChild(loaderParent);
	const putLoaderOnSite = (thisParent) => {
		thisParent = parent;
		let loader = document.createElement("div");
		loader.classList.add("loader");
		thisParent.appendChild(loader);
	}
	putLoaderOnSite();
}

const turnOffLoader = () => {
	const loaderParent = document.getElementById("regOutput");
	loaderParent.removeChild(loaderParent.lastChild);
}

// EVENT LISTENERS

inputSubmitButton.addEventListener("click", checkValues);