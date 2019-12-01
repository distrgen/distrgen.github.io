
let btn_generate = document.getElementById('btnGenerate');
let btn_submit = document.getElementById('btnSubmit');
let btn_options = document.getElementById('btnOptions');
let txt_result = document.getElementById('txtResult');
let result;
let start_time;


function generate_problem(){
	let txt_first_operand = document.getElementById('txtFirstOperand');
	let txt_second_operand = document.getElementById('txtSecondOperand');

	// Две следующие переменные можно сделать сразу же значениями (.value)
	let slt_first_operand = document.getElementById('sltDigitNumber_1'); 
	let slt_second_operand = document.getElementById('sltDigitNumber_2');
	
	let first_operand = Math.round(
		10**(+slt_first_operand.value - 1) + Math.random() * ((10**(+slt_first_operand.value) - 1) - 10**(+slt_first_operand.value - 1))
	);
	let second_operand = Math.round(
		10**(+slt_second_operand.value - 1) + Math.random() * ((10**(+slt_second_operand.value) - 1) - 10**(+slt_second_operand.value - 1))
	);

	txt_first_operand.value = first_operand;
	txt_second_operand.value = second_operand;

	let txt_operator = document.getElementById('txtOperator'); 
	let slt_operator = document.getElementById('sltOperator');

	let used_operators = [];
	for (let i = 0; i < 3; i++) {
		let chbox = document.getElementById('cbxOp' + i) 
		if (chbox.checked){
			used_operators.push(chbox.value);
		}
	}

	// !Здесь нужно добавить проверку на то, что выбран хоть один чекбокс!

	operator_index = Math.round(Math.random()*(used_operators.length - 1));

	switch (used_operators[operator_index]) {
		case '+':
			txt_operator.value = '+';
			result = first_operand + second_operand;
			break;
		case '-':
			txt_operator.value = '-';
			result = first_operand - second_operand;
			break;
		case 'x':
			txt_operator.value = 'x';
			result = first_operand * second_operand;
			break;
	}

	let txt_result = document.getElementById('txtResult');
	txt_result.value = '';

	txt_result.focus();
	start_time = performance.now();
}

// btn_generate.addEventListener('click', function(){
btn_generate.addEventListener('keyup', function(e){
	generate_problem();		
});

btn_generate.addEventListener('click', function(){
	generate_problem();
});

btn_submit.addEventListener('click', function(){
	calculation_time = performance.now() - start_time;
	let txt_result = document.getElementById('txtResult');
	let user_result = +txt_result.value;
	txt_result.value = '';
	
	let err = Math.round(Math.abs(result - user_result) / result * 10000.0) / 100.0;
	document.getElementById('pCorrectAnswer').innerHTML = result;
	document.getElementById('pGivenAnswer').innerHTML = user_result;
	document.getElementById('pError').innerHTML = err + ' %';
	document.getElementById('pTime').innerHTML = Math.round(calculation_time) + ' ms';	
	document.getElementById('btnGenerate').focus();
	txt_result.blur();

});

btn_options.addEventListener('click', function(){
	let stn_options = document.getElementById('stnOptions');
	if (stn_options.style.display == 'none' || stn_options.style.display =='') {
		stn_options.style.display = 'flex';
	} 
	else {
		stnOptions.style.display = 'none';
	}
});

txt_result.addEventListener('keyup', function(e){
	if (e.code === 'Enter') {
	// if (e.keyCode === 13) {
		btn_submit.click();
		// txt_result.blur();
		// alert(document.activeElement);
	}
});
// !Добавить защиту от дурака: сначала нажать submit без предварительного нажатия btn_generate
// !Проверять, ввел ли пользователь вообще какое-либо число
// !Switch'и ужасны!
// !27.11.2019 - неадекватно работают нажатия на кнопки (различается поведение при вводе с клавиатуры и при нажатии мышкой)

// !Проверить по поводу анонимности функций
// (function() {
//   document.querySelector('input').addEventListener('keydown', function(e) {
//     if (e.keyCode === 13) {
//       // можете делать все что угодно со значением текстового поля
//       console.log(this.value);
//     }
//   });
// })();
