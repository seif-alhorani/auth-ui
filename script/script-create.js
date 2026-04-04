const urlParams = new URLSearchParams(window.location.search);
const editTitle = urlParams.get('edit'); 
const submitBtn = document.querySelector('.publish-btn');
const formTitle = document.querySelector('.hero-section h1');

let imageUrl = document.getElementById('imageUrl');
let imageFile = document.getElementById('imageFile');
const removeBtn = document.getElementById('removeFileBtn');


document.addEventListener("DOMContentLoaded", function() {
    if (editTitle) {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const blogToEdit = blogs.find(b => b.title === decodeURIComponent(editTitle));

        if (blogToEdit) {
            formTitle.innerText = "Edit Blog";
            submitBtn.innerText = "Update Blog";
            document.getElementById('title').value = blogToEdit.title;
            document.getElementById('category').value = blogToEdit.category;
            document.getElementById('content').value = blogToEdit.content;
            imageUrl.value = blogToEdit.image;
        }
    }
});


imageUrl.addEventListener("input", function () {
    imageFile.disabled = this.value.trim() !== "";
});

imageFile.addEventListener("change", function () {
    if (this.files && this.files.length > 0) {
        imageUrl.disabled = true;
        removeBtn.style.display = "block";
    } else {
        imageUrl.disabled = false;
        removeBtn.style.display = "none";
    }
});

removeBtn.addEventListener("click", function () {
    imageFile.value = "";
    this.style.display = "none";
    imageUrl.disabled = false;
});

document.getElementById('blogForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let content = document.getElementById('content').value;

    if (imageUrl.value) {
        saveblog(imageUrl.value);
    } else if (imageFile.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) { saveblog(e.target.result); };
        reader.readAsDataURL(imageFile.files[0]);
    } else {
        saveblog('');
    }

    function saveblog(finalImage) {
        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        if (editTitle) {
            const index = blogs.findIndex(b => b.title === decodeURIComponent(editTitle));
            if (index !== -1) {
                blogs[index] = {
                    ...blogs[index],
                    title: title,
                    image: finalImage,
                    category: category,
                    content: content
                };
            }
        } else {
            
            let blog = {
                title: title,
                image: finalImage,
                category: category,
                content: content,
                createdAt: new Date().toLocaleString(),
                comments: [] 
            };
            blogs.push(blog);
        }

        localStorage.setItem("blogs", JSON.stringify(blogs));
        
        Swal.fire({
            title: "Success",
            text: editTitle ? "Updated Successfully" : "Created Successfully",
            icon: "success",
            confirmButtonColor: "#000000"
        }).then(() => {
            window.location.href = 'dashboard.html'; // Redirect to Dashboard [cite: 33]
        });
    }
});