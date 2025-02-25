const handleContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.success) {
                // Show success message
                alert('Message sent successfully!');
                e.target.reset(); // Clear form
            } else {
                // Show error message
                alert(result.message || 'Error sending message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        } finally {
            // Re-enable button and restore text
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', handleContactForm);

export { handleContactForm }; 