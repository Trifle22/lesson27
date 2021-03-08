const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// объявление стрелочной функции, которая принимает два параметра и фильтрует переданные значения по переданному типу

	hideAllResponseBlocks = () => {
    // объявление стрелочной функции, скрывающей блоки с ожидаемыми ответами программы
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
    //  объявление массива блоков с предполагаемыми ответами программы, который формируется из всех дивов с классом 'dialog__response-block'
		responseBlocksArray.forEach(block => block.style.display = 'none');
    // скрываем  все полученные дивы с таким классом
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
    // объявление стрелочной функции, которая показывает результат работы программы
		hideAllResponseBlocks();
    //  вызываем функцию скрывания предполагаемых ответов программы
		document.querySelector(blockSelector).style.display = 'block';
    //  ищем по переданному в функцию селектору нужные элементы и показываем их
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
    // если есть такой селектор, то присваиваем span с таким селектором текст из переменной msgText
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
  // объявляем функцию показа ошибки, передаем в нее текст ошибки и с переданным текстом вызываем функцию показа ответа 

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
  // объявляем функцию показа результата работы программы, передаем текст с ответом, вызываем функцию показа блока с ответом , куда передаем текст

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
  //  объявляем функцию показа того, что ответа прграммы нет, вызываем там функцию показа блока с ответом работы программы, куд передаем селектор блока, который оповещает о том, что нет результатов 

	tryFilterByType = (type, values) => {
    //  объявляем функцию фильтрования , передаем значения и тип фильтрования
		try {
      //  объявляем конструкцию try catch для отлова ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      // объявляем переменную , куда присваиваем результат выполнения кода, представленного строкой, который в последствии сшит в строку с разделителем в виде запятой и пробела 
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
        // объявляем переменную и присваиваем ей результат тернарного выражения , где либо будет получены данные , либо оповещение об их отсутствии 
			showResults(alertMsg);
      //  вызываем функцию показа результата работы программы , куда передаем ранее определенное сообщение с данными или оповещением об их отутствии 
		} catch (e) {
      // ловив ошибку 
			showError(`Ошибка: ${e}`);
      //  вызываем функцию показа ошибки, передаем в нее отловленную ошибку 
		}
	};

const filterButton = document.querySelector('#filter-btn');
// объявляем переменную и присваиваем ей элемент со страницы с id = filter-btn

filterButton.addEventListener('click', e => {
  // навешиваем обработчик события "клик" на кнопку со страницы, передаем в функцию эвент
	const typeInput = document.querySelector('#type');
  // объявляем переменную и присваиваем ей элемент со страницы с id = type
	const dataInput = document.querySelector('#data');
    // объявляем переменную и присваиваем ей элемент со страницы с id = data

	if (dataInput.value === '') {
    //  если инпут пустой
		dataInput.setCustomValidity('Поле не должно быть пустым!');
    //  то говорим, что оно не должно быть пустым)))

		showNoResults();
    //  показываем отсутствие результатов выборки
	} else {
    // иначе
		dataInput.setCustomValidity('');
    //  очищаем состояние ошибки в инпуте
		e.preventDefault();
    //  отменяем стандартное поведение браузера при свершении события, переданного в функцию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
    //  вызываем функцию фильтрации, вывод результатов и тд
	}
});

