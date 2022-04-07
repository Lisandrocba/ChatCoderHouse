let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;
Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (valor)=>{
        return !valor && 'Se debe ingresar un nombre'
    }
}).then(result =>{
    user = result.value;
})

chatBox.addEventListener('keyup', evt=>{
    if(evt.key==='Enter'){
        if(chatBox.value.trim().length>0){
            socket.emit('message', {user, messege: chatBox.value.trim()})
            chatBox.value='';
        }
    }
})

socket.on('log', data=>{
    let messages = '';
    data.forEach(log=>{
        messages = messages + `${log.user} dice: ${log.messege}</br>`;
    })
    log.innerHTML = messages;
})