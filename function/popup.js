function showConfirm(message, title = "Konfirmasi") {
    const popup = document.getElementById('confirmPopup');
    const confirmTitle = popup.querySelector('.confirm-title');
    const confirmMessage = popup.querySelector('.confirm-message');
    
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    popup.classList.add('active');
    
    return new Promise((resolve) => {
        window.handleConfirm = (result) => {
            popup.classList.remove('active');
            resolve(result);
        };
    });
}

function showAlert(message, title = "Pemberitahuan") {
    const popup = document.getElementById('alertPopup');
    const alertTitle = popup.querySelector('.alert-title');
    const alertMessage = popup.querySelector('.alert-message');
    
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    popup.classList.add('active');
}

function showAchievement(message) {
    const achievement = document.getElementById('achievementAlert');
    const achievementMessage = document.getElementById('achievementMessage');
    
    achievementMessage.textContent = message;
    achievement.classList.add('show');
    
    setTimeout(() => {
        achievement.classList.remove('show');
    }, 3000);
}

function closeAlert() {
    const popup = document.getElementById('alertPopup');
    popup.classList.remove('active');
}

function closeNamePopup() {
    const popup = document.getElementById('namePopup');
    popup.classList.remove('active');
    document.getElementById('newName').value = '';
}

function showNamePopup() {
    const popup = document.getElementById('namePopup');
    popup.classList.add('active');
    document.getElementById('newName').focus();
}