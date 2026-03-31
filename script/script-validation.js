const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const fullnameEl = document.getElementById("fullname");
const phoneEl = document.getElementById("phone");

const pagename = getpagename();

if (pagename === "login.html") {
    setupValidation(null, null, emailEl, passwordEl);
} else if (pagename === "signup.html") {
    setupValidation(fullnameEl, phoneEl, emailEl, passwordEl);
} else if (pagename === "contact.html") {
    setupValidation(fullnameEl, null, emailEl, null);
}

function validateLoginForm() {
    const email = emailEl ? emailEl.value.trim() : "";
    const password = passwordEl ? passwordEl.value : "";

    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";


    if (email === "") {
        document.getElementById("emailError").innerHTML = "Email is required";
        return false;
    }
    if (password === "") {
        document.getElementById("passwordError").innerHTML = "Password is required";
        return false;
    }
    return true;
}

function validateSignupForm() {
    const name = fullnameEl ? fullnameEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const password = passwordEl ? passwordEl.value : "";
    const cpasswordEl = document.getElementById("cpassword");
    const cpassword = cpasswordEl ? cpasswordEl.value : "";


    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("cpasswordError").innerHTML = "";
    document.getElementById("notequalpasswordcpssword").innerHTML = "";


    if (name === "") {
        document.getElementById("nameError").innerHTML = "Full Name is required";
        return false;
    }
    if (email === "") {
        document.getElementById("emailError").innerHTML = "Email is required";
        return false;
    }
    if (password === "") {
        document.getElementById("passwordErro").innerHTML = "Password is required";
        return false;
    }
    if (cpassword === "") {
        document.getElementById("cpasswordError").innerHTML = "Confirm Password is required";
        return false;
    }
    if (cpassword !== password) {
        document.getElementById("notequalpasswordcpssword").innerHTML = "not equal password cpssword";//rephrase it 
        return false;
    }
    return true;
}

function validateContactForm() {
    const name = fullnameEl ? fullnameEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const subjectEl = document.getElementById("subject");
    const messageEl = document.getElementById("message");
    const subject = subjectEl ? subjectEl.value.trim() : "";
    const message = messageEl ? messageEl.value.trim() : "";

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("subjectError").innerHTML = "";
    document.getElementById("messageError").innerHTML = "";


    if (name === "") {
        document.getElementById("nameError").innerHTML = "Full Name is required";
        return false;
    }
    if (email === "") {
        document.getElementById("emailError").innerHTML = "Email is required";
        return false;
    }
    if (subject === "") {
        document.getElementById("subjectError").innerHTML = "Subject is required";
        return false;
    }
    if (message === "") {
        document.getElementById("messageError").innerHTML = "Message is required";
        return false;
    }
    return true;
}

function getpagename() {
    const path = window.location.pathname;
    return path.split("/").pop();
}

function setupValidation(nameEl, phoneEl, emailEl, passwordEl) {


    if (emailEl) {
        emailEl.addEventListener("input", function () {
            const val = emailEl.value;
            const regex_email = /.+\@.+\..+/;
            if (!regex_email.test(val)) {
                // document.getElementById("emailError").innerHTML="";
                document.getElementById("emailError").innerHTML = "Email is invalid";
                return false;
            }
            document.getElementById("emailError").innerHTML = "valid";

        });
    }

    if (passwordEl) {
        passwordEl.addEventListener("input", function () {
            const val = passwordEl.value;
            const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
            if (!regex_password.test(val)) {
                document.getElementById("passwordError").innerHTML = "Password must be 8 to 15 long a-z A-z @.#$!%*?& ";
                return false;
            }
            document.getElementById("passwordError").innerHTML = "valid";
        });
    }
 
    if (nameEl) {
        nameEl.addEventListener("input", function () {
            //Matches: "Ana María", "O'Connor Sean", "Jean-Luc Picard"
            //Rejects: "Single", "First Middle Last", " First Last "
            const regex_fullname =  /^[\p{L}'-]+ [\p{L}'-]+$/u;
            const val = nameEl.value.trim();
            if (!regex_fullname.test(val)) {
                document.getElementById("nameError").innerHTML = "Full Name is invalid must be Like Ana María or  O'Connor Sean or Jean-Luc Picard";
                return false;
            }
            document.getElementById("nameError").innerHTML = "valid";
        });
    }

    if (phoneEl) {
        phoneEl.addEventListener("input", function () {
            const val = phoneEl.value.trim();
            const regex_phone = /^07\d{8}$/;
            if (!regex_phone.test(val)) {
                document.getElementById("phoneError").innerHTML = "Must be All Numbers ";
                return false;
            }
            document.getElementById("phoneError").innerHTML = "valid";
        });
    }
    return true;
}
