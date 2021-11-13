const workout_Type_Select = document.querySelector('#type');
const cardio_Form = document.querySelector('.cardio-form');
const resistance_Form = document.querySelector('.resistance-form');
const cardioname_Input = document.querySelector('#cardio-name');
const name_Input = document.querySelector('#name');
const weight_Input = document.querySelector('#weight');
const sets_Input = document.querySelector('#sets');
const reps_Input = document.querySelector('#reps');
const duration_Input = document.querySelector('#duration');
const resistance_duration_Input = document.querySelector('#resistance-duration');
const distance_Input = document.querySelector('#distance');
const complete_btn = document.querySelector('button.complete');
const add_new_workoutt_button = document.querySelector('button.add-another');
const toast = document.querySelector('#toast');
const new_Work_Out = document.querySelector('.new-workout');

let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
	let workout;

	if (location.search.split('=')[1] === undefined) {
		workout = await API.createWorkout();
		console.log(workout);
	}
	if (workout) {
		location.search = '?id=' + workout._id;
	}
}

initExercise();


function validateInputFields() {
	let isValid = true;

	if (workoutType === 'resistance') {
		if (name_Input.value.trim() === '') {
			isValid = false;
		}

		if (weight_Input.value.trim() === '') {
			isValid = false;
		}

		if (sets_Input.value.trim() === '') {
			isValid = false;
		}

		if (reps_Input.value.trim() === '') {
			isValid = false;
		}

		if (resistance_duration_Input.value.trim() === '') {
			isValid = false;
		}
	} else if (workoutType === 'cardio') {
		if (cardioname_Input.value.trim() === '') {
			isValid = false;
		}

		if (duration_Input.value.trim() === '') {
			isValid = false;
		}

		if (distance_Input.value.trim() === '') {
			isValid = false;
		}
	}

	if (isValid) {
		complete_btn.removeAttribute('disabled');
		add_new_workoutt_button.removeAttribute('disabled');
	} else {
		complete_btn.setAttribute('disabled', true);
		add_new_workoutt_button.setAttribute('disabled', true);
	}
}

async function formSubmit(event) {
	event.preventDefault();

	let workoutData = {};

	if (workoutType === 'cardio') {
		workoutData.type = 'cardio';
		workoutData.name = cardioname_Input.value.trim();
		workoutData.distance = Number(distance_Input.value.trim());
		workoutData.duration = Number(duration_Input.value.trim());
	} else if (workoutType === 'resistance') {
		workoutData.type = 'resistance';
		workoutData.name = name_Input.value.trim();
		workoutData.weight = Number(weight_Input.value.trim());
		workoutData.sets = Number(sets_Input.value.trim());
		workoutData.reps = Number(reps_Input.value.trim());
		workoutData.duration = Number(resistance_duration_Input.value.trim());
	}
console.log(workoutData)
	await API.addExercise(workoutData);
	clearInputs();
	toast.classList.add('success');
}

function toastAnimationEnd() {
	toast.removeAttribute('class');
	if (shouldNavigateAway) {
		location.href = '/';
	}
}

function clearInputs() {
	cardioname_Input.value = '';
	name_Input.value = '';
	sets_Input.value = '';
	distance_Input.value = '';
	duration_Input.value = '';
	reps_Input.value = '';
	resistance_duration_Input.value = '';
	weight_Input.value = '';
}

if (workout_Type_Select) {
	workout_Type_Select.addEventListener('change', workOutChange);
}
if (complete_btn) {
	complete_btn.addEventListener('click', function (event) {
		shouldNavigateAway = true;
		formSubmit(event);
	});
}
if (add_new_workoutt_button) {
	add_new_workoutt_button.addEventListener('click', formSubmit);
}
function workOutChange(event) {
	workoutType = event.target.value;

	if (workoutType === 'cardio') {
		cardio_Form.classList.remove('d-none');
		resistance_Form.classList.add('d-none');
	} else if (workoutType === 'resistance') {
		resistance_Form.classList.remove('d-none');
		cardio_Form.classList.add('d-none');
	} else {
		cardio_Form.classList.add('d-none');
		resistance_Form.classList.add('d-none');
	}

	validateInputFields();
}

toast.addEventListener('animationend', toastAnimationEnd);

document.querySelectorAll('input').forEach((element) => element.addEventListener('input', validateInputFields));
