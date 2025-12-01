import React, { useState } from 'react';
import { Folder, FileText, Code, Copy, Check } from 'lucide-react';

export default function ProjectFiles() {
  const [copied, setCopied] = useState({});

  const copyToClipboard = (content, name) => {
    navigator.clipboard.writeText(content);
    setCopied({ [name]: true });
    setTimeout(() => setCopied({}), 2000);
  };

  const files = [
    {
      name: 'package.json',
      path: 'Root folder',
      icon: <FileText className="w-5 h-5 text-red-500" />,
      content: `{
  "name": "quiz-app-modern",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}`
    },
    {
      name: 'index.html',
      path: 'Root folder',
      icon: <FileText className="w-5 h-5 text-orange-600" />,
      content: `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quiz App Modern</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
    },
    {
      name: 'vite.config.js',
      path: 'Root folder',
      icon: <Code className="w-5 h-5 text-blue-500" />,
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`
    },
    {
      name: 'tailwind.config.js',
      path: 'Root folder',
      icon: <Code className="w-5 h-5 text-cyan-500" />,
      content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    {
      name: 'postcss.config.js',
      path: 'Root folder',
      icon: <Code className="w-5 h-5 text-orange-500" />,
      content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
    },
    {
      name: 'src/main.jsx',
      path: 'src/',
      icon: <Code className="w-5 h-5 text-blue-600" />,
      content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
    },
    {
      name: 'src/index.css',
      path: 'src/',
      icon: <Code className="w-5 h-5 text-pink-500" />,
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    {
      name: 'vercel.json',
      path: 'Root folder (optional)',
      icon: <FileText className="w-5 h-5 text-black" />,
      content: `{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}`
    },
    {
      name: '.gitignore',
      path: 'Root folder',
      icon: <FileText className="w-5 h-5 text-gray-500" />,
      content: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`
    },
    {
      name: 'public/datasoal/ipa.json',
      path: 'public/datasoal/',
      icon: <FileText className="w-5 h-5 text-green-500" />,
      content: `{
  "judul": "Latihan Soal IPA - Sistem Tata Surya",
  "soal": [
    {
      "nomor": 1,
      "pertanyaan": "Proses fotosintesis pada tumbuhan hijau menghasilkan zat-zat yang penting bagi kehidupan. Hasil utama dari proses fotosintesis adalah...",
      "gambar": null,
      "pilihan": {
        "A": "Oksigen dan Glukosa",
        "B": "Karbon dioksida dan Air",
        "C": "Nitrogen dan Oksigen",
        "D": "Hidrogen dan Karbohidrat"
      },
      "kunciJawaban": "A",
      "pembahasan": "Fotosintesis adalah proses pembuatan makanan oleh tumbuhan hijau dengan bantuan sinar matahari. Dalam proses ini, tumbuhan menggunakan karbon dioksida (CO2) dan air (H2O) untuk menghasilkan glukosa (C6H12O6) sebagai makanan dan oksigen (O2) sebagai hasil sampingan yang dilepaskan ke udara."
    },
    {
      "nomor": 2,
      "pertanyaan": "Planet terbesar dalam sistem tata surya kita adalah...",
      "gambar": null,
      "pilihan": {
        "A": "Mars",
        "B": "Jupiter",
        "C": "Saturnus",
        "D": "Uranus"
      },
      "kunciJawaban": "B",
      "pembahasan": "Jupiter adalah planet terbesar dalam sistem tata surya dengan diameter sekitar 139.820 km atau sekitar 11 kali diameter Bumi. Jupiter adalah planet gas raksasa yang memiliki massa 2,5 kali lebih besar dari gabungan semua planet lainnya."
    },
    {
      "nomor": 3,
      "pertanyaan": "Bagian tumbuhan yang berfungsi menyerap air dan mineral dari dalam tanah adalah...",
      "gambar": null,
      "pilihan": {
        "A": "Daun",
        "B": "Batang",
        "C": "Akar",
        "D": "Bunga"
      },
      "kunciJawaban": "C",
      "pembahasan": "Akar memiliki fungsi utama untuk menyerap air dan mineral dari dalam tanah. Akar juga berfungsi untuk menopang tumbuhan agar berdiri tegak dan menyimpan cadangan makanan. Bagian akar yang menyerap air dan mineral adalah bulu-bulu akar."
    },
    {
      "nomor": 4,
      "pertanyaan": "Perubahan wujud dari cair menjadi gas disebut...",
      "gambar": null,
      "pilihan": {
        "A": "Membeku",
        "B": "Mencair",
        "C": "Menguap",
        "D": "Mengembun"
      },
      "kunciJawaban": "C",
      "pembahasan": "Menguap adalah proses perubahan wujud dari cair menjadi gas. Contohnya adalah air yang mendidih berubah menjadi uap air. Proses menguap memerlukan panas atau energi."
    },
    {
      "nomor": 5,
      "pertanyaan": "Sumber energi terbesar di Bumi berasal dari...",
      "gambar": null,
      "pilihan": {
        "A": "Bulan",
        "B": "Matahari",
        "C": "Bintang",
        "D": "Angin"
      },
      "kunciJawaban": "B",
      "pembahasan": "Matahari adalah sumber energi terbesar di Bumi. Energi matahari berperan penting dalam proses fotosintesis tumbuhan, menghangatkan permukaan Bumi, mempengaruhi cuaca dan iklim, serta dapat dimanfaatkan sebagai energi alternatif (energi surya)."
    }
  ]
}`
    },
    {
      name: 'README.md',
      path: 'Root folder',
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      content: `# Quiz App Modern 🎓

Aplikasi quiz interaktif berbasis React dengan fitur lengkap untuk belajar.

## 🚀 Fitur

- ✅ Upload soal dari file JSON
- ✅ Pilih dari daftar soal tersedia
- ✅ Support gambar dalam soal
- ✅ Pembahasan jawaban
- ✅ Ringkasan hasil quiz
- ✅ Responsive design
- ✅ UI modern & elegan

## 📦 Instalasi

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build
\`\`\`

## 📁 Struktur Folder

\`\`\`
quiz-app/
├── public/
│   └── datasoal/
│       ├── images/       # Folder untuk gambar soal
│       ├── ipa.json      # File soal IPA
│       └── mtk.json      # File soal Matematika
├── src/
│   ├── App.jsx          # Komponen utama
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
\`\`\`

## 📝 Format File Soal

\`\`\`json
{
  "judul": "Nama Quiz",
  "soal": [
    {
      "nomor": 1,
      "pertanyaan": "Pertanyaan soal...",
      "gambar": null,
      "pilihan": {
        "A": "Pilihan A",
        "B": "Pilihan B",
        "C": "Pilihan C",
        "D": "Pilihan D"
      },
      "kunciJawaban": "A",
      "pembahasan": "Penjelasan jawaban..."
    }
  ]
}
\`\`\`

## 🌐 Deploy ke Vercel

1. Push project ke GitHub
2. Import repository di Vercel
3. Deploy otomatis!

## 📄 License

MIT License`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Folder className="w-8 h-8 text-indigo-600" />
            File Project Quiz App - Siap Deploy
          </h1>
          <p className="text-gray-600 mb-4">
            Lengkap dengan Vite + React + Tailwind CSS
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 mb-4">
            <h3 className="font-bold text-blue-900 mb-2">📁 Struktur Folder Lengkap:</h3>
            <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">{`quiz-app/
├── public/
│   └── datasoal/
│       ├── images/          # Taruh gambar soal di sini
│       │   └── (foto.jpg)
│       ├── ipa.json         # ✅ Sudah tersedia
│       └── mtk.json         # Buat sendiri (copy format ipa.json)
├── src/
│   ├── App.jsx              # ✅ Kode utama (sudah kamu punya)
│   ├── main.jsx             # ⬇️ Copy dari bawah
│   └── index.css            # ⬇️ Copy dari bawah
├── index.html               # ⬇️ Copy dari bawah
├── package.json             # ⬇️ Copy dari bawah
├── vite.config.js           # ⬇️ Copy dari bawah
├── tailwind.config.js       # ⬇️ Copy dari bawah
├── postcss.config.js        # ⬇️ Copy dari bawah
├── vercel.json              # ⬇️ Copy dari bawah (optional)
├── .gitignore               # ⬇️ Copy dari bawah
└── README.md                # ⬇️ Copy dari bawah (optional)`}</pre>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <h3 className="font-bold text-yellow-900 mb-2">⚡ Langkah-langkah Setup:</h3>
            <ol className="list-decimal ml-6 space-y-2 text-sm text-gray-700">
              <li>Buat folder project: <code className="bg-gray-200 px-2 py-1 rounded">mkdir quiz-app && cd quiz-app</code></li>
              <li>Copy semua file di bawah ke folder yang sesuai</li>
              <li>Install dependencies: <code className="bg-gray-200 px-2 py-1 rounded">npm install</code></li>
              <li>Jalankan: <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code></li>
              <li>Buka browser: <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:5173</code></li>
            </ol>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-bold text-green-900 mb-2">🚀 Deploy ke Vercel:</h3>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li>Push project ke GitHub</li>
              <li>Login ke <a href="https://vercel.com" target="_blank" className="text-blue-600 underline">vercel.com</a></li>
              <li>Klik "New Project" → Import repository</li>
              <li>Vercel auto-detect Vite → Klik Deploy</li>
              <li>Selesai! ✅</li>
            </ol>
          </div>
        </div>

        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  {file.icon}
                  <div>
                    <span className="font-mono font-semibold block">{file.name}</span>
                    <span className="text-xs opacity-80">{file.path}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(file.content, file.name)}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition flex items-center gap-2"
                >
                  {copied[file.name] ? (
                    <>
                      <Check size={16} />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-gray-900 text-green-400 text-xs overflow-x-auto max-h-96">
                {file.content}
              </pre>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl p-6 mt-6 text-center">
          <h3 className="text-2xl font-bold mb-2">🎉 Project Lengkap!</h3>
          <p className="text-emerald-100 mb-4">
            Tinggal copy semua file, jalankan npm install, dan deploy!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span>✅ App.jsx (sudah ada)</span>
            <span>•</span>
            <span>✅ 11 file tambahan</span>
            <span>•</span>
            <span>✅ Soal IPA gratis</span>
          </div>
        </div>
      </div>
    </div>
  );
}