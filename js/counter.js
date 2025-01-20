// Function to get visit count from localStorage
function getVisitCount() {
    return parseInt(localStorage.getItem('visitCount')) || 0;
}

// Function to increment and save visit count
function incrementVisitCount() {
    const currentCount = getVisitCount();
    const newCount = currentCount + 1;
    localStorage.setItem('visitCount', newCount);
    return newCount;
}

// Function to update the counter display
function updateVisitCounter() {
    const counterElement = document.getElementById('visitCounter');
    if (counterElement) {
        counterElement.textContent = getVisitCount().toLocaleString();
    }
}

// Initialize counter when page loads
document.addEventListener('DOMContentLoaded', () => {
    // First attempt to update counter
    updateVisitCounter();
    
    // Keep trying to update counter until footer loads
    const checkInterval = setInterval(() => {
        const counterElement = document.getElementById('visitCounter');
        if (counterElement && counterElement.textContent === '0') {
            updateVisitCounter();
        } else {
            clearInterval(checkInterval);
        }
    }, 100);

    // Increment count once per page load
    incrementVisitCount();
}); 