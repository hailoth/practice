function validateValues({ userName, phoneNumber, email }) {
    const errors = {};
    const emailTestError = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    const phoneNumberTestError = /^\d+$/;

    if (!userName.trim()) {
        errors.userName = "Пожалуйста, введите ФИО";
    }
    if (email && !emailTestError.test(email)) {
        errors.email = "Введите корректный e-mail";
    }
    if (!phoneNumberTestError.test(phoneNumber)) {
        errors.phoneNumber = "Номер телефона не может быть пустым или содержать нечисловые значения";
    }

    return errors;
}

function showErrors(errors, elements) {
    Object.keys(elements).forEach(key => {
        if (key !== 'result') {
            elements[key].textContent = '';
        }
    });

    Object.entries(errors).forEach(([key, msg]) => {
        if (elements[key]) {
            elements[key].textContent = msg;
        }
    });

    elements.result.textContent = '';
    if (Object.keys(errors).length === 0) {
        elements.result.textContent = "Заказ оформлен";
    }
}

function checkValues() {
    if (!checkDomElements()) return false;

    const elements = {
        userName: document.getElementById('errorUserName'),
        phoneNumber: document.getElementById('errorPhoneNumber'),
        email: document.getElementById('errorEmail'),
        result: document.getElementById('errorResult')
    };

    const values = {
        userName: document.getElementById('userName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value
    };

    const errors = validateValues(values);
    showErrors(errors, elements);

    return Object.keys(errors).length === 0;
}

ymaps.ready(init);
let myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [54.193122, 37.617348],
        zoom: 11
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader: 'Место выбрано',
                contentBody:
                    '<p>Координаты: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
            });
        } else {
            myMap.balloon.close();
        }
    });
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
}

function checkDomElements() {

    const requiredElements = ['userName', 'phoneNumber', 'email', 'errorUserName', 'errorPhoneNumber', 'errorEmail', 'errorResult'];
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error(`ошибка: ${missingElements.join(', ')}`);
        return false;
    }

    return true;
}