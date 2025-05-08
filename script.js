

let angka = localStorage.getItem("jumlahKlik") || 0;
let clicks = 0;
let startTime = null;
let clickInterval = null;

let klikPerMenit = 0;

let isReset = true; //boolean untuk reset klik
let mauLagi = true; //boolean untuk loop
let timerAktif = false;

let waktuMulai = null;

// Initial Welcome
let namaInputUser = localStorage.getItem("namaUser") || ""; //menyimpan nama

function closeAlert() {
    const popup = document.getElementById('alertPopup');
    popup.classList.remove('active');
}

if (!namaInputUser) {
    showAlert("Selamat datang di Click Game!", "Halo User!");
} else {
    showAlert("Selamat datang kembali di Click Game!", "Halo " + namaInputUser + "!");
}

// First login name input
async function handleFirstLogin() {
    if (!namaInputUser) {
        showNamePopup();
        const confirmed = await showConfirm("Apakah kamu ingin mengubah nama?");
        if (confirmed) {
            // Wait for name change
            await new Promise(resolve => {
                const checkNameChange = setInterval(() => {
                    const newName = document.getElementById('newName').value.trim();
                    if (newName && newName.length >= 4 && newName.length <= 20) {
                        clearInterval(checkNameChange);
                        resolve();
                    }
                }, 100);
            });
        }
    }
}

// Call the first login handler
handleFirstLogin();

document.getElementById("userName").innerHTML = namaInputUser
showAlert("Ok, jadi namamu " + namaInputUser + " ya!");

function gantiNama() { // fungsi untuk mengganti nama
    showNamePopup();
}

function confirmNameChange() {
    const newName = document.getElementById('newName').value.trim();
    
    if (newName === "") {
        showAlert("Nama tidak boleh kosong!", "Error");
        return;
    }
    
    if (newName.length < 4) {
        showAlert("Nama minimal harus 4 karakter!", "Error");
        return;
    }
    
    if (newName.length > 20) {
        showAlert("Nama maksimal 20 karakter!", "Error");
        return;
    }

    namaInputUser = newName;
    localStorage.setItem("namaUser", namaInputUser);
    document.getElementById('userName').textContent = newName;
    closeNamePopup();
    showAlert("Nama berhasil diubah menjadi: " + newName, "Sukses");
}

function tambahAngka() {
    angka++;
    localStorage.setItem("jumlahKlik", angka);
    document.getElementById('hasil').textContent = angka;
    
    // Update CPM
    clicks++;
    if (!startTime) {
        startTime = Date.now();
        clickInterval = setInterval(updateCPM, 1000);
    }

    // Achievement checks
    if (angka === 11) {
        showAchievement("Wow " + namaInputUser + " sudah mencapai 10 klik!");
    } else if (angka === 101) {
        showAchievement("Wow " + namaInputUser + " sudah mencapai 100 klik, gila!");
    } else if (angka === 1001) {
        showAchievement("Wow " + namaInputUser + " sudah mencapai 1000 klik, master!");
    } else if (angka === 10001) {
        showAchievement("Wow " + namaInputUser + " sudah mencapai 10000 klik, gila kamu kuat mainin game ini!");
    } else if (angka === 100001) {
        showAchievement("Wow " + namaInputUser + " sudah mencapai 100000 klik! Kamu gak pake auto clicker kan?");
    }
}

function updateCPM() {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - startTime) / 1000; // in seconds
    const cpm = Math.round((clicks / timeElapsed) * 60);
    document.getElementById('cpm').textContent = cpm + ' klik/menit';
}

function resetAngka() {
    if (angka === 0) {
        showAlert("Klik kamu masih 0, tidak bisa mereset klik!", "Error");
    } else {
        showConfirm("Apakah kamu yakin untuk mereset klik?").then((confirmed) => {
            if (confirmed) {
                angka = 0;
                clicks = 0;
                startTime = null;
                clearInterval(clickInterval);
                document.getElementById('hasil').textContent = '0';
                document.getElementById('cpm').textContent = '0 klik/menit';
                showAlert("Klik berhasil direset!");
            }
        });
    }
}

// Add click animation effect
document.querySelector('.click-button').addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

