
const btn = document.getElementById('confirmButton');
const numberInput = document.getElementById('numberInput');
const nameInput = document.getElementById('name');
const mes = document.getElementById('expMonth');
const año = document.getElementById('expYear');
const cvc = document.getElementById('cvc');
const success = document.querySelector('.success');
const form = document.getElementById('cardForm');
const btnContinue=document.getElementById('continueButton');

function datosTarjeta(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const number = document.getElementById('numberInput');
    const mes = document.getElementById('expMonth');
    const año = document.getElementById('expYear');
    const cvc = document.getElementById('cvc');
    

    const nameError = document.getElementById('nameError');
    const numberError = document.getElementById('numberError');
    const dateError = document.getElementById('dateError');
    const cvcError = document.getElementById('cvcError');
    const soloLetras = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
    const soloNumeros = /^[0-9\s]+$/;
    let isValid = true;

    try {
        if (name.value.trim() === "") {
            mostrarError(name, nameError, "Can't be blank");
            isValid = false;
        } else if (!soloLetras.test(name.value)) {
            mostrarError(name, nameError, "Wrong format, letters only");
            isValid = false;
        } else {
            quitarError(name, nameError);
        }

        //numero
        if(number.value.trim()===""){
            mostrarError(number, numberError, "Can't be blank");
            isValid = false;
        }else if(!soloNumeros.test(number.value)){
            mostrarError(number, numberError, "Wrong format, numbers only");
            isValid = false;
        }else if(number.value.length>19){
            mostrarError(number, numberError, "Wrong format, only 16 digits");
            isValid = false;
        }else{
            quitarError(number, numberError);
        }
        //fecha
        if(mes.value.trim()==="" || año.value.trim()===""){
            mostrarError(mes, dateError, "Can't be blank");
            isValid = false;
        }else if(!soloNumeros.test(mes.value) || !soloNumeros.test(año.value)){
            mostrarError(mes, dateError, "Wrong format, numbers only");
            isValid = false;
        }else if(mes.value.length>2 || año.value.length>2){
            mostrarError(mes, dateError, "Wrong format, only 2 digits");
            isValid = false;
        }else{
            quitarError(mes, dateError);
        }
        //cvc
        if(cvc.value.trim()===""){
            mostrarError(cvc, cvcError, "Can't be blank");
            isValid = false;
        }else if(!soloNumeros.test(cvc.value)){
            mostrarError(cvc, cvcError, "Wrong format, numbers only");
            isValid = false;
        }else if(cvc.value.length>3){
            mostrarError(cvc, cvcError, "Wrong format, only 3 digits");
            isValid = false;
        }else{
            quitarError(cvc, cvcError);
        }
        if(isValid){
            console.log('Datos agregados correctamente');
            success.style.display = 'flex';
            form.style.display = 'none';
        }
    } catch (error) {
        console.log('Error al agregar datos',error);
    }

    function mostrarError(input, errorElement, mensaje) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
        input.classList.add('error');
    }

    function quitarError(input, errorElement) {
        errorElement.textContent = "";
        errorElement.style.display = 'none';
        input.classList.remove('error');
    }
}
btn.addEventListener('click', datosTarjeta);
numberInput.addEventListener('input', (e) => {
    // 1. Eliminar cualquier cosa que no sea un número 
    let value = e.target.value.replace(/\D/g, ''); 
    
    // 2. Fragmentar el texto en grupos de 4 y unirlos con un espacio
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // 3. Asignar el valor formateado de vuelta al input
    e.target.value = formattedValue;

    const cardDisplay = document.querySelector('.numberCard');
    cardDisplay.textContent = formattedValue || "0000 0000 0000 0000";

});

cvc.addEventListener('input', (e) => {
    const cardCvc = document.querySelector('.cvc');
    cardCvc.textContent = e.target.value || "000";
});
nameInput.addEventListener('input', (e) => {
    const cardName = document.querySelector('.nameCard');
    cardName.textContent = e.target.value;
});
//unir mes y año
function actualizarFecha() {
    const cardDate = document.querySelector('.date');
    const mesValue = mes.value || "00";
    const añoValue = año.value || "00";
    cardDate.textContent = `${mesValue}/${añoValue}`;
}

mes.addEventListener('input', actualizarFecha);
año.addEventListener('input', actualizarFecha);


btnContinue.addEventListener('click',()=>{
    window.location.reload();
});