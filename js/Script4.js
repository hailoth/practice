

async function getData() {
    let response = await fetch("https://exercise.develop.maximaster.ru/service/cpu/");
    if (!(response.ok)) {
        return 0;
    }
    else {
        i++;
        return (await response.json());
    }
}


setInterval(getData, 5000);