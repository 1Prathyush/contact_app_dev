let email = document.getElementById("email");
let password = document.getElementById("passwrd");
let secret =document.getElementById('scode');
let formcontent = document.getElementById("newuser");


formcontent.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch("/api/newuser",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            uemail:email.value,
            upassword:password.value,
            usecret : secret.value,
        })
    }).then(response => response.json())  // convert to json
    .then(json =>{ 
        console.log(json)
        console.log(json._id)
        window.location = `/h/${json._id}`
    }) 
    .catch(err=>{
        console.log(err);
    })

})