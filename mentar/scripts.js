
let btn_generate = document.getElementById('btnGenerate');
let btn_submit = document.getElementById('btnSubmit');
let btn_options = document.getElementById('btnOptions');
let result;
let start_time;


btn_generate.addEventListener('click', function(){
		let first_operand = document.getElementById('txtFirstOperand');
		let second_operand = document.getElementById('txtSecondOperand');
		let slt_first_operand = document.getElementById('sltDigitNumber_1');
		let slt_second_operand = document.getElementById('sltDigitNumber_2');
		
		first_operand.value = Math.round(
			10**(+slt_first_operand.value - 1) + Math.random() * ((10**(+slt_first_operand.value) - 1) - 10**(+slt_first_operand.value - 1))
		);
		second_operand.value = Math.round(
			10**(+slt_second_operand.value - 1) + Math.random() * ((10**(+slt_second_operand.value) - 1) - 10**(+slt_second_operand.value - 1))
		);

		let operator = document.getElementById('txtOperator'); 
		let slt_operator = document.getElementById('sltOperator');
		switch (slt_operator.value) {
			case 'r':
				k = Math.round(1 + Math.random() * 2);
				switch (k) {
					case 1:
						operator.value = '+';
						break;
					case 2:
						operator.value = '-';
						break;
					case 3:
						operator.value = 'x';
						break;
				}
				break; 
			case '+':
				operator.value = '+';
				break;
			case '-':
				operator.value = '-';
				break;
			case 'x':
				operator.value = 'x';
				break;
		}

		switch (operator.value) {
			case '+':
				result = +first_operand.value + +second_operand.value;
				break;
			case '-':
				result = +first_operand.value - +second_operand.value;
				break;
			case 'x':
				result = +first_operand.value * +second_operand.value;
				break;
		}

		let txt_result = document.getElementById('txtResult');
		txt_result.value = '';

		txt_result.focus();
		start_time = performance.now();


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
// !Добавить защиту от дурака: сначала нажать submit без предварительного нажатия btn_generate
// !Проверять, ввел ли пользователь вообще какое-либо число
// !Switch'и ужасны!
