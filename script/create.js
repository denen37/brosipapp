const baseUrl = 'https://brosipapi-cffkgxf4cae5b4dy.canadacentral-01.azurewebsites.net/'
const token = localStorage.getItem('token')

let post = {};
let frontViewObj = { viewType: "front" };
let openViewObj = { viewType: "open", };

document.addEventListener('DOMContentLoaded', () => {
    const frontView = document.getElementById('front-view');//front-view
    const openView = document.getElementById('open-view');
    const frontUploadBtn = document.getElementById('front-view-upload');
    const openUploadBtn = document.getElementById('open-view-upload');
    const publishBtn = document.querySelector('.publish');
    const discardBtn = document.querySelector('.discard');
    const poseType = document.getElementById('pose-type');
    const postOptions = document.getElementById('pose-options');


    function startLoading(view) {
        const loader = document.querySelector(`.${view}-overlay`);

        loader.classList.remove('hide');
        loader.classList.add('flex');
    }

    function stopLoading(view) {
        const loader = document.querySelector(`.${view}-overlay`);

        loader.classList.remove('flex');
        loader.classList.add('hide');
    }

    function showImage(imagePath) {
        const frontView = document.querySelector('.front-view-label');
        const frontImg = document.querySelector('.front-view-img');

        frontView.classList.remove('show');
        frontView.classList.add('hide');

        frontImg.src = imagePath;
        frontImg.classList.remove('hide');
        frontImg.classList.add('show');
    }

    function showImages(imageList) {
        //open-view-img
        const openView = document.querySelector('.open-view-label');
        const openViewContainer = document.querySelector('.open-view-img-container');

        openView.classList.remove('show');
        openView.classList.add('hide');

        imageList.forEach((imagePath) => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.classList.add('open-view-img');
            openViewContainer.appendChild(img);
        });

        openViewContainer.classList.add('grid');
        openViewContainer.classList.remove('hide');
    }

    async function uploadSingleFile(file) {

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${baseUrl}/api/uploads/single`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Response:', response.data.status);


            return response.data;
        } catch (error) {
            console.error(error);
            throw error.response?.data || error.message;
        }
    }

    async function uploadMultipleFiles(files) {
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(`${baseUrl}/api/uploads/multiple`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data)

            return response.data;
        } catch (error) {
            console.log(error.response?.data);
            throw error.response?.data || error.message;
        }

    }

    function loadPublish(isLoading) {
        const loader = document.querySelector('.publish .btn-loader');
        const text = document.querySelector('.publish .text');

        if (isLoading) {
            loader.classList.add('show');
            loader.classList.remove('hide');

            text.classList.add('hide');
            text.classList.remove('show');

            publishBtn.classList.add('disable');
            publishBtn.classList.remove('enable');
        } else {
            loader.classList.remove('show');
            loader.classList.add('hide');

            text.classList.remove('hide');
            text.classList.add('show');

            publishBtn.classList.remove('disable');
            publishBtn.classList.add('enable');
        }
    }



    frontView.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        showImage(fileURL);
    });

    openView.addEventListener('change', (e) => {
        const files = e.target.files;
        filesList = Array.from(files).map(file => URL.createObjectURL(file)).slice(0, 4);
        showImages(filesList);
    });

    frontUploadBtn.addEventListener('click', (e) => {
        const file = frontView.files[0];

        if (!file) {
            alert('Please select a file.');
            return;
        }

        frontUploadBtn.classList.add('disable');
        startLoading('front');

        uploadSingleFile(file)
            .then((response) => {
                frontViewObj = {
                    ...frontViewObj,
                    images: [response.data.url]
                }

                stopLoading('front');
                frontUploadBtn.classList.remove('disable');
                alert('Upload successful!');
            })
            .catch((error) => {
                console.error('Upload failed:', error);
                stopLoading('front');
                frontUploadBtn.classList.remove('disable');
                alert('Upload failed!');
            });

    });


    openUploadBtn.addEventListener('click', (e) => {
        const files = openView.files;

        if (!files || files.length === 0) {
            alert('Please select least one file.');
            return;
        }

        openUploadBtn.classList.add('disable');
        startLoading('open');

        uploadMultipleFiles(files)
            .then((response) => {
                openViewObj = {
                    ...openViewObj,
                    images: response.data.urls.map(url => url)
                }

                stopLoading('open');
                openUploadBtn.classList.remove('disable');
                alert('Upload successful!');
            })
            .catch((error) => {
                console.error('Upload failed:', error);
                stopLoading('open');
                openUploadBtn.classList.remove('disable');
                alert('Upload failed!');
            });
    })

    publishBtn.addEventListener('click', (e) => {
        const titleInput = document.getElementById('title')
        const descriptionInput = document.getElementById('description')

        const title = titleInput.value.trim()
        const description = descriptionInput.value.trim()

        if (!title) {
            alert('Please enter a title.');
            return;
        }

        if (!description) {
            alert('Please enter a description.');
            return;
        }

        if (!((frontViewObj.images && frontViewObj.images.length > 0) ||
            (openViewObj.images && openViewObj.images.length > 0))) {
            alert('Please upload a view image.');
            return;
        }

        loadPublish(true);

        post = {
            ...post,
            title,
            body: description,
            views: [frontViewObj, openViewObj],

        }

        console.log('Post object:', post);
        axios.post(`${baseUrl}/api/posts`, post, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token to the request headers
            }
        }).then((response) => {
            console.log('Post created successfully:', response.data);
            loadPublish(false);

            alert('Post created successfully!');
            window.location.href = '/home.html'
        }
        ).catch((error) => {
            console.error('Error creating post:', error);
            loadPublish(false);
            alert('Error creating post!');
        });
    })


    discardBtn.addEventListener('click', (e) => {
        const titleInput = document.getElementById('title')
        const descriptionInput = document.getElementById('description')
        titleInput.value = ''
        descriptionInput.value = ''
        poseType.value = '0'
        postOptions.value = '0'
        frontView.value = ''
        openView.value = ''
        frontUploadBtn.classList.remove('disable')
        openUploadBtn.classList.remove('disable')
    })

    poseType.addEventListener('change', (e) => {
        const selectedValue = e.target.value;

        frontViewObj = {
            ...frontViewObj,
            poseType: selectedValue.toLowerCase()
        }

        console.log('Post object:', frontViewObj);
    })

    postOptions.addEventListener('change', (e) => {
        const selectedValue = e.target.value;

        openViewObj = {
            ...openViewObj,
            options: [selectedValue.toLowerCase()]
        }

        console.log('Post object:', openViewObj);
    })
})