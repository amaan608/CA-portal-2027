// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all cards
    const cards = document.querySelectorAll('.card');
    
    // Add click event listeners to all cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const cardNumber = this.getAttribute('data-card');
            handleCardClick(cardNumber, this);
        });
        
        // Add hover animation for team members in cards
        const teamMembers = card.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            member.style.transition = 'transform 0.3s ease';
            
            card.addEventListener('mouseenter', function() {
                member.style.transform = `translateY(-${(index + 1) * 2}px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                member.style.transform = 'translateY(0)';
            });
        });
    });
    
    // Handle card click
    function handleCardClick(cardNumber, cardElement) {
        // Add click animation
        cardElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            cardElement.style.transform = 'translateY(-10px)';
        }, 150);
        
        // Show different messages based on card number
        const messages = {
            1: "Leadership Development",
            2: "Networking Opportunities", 
            3: "Event Management Skills",
            4: "Community Building",
            5: "Personal Growth"
        };
        
        const message = messages[cardNumber] || "Join The Team";
        
        // Create a temporary notification
        showNotification(message, cardElement);
        
        // Log the interaction
        console.log(`Card ${cardNumber} clicked: ${message}`);
    }
    
    // Show notification function
    function showNotification(message, cardElement) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'card-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: absolute;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: #009E77;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        // Add to card
        cardElement.style.position = 'relative';
        cardElement.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
    
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add animation for friendship illustration
    const friendshipImage = document.querySelector('.friendship-illustration');
    if (friendshipImage) {
        friendshipImage.style.opacity = '0';
        friendshipImage.style.transform = 'translateY(30px) scale(0.9)';
        friendshipImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            friendshipImage.style.opacity = '1';
            friendshipImage.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }
    
    // Add CSS animation for floating effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .card-notification {
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(-50%) translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for scroll animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Add focus styles for accessibility
            cards.forEach(card => {
                card.addEventListener('focus', function() {
                    this.style.outline = '3px solid #009E77';
                    this.style.outlineOffset = '2px';
                });
                
                card.addEventListener('blur', function() {
                    this.style.outline = 'none';
                });
            });
        }
    });
    
    // Add touch support for mobile devices
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Any scroll-based animations can go here
        }, 100);
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Console welcome message
    console.log('🎓 Campus Ambassador Portal loaded successfully!');
    console.log('💡 Click on the cards to see different benefits of becoming a Campus Ambassador.');
});
