let imageUrl = document.getElementById('imageUrl');
let imageFile = document.getElementById('imageFile');
const removeBtn = document.getElementById('removeFileBtn');


imageUrl.addEventListener("input", function () {
    if (this.value.trim() !== "") {
        imageFile.disabled = true;
    } else {

        imageFile.disabled = false;
    }
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
    console.log("File removed");
   
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
        reader.onload = function (e) {
            saveblog(e.target.result);
        };
        reader.readAsDataURL(imageFile.files[0]);
    } else {
        saveblog('');
    }

    function saveblog(finalImage) {
        let blog = {
            title: title,
            image: finalImage,
            category: category,
            content: content,
            createdAt: new Date().toLocaleString()
        };

        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push(blog);
        localStorage.setItem("blogs", JSON.stringify(blogs));


        document.getElementById("blogForm").reset();
        imageUrl.disabled = false;
        imageFile.disabled = false;
        removeBtn.style.visibility="hidden";//remove me new 

        Swal.fire({
            title: "Success",
            text: "Created Successfully",
            icon: "success",
            theme: 'dark',
            confirmButtonColor:"#000000"
        });
    }
});
