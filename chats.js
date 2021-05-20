const url = new URL(document.location);
const userId = url.searchParams.get('userId');
const div = document.getElementById('chatsDiv');

document.addEventListener('DOMContentLoaded', async () => {
    div.innerHTML = await getAllChats(userId);
    const chats = document.querySelectorAll('.chat');
    console.log(chats);
    [...chats].forEach(el => el.addEventListener('click', ()=>{
        goToChat(el.id);
    }));
})

async function getAllChats(userId) {
    const response = await fetch(`http://localhost:3000/chat/chats/${userId}`);
    if (response.ok) {
        const messages = await response.json();
        return messages.map(el => `<div class='chat' id='${el.chat_id}'>${el.chat_id}</div>`).join('');
    } else {
        console.log('Error ', response.status);
    }
}

function goToChat(chatId){
    document.location.href=`chat.html?chatId=${chatId}&userId=${userId}`;
}
