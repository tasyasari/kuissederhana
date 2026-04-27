import { Question, Subject } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'python',
    name: 'Python Dasar',
    icon: 'BrainCircuit',
    description: 'Konsep dasar Python, variabel, tipe data, dan kontrol alur.',
    color: 'indigo'
  },
  {
    id: 'ips',
    name: 'Pengetahuan Umum',
    icon: 'Globe',
    description: 'Sejarah, Geografi, dan Kebudayaan Indonesia.',
    color: 'amber'
  },
  {
    id: 'matematika',
    name: 'Matematika Dasar',
    icon: 'Calculator',
    description: 'Operasi aritmatika dasar dan logika matematika.',
    color: 'emerald'
  }
];

export const QUIZ_QUESTIONS: Record<string, Question[]> = {
  python: [
    {
      id: 'p1',
      question: 'Manakah dari berikut ini yang merupakan tipe data untuk bilangan bulat di Python?',
      options: ['float', 'int', 'str', 'boolean'],
      correctAnswer: 1,
    },
    {
      id: 'p2',
      question: 'Simbol manakah yang digunakan untuk komentar satu baris di Python?',
      options: ['//', '/*', '#', '--'],
      correctAnswer: 2,
    },
    {
      id: 'p3',
      question: 'Metode manakah yang digunakan untuk menampilkan teks ke layar?',
      options: ['echo()', 'print()', 'log()', 'system.out.println()'],
      correctAnswer: 1,
    },
    {
      id: 'p4',
      question: 'Manakah cara yang benar untuk mendefinisikan list di Python?',
      options: ['x = (1, 2, 3)', 'x = {1, 2, 3}', 'x = [1, 2, 3]', 'x = <1, 2, 3>'],
      correctAnswer: 2,
    },
    {
      id: 'p5',
      question: 'Manakah dari kata kunci berikut yang digunakan untuk membuat fungsi?',
      options: ['func', 'define', 'def', 'function'],
      correctAnswer: 2,
    }
  ],
  ips: [
    {
      id: 'ips1',
      question: 'Ibu kota negara Indonesia adalah...',
      options: ['Surabaya', 'Bandung', 'Jakarta', 'Medan'],
      correctAnswer: 2,
    },
    {
      id: 'ips2',
      question: 'Planet yang dikenal sebagai Planet Merah adalah...',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturnus'],
      correctAnswer: 1,
    },
    {
      id: 'ips3',
      question: 'Siapakah pencipta lagu kebangsaan Indonesia Raya?',
      options: ['W.R. Supratman', 'C. Simanjuntak', 'Ibu Sud', 'Ismail Marzuki'],
      correctAnswer: 0,
    },
    {
      id: 'ips4',
      question: 'Pulau manakah yang memiliki jumlah penduduk terbanyak di Indonesia?',
      options: ['Sumatera', 'Kalimantan', 'Sulawesi', 'Jawa'],
      correctAnswer: 3,
    },
    {
      id: 'ips5',
      question: 'Gunung tertinggi di Indonesia adalah...',
      options: ['Gunung Semeru', 'Gunung Rinjani', 'Puncak Jaya', 'Gunung Kerinci'],
      correctAnswer: 2,
    }
  ],
  matematika: [
    {
      id: 'm1',
      question: 'Berapakah hasil dari (15 * 3) + 25?',
      options: ['60', '70', '80', '90'],
      correctAnswer: 1,
    },
    {
      id: 'm2',
      question: 'Akar kuadrat dari 144 adalah...',
      options: ['10', '11', '12', '14'],
      correctAnswer: 2,
    },
    {
      id: 'm3',
      question: 'Jika 3x = 21, maka nilai x adalah...',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2,
    },
    {
      id: 'm4',
      question: 'Berapakah jumlah sudut dalam sebuah segitiga?',
      options: ['90 derajat', '180 derajat', '270 derajat', '360 derajat'],
      correctAnswer: 1,
    },
    {
      id: 'm5',
      question: 'Hasil dari 1/2 + 1/4 adalah...',
      options: ['3/4', '2/4', '1/6', '3/8'],
      correctAnswer: 0,
    }
  ]
};
