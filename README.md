# LYRS SPACE + LYRS LABS

Paket ini mempertahankan homepage LYRS SPACE yang dikirim, lalu menambahkan halaman `labs.html` yang mengikuti desain gelap dan aksen lime yang sama.

## File
- `index.html` — homepage LYRS SPACE, ditambah link navigasi dan kartu LYRS Labs.
- `style.css` — style homepage asli, tidak diganti.
- `app.js` — interaksi homepage asli.
- `labs.html` — halaman API workspace.
- `labs.css` dan `labs.js` — style serta fungsi API Explorer.
- `profile.json` dan `rayy.jpg` — konfigurasi profil dan foto yang sudah ada.
- `CNAME` — custom domain yang ada di paket awal.

## Deploy ke GitHub Pages
1. Backup repository GitHub yang sekarang.
2. Ekstrak ZIP ini.
3. Upload/replace file dari folder `lyrsspace-main` ke root repository yang sama, dengan mempertahankan struktur file.
4. Pastikan `CNAME` tetap berada di root.
5. Setelah Pages selesai deploy, buka `https://space.rayyy.my.id/` dan pilih **Labs** di navigasi atau kartu LYRS Labs.

## Tentang API Explorer
Explorer berisi endpoint dari update yang diberikan, termasuk route lama jadwal salat sebagai legacy. Route baru yang direkomendasikan adalah `/v1/islami/sholat`.

Nama parameter, skema respons, serta autentikasi endpoint belum dipastikan dari dokumentasi endpoint satu per satu. Masukkan query parameters sebagai JSON object, misalnya `{"q":"contoh"}`, sesuai dokumentasi resmi. Request default memakai GET; POST dapat dipilih untuk endpoint yang mendukungnya.

API Explorer mengirim request dari browser ke `https://api.jaky.dev`. Request bisa gagal jika API tidak mengizinkan CORS atau memerlukan header autentikasi tertentu. Buka dokumentasi resmi: https://api.jaky.dev/playground

**Keamanan:** jangan simpan API key rahasia di HTML/JavaScript publik. Field header opsional hanya untuk uji coba pribadi; siapa pun yang mengakses halaman publik dapat melihat kode situs dan request dari browser.
