function isNumber() {
    if (!document.getElementById('phoneNumber').value) {
        return false;
    }
    return /^\d+$/.test(document.getElementById('phoneNumber').value.trim());
}

function checkValues() {
    if (!checkDomElements()) {
        return false;
    }

    let flag = true;

    let userName = document.getElementById('userName');
    let phoneNumber = document.getElementById('phoneNumber');
    let email = document.getElementById('email');
    let errorUserName = document.getElementById('errorUserName');
    let errorPhoneNumber = document.getElementById('errorPhoneNumber');
    let errorEmail = document.getElementById('errorEmail');
    let errorResult = document.getElementById('errorResult');

    const reg=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    clearErrorMessages(errorUserName, errorPhoneNumber, errorEmail, errorResult);

    if (userName.value.trim() === '') {
        flag = false;
        errorUserName.textContent = "Пожалуйста, введите ФИО";
    }
    if (email.value!=='' && !reg.test(email.value)) {
        flag = false;
        errorEmail.textContent = "Введите корректный e-mail";
    }
    if (!isNumber()) {
        flag = false;
        errorPhoneNumber.textContent = "Номер телефона не может быть пустым или содержать нечисловые значения";
    }
    if (flag===true) {
        errorResult.textContent = "Заказ оформлен";
    }
}

ymaps.ready(init);
let myMap;

function init () {
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
                contentHeader:'Место выбрано',
                contentBody:
                    '<p>Координаты: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
            });
        }
        else {
            myMap.balloon.close();
        }
    });
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
}

function checkDomElements() {
    if (document.getElementById('userName')
        && document.getElementById('phoneNumber')
        && document.getElementById('email')
        && document.getElementById('errorUserName')
        && document.getElementById('errorPhoneNumber')
        && document.getElementById('errorEmail')
        && document.getElementById('errorResult')) {
        return true;
    }
    else
        return false;
}

function clearErrorMessages(errorUserName, errorPhoneNumber, errorEmail, errorResult) {
    errorUserName.textContent = errorPhoneNumber.textContent = errorEmail.textContent = errorResult.textContent = "";
}