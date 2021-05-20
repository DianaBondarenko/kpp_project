const url = new URL(document.location);

const chatId = url.searchParams.get('chatId');
const userId = url.searchParams.get('userId');
const sendBtn = document.getElementById('sendBtn');
const backBtn = document.getElementById('backBtn');
const div = document.getElementById('messagesDiv')
const messageInput = document.getElementById('messageInput')

document.addEventListener('DOMContentLoaded', async () => {
    div.innerHTML = await getAllMessages();
})

async function getAllMessages(){
    const response = await fetch(`http://localhost:3000/chat/messages/${chatId}`);
    if (response.ok) {
        const messages = await response.json();
        return messages.map(el => `<div>${el.username}:  ${el.text}</div>`).join('');
    } else {
        console.log('Error ', response.status);
    }}
sendBtn.addEventListener('click', async () => {
    const text = messageInput.value;
    if (text.length>0) {
        await sendMessage(chatId,userId,text);
        messageInput.value='';
        div.innerHTML = await getAllMessages();
    }

})
async function sendMessage(chatId, senderId,messageText){
    const response = await fetch(`http://localhost:3000/chat/messages/${chatId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({chatId:chatId, senderId:senderId, messageText:messageText})
    });
    if (response.ok) {
        return true;
    } else {
        console.log('Error ', response.status);
    }
}
backBtn.addEventListener('click', ()=>{
    document.location.href=`chats.html?userId=${userId}`
})