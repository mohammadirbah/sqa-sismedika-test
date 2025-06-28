# sqa-sismedika-test

## 📌 Bagian A – Pengetahuan Dasar QA (Pilihan Ganda & Singkat)

### 1. Jelaskan perbedaan antara bug, defect, dan error.
- **Error** adalah kesalahan yang dibuat oleh manusia, biasanya terjadi saat penulisan kode.
- **Defect** adalah ketidaksesuaian antara hasil aktual dan yang diharapkan, biasanya ditemukan saat proses testing.
- **Bug** merupakan hasil dari error karena kesalahan tersebut yang menyebabkan aplikasi tidak berjalan dengan benar.

### 2. Apa yang dimaksud dengan regression testing dan kapan biasanya dilakukan?
- **Regression Testing** adalah pengujian ulang terhadap aplikasi untuk memastikan bahwa perubahan (bug fixing atau penambahan fitur) tidak menyebabkan masalah pada fungsionalitas yang sudah ada. biasanya dilakukan setelah perbaikan bug, penambahan fitur baru, update versi sistem.

### 3. Sebutkan lifecycle dari bug/defect dari ditemukan hingga ditutup.
1. **New**: bug ditemukan dan dilaporkan.
2. **Assigned**: bug ditugaskan ke developer.
3. **Open**: developer mulai menelusuri bug.
4. **Fixed**: developer telah memperbaiki bug.
5. **Retest**: QA melakukan pengujian ulang.
6. **Verified**: QA memastikan bug sudah tidak muncul.
7. **Closed**: bug ditutup.

### 4. Apa itu test case dan test scenario? Jelaskan perbedaannya dan berikan contohnya.
- **Test Case** adalah langkah detail dari pengujian untuk menjalankan test scenario.
  Contoh:
  - Langkah: masukkan email dan password valid lalu klik login.
  - Expected: masuk ke halaman dashboard.
    
- **Test Scenario** merupakan gambaran umum dari apa yang akan diuji.
  Contoh: "uji fitur login dengan kredensial valid."

### 5. Apa yang dimaksud dengan severity dan priority dalam konteks bug? Berikan
masing-masing contohnya.
- **Severity** adalah tingkat keparahan bug terhadap sistem.
  Contoh: tombol "Login" tidak berfungsi -> Severity: Critical.
- **Priority** yaitu urgensi dalam perbaikan bug.
  Contoh: salah ketik pada sebuah label -> Severity: Low, Priority: High.

## 🧪 Bagian B – Praktik Manual Testing

### Test case halaman login
| Test Case ID | Deskripsi                                     | Langkah                                                                 | Input                              | Expected Result                               |
|:--------------:|-----------------------------------------------|-------------------------------------------------------------------------|------------------------------------|------------------------------------------------|
| login001        | Login dengan kredensial valid                 | 1. Buka halaman login<br>2. Masukkan email valid dan password valid<br>3. Klik tombol login | Email: user@example.com<br>Password: validpass123 | Pengguna berhasil login dan diarahkan ke dashboard |
| login002        | Email dikosongkan                             | 1. Buka halaman login<br>2. Kosongkan field email<br>3. Masukkan password valid<br>4. Klik login | Email: (kosong)<br>Password: validpass123 | Tampil error "Email wajib diisi"              |
| login003        | Password dikosongkan                          | 1. Buka halaman login<br>2. Masukkan email valid<br>3. Kosongkan password<br>4. Klik login | Email: user@example.com<br>Password: (kosong) | Tampil error "Password wajib diisi"           |
| login004        | Email format tidak valid                      | 1. Buka halaman login<br>2. Masukkan email tidak valid (tanpa '@')<br>3. Masukkan password valid<br>4. Klik login | Email: userexample.com<br>Password: validpass123 | Tampil error "Format email tidak valid"       |
| login005        | Email dan password salah                      | 1. Buka halaman login<br>2. Masukkan email dan password yang salah<br>3. Klik login | Email: salah@domain.com<br>Password: salah123 | Tampil error "Email atau password salah"      |
| login006        | Tombol login ditekan tanpa input              | 1. Buka halaman login<br>2. Klik tombol login tanpa isi apapun         | Email: (kosong)<br>Password: (kosong) | Tampil error "Email dan Password wajib diisi" |
| login007        | Password kurang dari batas minimal            | 1. Buka halaman login<br>2. Masukkan email valid<br>3. Masukkan password < 6 karakter<br>4. Klik login | Email: user@example.com<br>Password: 123 | Tampil error "Password minimal 6 karakter"    |
| login008        | Password melebihi batas maksimal karakter     | 1. Masukkan email valid<br>2. Masukkan password > 20 karakter<br>3. Klik login | Email: user@example.com<br>Password: panjangsekalipasswordtidakwajar | Tampil error "Password maksimal 20 karakter"  |
| login009        | Email mengandung spasi                        | 1. Masukkan email dengan spasi<br>2. Masukkan password valid<br>3. Klik login | Email: user @example.com<br>Password: validpass123 | Tampil error "Email tidak boleh mengandung spasi" |
| login010        | Password mengandung karakter spesial          | 1. Masukkan email valid<br>2. Masukkan password dengan simbol seperti @#*%<br>3. Klik login | Email: user@example.com<br>Password: Pass@123! | Login berhasil jika password valid            |

### Skenario negative testing
1. Login dengan format email tidak valid (contoh: userexample.com)
2. Login dengan password salah
3. Login dengan email tidak terdaftar di sistem

### Skenario boundary testing
1. Input password dengan tepat 6 karakter (batas minimum) -> Diterima
2. Input password dengan 21 karakter (jika batas maksimum adalah 20) -> Ditolak

## Automation Testing (Bonus / Untuk Posisi Automation QA)

///<reference  types = "cypress"/>

it("Login witn empty credentials", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  cy.get('button[type="submit"]').click();
  cy.get(":nth-child(2) > .oxd-input-group > .oxd-text"),
  cy.get(':nth-child(3) > .oxd-input-group > .oxd-text')
    .should("be.visible")
    .log("Credentials cannot be empty");
});

it("Login with invalid credentials (wrong username)", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  cy.get('[name="username"]').type("Irbah"),
    cy.get('[name="password"]').type("admin123"),
    cy.get('button[type="submit"]').click(),
    cy
      .get(".oxd-alert-content > .oxd-text")
      .should("be.visible")
      .log("Login to this site is failed");
});

it("Login with valid credentials", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  cy.get('[name="username"]').type("Admin"),
    cy.get('[name="password"]').type("admin123"),
    cy.get('button[type="submit"]').click(),
    cy
      .get('img[alt="client brand banner"]')
      .should("be.visible")
      .log("Login to this site is successful");
});
