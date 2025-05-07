
// some of the dom element here is shared with the sigh up page that is the reason they have same name
const authBaseUrl = 'https://brosipapi-cffkgxf4cae5b4dy.canadacentral-01.azurewebsites.net'

const RequestStatus = {
    INITIAL: 'initial',
    SUCCESS: 'success',
    ERROR: 'error',
    PENDING: 'pending'
}


document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('.email');
    const passwordInput = document.querySelector('.Password');
    const signUpBtn = document.getElementById('signUP-btn');
    const checkId = document.getElementById('checkId');

    // validation functions with consistent error handling

    const validateEmail = () => {
        const email = emailInput.value.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };



    function validatePassword() {
        const passwordInput = document.querySelector('.Password');
        const password = passwordInput.value;

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


    signUpBtn.addEventListener('click', (e) => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        load(true);

        axios.post(`${authBaseUrl}/api/auth/login`, {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log('Login successful:', response.data);
                load(false);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', response.data.data.user);

                window.location.href = '/home.html'
            })
            .catch(function (error) {
                load(false);
                const errorList = document.querySelector('.error-list');
                errorList.innerHTML = '';
                const errorObj = error.response?.data || error.message
                console.log('Login error:', errorObj);

                const li = document.createElement('li');
                li.textContent = errorObj.message;

                errorList.appendChild(li);
            });
    });

    emailInput.addEventListener('input', () => {
        showSignUpBtn();
    });



    passwordInput.addEventListener('input', () => {
        showSignUpBtn();
    });



    function showSignUpBtn() {
        const isValid =
            validateEmail() &&
            validatePassword()

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


// Utility functions remain the same as in original script
function replaceRadioWithImage(radioElement, imagePath = "/image/check.png", width = "23px", height = "23px") {
    if (radioElement.getAttribute('data-replaced') === 'true') return;

    const img = document.createElement('img');
    img.src = imagePath;
    img.style.width = width;
    img.style.height = height;
    img.classList.add('replaced-radio-image');

    radioElement.style.display = 'none';
    radioElement.setAttribute('data-replaced', 'true');
    radioElement.parentNode.appendChild(img);

    return img;
}


function removeRadioImage(radioElement) {
    // Check if the radio button has been replaced
    if (radioElement.getAttribute('data-replaced') !== 'true') {
        return; // No image to remove
    }

    // Find the parent element
    const parentElement = radioElement.parentNode;

    // Find the added image
    const replacedImage = parentElement.querySelector('.replaced-radio-image');

    if (replacedImage) {
        // Remove the added image
        parentElement.removeChild(replacedImage);
    }

    // Restore the radio button's display
    radioElement.style.display = '';

    // Remove the replaced attribute
    radioElement.removeAttribute('data-replaced');
}


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