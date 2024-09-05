# Medicine Management Frontend

Proyek ini adalah frontend untuk sistem manajemen obat yang dibangun menggunakan React.js dengan manajemen state menggunakan Redux.

## Fitur Utama

1. **Autentikasi**

   - Login pengguna
   - Register pengguna baru
   - Lupa password
   - Reset password

2. **Dashboard**

   - Halaman utama dengan ringkasan informasi penting
   - Grafik dan statistik terkait manajemen obat

3. **Manajemen Akun**

   - Melihat dan mengedit profil pengguna
   - Mengubah password

4. **Manajemen Obat**

   - Melihat daftar obat
   - Menambah obat baru
   - Mengedit informasi obat
   - Menghapus obat

5. **Manajemen Pembelian**

   - Melihat daftar pembelian
   - Membuat pembelian baru
   - Mengedit informasi pembelian
   - Menghapus pembelian

6. **Manajemen Supplier**

   - Melihat daftar supplier
   - Menambah supplier baru
   - Mengedit informasi supplier
   - Menghapus supplier

7. **Manajemen Pengguna**
   - Melihat daftar pengguna (untuk admin)
   - Menambah pengguna baru
   - Mengedit informasi pengguna
   - Menghapus pengguna

## Struktur Proyek

```
medicine-fe/
│
├── src/
│   ├── assets/             # Aset statis (gambar, font, dll)
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── Auth/           # Komponen terkait autentikasi
│   │   ├── chart/          # Komponen grafik
│   │   ├── Dashboard/      # Komponen dashboard
│   │   │   ├── Account/    # Komponen manajemen akun
│   │   │   ├── Home/       # Komponen halaman utama dashboard
│   │   │   ├── Medicine/   # Komponen manajemen obat
│   │   │   ├── Purchase/   # Komponen manajemen pembelian
│   │   │   ├── Supplier/   # Komponen manajemen supplier
│   │   │   └── Users/      # Komponen manajemen pengguna
│   │   └── Layout/         # Komponen tata letak umum
│   ├── config/             # Konfigurasi aplikasi
│   ├── pages/              # Komponen halaman utama
│   ├── redux/              # Konfigurasi dan logika Redux
│   │   ├── actions/        # Action creators Redux
│   │   ├── reducers/       # Reducers Redux
│   │   └── store.js        # Konfigurasi store Redux
│   ├── utils/              # Fungsi utilitas
│   ├── App.jsx             # Komponen root aplikasi
│   ├── index.css           # Style global
│   └── main.jsx            # Entry point aplikasi
├── .env                    # Variabel lingkungan
└── README.md               # Dokumentasi proyek ini
```

## Teknologi Utama

- React.js: Library JavaScript untuk membangun antarmuka pengguna
- Redux: Manajemen state aplikasi
- React Router: Routing untuk aplikasi single-page
- Axios: Client HTTP untuk melakukan request ke API
- Chart.js: Library untuk membuat grafik interaktif

## Instalasi

1. Clone repositori ini
2. Jalankan `npm install` untuk menginstall dependensi
3. Salin `.env.example` ke `.env` dan sesuaikan konfigurasi
4. Jalankan `npm run dev` untuk memulai server development

## Penggunaan

Setelah menjalankan server development, aplikasi akan tersedia di `http://localhost:5173` (atau port yang ditentukan).

## Manajemen State dengan Redux

Aplikasi ini menggunakan Redux untuk manajemen state global. Struktur Redux terdiri dari:

- `actions/`: Mendefinisikan aksi-aksi yang dapat dilakukan dalam aplikasi
- `reducers/`: Menentukan bagaimana state aplikasi berubah sebagai respons terhadap aksi
- `store.js`: Mengkonfigurasi store Redux yang menyimpan state aplikasi

## Kontribusi

Silakan buat issue atau pull request untuk kontribusi pada proyek ini.

## Lisensi

[MIT License](https://opensource.org/licenses/MIT)
