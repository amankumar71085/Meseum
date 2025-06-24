function sendOTP() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter your username.");
        return;
    }

    fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("OTP sent successfully to your registered email.");
        } else {
            alert("Error sending OTP: " + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const otp = document.getElementById('otp').value;

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            // Redirect to home page
            window.location.href = '/home.html'; // Adjust this URL to match your actual home page
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});
