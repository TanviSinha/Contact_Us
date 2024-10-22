{
    var form = document.getElementById('contactForm');
    var responseMessage_1 = document.getElementById('responseMessage');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var contactNumber = document.getElementById('contact').value;
        var subject = document.getElementById('sub').value;
        var message = document.getElementById('message').value;
        if (!name || !email || !message || !contactNumber) {
            responseMessage_1.textContent = "Please fill all required fields.";
            responseMessage_1.className = "error";
            return;
        }
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            responseMessage_1.textContent = "Please enter a valid email address.";
            responseMessage_1.className = "error";
            return;
        }
        var phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(contactNumber)) {
            responseMessage_1.textContent = "Please enter a valid 10-digit phone number.";
            responseMessage_1.className = "error";
            return;
        }
        submitForm({
            name: name,
            email: email,
            contactNumber: contactNumber,
            subject: subject,
            message: message
        });
    });
    function submitForm(data) {
        fetch('https://6715420133bc2bfe40b9f093.mockapi.io/Contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
            if (response.ok) {
                responseMessage_1.textContent = "Form Submitted Successfully.";
                responseMessage_1.className = "success";
            }
            else {
                responseMessage_1.textContent = "Submission Failed.";
                responseMessage_1.className = "error";
            }
        })
            .catch(function (error) {
            responseMessage_1.textContent = "Submission Failed.";
            responseMessage_1.className = "error";
            console.error(error);
        });
    }
}
