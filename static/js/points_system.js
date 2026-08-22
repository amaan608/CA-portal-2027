// Points System Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize points system page
    console.log('Points System page loaded');
    
    // Add any interactive functionality here if needed
    // For now, the page is mostly static content
    
    // Add hover effects for task rows
    const taskRows = document.querySelectorAll('.task-row');
    taskRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f8f8';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Add smooth scrolling for better UX
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Add any additional functionality as needed
}); 