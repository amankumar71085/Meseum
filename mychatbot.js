document.getElementById("sendButton").addEventListener("click", function () {
    handleUserInput();
});

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        handleUserInput();
    }
});

let chatbox = document.getElementById("chatbox");

//Function to display the initial welcome message
function displayWelcomeMessage() {
    if (step === 0) {
        addMessage("Welcome to the Museum Ticket Booking System! How many tickets would you like to book?","botMessage");
        step = 1; //Move to the next step after showing the initial message
    }
}

function handleUserInput() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    addMessage(userInput, "userMessage");

    setTimeout(() => {
        botResponse(userInput.toLowerCase());
    }, 1000);

    document.getElementById("userInput").value = "";
}

function addMessage(message, className) {
    let messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;

    let bubbleElement = document.createElement("div");
    bubbleElement.className = "bubble";
    bubbleElement.textContent = message;
    messageElement.appendChild(bubbleElement);

    if (className === "botMessage") {
        let speakerIcon = document.createElement("span");
        speakerIcon.className = "material-icons speaker-icon";
        speakerIcon.textContent = "Read_Aloud";
        speakerIcon.onclick = () => speakMessage(message);
        messageElement.appendChild(speakerIcon);
    }

    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function speakMessage(text) {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-IN';
    speech.pitch = 1;
    speech.rate = 1;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voice.find(voice => voice.name === 'Microsoft Neerja Online (Natural) - English (India)');

    speech.voice = selectedVoice || voices[0];
    window.speechSynthesis.speak(speech);
}

window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};

let step = 0;
let bookingDetails = {
    tickets: null,
    date: null,
    time: null
};

function botResponse(userInput) {
    let response = "";

    if (step === 1) {
        bookingDetails.tickets = userInput;
        response = "Great! What date would you like to visit the museum? (e.g., 2024-09-05)";
        step++;
    } else if (step === 2) {
        bookingDetails.date = userInput;
        response = "And at what time would you like to visit? (e.g., 10:00 AM)";
        step++;
    } else if (step === 3) {
        bookingDetails.time = userInput;
        response = `Confirming your booking: ${bookingDetails.tickets} tickets for ${bookingDetails.date} at ${bookingDetails.time}. Is that correct? (yes/no)`;
        step++;
    } else if (step === 4) {
        if (userInput === "yes") {
            fetch('http://localhost:3000/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingDetails),
            })
            .then(response => response.json())
            .then(data => {
                if (/^\d+$/.test(data.bookingId)) {
                    addMessage(`Booking succesful! Your booking ID is ${data.bookingId}.`,"botMessage");
                    //Call the function to send the email after booking is successful
                    sendTicketEmail();
                    step = 0;
                    bookingDetails = {
                        tickets: null,
                        date: null,
                        time: null
                    };
                }
                else {
                    addMessage(`Booking failed. Please try again!!!`)
                }
                setTimeout(displayWelcomeMessage, 1500); // Show the welcome message again after booking
            })
            .catch(error => {
                console.error('Error:',error);
                addMessage("There was an error processing your booking. Please try again.","botMessage");
                step = 0;
                setTimeout(displayWelcomeMessage, 1500); // Show the welcome message again if there's an error
            });
        } else {
            response = "Let's start over. How many tickets would you like to book?";
            step = 1;
        }
    }

    if (response) {
        addMessage(response, "botMessage");
    }
}

function sendTicketEmail() {
    fetch('http://localhost:3000/api/send-ticket', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        addMessage("Ticket email sent successfully!", "botMessage");
    })
    .catch(error => {
        console.error('Error sending email:', error);
        addMessage("There was an error sending your ticket email. Please check your email later.,","botMessage");
    });
}

function toggleChat() {
    let chatContainer = document.getElementById("chat-container");
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "block";
        if (step === 0) displayWelcomeMessage(); // Show the welcome message only if it's the first time
    } else {
        chatContainer.style.display = "none";
    }
}

// Call the function to display the welcome message initially when the chatbot loads
displayWelcomeMessage();