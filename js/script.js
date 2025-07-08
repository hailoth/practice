function get_width() {
    return document.getElementById('num1').value;
}
function get_height() {
    return document.getElementById('num2').value;
}
function random_color() {
    let colorsymb = '0123456789ABCDEF'
    let colorcode ='#';
    for (let i = 0; i < 6; i++) {
        colorcode+=colorsymb[Math.round(Math.random()*16)];
    }
    return colorcode;
}
function generate_table() {
    let poleid = document.getElementById('pole');
    poleid.style.width=get_width()+'px';
    poleid.style.height=get_height()+'px';
    poleid.style.backgroundColor = random_color();
}