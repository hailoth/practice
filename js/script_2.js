function isitnumber() {
    if (!document.getElementById('phonenumber').value) {
        return false;
    }
    return /^\d+$/.test(document.getElementById('phonenumber').value.trim());
}
function check_values() {
    let flag = 1;
    let usernameid = document.getElementById('username');
    let phonenumberid = document.getElementById('phonenumber');
    let emailid = document.getElementById('email');
    let errorfioid = document.getElementById('errorfio');
    let errorphoneid = document.getElementById('errorphone');
    let erroremailid = document.getElementById('erroremail');
    let errorinfoid = document.getElementById('errorinfo');
    errorfioid.textContent = errorphoneid.textContent = erroremailid.textContent = errorinfoid.textContent = "";
    if (usernameid.value.trim() === '') {
        flag = 0;
        errorfioid.textContent = "Пожалуйста, введите ФИО";
    }
    if (!emailid.value.trim().includes("@") && emailid.value.trim() !== '') {
        flag = 0;
        erroremailid.textContent = "Введите корректный e-mail (он должен содержать @)";
    }
    if (!isitnumber()) {
        flag = 0;
        errorphoneid.textContent = "Номер телефона не может быть пустым или содержать нечисловые значения";
    }
    if (flag===1) {
        errorinfoid.textContent = "Заказ оформлен";
    }
}
ymaps.ready(init);
let myMap;
function init () {
    myMap = new ymaps.Map("map", {
        center: [54.193122, 37.617348], // Углич
        zoom: 11
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });

    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
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