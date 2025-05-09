
let angka = parseInt(localStorage.getItem("jumlahKlik")) || 0;
let clicks = 0;
let startTime = null;
let clickInterval = null;

let mauLagi = true; //boolean untuk loop

// welcome user
let namaInputUser = localStorage.getItem("namaUser") || ""; //menyimpan nama

if (!namaInputUser) {
    showAlert("Selamat datang di Click Game!", "Halo User!");
} else {
    showAlert("Selamat datang kembali di Click Game!", "Halo " + namaInputUser + "!");
}

// memasukkan nama saat pertama kali masuk website
if (!namaInputUser) {
    while (mauLagi === true) {
        const namaUser = showNamePopup();
        if (namaUser !== null && namaUser.trim() !== "" && namaUser.length >= 4 && namaUser.length <= 20 && isNaN(namaUser)) {
            namaInputUser = namaUser
            localStorage.setItem("namaUser", namaInputUser);
            showAlert("Nama kamu" + " " + namaInputUser, "Pemberitahuan")
        } else if (namaUser === "") {
            showAlert("Nama tidak boleh kosong!", "Error");
            continue;
        } else if (namaUser.length < 4) {
            showAlert("Nama minimal harus 4 karakter!", "Error");
            continue;
        } else if (namaUser.length > 20) {
            showAlert("Nama maksimal 20 karakter!", "Error");
            continue;
        } else if (!isNaN(namaUser)) {
            showAlert("Nama tidak boleh angka!", "Error");
            continue;
        }
        mauLagi = showConfirm("apakah kamu ingin mengganti nama?");
    }
}

document.getElementById("userName").innerHTML = namaInputUser

// fungsi untuk mengganti nama
function gantiNama() {
    showNamePopup();
}

//function untuk mengubah nama dan cek kondisi nama
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

    if (!isNaN(newName)) {
        showAlert("Nama tidak boleh angka!", "Error")
        return;
    }

    namaInputUser = newName;
    localStorage.setItem("namaUser", namaInputUser);
    document.getElementById('userName').textContent = newName;
    closeNamePopup();
    showAlert("Nama berhasil diubah menjadi: " + newName, "Sukses");
}

//function untuk menambahkan click
function tambahAngka() {

    //increment angka saat di klik
    angka ++;
    document.getElementById('hasil').textContent = angka;
    localStorage.setItem("jumlahKlik", angka);
    
    // Update CPM
    clicks++;
    if (!startTime) {
        startTime = Date.now();
        clickInterval = setInterval(updateCPM, 1000);
    }

     // Achievement checks
    if (angka === 10) {
    showAchievement("Wow " + namaInputUser + " sudah mencapai 10 klik!");
     } else if (angka === 100) {
    showAchievement("Wow " + namaInputUser + " sudah mencapai 100 klik, gila!");
     } else if (angka === 1000) {
    showAchievement("Wow " + namaInputUser + " sudah mencapai 1.000 klik, master!");
     } else if (angka === 10000) {
    showAchievement("Wow " + namaInputUser + " sudah mencapai 10.000 klik, gila kamu kuat mainin game ini!");
     } else if (angka === 100000) {
    showAchievement("Wow " + namaInputUser + " sudah mencapai 100.000 klik!!, kamu gak pake auto clicker kan?");
     } else if (angka === 1000000) {
    showAchievement("Wow " + namaInputUser + " sudah mencapai 1.000.000 klik!?!, kamu pasti pake auto clicker!!");
    }
}

//function untuk update click per menit
function updateCPM() {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - startTime) / 1000; // in seconds
    const cpm = Math.round((clicks / timeElapsed) * 60);
    document.getElementById('cpm').textContent = cpm + ' klik/menit';
}

//function untuk mereset click
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

//memberi animasi saat click
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

