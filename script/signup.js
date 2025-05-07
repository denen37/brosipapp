const authBaseUrl = 'https://brosipapi-cffkgxf4cae5b4dy.canadacentral-01.azurewebsites.net'

document.addEventListener('DOMContentLoaded', () => {
    const firstNameInput = document.querySelector('.firstName');
    const lastNameInput = document.querySelector('.lastName');
    const emailInput = document.querySelector('.email');
    const phoneInput = document.querySelector('.phone');
    const passwordInput = document.querySelector('.password');
    const confirmPasswordInput = document.querySelector('.cpassword');
    const signUpBtn = document.getElementById('signUP-btn');
    const checkId = document.getElementById('checkId');

    // Corrected validation functions with consistent error handling
    function validateFirstName() {
        const firstName = firstNameInput.value.trim();
        const nameRegex = /^[A-Za-z'-]{2,}$/;
        console.log('from firstName', nameRegex.test(firstName));
        return nameRegex.test(firstName);
    }


    function validateLastName() {
        const lastName = lastNameInput.value.trim();
        // Improved regex to allow more name variations
        const nameRegex = /^[A-Za-z'-]{2,}$/;
        return nameRegex.test(lastName);
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    function validatePhoneNumber() {
        const phoneNumber = phoneInput.value.trim();
        const cleaned = phoneNumber.replace(/[\s()-]/g, ''); // Remove spaces, dashes, parentheses
        const phoneRegex = /^\+?\d{10,15}$/; // Allows optional + and 10 to 15 digits

        return phoneRegex.test(cleaned);
    }




    function validatePassword() {
        const passwordInput = document.querySelector('.password');
        const password = passwordInput.value;
        // const strengthMeter = document.getElementById('strengthMeter');

        // Create password toggle container if it doesn't exist
        let passwordContainer = passwordInput.parentElement;
        let toggleText = passwordContainer.querySelector('.password-toggle-icon');

        if (!toggleText) {
            // Create a container for password input and toggle icon
            const newContainer = document.createElement('div');
            newContainer.style.display = 'flex';
            newContainer.style.alignItems = 'center';
            newContainer.style.position = 'relative';

            // Move input into new container
            passwordInput.parentNode.insertBefore(newContainer, passwordInput);
            newContainer.appendChild(passwordInput);

            // Create toggle icon
            toggleText = document.createElement('span');
            toggleText.classList.add('password-toggle-icon');
            toggleText.style.cursor = 'pointer';
            toggleText.style.position = 'absolute';
            toggleText.style.right = '10px';
            toggleText.style.top = '50%';
            toggleText.style.transform = 'translateY(-50%)';

            // Initial eye-closed icon (SVG)
            toggleText.innerHTML = 'show'


            newContainer.appendChild(toggleText);

            // Toggle password visibility
            toggleText.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    toggleText.innerHTML = 'hide'

                } else {
                    passwordInput.type = 'password';
                    toggleText.innerHTML = 'show'

                }
            });
        }

        return password !== '' && password.length >= 4;
    }


    function validateConfirmPassword() {
        const cpassword = confirmPasswordInput.value;
        // const strengthMeter = document.getElementById('strengthMeter');

        // Create password toggle container if it doesn't exist
        let passwordContainer = passwordInput.parentElement;
        let toggleText = passwordContainer.querySelector('.password-toggle-icon');

        if (!toggleText) {
            // Create a container for password input and toggle icon
            const newContainer = document.createElement('div');
            newContainer.style.display = 'flex';
            newContainer.style.alignItems = 'center';
            newContainer.style.position = 'relative';

            // Move input into new container
            passwordInput.parentNode.insertBefore(newContainer, passwordInput);
            newContainer.appendChild(passwordInput);

            // Create toggle icon
            toggleText = document.createElement('span');
            toggleText.classList.add('password-toggle-icon');
            toggleText.style.cursor = 'pointer';
            toggleText.style.position = 'absolute';
            toggleText.style.right = '10px';
            toggleText.style.top = '50%';
            toggleText.style.transform = 'translateY(-50%)';

            // Initial eye-closed icon (SVG)
            toggleText.innerHTML = 'show'


            newContainer.appendChild(toggleText);

            // Toggle password visibility
            toggleText.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    toggleText.innerHTML = 'hide'

                } else {
                    passwordInput.type = 'password';
                    toggleText.innerHTML = 'show'

                }
            });
        }

        return cpassword !== '' && cpassword.length >= 4;
    }


    function validateCosent() {
        const errorMsg = document.getElementById('consent-error')
        if (checkId.checked) {
            errorMsg.style.display = 'none';
            return true;

        }
        errorMsg.style.display = 'block'
        return false
    }


    function load(isLoading) {
        const loader = document.querySelector('.loader');
        const text = document.querySelector('#signUP-btn .text');

        if (isLoading) {
            loader.style.display = 'block';
            text.style.display = 'none';
            signUpBtn.style.pointerEvents = 'none';
            signUpBtn.style.opacity = '0.5';

        } else {
            loader.style.display = 'none';
            text.style.display = 'block';
            signUpBtn.style.pointerEvents = 'auto';
            signUpBtn.style.opacity = '1';
        }
    }

    function addError(errorMsg) {
        const errorList = document.querySelector('.error-list')
        const li = document.createElement('li')
        li.innerText = errorMsg;
        errorList.appendChild(li);
    }


    firstNameInput.addEventListener('input', () => {
        showSignUpBtn();
    });

    lastNameInput.addEventListener('input', () => {
        showSignUpBtn();
    });


    emailInput.addEventListener('input', () => {
        showSignUpBtn();
    });

    phoneInput.addEventListener('input', () => {
        showSignUpBtn();
    })

    passwordInput.addEventListener('input', () => {
        showSignUpBtn();
    });

    confirmPasswordInput.addEventListener('input', () => {
        showSignUpBtn();
    });

    checkId.addEventListener('change', () => {
        showSignUpBtn();
    });

    signUpBtn.addEventListener('click', (e) => {
        const email = emailInput.value.trim();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const consent = checkId.value.trim();

        if (password !== confirmPassword) {
            addError('Passwords do not match');
            return;
        }

        load(true);

        axios.post(`${authBaseUrl}/api/auth/register`, {
            email,
            password,
            phone,
            firstName,
            lastName,
            password,
            confirmPassword
        })
            .then(function (response) {
                console.log('Login successful:', response.data);
                load(false);
                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('user', response.data.user);

                // console.log('token', response.data.token);
                window.location.href = '/login.html'
            })
            .catch(function (error) {
                load(false);
                const errorList = document.querySelector('.error-list');
                errorList.innerHTML = '';
                const errorObj = error.response?.data || error.message
                console.log('Login error:', errorObj);

                addError(errorObj.message);
            });
    })



    function showSignUpBtn() {
        const isValid =
            validateFirstName() &&
            validateLastName() &&
            validateEmail() &&
            validatePhoneNumber() &&
            validatePassword() &&
            validateConfirmPassword() &&
            validateCosent();

        // console.log('first name', validateFirstName());
        // console.log('last name', validateLastName());
        // console.log('email', validateEmail());
        // console.log('password', validatePassword());
        // console.log('confirm password', validateConfirmPassword());
        // console.log('consent', validateCosent())

        if (isValid) {
            signUpBtn.style.opacity = '1';
            signUpBtn.style.pointerEvents = 'auto';
        }
        else {
            signUpBtn.style.opacity = '0.5';
            signUpBtn.style.pointerEvents = 'none';
        }
    }
})



function changeInputBoxBorderColor(inputBoxId) {
    const inputBox = document.getElementById(inputBoxId);
    if (inputBox) {
        inputBox.classList.add('invalid-input');
    }
}

function resetInputBoxBorderColor(inputBoxId) {
    const inputBox = document.getElementById(inputBoxId);
    if (inputBox) {
        inputBox.classList.remove('invalid-input');
    }
}