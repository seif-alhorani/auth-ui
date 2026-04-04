document.addEventListener("DOMContentLoaded", function () {
    let blogContentContainer = document.getElementById("blog-content");
    let commentsContainer = document.getElementById("comments-display-container");
    const urlParams = new URLSearchParams(window.location.search);
    const blogTitle = urlParams.get('title');

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const currentBlog = blogs.find(blog => blog.title === blogTitle);

    if (!currentBlog) {
        blogContentContainer.innerHTML = `<h2 style="color: var(--text-error); text-align: center;">Blog Not Found</h2>`;
        return;
    }

    
    blogContentContainer.innerHTML = `
        <header class="blog-header">
            <span class="category-badge">${currentBlog.category}</span>
            <h1 class="blog-title">${currentBlog.title}</h1>
            <span class="blog-date">Published on: ${currentBlog.createdAt}</span>
        </header>
        <div class="blog-image-container"><img src="${currentBlog.image}"></div>
        <div class="blog-text">${currentBlog.content}</div>
        <div style="text-align: center; margin-top: 40px;">
            <button onclick="history.back()" style="width: auto; padding: 10px 30px;">← Back</button>
        </div>`;

    
    function renderComments() {
        commentsContainer.innerHTML = "";
        const comments = currentBlog.comments || [];
        
        if (comments.length === 0) {
            commentsContainer.innerHTML = "<p>No comments yet. Be the first!</p>";
            return;
        }

        comments.forEach((comment, index) => {
            const commentDiv = document.createElement("div");
            commentDiv.style.cssText = "background: var(--color-surface-dark); padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid var(--color-accent); position: relative;";
            commentDiv.innerHTML = `
                <p style="margin: 0; font-size: 0.95rem;">${comment}</p>
                <button onclick="deleteComment(${index})" style="position: absolute; right: 10px; top: 5px; width: auto; background: none; color: var(--text-error); padding: 0; font-size: 0.8rem; margin: 0;">Delete</button>
            `; 
            commentsContainer.appendChild(commentDiv);
        });
    }

    
    document.getElementById("addCommentBtn").addEventListener("click", function() {
        const text = document.getElementById("commentInput").value.trim();
        if (text === "") return;

        if (!currentBlog.comments) currentBlog.comments = [];
        currentBlog.comments.push(text); 

      
        const blogIndex = blogs.findIndex(b => b.title === blogTitle);
        blogs[blogIndex] = currentBlog;
        localStorage.setItem("blogs", JSON.stringify(blogs));

        document.getElementById("commentInput").value = "";
        renderComments();
    });

    
    window.deleteComment = function(index) {
        currentBlog.comments.splice(index, 1);
        const blogIndex = blogs.findIndex(b => b.title === blogTitle);
        blogs[blogIndex] = currentBlog;
        localStorage.setItem("blogs", JSON.stringify(blogs));
        renderComments();
    };

    renderComments();
});