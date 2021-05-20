const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const signBtn = document.getElementById('signBtn');

signBtn.addEventListener('click', async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const user = await signIn(username,password);
    document.location.href=`chats.html?userId=${user.id}`;
})

async function signIn(username, password){
    const response = await fetch(`http://localhost:3000/auth`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'username':username, 'password':password },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.log('Error ', response.status);
    }
}