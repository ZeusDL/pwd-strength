const passwordInput = document.getElementById("Password");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const feedback = document.getElementById("feedback");
const suggestionsList = document.getElementById("suggestions");

const commonPasswords = ["password", "123456", "qwerty", "admin", "123456789"];

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const strength = checkStrength(password);
    updateStrengthIndicator(strength);
    updateFeedback(strength);
    updateSuggestions(password);
});

function checkStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    if (/\d/.test(password) && /[A-Z]/.test(password)) strength++;
    if (!commonPasswords.includes(password.toLowerCase())) strength++; 

    
    const isSequential = checkSequential(password);
    if (!isSequential) strength++;


    return strength;
}

function checkSequential(password) {
  const sequences = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];
  for (const seq of sequences) {
    if (password.toLowerCase().includes(seq) || password.toLowerCase().includes(seq.split("").reverse().join(""))) {
      return true; 
    }
  }
  return false; 
}


function updateStrengthIndicator(strength) {
    const bars = [bar1, bar2, bar3];
    bars.forEach(bar => bar.classList.remove('weak', 'medium', 'strong', 'active'));

    for (let i = 0; i < strength && i < bars.length; i++) {
      bars[i].classList.add('active');
      if (i === 0) bars[i].classList.add('weak');
      if (i === 1) bars[i].classList.add('medium');
      if (i === 2) bars[i].classList.add('strong');
    }
}


function updateFeedback(strength) {
    const feedbackMessages = ["Weak password", "Medium password", "Strong password", "Very Strong password", "Excellent Password"];
    const feedbackClasses = ["weak", "medium", "strong", "strong", "strong"]; 

    const messageIndex = Math.min(strength, feedbackMessages.length) -1; 

    feedback.textContent = messageIndex >= 0 ? feedbackMessages[messageIndex] : "Your Password";
    feedback.classList.remove('weak', 'medium', 'strong');
    if (messageIndex >= 0) {
      feedback.classList.add(feedbackClasses[messageIndex]);
    }
}

function updateSuggestions(password) {
    const suggestions = [];

    if (password.length < 8) suggestions.push("Use at least 8 characters.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) suggestions.push("Include symbols (e.g., !@#$).");
    if (!/\d/.test(password)) suggestions.push("Include numbers (e.g., 123).");
    if (!/[A-Z]/.test(password)) suggestions.push("Include uppercase letters.");
    if (!/[a-z]/.test(password)) suggestions.push("Include lowercase letters.");
    if (commonPasswords.includes(password.toLowerCase())) suggestions.push("Avoid common passwords.");
    if (checkSequential(password)) suggestions.push("Avoid sequential characters (e.g. abc, 123)");


    suggestionsList.innerHTML = ""; 
    suggestions.forEach(suggestion => {
        const li = document.createElement("li");
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
}