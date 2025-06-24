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
        const originalMessage = message.getAttribute("data-original-message") || message.innerHTML;
        const translatedMessage = translateText(originalMessage, language);
        message.innerHTML = translatedMessage; // Translate the text based on the selected language
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
            "There was an error sending your ticket email. Please check your email later.": "There was an error sending your ticket email. Please check your email later.",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)":"Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.":"Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.",
            "Please enter only a numerical value.":"Please enter only a numerical value.",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.":"Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.",
            "Please enter a valid date in YYYY/MM/DD format.":"Please enter a valid date in YYYY/MM/DD format.",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.":"Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format."
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
            "There was an error sending your ticket email. Please check your email later.": "आपका टिकट ईमेल भेजने में त्रुटि हुई। कृपया बाद में अपना ईमेल देखें।",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)":"अद्भुत! आप संग्रहालय की यात्रा के लिए कौन सी तारीख चुनना चाहेंगे? कृपया एक मान्य प्रारूप में दर्ज करें। (जैसे, 2024-09-01)",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.":"माफ करें, लेकिन आप एक बार में केवल 10 लोगों के लिए ही बुकिंग कर सकते हैं। कृपया 10 या उससे कम लोगों की संख्या दर्ज करें।",
            "Please enter only a numerical value.":"कृपया केवल संख्यात्मक मान दर्ज करें।",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.":"नीचे दिए गए समय स्लॉट में से एक चुनें:<br><br>1. 08:00 AM<br> (10:00 AM तक)<br>2. 10:00 AM<br> (12:00 PM तक)<br>3. 02:00 PM<br> (04:00 PM तक)<br>4. 04:00 PM<br> (06:00 PM तक)<br><br>कृपया समय को सही 12 घंटे या 24 घंटे की घड़ी प्रारूप में दर्ज करें।",
            "Please enter a valid date in YYYY/MM/DD format.":"कृपया YYYY/MM/DD प्रारूप में एक मान्य तिथि दर्ज करें।",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.":"कृपया एक मान्य समय-स्लॉट चुनें और 12 घंटे या 24 घंटे प्रारूप में दर्ज करें।"
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
            "There was an error sending your ticket email. Please check your email later.": "ଆପଣଙ୍କ ଟିକେଟ ଇମେଲ ପଠାଇବାରେ ତ୍ରୁଟି ହୋଇଛି। ଦୟାକରି ପରେ ଆପଣଙ୍କ ଇମେଲ ଯାଞ୍ଚ କରନ୍ତୁ।",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)":"ସୁପର୍ବ! ଆପଣ କେଉଁ ତାରିଖରେ ସଂଗ୍ରହାଳୟର ସଂଲଗ୍ନ କରିବାକୁ ଚାହାଁଛନ୍ତି? ଦୟାକରି ଏକ ବୃହତ ଆକୃତିରେ ଅନୁସାର କରନ୍ତୁ। (ଉଦାହରଣସ୍ୱରୂପ, 2024-09-01)",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.":"ଦୁଃଖିତ, କିନ୍ତୁ ଆପଣ ଏକ ସମୟରେ କେବଳ 10 ଜଣ ପର୍ଯ୍ୟନ୍ତ ବୁକ୍ କରିପାରିବେ। ଦୟାକରି 10 କିମ୍ବା ତାହାଠାରୁ କମ୍ ମାତ୍ରା ରହିଛି।",
            "Please enter only a numerical value.":"ଦୟାକରି କେବଳ ସଂଖ୍ୟାତ୍ମକ ମାନ୍ୟତା ପ୍ରବେଶ କରନ୍ତୁ।",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.":"ନିମ୍ନଲିଖିତ ସମୟ ସ୍ଲଟଗୁଡିକରୁ ଏକକୁ ଚୟନ କରନ୍ତୁ:<br><br>1. 08:00 AM<br> (10:00 AM ପର୍ଯ୍ୟନ୍ତ)<br>2. 10:00 AM<br> (12:00 PM ପର୍ଯ୍ୟନ୍ତ)<br>3. 02:00 PM<br> (04:00 PM ପର୍ଯ୍ୟନ୍ତ)<br>4. 04:00 PM<br> (06:00 PM ପର୍ଯ୍ୟନ୍ତ)<br><br>ଦୟାକରି ସମୟକୁ ସଠିକ 12 ଘଣ୍ଟା କିମ୍ବା 24 ଘଣ୍ଟା ଘଡିକା ଆକୃତିରେ ପ୍ରବେଶ କରନ୍ତୁ।",
            "Please enter a valid date in YYYY/MM/DD format.":"ଦୟାକରି YYYY/MM/DD ଆକୃତିରେ ଏକ ମାନ୍ୟ ତାରିଖ ପ୍ରବେଶ କରନ୍ତୁ।",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.":"ଦୟାକରି ଏକ ମାନ୍ୟ ସମୟ-ସ୍ଲଟ ଚୟନ କରନ୍ତୁ ଏବଂ ଏକ ମାନ୍ୟ 12 ଘଣ୍ଟା କିମ୍ବା 24 ଘଣ୍ଟା ଆକୃତିରେ ପ୍ରବେଶ କରନ୍ତୁ।"
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
            "There was an error sending your ticket email. Please check your email later.": "మీ టికెట్ ఇమెయిల్ పంపడంలో లోపం జరిగింది. దయచేసి తరువాత మీ ఇమెయిల్ తనిఖీ చేయండి.",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)":"చాలా బాగుంది! మీరు మ్యూజియం సందర్శన కోసం ఏ తేదీని ఎంపిక చేసుకోవాలనుకుంటున్నారు? దయచేసి సరైన ఫార్మాట్‌లో నమోదు చేయండి. (ఉదా., 2024-09-01)",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.":"క్షమించండి, కానీ మీరు ఒకేసారి మాత్రమే 10 మందికి బుకింగ్ చేయవచ్చు. దయచేసి 10 లేదా తక్కువ సంఖ్యలో నమోదు చేయండి.",
            "Please enter only a numerical value.":"దయచేసి కేవలం సంఖ్యాత్మక విలువను నమోదు చేయండి.",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.":"క్రింద ఇవ్వబడిన సమయ స్లాట్లలో ఒకటి ఎంచుకోండి:<br><br>1. 08:00 AM<br> (10:00 AM వరకు)<br>2. 10:00 AM<br> (12:00 PM వరకు)<br>3. 02:00 PM<br> (04:00 PM వరకు)<br>4. 04:00 PM<br> (06:00 PM వరకు)<br><br>దయచేసి సమయాన్ని సరైన 12 గంటల లేదా 24 గంటల ఘడియా ఫార్మాట్‌లో నమోదు చేయండి.",
            "Please enter a valid date in YYYY/MM/DD format.":"దయచేసి YYYY/MM/DD ఫార్మాట్‌లో చెల్లుబాటు అయ్యే తేదీని నమోదు చేయండి.",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.":"దయచేసి ఒక ప్రమాణిత సమయ-స్లాట్‌ను ఎంచుకుని 12 గంటల లేదా 24 గంటల ఫార్మాట్‌లో నమోదు చేయండి."
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
            "There was an error sending your ticket email. Please check your email later.": "आपके टिकट ईमेल भेजे में गलती हो गइल बा। कृपया बाद में आपन ईमेल चेक करीं।",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)":"बढ़िया! आप कब संग्रहालय जाए के चाहत बानी? कृपया सही फॉर्मेट में दर्ज करीं। (जइसे, 2024-09-01)",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.":"माफ करीं, लेकिन एक बार में आप खाली 10 लोग के लिए बुकिंग कर सकत बानी। कृपया 10 या ओकरा से कम संख्या दर्ज करीं।",
            "Please enter only a numerical value.":"कृपया खाली संख्यात्मक मान दर्ज करीं।",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.":"नीचे दिए गए समय स्लॉट में से एक चुनीं:<br><br>1. 08:00 AM<br> (10:00 AM तक)<br>2. 10:00 AM<br> (12:00 PM तक)<br>3. 02:00 PM<br> (04:00 PM तक)<br>4. 04:00 PM<br> (06:00 PM तक)<br><br>कृपया समय सही 12 घंटा या 24 घंटा घड़ी के फॉर्मेट में दर्ज करीं।",
            "Please enter a valid date in YYYY/MM/DD format.":"कृपया YYYY/MM/DD फॉर्मेट में एक सही तारीख दर्ज करीं।",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.":"कृपया एक सही समय स्लॉट चुनीं और 12 घंटा या 24 घंटा फॉर्मेट में दर्ज करीं।"
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
            "There was an error sending your ticket email. Please check your email later.": "チケットメールの送信中にエラーが発生しました。後でメールを確認してください。",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)":"素晴らしい！博物館を訪れる日付はいつにしますか？有効な形式で入力してください。（例：2024-09-01）",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.":"申し訳ありませんが、一度に最大10名までの予約しかできません。10以下の値を入力してください。",
            "Please enter only a numerical value.":"数値のみを入力してください。",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.":"以下の時間帯の中から1つ選択してください：<br><br>1. 08:00 AM<br> (10:00 AMまで)<br>2. 10:00 AM<br> (12:00 PMまで)<br>3. 02:00 PM<br> (04:00 PMまで)<br>4. 04:00 PM<br> (06:00 PMまで)<br><br>時間は適切な12時間制または24時間制の形式で入力してください。",
            "Please enter a valid date in YYYY/MM/DD format.":"YYYY/MM/DD形式で有効な日付を入力してください。",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.":"有効な時間帯を選択し、12時間制または24時間制の形式で入力してください。"
        },
        "pa": { //Punjabi translations
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "ਮਿਊਜ਼ੀਅਮ ਟਿਕਟ ਬੁਕਿੰਗ ਸਿਸਟਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਤੁਸੀਂ ਕਿੰਨੇ ਟਿਕਟ ਬੁਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
            "Your booking is confirmed!": "ਤੁਹਾਡੀ ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਗਈ ਹੈ!",
            "Please enter the number of tickets you want to book.": "ਕਿਰਪਾ ਕਰਕੇ ਤੁਸੀਂ ਕਿੰਨੇ ਟਿਕਟ ਬੁਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ, ਸੰਖਿਆ ਦਰਜ ਕਰੋ।",
            "What is your preferred date for the visit?": "ਆਪਣੀ ਯਾਤਰਾ ਲਈ ਤੁਹਾਡੀ ਪਸੰਦ ਦੀ ਤਾਰੀਖ ਕੀ ਹੈ?",
            "Thank you for providing the date. How many adults and children will be attending?": "ਤਾਰੀਖ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਧੰਨਵਾਦ। ਕਿੰਨੇ ਬਾਲਗ ਅਤੇ ਬੱਚੇ ਹਾਜ਼ਿਰ ਹੋਣਗੇ?",
            "Please enter the names of all attendees.": "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਹਾਜ਼ਰ ਹੋਣ ਵਾਲਿਆਂ ਦੇ ਨਾਮ ਦਰਜ ਕਰੋ।",
            "Your total cost is calculated. Do you want to proceed with the payment?": "ਤੁਹਾਡੀ ਕੁੱਲ ਲਾਗਤ ਦੀ ਗਣਨਾ ਕਰ ਲਈ ਗਈ ਹੈ। ਕੀ ਤੁਸੀਂ ਭੁਗਤਾਨ ਨਾਲ ਅੱਗੇ ਵੱਧਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "ਸਾਡੇ ਨਾਲ ਬੁਕਿੰਗ ਕਰਨ ਲਈ ਧੰਨਵਾਦ! ਜਲਦ ਹੀ ਤੁਹਾਨੂੰ ਇੱਕ ਈਮੇਲ ਪੁਸ਼ਟੀ ਭੇਜੀ ਜਾਵੇਗੀ।",
            "Would you like to book another ticket?": "ਕੀ ਤੁਸੀਂ ਇੱਕ ਹੋਰ ਟਿਕਟ ਬੁਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
            "Sorry, we couldn't process your request. Please try again.": "ਮਾਫ ਕਰਨਾ, ਅਸੀਂ ਤੁਹਾਡੇ ਬੇਨਤੀ ਨੂੰ ਪ੍ਰਕਿਰਿਆ ਨਹੀਂ ਕਰ ਸਕੇ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "ਵਧੀਆ! ਤੁਸੀਂ ਕਿਹੜੀ ਤਾਰੀਖ ਨੂੰ ਮਿਊਜ਼ੀਅਮ ਦਾ ਦੌਰਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ? (ਜਿਵੇਂ ਕਿ, 2024-09-01)",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "ਅਤੇ ਤੁਸੀਂ ਕਿਸ ਸਮੇਂ ਦੌਰਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ? (ਜਿਵੇਂ ਕਿ, 10:00 AM)",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "ਤੁਹਾਡੀ ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨਾ: [tickets] ਟਿਕਟਾਂ [date] ਨੂੰ [time] ਤੇ। ਕੀ ਇਹ ਸਹੀ ਹੈ? (ਹਾਂ/ਨਹੀਂ)",
            "Booking successful! Your booking ID is [bookingId].": "ਬੁਕਿੰਗ ਸਫਲ! ਤੁਹਾਡੀ ਬੁਕਿੰਗ ID [bookingId] ਹੈ।",
            "There was an error processing your booking. Please try again.": "ਤੁਹਾਡੀ ਬੁਕਿੰਗ ਨੂੰ ਪ੍ਰਕਿਰਿਆ ਕਰਨ ਵਿੱਚ ਗਲਤੀ ਹੋਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
            "Let's start over. How many tickets would you like to book?": "ਆਓ ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰੀਏ। ਤੁਸੀਂ ਕਿੰਨੇ ਟਿਕਟ ਬੁਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
            "Ticket email sent successfully!": "ਟਿਕਟ ਈਮੇਲ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜੀ ਗਈ!",
            "There was an error sending your ticket email. Please check your email later.": "ਤੁਹਾਡਾ ਟਿਕਟ ਈਮੇਲ ਭੇਜਣ ਵਿੱਚ ਗਲਤੀ ਹੋਈ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਆਪਣਾ ਈਮੇਲ ਚੈੱਕ ਕਰੋ।",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)": "ਵਧੀਆ! ਤੁਸੀਂ ਮਿਊਜ਼ੀਅਮ ਦਾ ਦੌਰਾ ਕਰਨ ਲਈ ਕਿਹੜੀ ਤਾਰੀਖ ਚੁਣਨਾ ਚਾਹੁੰਦੇ ਹੋ? ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਮਾਨਯ ਫਾਰਮੈਟ ਵਿੱਚ ਦਰਜ ਕਰੋ। (ਜਿਵੇਂ ਕਿ, 2024-09-01)",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.": "ਮਾਫ ਕਰਨਾ, ਪਰ ਤੁਸੀਂ ਇੱਕ ਵਾਰ ਵਿੱਚ ਸਿਰਫ਼ 10 ਲੋਕਾਂ ਲਈ ਹੀ ਬੁਕਿੰਗ ਕਰ ਸਕਦੇ ਹੋ। ਕਿਰਪਾ ਕਰਕੇ 10 ਜਾਂ ਇਸ ਤੋਂ ਘੱਟ ਦੀ ਸੰਖਿਆ ਦਰਜ ਕਰੋ।",
            "Please enter only a numerical value.": "ਕਿਰਪਾ ਕਰਕੇ ਸਿਰਫ਼ ਸੰਖਿਆਤਮਕ ਮੁੱਲ ਦਰਜ ਕਰੋ।",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.": "ਨੀਵੇਂ ਦਿੱਤੇ ਸਮੇਂ ਦੇ ਸਲਾਟਾਂ ਵਿੱਚੋਂ ਇੱਕ ਚੁਣੋ:<br><br>1. 08:00 AM<br> (10:00 AM ਤੱਕ)<br>2. 10:00 AM<br> (12:00 PM ਤੱਕ)<br>3. 02:00 PM<br> (04:00 PM ਤੱਕ)<br>4. 04:00 PM<br> (06:00 PM ਤੱਕ)<br><br>ਕਿਰਪਾ ਕਰਕੇ ਸਮਾਂ ਸਹੀ 12 ਘੰਟੇ ਜਾਂ 24 ਘੰਟੇ ਦੇ ਘੜੀ ਦੇ ਫਾਰਮੈਟ ਵਿੱਚ ਦਰਜ ਕਰੋ।",
            "Please enter a valid date in YYYY/MM/DD format.": "ਕਿਰਪਾ ਕਰਕੇ YYYY/MM/DD ਫਾਰਮੈਟ ਵਿੱਚ ਇੱਕ ਮਾਨਯ ਤਾਰੀਖ ਦਰਜ ਕਰੋ।",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.": "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਮਾਨਯ ਸਮੇਂ ਦੇ ਸਲਾਟ ਨੂੰ ਚੁਣੋ ਅਤੇ 12 ਘੰਟੇ ਜਾਂ 24 ਘੰਟੇ ਦੇ ਫਾਰਮੈਟ ਵਿੱਚ ਦਰਜ ਕਰੋ।"
        },
        "mr": { //Marathi translations
            "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "संग्रहालय तिकीट बुकिंग प्रणालीमध्ये आपले स्वागत आहे! आपण किती तिकिटे बुक करू इच्छिता?",
            "Your booking is confirmed!": "आपली बुकिंग निश्चित झाली आहे!",
            "Please enter the number of tickets you want to book.": "कृपया आपण किती तिकिटे बुक करू इच्छिता, ती संख्या प्रविष्ट करा.",
            "What is your preferred date for the visit?": "आपल्या भेटीची पसंतीची तारीख कोणती आहे?",
            "Thank you for providing the date. How many adults and children will be attending?": "तारीख दिल्याबद्दल धन्यवाद. किती प्रौढ आणि मुले उपस्थित राहतील?",
            "Please enter the names of all attendees.": "कृपया सर्व उपस्थितांच्या नावांची नोंद करा.",
            "Your total cost is calculated. Do you want to proceed with the payment?": "आपल्या एकूण खर्चाची गणना झाली आहे. आपण पेमेंटसह पुढे जायचे आहे का?",
            "Thank you for booking with us! An email confirmation will be sent to you shortly.": "आमच्यासोबत बुकिंग केल्याबद्दल धन्यवाद! आपल्याला लवकरच ईमेल पुष्टी पाठवली जाईल.",
            "Would you like to book another ticket?": "आपण आणखी एक तिकीट बुक करू इच्छिता?",
            "Sorry, we couldn't process your request. Please try again.": "क्षमस्व, आम्ही आपला विनंती प्रक्रिया करू शकलो नाही. कृपया पुन्हा प्रयत्न करा.",
            "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "छान! आपण कोणत्या तारखेला संग्रहालयाला भेट द्यायला इच्छिता? (उदा., 2024-09-01)",
            "And at what time would you like to visit? (e.g., 10:00 AM)": "आणि आपण कोणत्या वेळी भेट द्यायला इच्छिता? (उदा., 10:00 AM)",
            "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "आपली बुकिंग निश्चित करीत आहोत: [tickets] तिकिटे [date] रोजी [time] वाजता. हे बरोबर आहे का? (होय/नाही)",
            "Booking successful! Your booking ID is [bookingId].": "बुकिंग यशस्वी! आपली बुकिंग आयडी [bookingId] आहे.",
            "There was an error processing your booking. Please try again.": "आपली बुकिंग प्रक्रिया करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.",
            "Let's start over. How many tickets would you like to book?": "चला पुन्हा सुरुवात करूया. आपण किती तिकिटे बुक करू इच्छिता?",
            "Ticket email sent successfully!": "तिकीट ईमेल यशस्वीरित्या पाठवले!",
            "There was an error sending your ticket email. Please check your email later.": "आपले तिकीट ईमेल पाठवण्यात त्रुटी आली. कृपया नंतर आपला ईमेल तपासा.",
            "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)": "छान! आपण कोणत्या तारखेला संग्रहालयाला भेट द्यायला इच्छिता? कृपया योग्य स्वरूपात प्रविष्ट करा. (उदा., 2024-09-01)",
            "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.": "क्षमस्व, पण आपण एकावेळी फक्त 10 लोकांसाठीच बुक करू शकता. कृपया 10 किंवा त्यापेक्षा कमी मूल्य प्रविष्ट करा.",
            "Please enter only a numerical value.": "कृपया फक्त अंकात्मक मूल्य प्रविष्ट करा.",
            "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.": "कृपया खालीलपैकी एक वेळ स्लॉट निवडा:<br><br>1. 08:00 AM<br> (10:00 AM पर्यंत)<br>2. 10:00 AM<br> (12:00 PM पर्यंत)<br>3. 02:00 PM<br> (04:00 PM पर्यंत)<br>4. 04:00 PM<br> (06:00 PM पर्यंत)<br><br>कृपया वेळ योग्य 12 तास किंवा 24 तास घड्याळाच्या स्वरूपात प्रविष्ट करा.",
            "Please enter a valid date in YYYY/MM/DD format.": "कृपया YYYY/MM/DD स्वरूपात एक वैध तारीख प्रविष्ट करा.",
            "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.": "कृपया एक वैध वेळ-स्लॉट निवडा आणि वैध 12 तास किंवा 24 तास स्वरूपात प्रविष्ट करा."
        },
        "gu": { // Gujarati translations
        "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "સંગ્રહાલય ટિકિટ બુકિંગ સિસ્ટમમાં તમારું સ્વાગત છે! તમે કેટલાં ટિકિટ બુક કરાવવી ઇચ્છો છો?",
        "Your booking is confirmed!": "તમારી બુકિંગની પુષ્ટિ થઈ ગઈ છે!",
        "Please enter the number of tickets you want to book.": "કૃપા કરીને તમે કેટલાં ટિકિટ બુક કરાવવા માંગો છો તે સંખ્યા દાખલ કરો.",
        "What is your preferred date for the visit?": "આપની મુલાકાત માટેની પસંદગીની તારીખ કઈ છે?",
        "Thank you for providing the date. How many adults and children will be attending?": "તારીખ આપવા બદલ આભાર. કેટલા પુખ્ત અને બાળકો હાજર રહેશે?",
        "Please enter the names of all attendees.": "કૃપા કરીને બધી હાજરગીઓનાં નામ દાખલ કરો.",
        "Your total cost is calculated. Do you want to proceed with the payment?": "તમારી કુલ કિંમતની ગણતરી થઈ ગઈ છે. શું તમે ચુકવણી સાથે આગળ વધવા માંગો છો?",
        "Thank you for booking with us! An email confirmation will be sent to you shortly.": "અમારી સાથે બુકિંગ કરવા બદલ આભાર! તમને જલ્દી જ ઇમેઇલ દ્વારા પુષ્ટિ મોકલવામાં આવશે.",
        "Would you like to book another ticket?": "શું તમે બીજુ ટિકિટ બુક કરાવવું ઇચ્છો છો?",
        "Sorry, we couldn't process your request. Please try again.": "માફ કરશો, અમે તમારી વિનંતી પ્રોસેસ કરી શક્યા નથી. કૃપા કરીને ફરી પ્રયાસ કરો.",
        "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "અદ્ભુત! તમે કઈ તારીખે સંગ્રહાલયની મુલાકાત લેવા માંગો છો? (ઉદાહરણ તરીકે, 2024-09-01)",
        "And at what time would you like to visit? (e.g., 10:00 AM)": "અને તમે કઈ સમયે મુલાકાત લેવી ઇચ્છો છો? (ઉદાહરણ તરીકે, 10:00 AM)",
        "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "તમારી બુકિંગની પુષ્ટિ કરી રહ્યા છીએ: [tickets] ટિકિટો [date] ના [time] માટે. શું આ સાચું છે? (હા/ના)",
        "Booking successful! Your booking ID is [bookingId].": "બુકિંગ સફળ! તમારી બુકિંગ આઈડી [bookingId] છે.",
        "There was an error processing your booking. Please try again.": "તમારી બુકિંગ પ્રક્રિયામાં ભૂલ થઈ. કૃપા કરીને ફરી પ્રયાસ કરો.",
        "Let's start over. How many tickets would you like to book?": "ચાલો ફરીથી શરૂ કરીએ. તમે કેટલાં ટિકિટ બુક કરાવવી ઇચ્છો છો?",
        "Ticket email sent successfully!": "ટિકિટ ઇમેઇલ સફળતાપૂર્વક મોકલાઈ!",
        "There was an error sending your ticket email. Please check your email later.": "તમારા ટિકિટ ઇમેઇલ મોકલવામાં ભૂલ થઈ. કૃપા કરીને તમારું ઇમેઇલ પછી ચકાસો.",
        "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)": "અદ્ભુત! તમે કઈ તારીખે સંગ્રહાલયની મુલાકાત લેવા માંગો છો? કૃપા કરીને માન્ય ફોર્મેટમાં દાખલ કરો. (ઉદાહરણ, 2024-09-01)",
        "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.": "માફ કરશો, પરંતુ તમે એક સમયે ફક્ત 10 લોકોને જ બુક કરી શકો છો. કૃપા કરીને 10 અથવા તેથી ઓછું મૂલ્ય દાખલ કરો.",
        "Please enter only a numerical value.": "કૃપા કરીને માત્ર આંકડાકીય મૂલ્ય દાખલ કરો.",
        "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.": "કૃપા કરીને નીચેના સમય સ્લોટમાંથી એક પસંદ કરો:<br><br>1. 08:00 AM<br> (10:00 AM સુધી)<br>2. 10:00 AM<br> (12:00 PM સુધી)<br>3. 02:00 PM<br> (04:00 PM સુધી)<br>4. 04:00 PM<br> (06:00 PM સુધી)<br><br>કૃપા કરીને સમય યોગ્ય 12 કલાક કે 24 કલાક ઘડિયાળના ફોર્મેટમાં દાખલ કરો.",
        "Please enter a valid date in YYYY/MM/DD format.": "કૃપા કરીને YYYY/MM/DD ફોર્મેટમાં માન્ય તારીખ દાખલ કરો.",
        "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.": "કૃપા કરીને માન્ય સમય-સ્લોટ પસંદ કરો અને માન્ય 12 કલાક કે 24 કલાક ફોર્મેટમાં દાખલ કરો."
    },
        "ta": { //Tamil translations
        "Welcome to the Museum Ticket Booking System! How many tickets would you like to book?": "கோவிலின் பயணச்சீட்டு முன்பதிவு அமைப்பில் வரவேற்கிறோம்! நீங்கள் எத்தனை பயணச்சீட்டுகளை முன்பதிவு செய்ய விரும்புகிறீர்கள்?",
        "Your booking is confirmed!": "உங்கள் முன்பதிவு உறுதி செய்யப்பட்டது!",
        "Please enter the number of tickets you want to book.": "தயவுசெய்து நீங்கள் எத்தனை பயணச்சீட்டுகளை முன்பதிவு செய்ய விரும்புகிறீர்கள் என்பதை உள்ளிடவும்.",
        "What is your preferred date for the visit?": "உங்கள் வருகைக்கான விருப்பமான தேதி என்ன?",
        "Thank you for providing the date. How many adults and children will be attending?": "தேதியை வழங்கியதற்கு நன்றி. எத்தனை பெரியவர்கள் மற்றும் குழந்தைகள் பங்கேற்கின்றனர்?",
        "Please enter the names of all attendees.": "தயவுசெய்து அனைத்து பங்கேற்பாளர்களின் பெயர்களை உள்ளிடவும்.",
        "Your total cost is calculated. Do you want to proceed with the payment?": "உங்கள் மொத்த செலவு கணக்கிடப்பட்டுள்ளது. நீங்கள் பணம் செலுத்தும் முறையுடன் தொடர விரும்புகிறீர்களா?",
        "Thank you for booking with us! An email confirmation will be sent to you shortly.": "எங்களுடன் முன்பதிவு செய்ததற்கு நன்றி! ஒரு மின்னஞ்சல் உறுதிப்படுத்தல் விரைவில் உங்களுக்கு அனுப்பப்படும்.",
        "Would you like to book another ticket?": "நீங்கள் இன்னொரு பயணச்சீட்டை முன்பதிவு செய்ய விரும்புகிறீர்களா?",
        "Sorry, we couldn't process your request. Please try again.": "மன்னிக்கவும், உங்கள் கோரிக்கையை செயல்படுத்த முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
        "Great! What date would you like to visit the museum? (e.g., 2024-09-01)": "சிறப்பானது! நீங்கள் எந்த தேதியில் அருங்காட்சியகத்திற்கு செல்ல விரும்புகிறீர்கள்? (உதாரணமாக, 2024-09-01)",
        "And at what time would you like to visit? (e.g., 10:00 AM)": "நீங்கள் எந்த நேரத்தில் வருகை தர விரும்புகிறீர்கள்? (உதாரணமாக, 10:00 AM)",
        "Confirming your booking: [tickets] tickets for [date] at [time]. Is that correct? (yes/no)": "உங்கள் முன்பதிவை உறுதிப்படுத்துகிறோம்: [tickets] பயணச்சீட்டுகள் [date] அன்று [time]க்கு. இது சரியா? (ஆம்/இல்லை)",
        "Booking successful! Your booking ID is [bookingId].": "முன்பதிவு வெற்றிகரமாக முடிந்தது! உங்கள் முன்பதிவு அடையாள எண் [bookingId] ஆகும்.",
        "There was an error processing your booking. Please try again.": "உங்கள் முன்பதிவை செயலாக்கும் போது ஒரு பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
        "Let's start over. How many tickets would you like to book?": "நாம் மறுபடியும் தொடங்குவோம். நீங்கள் எத்தனை பயணச்சீட்டுகளை முன்பதிவு செய்ய விரும்புகிறீர்கள்?",
        "Ticket email sent successfully!": "பயணச்சீட்டு மின்னஞ்சல் வெற்றிகரமாக அனுப்பப்பட்டது!",
        "There was an error sending your ticket email. Please check your email later.": "உங்கள் பயணச்சீட்டு மின்னஞ்சல் அனுப்பும் போது ஒரு பிழை ஏற்பட்டது. தயவுசெய்து உங்கள் மின்னஞ்சலை பின்னர் சரிபார்க்கவும்.",
        "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)": "சிறப்பானது! நீங்கள் எந்த தேதியில் அருங்காட்சியகத்தைப் பார்க்க விரும்புகிறீர்கள்? தயவுசெய்து சரியான வடிவத்தில் உள்ளிடவும். (உதாரணம், 2024-09-01)",
        "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.": "மன்னிக்கவும், ஆனால் நீங்கள் ஒரு முறை 10 பேர் வரை மட்டுமே முன்பதிவு செய்யலாம். தயவுசெய்து 10 அல்லது அதற்கு குறைவான ஒரு மதிப்பை உள்ளிடவும்.",
        "Please enter only a numerical value.": "தயவுசெய்து எண்களில் மட்டும் ஒரு மதிப்பை உள்ளிடவும்.",
        "Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.": "தயவுசெய்து கீழே உள்ள நேர இடைவெளிகளிலிருந்து ஒன்றைத் தேர்ந்தெடுக்கவும்:<br><br>1. 08:00 AM<br> (10:00 AM வரை)<br>2. 10:00 AM<br> (12:00 PM வரை)<br>3. 02:00 PM<br> (04:00 PM வரை)<br>4. 04:00 PM<br> (06:00 PM வரை)<br><br>தயவுசெய்து நேரத்தை சரியான 12 மணி அல்லது 24 மணி நேர வடிவத்தில் உள்ளிடவும்.",
        "Please enter a valid date in YYYY/MM/DD format.": "YYYY/MM/DD வடிவத்தில் ஒரு செல்லுபடியான தேதியை உள்ளிடவும்.",
        "Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.": "ஒரு செல்லுபடியான நேர இடைவெளியைத் தேர்ந்தெடுத்து செல்லுபடியான 12 மணி அல்லது 24 மணி நேர வடிவத்தில் உள்ளிடவும்."
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
    bubbleElement.innerHTML = translateText(message, currentLanguage); 
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

function isDateTodayOrLater(dateStr) {
    // Parse the input date string to a Date object
    const inputDate = new Date(dateStr);
    
    // Check if the inputDate is a valid Date object
    if (isNaN(inputDate.getTime())) {
        return false; // Invalid date
    }
    
    // Get today's date and set time to 00:00:00 to compare only dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds
    
    // Compare the inputDate with today's date
    return inputDate > today;
}

function containsTime(str) {
    // Regular expression for matching the allowed 12-hour times with AM/PM
    const regex12Hour = /^(08:00\s*[AaPp][Mm]|10:00\s*[AaPp][Mm]|02:00\s*[Pp][Mm]|04:00\s*[Pp][Mm])$/;

    // Regular expression for matching the allowed 24-hour times
    const regex24Hour = /^(08:00|10:00|14:00|16:00)$/;

    // Convert the input to uppercase and trim extra spaces for uniformity
    const formattedStr = str.trim().toUpperCase();

    // Check if the string matches any of the allowed times
    if (regex12Hour.test(formattedStr) || regex24Hour.test(formattedStr)) {
        // Ensure the format is strictly correct
        return formattedStr === '08:00 AM' || formattedStr === '10:00 AM' ||
               formattedStr === '02:00 PM' || formattedStr === '04:00 PM' ||
               formattedStr === '08:00' || formattedStr === '10:00' ||
               formattedStr === '14:00' || formattedStr === '16:00';
    }

    return false; // Return false for any other inputs
}

function botResponse(userInput) {
    let response = "";
    if (step === 1) {
        if (/^\d+$/.test(userInput)) {
            if (parseInt(userInput) <= 10) {
                bookingDetails.tickets = userInput;
                response = "Great! What date would you like to visit the museum? Please enter in a valid format. (e.g., 2024-09-01)";
                step++;
            }
            else {
                response = "Sorry, but you can only book for upto 10 people at a time. Please enter a value less than or equal to 10.";
            }
        }
        else {
            response = "Please enter only a numerical value.";
        }
    }
    else if (step === 2) {
        if (isDateTodayOrLater(userInput)) {
            bookingDetails.date = userInput;
            response = `Please select one of the below time slots:<br><br>1. 08:00 AM<br> (Upto 10:00 AM)<br>2. 10:00 AM<br> (upto 12:00 PM)<br>3. 02:00 PM<br> (Upto 04:00 PM)<br>4. 04:00 PM<br> (Upto 06:00 PM)<br><br>Please enter time in a proper 12 Hr clock or 24 Hr clock format.`;
            step++;
        }       
        else {
            response = "Please enter a valid date in YYYY/MM/DD format."
        }
    } else if (step === 3) {
        if (containsTime(userInput)) {
            bookingDetails.time = userInput;
            response = `Confirming your booking: ${bookingDetails.tickets} tickets for ${bookingDetails.date} at ${bookingDetails.time}. Is that correct? (yes/no)`;
            step++;
        } 
        else {
            response = `Please select a valid time-slot and enter in a valid 12 Hr or 24 Hr format.`
        }
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
                // response = `Booking successful! Your booking ID is ${data.bookingId}.`;
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
        addMessage("Your ticket has been booked successfully. Please check your email for the ticket!", "botMessage");
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
