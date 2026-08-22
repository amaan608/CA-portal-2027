document.addEventListener('DOMContentLoaded', () => {
    // Get all the required DOM elements
    const personalDetails = document.getElementById('personal-details');
    const caDetails = document.getElementById('ca-details');
    const nextBtn = document.getElementById('nextBtn');
    // const backButton = document.getElementById('backButton');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');

    // Handle Next button click to transition to the next form section
    nextBtn.addEventListener('click', () => {
        // You can add form validation logic here before transitioning
        
        // Hide the current section
        personalDetails.classList.add('rj_hidden_section');
        // Show the next section
        caDetails.classList.remove('rj_hidden_section');

        // Use a slight delay for a smooth transition effect
        setTimeout(() => {
            caDetails.style.opacity = 1; // Explicitly set opacity for transition
            // Update step indicators
            step1.querySelector('.rj_step_indicator').classList.remove('active');
            step1.querySelector('.rj_step_indicator').style.backgroundColor = '#B542FB';
            step1.querySelector('.rj_step_indicator').style.color = '#ffffff';
            step2.querySelector('.rj_step_indicator').classList.add('active');
            // backButton.style.display = 'flex';
        }, 10);
    });

    // Handle Back button click to go back to the previous form section
    // backButton.addEventListener('click', () => {
        // Hide the current section
        // caDetails.classList.add('rj_hidden_section');
        // Show the previous section
        // personalDetails.classList.remove('rj_hidden_section');
// 
        // Use a slight delay for a smooth transition effect
        // setTimeout(() => {
            // personalDetails.style.opacity = 1; // Explicitly set opacity for transition
            // Update step indicators
            // step1.querySelector('.rj_step_indicator').classList.add('active');
            // step1.querySelector('.rj_step_indicator').style.backgroundColor = ''; // Revert to default
            // step1.querySelector('.rj_step_indicator').style.color = ''; // Revert to default
            // step2.querySelector('.rj_step_indicator').classList.remove('active');
            // backButton.style.display = 'none';
        // }, 10);
    // });

    // Handle Guidelines dropdown toggle
    const guidelinesToggle = document.getElementById('guidelinesToggle');
    const guidelinesContent = document.getElementById('guidelinesContent');
    const guidelinesIcon = document.getElementById('guidelinesIcon');
    const guidelinesBackBtn = document.getElementById('guidelinesBackBtn');

    guidelinesToggle.addEventListener('click', () => {
        const isHidden = guidelinesContent.classList.toggle('hidden');
        if (!isHidden) {
            guidelinesContent.classList.add('visible');
            guidelinesIcon.classList.add('rotated');
        } else {
            guidelinesContent.classList.remove('visible');
            guidelinesIcon.classList.remove('rotated');
        }
    });

    guidelinesBackBtn.addEventListener('click', () => {
        guidelinesContent.classList.remove('visible');
        guidelinesContent.classList.add('hidden');
        guidelinesIcon.classList.remove('rotated');
    });

    // Handle Solo/Team button toggle
    const soloBtn = document.getElementById('soloBtn');
    const teamBtn = document.getElementById('teamBtn');

    // Initial active state
    soloBtn.classList.add('active');

    soloBtn.addEventListener('click', () => {
        soloBtn.classList.add('active');
        teamBtn.classList.remove('active');
    });

    teamBtn.addEventListener('click', () => {
        teamBtn.classList.add('active');
        soloBtn.classList.remove('active');
    });
});
