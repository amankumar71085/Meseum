document.getElementById("sendButton").addEventListener("click", function () {
    handleUserInput();
});

document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleUserInput();
    }
});

document.getElementById("language").addEventListener("change", function () {
    const selectedLanguage = this.value;
    translateMessages(selectedLanguage);
});

let chatbox = document.getElementById("chatbox");
let currentLanguage = "en"; // Default language

function translateMessages(language) {
    currentLanguage = language; // Update the current language

    // Translate all existing bot messages in the chatbox
    const botMessages = document.querySelectorAll(".botMessage .bubble");

    botMessages.forEach(function (message) {
        const originalMessage = message.getAttribute("data-original-message") || message.textContent;
        const translatedMessage = translateText(originalMessage, language);
        message.textContent = translatedMessage; // Translate the text based on the selected language
        message.setAttribute("data-original-message", originalMessage); // Ensure the original message is correctly stored

        // Update the speaker icon's speakMessage function to use the translated text
        const speakerIcon = message.parentElement.querySelector(".speaker-icon");
        if (speakerIcon) {
            speakerIcon.onclick = () => speakMessage(translatedMessage);
        }
    });
}


// Function to handle language-specific translation
function translateText(text, language) {
    const translations = {
        "en": {
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?",
            "Your booking is confirmed!": "Your booking is confirmed!",
            "Please enter the number of tickets you want to book.": "Please enter the number of tickets you want to book.",
            "What is your preferred date for the visit?": "What is your preferred date for the visit?",
            "Thank you for providing the date. How many adults and children will be attending?": "Thank you for providing the date. How many adults and children will be attending?",
            "Please enter the names of all attendees.": "Please enter the names of all attendees.",
            "Your total cost is calculated. Do you want to proceed with the payment?": "Your total cost is calculated. Do you want to proceed with the payment?",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "Thank you for booking with us! An email confirmation will be sent to you shortly.",
            "Would you like to book another ticket?": "Would you like to book another ticket?",
            "Sorry, we couldn't process your request. Please try again.": "Sorry, we couldn't process your request. Please try again.",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "Great! What date would you like to visit the museum? (e.g., 2024-09-01)",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "And at what time would you like to visit? (e.g., 10:00 AM)",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)",
            "Booking successful! Your booking ID is [bookingId].": "Booking successful! Your booking ID is [bookingId].",
            "There was an error processing your booking. Please try again.": "There was an error processing your booking. Please try again.",
            "Let's start over. How many tickets would you like to book?": "Let's start over. How many tickets would you like to book?",
            "Ticket email sent successfully!": "Ticket email sent successfully!",
            "There was an error sending your ticket email. Please check your email later.": "There was an error sending your ticket email. Please check your email later."
        },
        "hi": {
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "संग्रहालय टिकट बुकिंग प्रणाली में आपका स्वागत है! आप कितने टिकट बुक करना चाहेंगे?",
            "Your booking is confirmed!": "आपकी बुकिंग की पुष्टि हो गई है!",
            "Please enter the number of tickets you want to book.": "कृपया आप कितने टिकट बुक करना चाहते हैं, संख्या दर्ज करें।",
            "What is your preferred date for the visit?": "आपकी यात्रा की पसंदीदा तिथि क्या है?",
            "Thank you for providing the date. How many adults and children will be attending?": "तारीख प्रदान करने के लिए धन्यवाद। कितने वयस्क और बच्चे भाग लेंगे?",
            "Please enter the names of all attendees.": "कृपया सभी प्रतिभागियों के नाम दर्ज करें।",
            "Your total cost is calculated. Do you want to proceed with the payment?": "आपकी कुल लागत की गणना कर ली गई है। क्या आप भुगतान के साथ आगे बढ़ना चाहेंगे?",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "हमारे साथ बुकिंग करने के लिए धन्यवाद! जल्द ही आपको एक ईमेल पुष्टि भेजी जाएगी।",
            "Would you like to book another ticket?": "क्या आप एक और टिकट बुक करना चाहेंगे?",
            "Sorry, we couldn't process your request. Please try again.": "क्षमा करें, हम आपकी अनुरोध को संसाधित नहीं कर सके। कृपया पुनः प्रयास करें।",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "महान! आप किस तारीख को संग्रहालय का दौरा करना चाहेंगे? (जैसे, 2024-09-01)",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "और आप किस समय पर संग्रहालय का दौरा करना चाहेंगे? (जैसे, 10:00 AM)",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "आपकी बुकिंग की पुष्टि: [tickets] टिकट [date] के लिए [time] बजे। क्या यह सही है? (हाँ/नहीं)",
            "Booking successful! Your booking ID is [bookingId].": "बुकिंग सफल! आपकी बुकिंग आईडी [bookingId] है।",
            "There was an error processing your booking. Please try again.": "आपकी बुकिंग को संसाधित करने में त्रुटि हुई। कृपया पुनः प्रयास करें।",
            "Let's start over. How many tickets would you like to book?": "चलो फिर से शुरू करते हैं। आप कितने टिकट बुक करना चाहेंगे?",
            "Ticket email sent successfully!": "टिकट ईमेल सफलतापूर्वक भेजा गया!",
            "There was an error sending your ticket email. Please check your email later.": "आपका टिकट ईमेल भेजने में त्रुटि हुई। कृपया बाद में अपना ईमेल देखें।"
        },
        "or": { // Odia translations
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "ସଂଗ୍ରହାଳୟ ଟିକେଟ ବୁକିଂ ପ୍ରଣାଳୀକୁ ସ୍ୱାଗତ! ଆପଣ କେତେଟି ଟିକେଟ ବୁକ୍ କରିବାକୁ ଚାହୁଁଛନ୍ତି?",
            "Your booking is confirmed!": "ଆପଣଙ୍କ ବୁକିଂ ନିଶ୍ଚିତ ହୋଇଛି!",
            "Please enter the number of tickets you want to book.": "ଦୟାକରି ବୁକ୍ କରିବାକୁ ଚାହୁଁଥିବା ଟିକେଟର ସଂଖ୍ୟା ପ୍ରବେଶ କରନ୍ତୁ।",
            "What is your preferred date for the visit?": "ଆପଣଙ୍କ ପସନ୍ଦକରା ଯାତ୍ରା ତାରିଖ କ'ଣ?",
            "Thank you for providing the date. How many adults and children will be attending?": "ତାରିଖ ଦିଆପାଇଁ ଧନ୍ୟବାଦ। କେତେ ଜଣ ଜଣସଠାରେ ଆସୁଛନ୍ତି?",
            "Please enter the names of all attendees.": "ଦୟାକରି ସମସ୍ତ ପ୍ରତିଭାଗୀଙ୍କ ନାମ ପ୍ରବେଶ କରନ୍ତୁ।",
            "Your total cost is calculated. Do you want to proceed with the payment?": "ଆପଣଙ୍କ ମୋଟ ଖର୍ଚ୍ଚ ଗଣନା କରାଯାଇଛି। ଆପଣ ପରିଶୋଧନା ସହିତ ଆଗକୁ ବଢ଼ିବାକୁ ଚାହୁଁଛନ୍ତି କି?",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "ଆମ ସହିତ ବୁକିଂ କରିବା ପାଇଁ ଧନ୍ୟବାଦ! ଏକ ଇମେଲ ନିଶ୍ଚିତି ଶୀଘ୍ର ଆପଣଙ୍କୁ ପଠାଯିବ।",
            "Would you like to book another ticket?": "ଆପଣ ଆଉ ଏକ ଟିକେଟ ବୁକ କରିବାକୁ ଚାହୁଁଛନ୍ତି କି?",
            "Sorry, we couldn't process your request. Please try again.": "କ୍ଷମା କରିବେ, ଆମେ ଆପଣଙ୍କର ଅନୁରୋଧକୁ ପ୍ରକ୍ରିୟାକରଣ କରିପାରିଲୁ ନାହିଁ। ଦୟାକରି ପୁନଃ ପ୍ରୟାସ କରନ୍ତୁ।",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "ଅତି ଭଲ! ଆପଣ କେବେ ସଂଗ୍ରହାଳୟକୁ ଯାଇପାରିବେ? (ଯେପରି, 2024-09-01)",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "ଏବଂ କେତେ ବେଳେ ଆପଣ ସଂଗ୍ରହାଳୟକୁ ଯିବାକୁ ଚାହୁଁଛନ୍ତି? (ଯେପରି, 10:00 AM)",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "ଆପଣଙ୍କ ବୁକିଂକୁ ନିଶ୍ଚିତ କରିବା: [tickets] ଟିକେଟ [date] ରେ [time] ରେ। ଏହା ଠିକ କି? (ହଁ/ନା)",
            "Booking successful! Your booking ID is [bookingId].": "ବୁକିଂ ସଫଳ! ଆପଣଙ୍କ ବୁକିଂ ଆଇଡି [bookingId] ହେଉଛି।",
            "There was an error processing your booking. Please try again.": "ଆପଣଙ୍କ ବୁକିଂ ପ୍ରକ୍ରିୟାକରଣରେ ଏକ ତ୍ରୁଟି ହୋଇଥିଲା। ଦୟାକରି ପୁନଃ ପ୍ରୟାସ କରନ୍ତୁ।",
            "Let's start over. How many tickets would you like to book?": "ଆସନ୍ତୁ ଆରମ୍ଭ କରୁ। ଆପଣ କେତେ ଟିକେଟ ବୁକ କରିବାକୁ ଚାହୁଁଛନ୍ତି?",
            "Ticket email sent successfully!": "ଟିକେଟ ଇମେଲ ସଫଳତାର ସହିତ ପଠାଯାଇଛି!",
            "There was an error sending your ticket email. Please check your email later.": "ଆପଣଙ୍କ ଟିକେଟ ଇମେଲ ପଠାଇବାରେ ତ୍ରୁଟି ହୋଇଛି। ଦୟାକରି ପରେ ଆପଣଙ୍କ ଇମେଲ ଯାଞ୍ଚ କରନ୍ତୁ।"
        },
        "te": { // Telugu translations
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "మ్యూజియం టికెట్ బుకింగ్ సిస్టమ్‌కు స్వాగతం! మీరు ఎంత టికెట్లు బుక్ చేసుకోవాలని కోరుకుంటున్నారు?",
            "Your booking is confirmed!": "మీ బుకింగ్ నిర్ధారించబడింది!",
            "Please enter the number of tickets you want to book.": "దయచేసి మీరు బుక్ చేసుకోవాలని కోరుకుంటున్న టికెట్ల సంఖ్యను నమోదు చేయండి.",
            "What is your preferred date for the visit?": "మీరు సందర్శించాలనుకునే తేదీ ఏమిటి?",
            "Thank you for providing the date. How many adults and children will be attending?": "తేదీని అందించడానికి ధన్యవాదాలు. ఎన్ని పెద్దలు మరియు పిల్లలు హాజరవుతారు?",
            "Please enter the names of all attendees.": "దయచేసి అన్ని హాజరైన వారి పేర్లను నమోదు చేయండి.",
            "Your total cost is calculated. Do you want to proceed with the payment?": "మీ మొత్తం ఖర్చు గణించబడింది. మీరు చెల్లింపు కొనసాగించాలనుకుంటున్నారా?",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "మా తో బుక్ చేయడానికి ధన్యవాదాలు! ఒక ఇమెయిల్ నిర్ధారణ మీకు త్వరలో పంపబడుతుంది.",
            "Would you like to book another ticket?": "మరొక టికెట్ బుక్ చేయాలనుకుంటున్నారా?",
            "Sorry, we couldn't process your request. Please try again.": "క్షమించండి, మేము మీ అభ్యర్థనను ప్రాసెస్ చేయలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "అద్భుతం! మీరు మ్యూజియం సందర్శించాలనుకుంటున్న తేదీ ఏమిటి? (ఉదా., 2024-09-01)",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "మరియు మీరు ఎప్పుడు సందర్శించాలనుకుంటున్నారు? (ఉదా., 10:00 AM)",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "మీ బుకింగ్‌ని నిర్ధారించడం: [date] న [time] కు [tickets] టికెట్లు. ఇది సరైనదా? (అవును/కాదు)",
            "Booking successful! Your booking ID is [bookingId].": "బుకింగ్ విజయవంతమైంది! మీ బుకింగ్ ID [bookingId] అవుతుంది.",
            "There was an error processing your booking. Please try again.": "మీ బుకింగ్ ప్రాసెస్ చేయడంలో లోపం జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
            "Let's start over. How many tickets would you like to book?": "మనం మొదటి నుండి ప్రారంభిద్దాం. మీరు ఎంత టికెట్లు బుక్ చేయాలనుకుంటున్నారు?",
            "Ticket email sent successfully!": "టికెట్ ఇమెయిల్ విజయవంతంగా పంపబడింది!",
            "There was an error sending your ticket email. Please check your email later.": "మీ టికెట్ ఇమెయిల్ పంపడంలో లోపం జరిగింది. దయచేసి తరువాత మీ ఇమెయిల్ తనిఖీ చేయండి."
        },
        "bho": { // Bhojpuri translations
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "संग्रहालय टिकट बुकिंग सिस्टम में आपका स्वागत बा! कतेक टिकट बुक करे के चाहब?",
            "Your booking is confirmed!": "आपके बुकिंग के पुष्टि हो गइल बा!",
            "Please enter the number of tickets you want to book.": "कृपया जेतना टिकट बुक करे के चाहत बानी, ओकर संख्या डाले।",
            "What is your preferred date for the visit?": "आपके यात्रा के मनपसंद तारीख का बा?",
            "Thank you for providing the date. How many adults and children will be attending?": "तारीख देवे खातिर धन्यवाद। कतना बड़-बूढ़ आ बच्चा आइल जइहन?",
            "Please enter the names of all attendees.": "कृपया सभे लोगन के नाम डाले।",
            "Your total cost is calculated. Do you want to proceed with the payment?": "आपके कुल लागत के हिसाब लगावल गइल बा। का आप भुगतान आगे बढ़ावे चाहत बानी?",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "हमरा साथे बुकिंग करे खातिर धन्यवाद! जल्दी से एक ईमेल पुष्टि भेजल जाई।",
            "Would you like to book another ticket?": "का आप एक आउर टिकट बुक करे चाहब?",
            "Sorry, we couldn't process your request. Please try again.": "माफ करीं, हमनीं के आपन अनुरोध प्रोसेस ना कर सकनी। कृपया फेर से कोशिश करीं।",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "शानदार! आप संग्रहालय के कउन तारीख पर जाये चाहब? (जैसे, 2024-09-01)",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "आ, आप कउन समय पर संग्रहालय जावे चाहब? (जैसे, 10:00 AM)",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "आपके बुकिंग के पुष्टि करतानी: [date] के [time] पर [tickets] टिकट। ई सही बा? (हँ/ना)",
            "Booking successful! Your booking ID is [bookingId].": "बुकिंग सफल! आपन बुकिंग ID [bookingId] बा।",
            "There was an error processing your booking. Please try again.": "आपके बुकिंग प्रोसेस करे में गलती हो गइल बा। कृपया फेर से कोशिश करीं।",
            "Let's start over. How many tickets would you like to book?": "चलीं, फिर से शुरू करीं। आप कतेक टिकट बुक करे चाहब?",
            "Ticket email sent successfully!": "टिकट ईमेल सफलतापूर्वक भेजल गइल बा!",
            "There was an error sending your ticket email. Please check your email later.": "आपके टिकट ईमेल भेजे में गलती हो गइल बा। कृपया बाद में आपन ईमेल चेक करीं।"
        },
        "jp": { // Japanese translations
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "博物館チケット予約システムへようこそ！ 何枚のチケットを予約しますか？",
            "Your booking is confirmed!": "ご予約が確認されました！",
            "Please enter the number of tickets you want to book.": "予約したいチケットの枚数を入力してください。",
            "What is your preferred date for the visit?": "訪問の希望日を教えてください。",
            "Thank you for providing the date. How many adults and children will be attending?": "日付のご提供ありがとうございます。大人と子供の人数を教えてください。",
            "Please enter the names of all attendees.": "すべての参加者の名前を入力してください。",
            "Your total cost is calculated. Do you want to proceed with the payment?": "総費用が計算されました。支払いを進めますか？",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "ご予約ありがとうございます！確認のメールをすぐにお送りします。",
            "Would you like to book another ticket?": "別のチケットを予約しますか？",
            "Sorry, we couldn't process your request. Please try again.": "申し訳ありませんが、リクエストを処理できませんでした。もう一度試してください。",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "素晴らしい！ 博物館を訪れる希望日を教えてください。（例：2024-09-01）",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "そして、訪問したい時間を教えてください。（例：10:00 AM）",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "ご予約の確認： [date] の [time] に [tickets] 枚のチケット。これでよろしいですか？ (はい/いいえ)",
            "Booking successful! Your booking ID is [bookingId].": "予約が成功しました！ あなたの予約IDは [bookingId] です。",
            "There was an error processing your booking. Please try again.": "予約の処理中にエラーが発生しました。もう一度試してください。",
            "Let's start over. How many tickets would you like to book?": "最初からやり直しましょう。何枚のチケットを予約しますか？",
            "Ticket email sent successfully!": "チケットのメールが正常に送信されました！",
            "There was an error sending your ticket email. Please check your email later.": "チケットメールの送信中にエラーが発生しました。後でメールを確認してください。"
        }
    };

    return translations[language][text] || text; // Return the translated text or the original if not found
}

// Function to handle dynamic text translations
function translateDynamicText(template, language, placeholders) {
    // Translate the template string
    let translatedTemplate = translateText(template, language);

    // Replace placeholders in the translated template
    for (const key in placeholders) {
        const value = placeholders[key];
        translatedTemplate = translatedTemplate.replace(`[${key}]`, value);
    }

    return translatedTemplate;
}

// Function to display the initial welcome message
function displayWelcomeMessage() {
    if (step === 0) {
        addMessage("Welcome to the Museum Ticket Booking System! How many tickets would you like to book?", "botMessage");
        step = 1; // Move to the next step after showing the initial message
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
    // Translate only static text here
    bubbleElement.textContent = translateText(message, currentLanguage); 
    bubbleElement.setAttribute("data-original-message", message); // Store original message for translation

    messageElement.appendChild(bubbleElement);

    if (className === "botMessage") {
        let speakerIcon = document.createElement("span");
        speakerIcon.className = "material-icons speaker-icon";
        speakerIcon.textContent = "volume_up";
        speakerIcon.onclick = () => speakMessage(message);
        messageElement.appendChild(speakerIcon);
    }

    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);

    // Set language for text-to-speech based on the current language selection
    switch (currentLanguage) {
        case "hi":
            utterance.lang = "hi-IN"; // Hindi
            break;
        case "or":
            utterance.lang = "or-IN"; // Odia
            break;
        case "te":
            utterance.lang = "te-IN"; // Telugu
            break;
        case "ja":
            utterance.lang = "ja-JP"; // Japanese
            break;
        case "en":
        default:
            utterance.lang = "en-US"; // Default to English
            break;
    }

    // Set other properties like pitch and rate if needed
    utterance.pitch = 1;
    utterance.rate = 1;

    // Speak the message
    window.speechSynthesis.speak(utterance);
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
        response = "Great! What date would you like to visit the museum? (e.g., 2024-09-01)";
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
                response = `Booking successful! Your booking ID is ${data.bookingId}.`;
                // Call the function to send the email after booking is successful
                sendTicketEmail();
                step = 0;
                bookingDetails = {
                    tickets: null,
                    date: null,
                    time: null
                };
                setTimeout(displayWelcomeMessage, 1500); // Show the welcome message again after booking
            })
            .catch(error => {
                console.error('Error:', error);
                response = "There was an error processing your booking. Please try again.";
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
        addMessage("There was an error sending your ticket email. Please check your email later.", "botMessage");
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
