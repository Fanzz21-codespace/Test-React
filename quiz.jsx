import React, { useState } from 'react';
import { Upload, ChevronLeft, ChevronRight, CheckCircle, XCircle, BookOpen } from 'lucide-react';

export default function QuizApp() {
  const [currentView, setCurrentView] = useState('select'); // select, quiz, summary
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [showPembahasan, setShowPembahasan] = useState({});

  // Contoh data soal dengan kunci jawaban dan pembahasan
  const sampleQuizzes = {
    'ipa.json': {
      judul: 'Soal IPA',
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
      judul: 'Soal Matematika',
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
        },
        {
          nomor: 4,
          pertanyaan: '12² = ?',
          pilihan: {
            A: '124',
            B: '134',
            C: '144',
            D: '154'
          },
          kunciJawaban: 'C',
          pembahasan: '12² = 12 × 12 = 144. Cara menghitung: (10 + 2)² = 10² + 2(10)(2) + 2² = 100 + 40 + 4 = 144'
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
          setShowFeedback({});
          setShowPembahasan({});
        } catch (error) {
          alert('File JSON tidak valid!');
        }
      };
      reader.readAsText(file);
    }
  };

  const selectSampleQuiz = (filename) => {
    setQuizData(sampleQuizzes[filename]);
    setCurrentView('quiz');
    setCurrentQuestion(0);
    setAnswers({});
    setShowFeedback({});
    setShowPembahasan({});
  };

  const handleAnswer = (answer) => {
    const questionNumber = currentQuestion + 1;
    const currentQ = quizData.soal[currentQuestion];
    const isCorrect = answer === currentQ.kunciJawaban;
    
    setAnswers({
      ...answers,
      [questionNumber]: answer
    });

    setShowFeedback({
      ...showFeedback,
      [questionNumber]: isCorrect
    });

    // Jika benar, tampilkan pembahasan
    if (isCorrect) {
      setShowPembahasan({
        ...showPembahasan,
        [questionNumber]: true
      });
    }
  };

  const togglePembahasan = () => {
    const questionNumber = currentQuestion + 1;
    setShowPembahasan({
      ...showPembahasan,
      [questionNumber]: !showPembahasan[questionNumber]
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
    setShowFeedback({});
    setShowPembahasan({});
  };

  const getQuestionStatus = (index) => {
    const questionNumber = index + 1;
    if (showFeedback[questionNumber] === true) return 'correct';
    if (showFeedback[questionNumber] === false) return 'incorrect';
    if (answers[questionNumber]) return 'answered';
    return 'unanswered';
  };

  // Tampilan Pilih Soal
  if (currentView === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Aplikasi Soal Pilihan Ganda
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Pilih soal yang ingin dikerjakan
            </p>

            {/* Upload File */}
            <div className="mb-8">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 font-medium">
                  Upload File JSON
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Klik untuk memilih file dari folder /datasoal
                </span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Atau Pilih Contoh */}
            <div className="text-center mb-4">
              <span className="text-gray-500 text-sm font-medium">
                ATAU PILIH SOAL CONTOH
              </span>
            </div>

            <div className="space-y-3">
              {Object.keys(sampleQuizzes).map((filename) => (
                <button
                  key={filename}
                  onClick={() => selectSampleQuiz(filename)}
                  className="w-full p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition font-medium shadow-md"
                >
                  📚 {sampleQuizzes[filename].judul} ({filename})
                </button>
              ))}
            </div>

            {/* Format JSON */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Format File JSON
              </h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
{`{
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
}`}
              </pre>
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
    const isAnswered = answers[questionNumber] !== undefined;
    const isCorrect = showFeedback[questionNumber] === true;
    const isIncorrect = showFeedback[questionNumber] === false;

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
                      currentQuestion === index
                        ? 'ring-4 ring-indigo-300'
                        : ''
                    } ${
                      status === 'correct'
                        ? 'bg-green-500 text-white'
                        : status === 'incorrect'
                        ? 'bg-red-500 text-white'
                        : status === 'answered'
                        ? 'bg-yellow-400 text-white'
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
                const isSelected = answers[questionNumber] === key;
                const isThisCorrect = key === currentQ.kunciJawaban;
                const showCorrectAnswer = isIncorrect && isThisCorrect;

                return (
                  <button
                    key={key}
                    onClick={() => handleAnswer(key)}
                    disabled={isCorrect}
                    className={`w-full p-4 text-left rounded-lg border-2 transition ${
                      isCorrect && isSelected
                        ? 'border-green-500 bg-green-50'
                        : isIncorrect && isSelected
                        ? 'border-red-500 bg-red-50'
                        : showCorrectAnswer
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    } ${isCorrect ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`font-bold mr-3 ${
                          isCorrect && isSelected
                            ? 'text-green-600'
                            : isIncorrect && isSelected
                            ? 'text-red-600'
                            : showCorrectAnswer
                            ? 'text-green-600'
                            : 'text-indigo-600'
                        }`}>
                          {key}.
                        </span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                      {isCorrect && isSelected && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {isIncorrect && isSelected && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      {showCorrectAnswer && (
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
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <CheckCircle className="w-5 h-5" />
                  Benar! Jawaban Anda tepat!
                </div>
              </div>
            )}

            {isIncorrect && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                  <XCircle className="w-5 h-5" />
                  Jawaban Anda salah. Silakan coba lagi!
                </div>
                <p className="text-sm text-gray-600">
                  Jawaban yang benar: <span className="font-bold text-green-600">{currentQ.kunciJawaban}</span>
                </p>
              </div>
            )}

            {/* Pembahasan */}
            {(isCorrect || isIncorrect) && (
              <div className="mt-4">
                <button
                  onClick={togglePembahasan}
                  className="w-full p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  {showPembahasan[questionNumber] ? 'Sembunyikan' : 'Lihat'} Pembahasan
                </button>
                
                {showPembahasan[questionNumber] && (
                  <div className="mt-3 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">📖 Pembahasan:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {currentQ.pembahasan}
                    </p>
                  </div>
                )}
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