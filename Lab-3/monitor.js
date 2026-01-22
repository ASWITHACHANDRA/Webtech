// Requirement: Store each activity in an array of objects
let activityLog = [];
let clickCounter = 0;
const CLICK_THRESHOLD = 10; // Clicks within 5 seconds
const logContainer = document.getElementById('logDisplay');
const warningBox = document.getElementById('suspiciousWarning');

// Requirement: Track clicks, key presses, and focus events using event listeners
// Requirement: Use event bubbling and capturing (true = capture phase)
window.addEventListener('click', (e) => logActivity('CLICK', e.target.tagName), true);
window.addEventListener('keydown', (e) => logActivity('KEYPRESS', e.key), true);
window.addEventListener('focusin', (e) => logActivity('FOCUS', e.target.id || e.target.tagName), true);

function logActivity(type, detail) {
    const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        detail: detail
    };
    
    activityLog.push(entry);
    updateDisplay(entry);
    checkSuspicious(type);
}

// Requirement: Dynamically display the activity log using the DOM
function updateDisplay(entry) {
    const div = document.createElement('div');
    div.innerText = `[${entry.timestamp}] ${entry.type}: ${entry.detail}`;
    logContainer.prepend(div); // Show newest first
}

// Requirement: Set thresholds for suspicious activity and trigger warnings
function checkSuspicious(type) {
    if (type === 'CLICK') {
        clickCounter++;
        setTimeout(() => clickCounter--, 5000); // Decrement after 5 seconds
        
        if (clickCounter > CLICK_THRESHOLD) {
            warningBox.style.display = 'block';
        } else {
            warningBox.style.display = 'none';
        }
    }
}

// Requirement: Button to reset log
function resetLog() {
    activityLog = [];
    logContainer.innerHTML = '<div>-- Log Cleared --</div>';
    warningBox.style.display = 'none';
}

// Requirement: Button to export the activity log as formatted text
function exportLog() {
    let content = "USER ACTIVITY LOG\n=================\n";
    activityLog.forEach(item => {
        content += `${item.timestamp} | ${item.type} | Target: ${item.detail}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'activity_log.txt';
    link.click();
}