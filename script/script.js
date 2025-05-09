const authBaseUrl = 'https://brosipapi-cffkgxf4cae5b4dy.canadacentral-01.azurewebsites.net';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhd2FyZGVuZW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDUzMjQ2OTl9.8Qz3asYGwGd5yTqglNJH1NkEMKlr16VFo5NIXceGH48'
// Simple toggle for the information modal
document.addEventListener('DOMContentLoaded', function () {

    function getPosts() {
        axios.get(`${authBaseUrl}/api/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                console.log('Get post successful:', response.data);
                load(false);
                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('user', response.data.user);

                // console.log('token', response.data.token);
                // window.location.href = '/login.html'
            })
            .catch(function (error) {
                console.error('GET post failed:', error.response?.data || error.message);
            });
    }

    getPosts();

    const toggleModal = () => {
        const modal = document.querySelector('.post-modal');
        if (modal.style.display === 'none') {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    };


    const followButtons = document.querySelectorAll('.btn-follow');
    followButtons.forEach(button => {
        button.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#555';
        });
        button.addEventListener('mouseout', function () {
            this.style.backgroundColor = '#333';
        });
    });
});