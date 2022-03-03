let email = document.getElementById("email");
let password = document.getElementById("passwrd");
let formContent = document.getElementById("login");

formContent.addEventListener('submit',e=>{
    e.preventDefault();
    fetch("/api/userlogin",{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            Email : email.value, 
            Password : password.value
        })
    }).then(response => response.json())
    .then(result=>{
        if(result[0]==1){
            alert("Please create  an account");
        }else if(result[0]==2){
            alert("Password does not match");
        }
        else{
            window.location = `/h/${result[1]}`;
        }
    }).catch(err=>{
        console.log(`Error Occured :: ${err}`);
    })
})