import React, { useState, useEffect } from 'react';
import { Upload, ChevronLeft, ChevronRight, List, BookOpen, Folder, X, Check } from 'lucide-react';

// Sample quiz data untuk demo
const sampleQuizzes = {
  'ipa-aln.json': {
    judul: 'Latihan Soal ALN IPA',
    soal: [
      {
        nomor: 1,
        pertanyaan: 'Proses fotosintesis pada tumbuhan menghasilkan...',
        gambar: 'datasoal/images/fotosintesis.jpg', // Path relatif ke folder gambar
        pilihan: { A: 'Oksigen dan Glukosa', B: 'Karbon dioksida', C: 'Nitrogen', D: 'Hidrogen' },
        kunciJawaban: 'A',
        pembahasan: 'Fotosintesis menghasilkan oksigen (O2) dan glukosa (C6H12O6) sebagai produk utama.'
      },
      {
        nomor: 2,
        pertanyaan: 'Planet terbesar dalam tata surya kita adalah...',
        gambar: null,
        pilihan: { A: 'Mars', B: 'Jupiter', C: 'Saturnus', D: 'Uranus' },
        kunciJawaban: 'B',
        pembahasan: 'Jupiter adalah planet terbesar dengan diameter sekitar 139.820 km.'
      }
    ]
  },
  'mtk.json': {
    judul: 'Soal Matematika Kelas 5',
    soal: [
      {
        nomor: 1,
        pertanyaan: 'Hasil dari 15 × 8 adalah...',
        gambar: null,
        pilihan: { A: '100', B: '110', C: '120', D: '130' },
        kunciJawaban: 'C',
        pembahasan: '15 × 8 = 120'
      },
      {
        nomor: 2,
        pertanyaan: 'Perhatikan gambar persegi berikut. Luas persegi dengan sisi 7 cm adalah...',
        gambar: 'datasoal/images/persegi.png', // Contoh gambar lokal
        pilihan: { A: '28 cm²', B: '35 cm²', C: '49 cm²', D: '56 cm²' },
        kunciJawaban: 'C',
        pembahasan: 'Luas persegi = sisi × sisi = 7 × 7 = 49 cm²'
      }
    ]
  },
  'bahasa.json': {
    judul: 'Soal Bahasa Indonesia',
    soal: [
      {
        nomor: 1,
        pertanyaan: 'Kalimat yang menggunakan kata baku adalah...',
        gambar: null,
        pilihan: { 
          A: 'Saya sudah makan nasi goreng',
          B: 'Gue udah makan nasi goreng',
          C: 'Aku udah makan nasi goreng',
          D: 'Saya udah makan nasi goreng'
        },
        kunciJawaban: 'A',
        pembahasan: 'Kata "saya" dan "sudah" adalah kata baku yang tepat digunakan dalam kalimat formal.'
      }
    ]
  },
  'ips.json': {
    judul: 'Soal IPS',
    soal: [
      {
        nomor: 1,
        pertanyaan: 'Ibu kota Indonesia adalah...',
        gambar: null,
        pilihan: { A: 'Bandung', B: 'Surabaya', C: 'Jakarta', D: 'Medan' },
        kunciJawaban: 'C',
        pembahasan: 'Jakarta adalah ibu kota negara Indonesia sejak kemerdekaan.'
      }
    ]
  }
};

export default function QuizApp() {
  const [currentView, setCurrentView] = useState('select');
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [soalData, setSoalData] = useState([]);
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [showQuizList, setShowQuizList] = useState(false);
  const [showDaftarSoal, setShowDaftarSoal] = useState(false);
  const [showPembahasan, setShowPembahasan] = useState(false);

  useEffect(() => {
    const quizzes = [
      { filename: 'ipa-aln.json', title: 'Latihan Soal ALN IPA', jumlahSoal: 2 },
      { filename: 'mtk.json', title: 'Soal Matematika Kelas 5', jumlahSoal: 2 },
      { filename: 'bahasa.json', title: 'Soal Bahasa Indonesia', jumlahSoal: 1 },
      { filename: 'ips.json', title: 'Soal IPS', jumlahSoal: 1 }
    ];
    setAvailableQuizzes(quizzes);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          initializeQuiz(data);
        } catch (error) {
          alert('File JSON tidak valid!');
        }
      };
      reader.readAsText(file);
    }
  };

  const loadQuizFromFolder = (filename) => {
    if (sampleQuizzes[filename]) {
      initializeQuiz(sampleQuizzes[filename]);
    } else {
      alert('File soal tidak ditemukan!');
    }
  };

  const initializeQuiz = (data) => {
    setQuizData(data);
    const initialSoalData = data.soal.map((soal, index) => ({
      no: index + 1,
      jawaban: null,
      status: 'belum',
      benar: Object.keys(soal.pilihan).findIndex(key => key === soal.kunciJawaban)
    }));
    setSoalData(initialSoalData);
    setCurrentView('quiz');
    setCurrentQuestion(0);
    setShowPembahasan(false);
  };

  const handleJawaban = (optionKey) => {
    const soalSekarang = soalData[currentQuestion];
    if (soalSekarang.jawaban === null) {
      const currentSoal = quizData.soal[currentQuestion];
      const newSoalData = [...soalData];
      const selectedIndex = Object.keys(currentSoal.pilihan).findIndex(key => key === optionKey);
      newSoalData[currentQuestion].jawaban = selectedIndex;
      newSoalData[currentQuestion].status = optionKey === currentSoal.kunciJawaban ? 'benar' : 'salah';
      setSoalData(newSoalData);
      setShowPembahasan(false);
    }
  };

  const goToSoal = (index) => {
    setCurrentQuestion(index);
    setShowDaftarSoal(false);
    setShowPembahasan(false);
  };

  const nextSoal = () => {
    if (currentQuestion < quizData.soal.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowPembahasan(false);
    } else {
      // Pindah ke halaman summary jika sudah soal terakhir
      setCurrentView('summary');
    }
  };

  const prevSoal = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowPembahasan(false);
    }
  };

  const resetQuiz = () => {
    setCurrentView('select');
    setQuizData(null);
    setCurrentQuestion(0);
    setSoalData([]);
    setShowPembahasan(false);
  };

  const benar = soalData.filter(s => s.status === 'benar').length;
  const salah = soalData.filter(s => s.status === 'salah').length;
  const belumDijawab = soalData.filter(s => s.status === 'belum').length;

  // ============= HOMEPAGE VIEW =============
  if (currentView === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Aplikasi Quiz Modern
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Pilih cara untuk memulai mengerjakan soal
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Upload Soal */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Upload className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">A. Upload Soal</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Upload file JSON dari komputer Anda
                </p>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium">
                    Klik untuk upload
                  </span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Pilih Soal */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Folder className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">B. Pilih Soal Tersedia</h3>
                </div>
                <button
                  onClick={() => setShowQuizList(!showQuizList)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition font-medium shadow-md flex items-center justify-center gap-2 mt-4"
                >
                  <Folder className="w-5 h-5" />
                  {showQuizList ? 'Sembunyikan' : 'Tampilkan'} Pilihan Soal
                </button>
              </div>
            </div>

            {/* Daftar Soal */}
            {showQuizList && (
              <div className="mb-8">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Daftar Soal yang Tersedia
                  </h4>
                  <div className="space-y-3">
                    {availableQuizzes.map((quiz, index) => (
                      <button
                        key={quiz.filename}
                        onClick={() => loadQuizFromFolder(quiz.filename)}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 transition shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-100 text-purple-600 font-bold w-10 h-10 rounded-full flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-gray-800">{quiz.title}</div>
                            <div className="text-sm text-gray-500">{quiz.filename}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {quiz.jumlahSoal} soal
                          </div>
                          <ChevronRight className="w-5 h-5 text-purple-600" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Format JSON */}
            <div className="border-t-2 border-gray-200 pt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Format File JSON</h3>
              </div>
              <pre className="text-xs bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">{`{
  "judul": "Nama Soal",
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
      "kunciJawaban": "B",
      "pembahasan": "Penjelasan jawaban..."
    }
  ]
}`}</pre>
              
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Tips untuk Soal dengan Gambar:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1.5 ml-6">
                  <li className="list-disc">Untuk soal <strong>tanpa gambar</strong>, set <code className="bg-gray-200 px-1 rounded">"gambar": null</code></li>
                  <li className="list-disc"><strong>Path Lokal (Recommended)</strong>: Simpan gambar di folder dan gunakan path relatif<br/>
                    <code className="bg-gray-200 px-1 rounded text-xs">"gambar": "datasoal/images/soal1.jpg"</code>
                  </li>
                  <li className="list-disc">Atau gunakan <strong>URL online</strong>: <code className="bg-gray-200 px-1 rounded text-xs">"gambar": "https://example.com/soal1.jpg"</code></li>
                  <li className="list-disc">Format gambar yang didukung: JPG, PNG, GIF, SVG</li>
                </ul>
                
                <div className="mt-3 bg-white rounded p-3 border border-blue-300">
                  <p className="text-xs font-semibold text-blue-900 mb-2">📁 Struktur Folder yang Disarankan:</p>
                  <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded">{`project/
├── index.html
├── datasoal/
│   ├── ipa-aln.json
│   ├── mtk.json
│   └── images/
│       ├── soal1.jpg
│       ├── soal2.png
│       └── fotosintesis.jpg`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============= QUIZ VIEW =============
  if (currentView === 'quiz' && quizData) {
    const currentSoal = quizData.soal[currentQuestion];
    const soalSekarang = soalData[currentQuestion];
    const pilihan = Object.entries(currentSoal.pilihan);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex flex-col">
        <div className="flex-1 overflow-auto pb-2">
          <div className="p-3 max-w-2xl mx-auto">
            {/* Header Info */}
            <div className="bg-white p-4 rounded-2xl shadow-md mb-3 border border-slate-200">
              <h2 className="text-lg font-bold mb-3 text-slate-700">Soal No {currentQuestion + 1}</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-2 text-center border border-emerald-100">
                  <div className="text-xs text-emerald-600 font-medium">Benar</div>
                  <div className="text-2xl font-bold text-emerald-700">{benar}</div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-2 text-center border border-rose-100">
                  <div className="text-xs text-rose-600 font-medium">Salah</div>
                  <div className="text-2xl font-bold text-rose-700">{salah}</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-2 text-center border border-amber-100">
                  <div className="text-xs text-amber-600 font-medium">Belum dijawab</div>
                  <div className="text-2xl font-bold text-amber-700">{belumDijawab}</div>
                </div>
              </div>
            </div>

            {/* Card Soal */}
            <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
              <div className="max-h-48 overflow-y-auto mb-4 pr-2">
                <h3 className="text-base font-semibold text-slate-800 leading-relaxed mb-3">
                  {currentSoal.pertanyaan}
                </h3>
                
                {/* Gambar Soal (jika ada) */}
                {currentSoal.gambar && (
                  <div className="mb-4">
                    <img 
                      src={currentSoal.gambar} 
                      alt={`Gambar soal ${currentQuestion + 1}`}
                      className="max-w-full h-auto rounded-lg border-2 border-slate-200 shadow-sm"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.error('Gagal memuat gambar');
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Pilihan Jawaban */}
              <div className="space-y-3 mb-4">
                {pilihan.map(([key, value], index) => {
                  const isSelected = soalSekarang.jawaban === index;
                  const isAnswered = soalSekarang.jawaban !== null;
                  const isCorrect = isAnswered && soalSekarang.status === 'benar' && isSelected;
                  const isWrong = isAnswered && soalSekarang.status === 'salah' && isSelected;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleJawaban(key)}
                      disabled={isAnswered}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-200 flex items-center text-left ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                          : isWrong
                          ? 'border-rose-500 bg-rose-50 shadow-sm'
                          : isSelected
                          ? 'border-indigo-400 bg-indigo-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                      } ${isAnswered ? 'cursor-not-allowed opacity-75' : ''}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-500'
                            : isWrong
                            ? 'border-rose-500 bg-rose-500'
                            : isSelected
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        isCorrect
                          ? 'text-emerald-900'
                          : isWrong
                          ? 'text-rose-900'
                          : isSelected 
                          ? 'text-indigo-900' 
                          : 'text-slate-700'
                      }`}>
                        {key}. {value}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tombol Pembahasan */}
              {soalSekarang.jawaban !== null && (
                <>
                  <button
                    onClick={() => setShowPembahasan(!showPembahasan)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:from-indigo-600 hover:to-blue-600 flex items-center justify-center gap-2"
                  >
                    <BookOpen size={18} />
                    {showPembahasan ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}
                  </button>

                  {showPembahasan && (
                    <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`${soalSekarang.status === 'benar' ? 'bg-emerald-500' : 'bg-rose-500'} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                          Jawaban: {currentSoal.kunciJawaban}
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {currentSoal.pembahasan}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 p-4 flex items-center justify-between gap-3 shadow-lg">
          <button 
            onClick={prevSoal}
            disabled={currentQuestion === 0}
            className="w-14 h-14 rounded-full bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center shadow-sm transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={() => setShowDaftarSoal(true)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:from-indigo-600 hover:to-blue-600 flex items-center justify-center gap-2"
          >
            <List size={20} />
            DAFTAR SOAL
          </button>

          <button 
            onClick={nextSoal}
            className="w-14 h-14 rounded-full bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center shadow-sm transition-all hover:scale-105"
          >
            {currentQuestion === quizData.soal.length - 1 ? (
              <Check size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
        </div>

        {/* Popup Daftar Soal */}
        {showDaftarSoal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Daftar Soal</h3>
                <button 
                  onClick={() => setShowDaftarSoal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-600" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="grid grid-cols-8 gap-2">
                  {soalData.map((soal, index) => (
                    <button
                      key={index}
                      onClick={() => goToSoal(index)}
                      className={`relative w-full aspect-square rounded-full font-semibold text-xs shadow-sm transition-all hover:scale-105 border-2 ${
                        soal.status === 'benar'
                          ? 'border-emerald-500 bg-white text-emerald-600'
                          : soal.status === 'salah'
                          ? 'border-rose-500 bg-white text-rose-600'
                          : currentQuestion === index
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {soal.no}
                      {soal.status === 'benar' && (
                        <div className="absolute -top-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 w-4 h-4 flex items-center justify-center">
                          <Check size={10} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                      {soal.status === 'salah' && (
                        <div className="absolute -top-0.5 -right-0.5 bg-rose-500 rounded-full p-0.5 w-4 h-4 flex items-center justify-center">
                          <X size={10} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============= SUMMARY VIEW =============
  if (currentView === 'summary' && quizData) {
    const totalSoal = soalData.length;
    const dijawab = soalData.filter(s => s.status !== 'belum').length;
    const score = totalSoal > 0 ? Math.round((benar / totalSoal) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full mb-4">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Quiz Selesai!
              </h2>
              <p className="text-gray-600">
                Berikut adalah ringkasan hasil quiz Anda
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl p-6 mb-6 text-center shadow-lg">
              <div className="text-6xl font-bold mb-2">{score}%</div>
              <div className="text-lg opacity-90">
                Skor Anda
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border-2 border-emerald-200">
                <div className="text-3xl font-bold text-emerald-700 mb-1">{benar}</div>
                <div className="text-sm text-emerald-600 font-medium">Benar</div>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 text-center border-2 border-rose-200">
                <div className="text-3xl font-bold text-rose-700 mb-1">{salah}</div>
                <div className="text-sm text-rose-600 font-medium">Salah</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 text-center border-2 border-amber-200">
                <div className="text-3xl font-bold text-amber-700 mb-1">{belumDijawab}</div>
                <div className="text-sm text-amber-600 font-medium">Tidak Dijawab</div>
              </div>
            </div>

            {/* Detail Jawaban */}
            <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Detail Jawaban
              </h3>
              
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {soalData.map((soal, index) => {
                  const currentSoalData = quizData.soal[index];
                  const pilihan = Object.keys(currentSoalData.pilihan);
                  const userAnswerKey = soal.jawaban !== null ? pilihan[soal.jawaban] : null;
                  const correctAnswerKey = currentSoalData.kunciJawaban;
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        soal.status === 'benar'
                          ? 'bg-emerald-50 border border-emerald-200'
                          : soal.status === 'salah'
                          ? 'bg-rose-50 border border-rose-200'
                          : 'bg-amber-50 border border-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-bold text-slate-700 text-sm w-8">
                          No. {soal.no}
                        </span>
                        
                        {soal.status === 'belum' ? (
                          <span className="text-sm text-amber-700 font-medium">
                            Tidak dijawab
                          </span>
                        ) : (
                          <>
                            <span className={`font-bold text-lg ${
                              soal.status === 'benar' ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                              {userAnswerKey}
                            </span>
                            
                            {soal.status === 'salah' && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-600">→</span>
                                <span className="text-sm text-slate-600">
                                  Seharusnya:
                                </span>
                                <span className="font-bold text-emerald-600 text-lg">
                                  {correctAnswerKey}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {soal.status === 'benar' && (
                        <Check className="w-5 h-5 text-emerald-500" strokeWidth={3} />
                      )}
                      {soal.status === 'salah' && (
                        <X className="w-5 h-5 text-rose-500" strokeWidth={3} />
                      )}
                      {soal.status === 'belum' && (
                        <div className="w-5 h-5 rounded-full border-2 border-amber-400"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-indigo-200">
              <p className="text-center text-slate-700 leading-relaxed">
                {score >= 80 ? (
                  <>
                    <span className="text-2xl mb-2 block">🎉</span>
                    <strong className="text-indigo-700">Luar biasa!</strong> Anda menguasai materi dengan sangat baik. Pertahankan prestasi ini!
                  </>
                ) : score >= 60 ? (
                  <>
                    <span className="text-2xl mb-2 block">👍</span>
                    <strong className="text-indigo-700">Bagus!</strong> Anda sudah memahami sebagian besar materi. Terus tingkatkan pemahaman Anda!
                  </>
                ) : (
                  <>
                    <span className="text-2xl mb-2 block">💪</span>
                    <strong className="text-indigo-700">Jangan menyerah!</strong> Pelajari kembali materi dan coba lagi. Kamu pasti bisa!
                  </>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={resetQuiz}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl hover:from-indigo-600 hover:to-blue-600 transition font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <ChevronLeft size={20} />
                Kembali ke Menu
              </button>
              
              <button
                onClick={() => {
                  initializeQuiz(quizData);
                }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Ulangi Quiz
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}