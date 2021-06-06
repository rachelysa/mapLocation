
function init(){
  var stylePrefs=  loadFromStorage('userData');
  if(!stylePrefs) return;
  document.body.style.backgroundColor=stylePrefs.bColor;
  document.body.style.color=stylePrefs.fColor;
}
function showAge(newVal) {
    document.getElementById("sAge").innerHTML = newVal;
}
function checkAge() {
    var elDate = document.getElementById("dob");
    var birthday = new Date(elDate.value);
    var elAge = document.getElementById("age");
    var today = new Date(Date.now())
    if (today.getYear() - birthday.getYear() !== parseInt(elAge.value)) elAge.setCustomValidity("your age do not match your bith Date");
    else elAge.setCustomValidity("");
}
function savePrefs() {
    var saveToStorage = {
        bColor: document.querySelector('#b-color').value,
        fColor: document.querySelector('#color').value,
        birthday: document.getElementById("dob").value,
        email: document.querySelector('#email').value
    }
    localStorage.setItem('userData', JSON.stringify(saveToStorage))

    saveToStorage('userData', saveToStorage);

}