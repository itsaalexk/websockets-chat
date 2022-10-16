const socketClient = io();
const input = document.querySelector("input");
const messageContainer = document.querySelector(".messageContainer");
let user;

console.log(messageContainer);


Swal.fire({
    title: "Hola usuario",
    text: "Ingresa tu usuario",
    input: "text",

}).then((res)=>{
    user=res.value;
    console.log(user)
})

input.addEventListener("keydown",(e)=>{
    //console.log(e.key);
    if(e.key === "Enter"){
        socketClient.emit("message",
        {
            username:user,
            message:input.value,
        })
        input.value=== "";
    }
})
socketClient.on("historico",(data)=>{
    let elementos = "";
    console.log(data)
    data.forEach((item)=>{
        elementos = elementos + `<p><strong>${item.username}</strong>${item.message}</p>`;
        
    })
    messageContainer.innerHTML = elementos;
    
})
