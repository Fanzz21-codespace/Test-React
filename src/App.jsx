import React, { useState, useEffect } from 'react';
import { Upload, ChevronLeft, ChevronRight, CheckCircle, XCircle, BookOpen, Folder } from 'lucide-react';

export default function QuizApp() {
  const [currentView, setCurrentView] = useState('select'); // select, quiz, summary
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [showQuizList, setShowQuizList] = useState(false);
  const [showAnswerMap, setShowAnswerMap] = useState({});

  // Load daftar soal dari folder public/datasoal
  useEffect(() => {
    // Simulasi data dari folder - dalam production bisa fetch dari API
    const quizzes = [
      { filename: 'ipa-aln.json', title: 'Soal IPA Kelas 7', jumlahSoal: 3 },
      { filename: 'mtk.json', title: 'Soal Matematika Kelas 5', jumlahSoal: 3 },
      { filename: 'bahasa.json', title: 'Soal Bahasa Indonesia', jumlahSoal: 1 },
      { filename: 'ips.json', title: 'Soal IPS', jumlahSoal: 1 }
    ];
    setAvailableQuizzes(quizzes);
  }, []);

  // Contoh data soal (simulasi database)
  const sampleQuizzes = {
    'ipa.json': {
      judul: 'Soal IPA Kelas 7',
      soal: [
        {
          nomor: 1,
          pertanyaan: 'Apa fungsi klorofil pada tumbuhan?',
          pilihan: {
            A: 'Menyerap air dari tanah',
            B: 'Fotosintesis dan memberi warna hijau',
            C: 'Menyimpan cadangan makanan',
            D: 'Melindungi dari hama'
          },
          kunciJawaban: 'B',
          pembahasan: 'Klorofil adalah pigmen hijau yang terdapat dalam kloroplas tumbuhan. Fungsi utamanya adalah menyerap energi cahaya matahari untuk proses fotosintesis, serta memberikan warna hijau pada daun.'
        },
        {
          nomor: 2,
          pertanyaan: 'Organ pernapasan pada ikan adalah?',
          pilihan: {
            A: 'Paru-paru',
            B: 'Insang',
            C: 'Trakea',
            D: 'Kulit'
          },
          kunciJawaban: 'B',
          pembahasan: 'Ikan bernapas menggunakan insang. Insang mengambil oksigen yang terlarut dalam air dan membuang karbon dioksida. Air masuk melalui mulut dan keluar melalui celah insang.'
        },
        {
          nomor: 3,
          pertanyaan: 'Planet terbesar dalam tata surya adalah?',
          pilihan: {
            A: 'Mars',
            B: 'Saturnus',
            C: 'Jupiter',
            D: 'Neptunus'
          },
          kunciJawaban: 'C',
          pembahasan: 'Jupiter adalah planet terbesar dalam tata surya kita dengan diameter sekitar 142.984 km, atau sekitar 11 kali diameter Bumi. Jupiter adalah planet gas raksasa yang sebagian besar terdiri dari hidrogen dan helium.'
        }
      ]
    },
    'mtk.json': {
      judul: 'Soal Matematika Kelas 5',
      soal: [
        {
          nomor: 1,
          pertanyaan: '15 + 28 = ?',
          pilihan: {
            A: '42',
            B: '43',
            C: '44',
            D: '45'
          },
          kunciJawaban: 'B',
          pembahasan: '15 + 28 = 43. Cara menghitung: 15 + 28 = (10 + 20) + (5 + 8) = 30 + 13 = 43'
        },
        {
          nomor: 2,
          pertanyaan: '8 × 7 = ?',
          pilihan: {
            A: '54',
            B: '56',
            C: '58',
            D: '60'
          },
          kunciJawaban: 'B',
          pembahasan: '8 × 7 = 56. Cara mengingat: 7 × 8 adalah salah satu perkalian dasar yang penting untuk dihafal. Atau bisa dihitung: 8 × 7 = (8 × 5) + (8 × 2) = 40 + 16 = 56'
        },
        {
          nomor: 3,
          pertanyaan: '100 ÷ 4 = ?',
          pilihan: {
            A: '20',
            B: '25',
            C: '30',
            D: '35'
          },
          kunciJawaban: 'B',
          pembahasan: '100 ÷ 4 = 25. Cara cepat: 100 dibagi 4 sama dengan 100 dibagi 2 dibagi 2 = 50 ÷ 2 = 25. Atau 4 × 25 = 100'
        }
      ]
    },
    'bahasa.json': {
      judul: 'Soal Bahasa Indonesia',
      soal: [
        {
          nomor: 1,
          pertanyaan: 'Apa yang dimaksud dengan "Pantun"?',
          pilihan: {
            A: 'Cerita pendek',
            B: 'Puisi lama bersajak a-b-a-b',
            C: 'Dialog drama',
            D: 'Karangan bebas'
          },
          kunciJawaban: 'B',
          pembahasan: 'Pantun adalah puisi lama yang berciri khas bersajak a-b-a-b, terdiri dari 4 baris, 2 baris pertama adalah sampiran dan 2 baris terakhir adalah isi.'
        }
      ]
    },
    'ips.json': {
      judul: 'Soal IPS',
      soal: [
        {
          nomor: 1,
          pertanyaan: 'Ibu kota Indonesia adalah?',
          pilihan: {
            A: 'Bandung',
            B: 'Surabaya',
            C: 'Jakarta',
            D: 'Medan'
          },
          kunciJawaban: 'C',
          pembahasan: 'Jakarta adalah ibu kota Republik Indonesia dan merupakan pusat pemerintahan serta ekonomi negara.'
        }
      ]
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setQuizData(data);
          setCurrentView('quiz');
          setCurrentQuestion(0);
          setAnswers({});
        } catch (error) {
          alert('File JSON tidak valid!');
        }
      };
      reader.readAsText(file);
    }
  };

  const loadQuizFromFolder = async (filename) => {
    try {
      // Fetch file JSON dari folder /public/datasoal/
      const response = await fetch(`/datasoal/${filename}`);
      
      if (!response.ok) {
        throw new Error('File tidak ditemukan');
      }
      
      const data = await response.json();
      setQuizData(data);
      setCurrentView('quiz');
      setCurrentQuestion(0);
      setAnswers({});
      setShowAnswerMap({});
    } catch (error) {
      alert('Gagal memuat soal: ' + error.message + '\n\nPastikan file ' + filename + ' ada di folder public/datasoal/');
      console.error('Error loading quiz:', error);
    }
  };

  const handleAnswer = (answer) => {
    const questionNumber = currentQuestion + 1;
    
    // Cek apakah sudah dijawab (jawaban tidak bisa diganti)
    if (answers[questionNumber]) {
      return; // Tidak bisa ganti jawaban
    }
    
    setAnswers({
      ...answers,
      [questionNumber]: answer
    });
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.soal.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentView('summary');
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentView('select');
    setQuizData(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowAnswerMap({});
  };

  const toggleShowAnswer = (questionNum) => {
    setShowAnswerMap({
      ...showAnswerMap,
      [questionNum]: !showAnswerMap[questionNum]
    });
  };

  const getQuestionStatus = (index) => {
    const questionNumber = index + 1;
    const userAnswer = answers[questionNumber];
    if (!userAnswer) return 'unanswered';
    
    const soal = quizData.soal[index];
    return userAnswer === soal.kunciJawaban ? 'correct' : 'incorrect';
  };

  // Tampilan Pilih Soal
  if (currentView === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Aplikasi Soal Pilihan Ganda
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Pilih cara untuk memulai mengerjakan soal
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* A. Upload Soal */}
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

              {/* B. Pilih dari Folder */}
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

            {/* Daftar Soal (muncul jika tombol diklik) */}
            {showQuizList && (
              <div className="mb-8 animate-fadeIn">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Daftar Soal yang Tersedia ({availableQuizzes.length} soal)
                  </h4>
                  <div className="space-y-3">
                    {availableQuizzes.map((quiz, index) => (
                      <button
                        key={quiz.filename}
                        onClick={() => loadQuizFromFolder(quiz.filename)}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 transition shadow-sm hover:shadow-md"
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
              <p className="text-gray-600 text-sm mb-4">
                Berikut format soal jika Anda ingin menambahkan soal baru. Simpan dengan ekstensi <code className="bg-gray-200 px-2 py-1 rounded">.json</code> dan upload melalui menu A atau tambahkan ke daftar soal.
              </p>
              <pre className="text-xs bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">{`{
  "judul": "Nama Soal",
  "soal": [
    {
      "nomor": 1,
      "pertanyaan": "Pertanyaan soal...",
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Quiz
  if (currentView === 'quiz' && quizData) {
    const currentQ = quizData.soal[currentQuestion];
    const totalQuestions = quizData.soal.length;
    const questionNumber = currentQuestion + 1;
    const userAnswer = answers[questionNumber];
    const isAnswered = userAnswer !== undefined;
    const isCorrect = isAnswered && userAnswer === currentQ.kunciJawaban;
    const isIncorrect = isAnswered && userAnswer !== currentQ.kunciJawaban;
    const showAnswer = showAnswerMap[questionNumber] || false;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header dengan indicator soal */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {quizData.judul}
              </h2>
              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-lg">
                {currentQuestion + 1}/{totalQuestions}
              </div>
            </div>

            {/* Nomor soal navigation */}
            <div className="flex flex-wrap gap-2">
              {quizData.soal.map((_, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-full font-medium transition ${
                      currentQuestion === index ? 'ring-4 ring-indigo-300' : ''
                    } ${
                      status === 'correct'
                        ? 'bg-green-500 text-white'
                        : status === 'incorrect'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Soal */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQ.nomor}. {currentQ.pertanyaan}
            </h3>

            <div className="space-y-3">
              {Object.entries(currentQ.pilihan).map(([key, value]) => {
                const isSelected = userAnswer === key;
                const isThisCorrect = key === currentQ.kunciJawaban;
                const showCorrectMark = showAnswer && isThisCorrect;

                return (
                  <button
                    key={key}
                    onClick={() => handleAnswer(key)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition ${
                      isSelected && isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isSelected && isIncorrect
                        ? 'border-red-500 bg-red-50'
                        : showCorrectMark
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`font-bold mr-3 ${
                          isSelected && isCorrect
                            ? 'text-green-600'
                            : isSelected && isIncorrect
                            ? 'text-red-600'
                            : showCorrectMark
                            ? 'text-green-600'
                            : 'text-indigo-600'
                        }`}>
                          {key}.
                        </span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                      {isSelected && isCorrect && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {isSelected && isIncorrect && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      {showCorrectMark && !isSelected && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {isCorrect && (
              <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  Benar! Jawaban Anda tepat!
                </div>
              </div>
            )}

            {isIncorrect && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 font-semibold">
                  <XCircle className="w-5 h-5" />
                  Jawaban Anda salah.
                </div>
              </div>
            )}

            {/* Tombol Show Answer - hanya muncul jika sudah dijawab */}
            {isAnswered && (
              <div className="mt-4">
                <button
                  onClick={() => toggleShowAnswer(questionNumber)}
                  className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  {showAnswer ? 'Sembunyikan' : 'Show Answer & Pembahasan'}
                </button>
                
                {showAnswer && (
                  <div className="mt-3 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      ✅ Jawaban: {currentQ.kunciJawaban}
                    </h4>
                    <h4 className="font-semibold text-blue-900 mb-2 mt-4">📖 Pembahasan:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {currentQ.pembahasan}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Peringatan jika belum dijawab */}
            {!isAnswered && (
              <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 Pilih salah satu jawaban di atas. Setelah memilih, jawaban tidak dapat diganti!
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Sebelumnya
              </button>

              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {currentQuestion === totalQuestions - 1 ? 'Selesai' : 'Selanjutnya'}
                {currentQuestion === totalQuestions - 1 ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Summary
  if (currentView === 'summary' && quizData) {
    const sortedAnswers = Object.keys(answers)
      .map(Number)
      .sort((a, b) => a - b)
      .map((num) => {
        const soal = quizData.soal[num - 1];
        return {
          nomor: num,
          jawaban: answers[num],
          isCorrect: answers[num] === soal.kunciJawaban,
          kunciJawaban: soal.kunciJawaban
        };
      });

    const correctCount = sortedAnswers.filter(a => a.isCorrect).length;
    const totalAnswered = sortedAnswers.length;
    const score = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Soal Selesai!
              </h2>
              <p className="text-gray-600">
                Berikut ringkasan jawaban Anda
              </p>
            </div>

            {/* Skor */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-6 mb-6 text-center">
              <div className="text-5xl font-bold mb-2">{score}%</div>
              <div className="text-lg">
                {correctCount} dari {totalAnswered} soal benar
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                📝 Ringkasan Jawaban:
              </h3>
              <div className="space-y-2">
                {sortedAnswers.map(({ nomor, jawaban, isCorrect, kunciJawaban }) => (
                  <div
                    key={nomor}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isCorrect ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <span className="font-bold text-gray-700 w-8">
                      {nomor}.
                    </span>
                    <span className={`font-semibold text-lg ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {jawaban}
                    </span>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    ) : (
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Seharusnya: <span className="font-bold text-green-600">{kunciJawaban}</span>
                        </span>
                        <XCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                ))}
                {sortedAnswers.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Tidak ada jawaban yang tersimpan
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetQuiz}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Kembali ke Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}