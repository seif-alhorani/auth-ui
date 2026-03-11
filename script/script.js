
var inputElement = document.getElementById("profile-upload");
var pic = document.querySelector(".upload-label img");


inputElement.onchange = function(event) {
    
    var myFile = event.target.files[0];

    if (myFile != null) {
        
        var imgUrl = URL.createObjectURL(myFile);
        
        console.log(imgUrl);
        
        pic.src = imgUrl; 
    }
}