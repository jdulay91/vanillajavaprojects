const form  = document.querySelector('#form');
const username  = document.querySelector('#username');
const email  = document.querySelector('#email');
const password  = document.querySelector('#password');
const password2  = document.querySelector('#password2');

//show input error message
const showError = (input,message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
}

//show Success outline
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

//check Email is valid
const isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}

//Get FieldName capitalizes first letter
const getFieldName = (input) => {
    input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check required fields
const checkRequired = (inputArray) => {
    inputArray.forEach((input)=> {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is Required!`);            
        }else{
            showSuccess(input)
        }
    })
}



//Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()    
    checkRequired([form,username,email,password,password2])
})