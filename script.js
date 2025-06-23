function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function submitForm(event) {
    event.preventDefault();
    alert("Thank you for reaching out! I'll get back to you shortly.")
}