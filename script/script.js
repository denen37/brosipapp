// Simple toggle for the information modal
document.addEventListener('DOMContentLoaded', function () {

    function getPosts() {

    }

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