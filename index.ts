{
const form = document.getElementById('contactForm') as HTMLFormElement;
const responseMessage = document.getElementById('responseMessage') as HTMLElement;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contactNumber = (document.getElementById('contact') as HTMLInputElement).value;
    const subject = (document.getElementById('sub') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    if (!name || !email || !message || !contactNumber) {
        responseMessage.textContent = "Please fill all required fields.";
        responseMessage.className = "error";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        responseMessage.textContent = "Please enter a valid email address.";
        responseMessage.className = "error";
        return;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(contactNumber)) {
        responseMessage.textContent = "Please enter a valid 10-digit phone number.";
        responseMessage.className = "error";
        return;
    }

    submitForm({
        name,
        email,
        contactNumber,
        subject,
        message
    });
});

function submitForm(data: any) {
    fetch('https://6715420133bc2bfe40b9f093.mockapi.io/Contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            responseMessage.textContent = "Form Submitted Successfully.";
            responseMessage.className = "success";
        } else {
            responseMessage.textContent = "Submission Failed.";
            responseMessage.className = "error";
        }
    })
    .catch((error) => {
        responseMessage.textContent = "Submission Failed.";
        responseMessage.className = "error";
        console.error(error);
    });
 }
} 
