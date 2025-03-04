// Enhanced message display
function showMessage(text, type = 'info') {
  const messageEl = document.getElementById('message');
  messageEl.textContent = text;
  messageEl.className = `message ${type}`; // types: info, success, warning, error
  messageEl.style.opacity = '1';
  
  // Add appropriate color based on message type
  switch(type) {
    case 'success':
      messageEl.style.backgroundColor = 'rgba(46, 204, 113, 0.9)';
      break;
    case 'warning':
      messageEl.style.backgroundColor = 'rgba(241, 196, 15, 0.9)';
      break;
    case 'error':
      messageEl.style.backgroundColor = 'rgba(231, 76, 60, 0.9)';
      break;
    default:
      messageEl.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }
  
  // Add subtle animation
  messageEl.style.transform = 'translateX(-50%) translateY(0)';
  
  // Auto-hide after delay
  setTimeout(() => {
    messageEl.style.opacity = '0';
  }, 3000);
}

// Update resource display with animation
function updateResourcesDisplay() {
  const currentValue = parseInt(resourcesValue.textContent);
  const targetValue = game.resourceCount;
  const duration = 500; // Animation duration in ms
  const steps = 20; // Number of steps in animation
  const increment = (targetValue - currentValue) / steps;
  let currentStep = 0;
  
  const animate = () => {
    currentStep++;
    const newValue = Math.round(currentValue + (increment * currentStep));
    resourcesValue.textContent = newValue;
    resourcesBar.style.width = `${(newValue / game.maxResources) * 100}%`;
    
    if (currentStep < steps) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
}

// Enhanced upgrade button display
function updateUpgradeButtons() {
  const upgradeButtons = document.querySelectorAll('.upgrade-buttons button');
  upgradeButtons.forEach(button => {
    const cost = parseInt(button.textContent.match(/\((\d+)\)/)[1]);
    button.disabled = game.resourceCount < cost;
    button.style.opacity = button.disabled ? '0.5' : '1';
    button.style.cursor = button.disabled ? 'not-allowed' : 'pointer';
  });
}
