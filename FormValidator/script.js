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
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, 'Email is not valid')
    }
}

//Get FieldName capitalizes first letter
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);    
}

//Check required fields
const checkRequired = (inputArray) => {
    inputArray.forEach((input)=> {
        if(input.value.trim() === ''){        
            showError(input, `${getFieldName(input)} is Required!`)          
        }else{
            showSuccess(input)
        }
    })
}

//check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be at less than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

checkPassword = (input1,input2) => {
    if(input1.value !== input2.value){
        showError(input2, "Passwords Do not Match")
    }
}


//Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()    
    checkRequired([username,email,password,password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPassword(password,password2);    
})