var inputElement = document.getElementById("profile-upload");
var profilePic = document.querySelector(".upload-label img");
var navPic = document.querySelector(".profile-pic");
var blogCountElement = document.getElementById("blog-count");

function updateUIWithImage(imageData) {
    if (profilePic) profilePic.src = imageData;
    if (navPic) navPic.src = imageData;
}

function updateBlogStats() {
    const storedBlogs = localStorage.getItem("blogs");
    let blogs = storedBlogs ? JSON.parse(storedBlogs) : [];

    let counter = 0;
    blogs.forEach(function (item) {
        counter++;
    });


    if (blogCountElement) {
        blogCountElement.innerText = counter;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
        updateUIWithImage(savedImage);
    }
    updateBlogStats();
});


if (inputElement) {
    inputElement.onchange = function (event) {
        var myFile = event.target.files[0];
        if (myFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var base64String = e.target.result;
                localStorage.setItem("userProfileImage", base64String);
                updateUIWithImage(base64String);
            };
            reader.readAsDataURL(myFile);
        }
    };
}

