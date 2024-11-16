function swapBackgroundImage() {
    const mobileWidth = 768; // adjust this value to your desired mobile breakpoint
    const screenWidth = window.innerWidth;
  
    if (screenWidth <= mobileWidth) {
      const backgroundElement = document.querySelector('.background img');
      backgroundElement.src = 'media/image/bnbclickerbg.jpg';
    } else {
      const backgroundElement = document.querySelector('.background img');
      backgroundElement.src = 'media/image/bnbclickerbg_animation.gif';
    }
  }
  
  // Call the function on page load and on window resize
  window.addEventListener('load', swapBackgroundImage);
  window.addEventListener('resize', swapBackgroundImage);

function startAnimation() {
    const bnb = document.getElementById('bnb');

    // Add shrinking class
    bnb.classList.add('shrink-grow');

    // After the shrinking animation ends, grow it back
    setTimeout(() => {
        bnb.classList.remove('shrink-grow');
        bnb.classList.add('shrink-grow-back');
    }, 50); // Duration of the shrink (500ms)

    // After growing back, remove the grow class
    setTimeout(() => {
        bnb.classList.remove('shrink-grow-back');
    }, 100); // Total time before resetting (500ms for shrink + 500ms for grow)
}

// Initialize score variable
let score = 5000;
let scorePerClick = 1;  // The number of score points added per click
let upgrade1Used = false; // Flag to track if the first upgrade has been used

// Function to increase the score
function increaseScore(event) {
    score += scorePerClick;
    // Update the score displayed on the page
    document.getElementById('score').textContent = score;

    // Create a new score text element
    const scoreText = document.createElement('div');
    scoreText.textContent = `+${scorePerClick}`;
    scoreText.className = 'score-text';
    scoreText.style.top = `${event.clientY - 20}px`; // Position the text above the mouse cursor
    scoreText.style.left = `${event.clientX}px`; // Position the text at the mouse cursor's x-coordinate

    // Add the score text element to the page
    document.body.appendChild(scoreText);

    // Animate the score text element
    setTimeout(() => {
        scoreText.style.transform = 'translateY(-20px)'; // Move the text upwards
        scoreText.style.opacity = '0'; // Fade out the text
    }, 0);

    // Remove the score text element after the animation
    setTimeout(() => {
        scoreText.remove();
    }, 1000);
}

// Function for "Upgrade 1" button
function upgrade1() {
    // Only allow upgrade1 if the score is 20 or more and the upgrade hasn't been used
    if (score >= 20 && !upgrade1Used) {
        scorePerClick *= 2;  // Double the score per click
        score -= 20;  // Subtract 20 points from the user's score
        upgrade1Used = true;  // Mark the upgrade as used
        document.getElementById('upgrade1-btn').disabled = true;  // Disable the button after it’s clicked
        document.getElementById('score').textContent = score; // Update the displayed score immediately
    } else if (score < 20) {
        alert("You need at least 20 points to activate this upgrade.");
    }
}

let autoScoreInterval = null; // Variable to store the interval ID for auto-scoring
let autoScoreActive = false; // Flag to prevent multiple intervals from starting
let upgrade2Used = false;

function upgrade2() {
    // Check if the user has 100 or more points
    if (score >= 100 && !autoScoreActive && !upgrade2Used) {
        score -= 100; // Deduct 100 points
        upgrade2Used = true;  // Mark the upgrade as used
        document.getElementById('upgrade2-btn').disabled = true;
        document.getElementById('score').textContent = score; // Update the displayed score
        autoScoreActive = true; // Mark the upgrade as active

        // Start adding 1 score every 5 seconds
        autoScoreInterval = setInterval(() => {
            score += 1;
            document.getElementById('score').textContent = score;
            startAnimation(); // Call startAnimation every time the score increases
        }, 5000);

        // Add an image to the "main" class div
        const mainDiv = document.querySelector('.main');
        const img = document.createElement('img');
        img.src = 'media/image/bnb_upg2.jpg'; // Replace with the desired image URL
        img.alt = 'Upgrade 2 Image';
        img.className = 'upg2-image';
        mainDiv.appendChild(img);
    } else if (score < 100) {
        alert("You need at least 100 points to activate this upgrade.");
    }
}

let upgrade3Used = false;
let autoScore2Interval = null; // Variable to store the interval ID for auto-scoring
let autoScore2Active = false;

function upgrade3() {
    if (score >= 1000 && !upgrade3Used) {
        // Add CSS animation to bnbclicker.css file
        score -= 1000;
        const bnbImage = document.querySelector('.wrapper .main #bnb button img');
        bnbImage.style.animation = 'bnbroll 60s infinite linear';
        upgrade3Used = true;
        document.getElementById('upgrade3-btn').disabled = true;
        document.getElementById('score').textContent = score;
        autoScore2Active = true;

        autoScore2Interval = setInterval(() => {
            score += 40;
            document.getElementById('score').textContent = score;
            startAnimation(); // Call startAnimation every time the score increases
        }, 60000);

    } else if (score < 1000) {
        alert("You need at least 1000 points to activate this upgrade.");
    }
}

let upgrade4Used = false;
let bnbimage = 'media/image/bnb_upg4.jpg';

function upgrade4() {
    if (score >= 5000 && !upgrade4Used) {
        score -= 5000;
        upgrade4Used = true;
        scorePerClick *= 3;
        document.getElementById('upgrade4-btn').disabled = true;
        document.getElementById('score').textContent = score;

        const bnbImageElement = document.getElementById('bnbimage');
        const img = document.createElement('img');
        img.src = bnbimage;
        bnbImageElement.innerHTML = ''; // Clear previous content
        bnbImageElement.appendChild(img);

    } else if (score < 5000) {
        alert("You need at least 5000 points to activate this upgrade.");
    }
}
