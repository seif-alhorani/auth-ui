document.getElementById("signform").addEventListener("submit",function(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    
    let emails = JSON.parse(localStorage.getItem("emails"))||[];
    emails.push(email);
    if(email){
        localStorage.setItem("emails",JSON.stringify(emails));
    }
});