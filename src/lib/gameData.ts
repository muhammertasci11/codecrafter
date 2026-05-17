export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface DragDropPuzzle {
  blocks: string[]
  correctOrder: string[]
  explanation: string
}

export type ChallengeType = 'code' | 'quiz' | 'dragdrop'

export interface Challenge {
  id: string
  title: string
  description: string
  type?: ChallengeType
  startingCode: string
  tests: string
  hint: string
  section: 'basics' | 'loops' | 'functions' | 'arrays' | 'objects' | 'es6'
  quiz?: QuizQuestion
  dragdrop?: DragDropPuzzle
}

export function getChallengeLang(challenge: Challenge, lang: string): { startingCode: string; tests: string; hint: string } {
  const val = (challenge as any)[lang]
  if (val && typeof val === 'object' && 'startingCode' in val) return val
  return { startingCode: challenge.startingCode, tests: challenge.tests, hint: challenge.hint }
}

export interface Section {
  id: string
  name: string
  description: string
  challenges: string[]
  boss: Boss
}

export interface Boss {
  id: string
  name: string
  description: string
  stages: BossStage[]
}

export interface BossStage {
  title: string
  description: string
  startingCode: string
  tests: string
  hint: string
}

export interface Skill {
  id: string
  name: string
  description: string
  effect: string
  cost: number
  icon: string
}

export interface MapNode {
  id: string
  x: number
  y: number
  label: string
  type: 'challenge' | 'boss' | 'skill'
  challengeId?: string
  sectionId: string
}

export interface StoryNode {
  id: string
  title: string
  content: string[]
  triggerNodeId: string
}

export const STORIES: StoryNode[] = [
  {
    id: 'story-intro',
    title: 'Bölüm 1: Uyanış',
    content: [
      'Gözlerini açtığında kendini dijital bir evrenin ortasında buldun.',
      'Eski ustaların bıraktığı efsaneye göre, bu dünyayı "Kod" adı verilen büyü yönetiyor.',
      'Syntax Şeytanı isimli bir varlık, temel yapı taşlarını çaldı ve her yeri kaosa sürükledi.',
      'Onu durdurmak ve evrenin dengesini yeniden kurmak zorundasın. İlk hedefin: Değişkenler vadisi!'
    ],
    triggerNodeId: 'start'
  },
  {
    id: 'story-loops',
    title: 'Bölüm 2: Sonsuzluk Sarmalı',
    content: [
      'Syntax Şeytanı\'nı alt ettin! Ancak asıl tehlike şimdi başlıyor.',
      'Sonsuz Döngü Canavarı, zamanı bir ilmeğe hapsetti.',
      'Döngüleri kontrol etmeyi öğrenmezsen, sonsuza dek aynı saniyeyi yaşayacaksın.',
      'İleriye doğru adım at ve For, While gibi güçlü büyüleri öğren.'
    ],
    triggerNodeId: 'gate-1'
  },
  {
    id: 'story-functions',
    title: 'Bölüm 3: Soyutlamanın Gücü',
    content: [
      'Zaman ilmeğinden kurtulmayı başardın.',
      'Şimdi karşında Kod Kralı var. O, büyüleri küçük, tekrar kullanılabilir parçalara bölebilen bir dahi.',
      'Fonksiyonlar olmadan onun karşısında hiçbir şansın yok.',
      'Kendi büyülerini yaratma zamanı geldi!'
    ],
    triggerNodeId: 'gate-2'
  }
]

export const CHALLENGES: Record<string, Challenge> = {
  'basics-1': {
    id: 'basics-1',
    title: 'Değişken Tanımlama',
    description: 'JavaScript\'te değişken nasıl tanımlanır?',
    type: 'quiz',
    startingCode: '// x değişkenini tanımla ve 5 değerini ata\n',
    quiz: {
      question: 'JavaScript\'te bir değişken tanımlamak için hangi anahtar kelime kullanılır?',
      options: ['variable', 'let', 'int', 'define'],
      correctIndex: 1,
      explanation: '`let`, `const` ve `var` JavaScript\'te değişken tanımlamak için kullanılır. `let` modern JavaScript\'te en yaygın tercih edilenidir.',
    },
    tests: `// Test
if (typeof x === 'undefined') throw new Error('x tanımlanmamış')
if (x !== 5) throw new Error('x 5 değerine eşit değil')`,
    hint: 'let x = 5; veya let x = 5 kullanabilirsin',
    section: 'basics',
  },
  'basics-2': {
    id: 'basics-2',
    title: 'String Birleştirme',
    description: '`ad` ve `soyad` değişkenlerini birleştirip `tamAd` değişkenine atayın.',
    startingCode: 'let ad = "Ali";\nlet soyad = "Yılmaz";\n// tamAd değişkenini oluştur\n',
    tests: `// Test
if (typeof tamAd === 'undefined') throw new Error('tamAd tanımlanmamış')
if (tamAd !== 'Ali Yılmaz') throw new Error('tamAd beklendiği gibi değil. Beklenen: Ali Yılmaz, Alınan: ' + tamAd)`,
    hint: 'let tamAd = ad + " " + soyad; kullan',
    section: 'basics'
  },
  'basics-3': {
    id: 'basics-3',
    title: 'If-Else Karar Yapısı',
    description: '`sayi` tek mi çift mi? `sonuc` değişkenine "tek" veya "çift" yazın.',
    startingCode: 'let sayi = 7;\nlet sonuc;\n// Buraya kodunu yaz\n',
    tests: `// Test
if (typeof sonuc === 'undefined') throw new Error('sonuc tanımlanmamış')
if (sonuc !== 'tek') throw new Error('7 tek sayıdır. sonuc = "' + sonuc + '"')`,
    hint: 'if (sayi % 2 === 0) { sonuc = "çift"; } else { sonuc = "tek"; }',
    section: 'basics'
  },
  'loops-1': {
    id: 'loops-1',
    title: 'For Döngüsü',
    description: 'For döngüsü bloklarını doğru sıraya diz.',
    type: 'dragdrop',
    startingCode: 'let toplam = 0;\n// Buraya for döngüsü yaz\n',
    dragdrop: {
      blocks: ['}', '  toplam += i;', 'let toplam = 0;', 'for (let i = 1; i <= 5; i++) {'],
      correctOrder: ['let toplam = 0;', 'for (let i = 1; i <= 5; i++) {', '  toplam += i;', '}'],
      explanation: 'Önce değişkeni tanımla, sonra for döngüsünü aç, kodu gir, bloğu kapat.',
    },
    tests: `// Test
if (typeof toplam === 'undefined') throw new Error('toplam tanımlanmamış')
if (toplam !== 15) throw new Error('1+2+3+4+5 = 15, senin sonucun: ' + toplam)`,
    hint: 'for (let i = 1; i <= 5; i++) { toplam += i; }',
    section: 'loops'
  },
  'loops-2': {
    id: 'loops-2',
    title: 'Dizi İşleme',
    description: '`sayilar` dizisindeki her sayıyı 2 ile çarpıp `katlar` dizisine ekleyin.',
    startingCode: 'let sayilar = [1, 2, 3, 4, 5];\nlet katlar = [];\n// Buraya kodunu yaz\n',
    tests: `// Test
const beklenen = [2, 4, 6, 8, 10];
if (katlar.length !== beklenen.length) throw new Error('katlar dizisi ' + beklenen.length + ' elemanlı olmalı')
for (let i = 0; i < beklenen.length; i++) {
  if (katlar[i] !== beklenen[i]) throw new Error('İndex ' + i + ': beklenen ' + beklenen[i] + ', alınan ' + katlar[i])
}`,
    hint: 'for (let i = 0; i < sayilar.length; i++) { katlar.push(sayilar[i] * 2); }',
    section: 'loops'
  },
  'loops-3': {
    id: 'loops-3',
    title: 'While Döngüsü',
    description: 'While döngüsü ile 10\'dan geriye sayın. Çıktıları `gerisayim` dizisine ekleyin.',
    startingCode: 'let gerisayim = [];\nlet i = 10;\n// Buraya while döngüsü yaz\n',
    tests: `// Test
const beklenen = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
if (gerisayim.length !== beklenen.length) throw new Error('11 eleman olmalı')
for (let i = 0; i < beklenen.length; i++) {
  if (gerisayim[i] !== beklenen[i]) throw new Error('İndex ' + i + ': beklenen ' + beklenen[i])
}`,
    hint: 'while (i >= 0) { gerisayim.push(i); i--; }',
    section: 'loops'
  },
  'functions-1': {
    id: 'functions-1',
    title: 'Fonksiyon Tanımlama',
    description: 'İki sayıyı toplayan `topla(a, b)` fonksiyonunu yazın.',
    startingCode: '// topla(a, b) fonksiyonunu yaz\n',
    tests: `// Test
if (typeof topla !== 'function') throw new Error('topla bir fonksiyon değil')
if (topla(3, 4) !== 7) throw new Error('topla(3, 4) = 7 olmalı, alınan: ' + topla(3, 4))
if (topla(-1, 1) !== 0) throw new Error('topla(-1, 1) = 0 olmalı')`,
    hint: 'function topla(a, b) { return a + b; }',
    section: 'functions'
  },
  'functions-2': {
    id: 'functions-2',
    title: 'Dizi Filtreleme',
    description: 'Bir dizideki çift sayıları döndüren `ciftleriBul(sayilar)` fonksiyonunu yazın.',
    startingCode: 'function ciftleriBul(sayilar) {\n  // Burayı doldur\n}\n',
    tests: `// Test
const sonuc = ciftleriBul([1, 2, 3, 4, 5, 6]);
const beklenen = [2, 4, 6];
if (sonuc.length !== beklenen.length) throw new Error('Beklenen: [2,4,6], alınan: ' + JSON.stringify(sonuc))
for (let i = 0; i < beklenen.length; i++) {
  if (sonuc[i] !== beklenen[i]) throw new Error('İndex ' + i + ': beklenen ' + beklenen[i])
}`,
    hint: 'return sayilar.filter(s => s % 2 === 0); veya for döngüsü ile',
    section: 'functions'
  },
  'functions-3': {
    id: 'functions-3',
    title: 'Callback Fonksiyonlar',
    description: 'Bir sayı dizisine `islem` fonksiyonunu uygulayan `haritala(dizi, islem)` fonksiyonunu yazın.',
    startingCode: 'function haritala(dizi, islem) {\n  // Burayı doldur\n}\n',
    tests: `// Test
const kareler = haritala([1, 2, 3], x => x * x);
if (kareler[0] !== 1 || kareler[1] !== 4 || kareler[2] !== 9) 
  throw new Error('haritala([1,2,3], x=>x*x) = [1,4,9] olmalı, alınan: ' + JSON.stringify(kareler))
if (haritala([], x => x).length !== 0) throw new Error('Boş dizi testi başarısız')`,
    hint: 'const sonuc = []; for (let i = 0; i < dizi.length; i++) { sonuc.push(islem(dizi[i])); } return sonuc;',
    section: 'functions'
  },
  'arrays-1': {
    id: 'arrays-1',
    title: 'Dizi Metodları',
    description: '`push`, `pop`, `shift`, `unshift` kullanarak dizi işlemleri yapın.',
    startingCode: 'let meyveler = ["elma", "armut"];\n// "muz" ekle, sonra ilk elemanı çıkar\n',
    tests: `// Test
if (meyveler.length !== 2) throw new Error('meyveler 2 elemanlı olmalı')
if (meyveler[0] !== 'armut') throw new Error('İlk eleman "armut" olmalı, alınan: ' + meyveler[0])
if (meyveler[1] !== 'muz') throw new Error('İkinci eleman "muz" olmalı, alınan: ' + meyveler[1])`,
    hint: 'meyveler.push("muz"); meyveler.shift();',
    section: 'arrays'
  },
  'arrays-2': {
    id: 'arrays-2',
    title: 'Map ve Filter',
    description: 'Bir sayı dizisindeki çift sayıların karelerini döndüren `ciftKareler(sayilar)` fonksiyonunu yazın.',
    startingCode: 'function ciftKareler(sayilar) {\n  // map ve filter kullan\n}\n',
    tests: `// Test
const r = ciftKareler([1, 2, 3, 4, 5, 6]);
const beklenen = [4, 16, 36];
if (r.length !== beklenen.length) throw new Error('Beklenen: [4,16,36], alınan: ' + JSON.stringify(r))
for (let i = 0; i < beklenen.length; i++) {
  if (r[i] !== beklenen[i]) throw new Error('İndex ' + i + ': beklenen ' + beklenen[i] + ', alınan ' + r[i])
}`,
    hint: 'return sayilar.filter(s => s % 2 === 0).map(s => s * s);',
    section: 'arrays'
  },
  'arrays-3': {
    id: 'arrays-3',
    title: 'Reduce ile Toplama',
    description: 'Bir sayı dizisindeki tüm sayıların toplamını bulan `diziTopla(sayilar)` fonksiyonunu yazın.',
    startingCode: 'function diziTopla(sayilar) {\n  // reduce kullan\n}\n',
    tests: `// Test
if (diziTopla([1, 2, 3, 4, 5]) !== 15) throw new Error('1+2+3+4+5 = 15')
if (diziTopla([10, -5, 3]) !== 8) throw new Error('10+(-5)+3 = 8')
if (diziTopla([]) !== 0) throw new Error('Boş dizi toplamı 0 olmalı')`,
    hint: 'return sayilar.reduce((toplam, s) => toplam + s, 0);',
    section: 'arrays'
  },
  'objects-1': {
    id: 'objects-1',
    title: 'Nesne Oluşturma',
    description: 'JavaScript\'te nesne nasıl oluşturulur?',
    type: 'quiz',
    startingCode: '// kullanici nesnesini oluştur\n',
    quiz: {
      question: 'JavaScript\'te bir nesne (object) oluşturmak için hangi söz dizimi doğrudur?',
      options: ['let kullanici = (isim: "Ayşe", yas: 28)', 'let kullanici = {isim: "Ayşe", yas: 28}', 'let kullanici = [isim: "Ayşe", yas: 28]', 'let kullanici = <isim: "Ayşe", yas: 28>'],
      correctIndex: 1,
      explanation: 'JavaScript\'te nesneler `{}` (süslü parantez) ile oluşturulur. Her özellik `anahtar: değer` çifti olarak yazılır.',
    },
    tests: `// Test
if (typeof kullanici !== 'object') throw new Error('kullanici bir nesne değil')
if (kullanici.isim !== 'Ayşe') throw new Error('isim "Ayşe" olmalı, alınan: ' + kullanici.isim)
if (kullanici.yas !== 28) throw new Error('yas 28 olmalı')
if (kullanici.sehir !== 'İstanbul') throw new Error('sehir "İstanbul" olmalı')`,
    hint: 'let kullanici = { isim: "Ayşe", yas: 28, sehir: "İstanbul" };',
    section: 'objects'
  },
  'objects-2': {
    id: 'objects-2',
    title: 'Nesne Metodları',
    description: 'Bir nesnenin tüm anahtarlarını ve değerlerini döndüren `nesneAnalizi(obj)` fonksiyonunu yazın. `{ anahtarlar: [...], degerler: [...] }` döndürsün.',
    startingCode: 'function nesneAnalizi(obj) {\n  // Object.keys ve Object.values kullan\n}\n',
    tests: `// Test
const r = nesneAnalizi({ a: 1, b: 2, c: 3 });
if (r.anahtarlar.length !== 3) throw new Error('3 anahtar olmalı')
if (r.degerler[0] !== 1 || r.degerler[2] !== 3) throw new Error('Değerler yanlış')
if (!Array.isArray(r.anahtarlar) || !Array.isArray(r.degerler)) throw new Error('Dizi döndürmelisin')`,
    hint: 'return { anahtarlar: Object.keys(obj), degerler: Object.values(obj) };',
    section: 'objects'
  },
  'objects-3': {
    id: 'objects-3',
    title: 'JSON İşlemleri',
    description: 'Bir nesneyi derin kopyalayan `derinKopyala(obj)` fonksiyonunu yazın. Kopya orijinalden bağımsız olmalı.',
    startingCode: 'function derinKopyala(obj) {\n  // JSON.stringify ve JSON.parse kullan\n}\n',
    tests: `// Test
const orijinal = { ad: "Ali", adres: { sehir: "Ankara", postaKodu: 06500 } };
const kopya = derinKopyala(orijinal);
kopya.adres.sehir = "İzmir";
if (orijinal.adres.sehir !== 'Ankara') throw new Error('Orijinal değişmemeli! Derin kopya yapılmamış')
if (kopya.ad !== 'Ali') throw new Error('Kopya ad korunmalı')`,
    hint: 'return JSON.parse(JSON.stringify(obj));',
    section: 'objects'
  },
  'es6-1': {
    id: 'es6-1',
    title: 'Arrow Functions',
    description: 'Arrow function kullanarak bir sayının karesini döndüren `kare(s)` fonksiyonunu tek satırda yazın.',
    startingCode: '// kare(s) => s*s tek satır arrow function\nconst kare = ',
    tests: `// Test
if (typeof kare !== 'function') throw new Error('kare bir fonksiyon değil')
if (kare(5) !== 25) throw new Error('kare(5) = 25 olmalı')
if (kare(0) !== 0) throw new Error('kare(0) = 0 olmalı')`,
    hint: 'const kare = s => s * s;',
    section: 'es6'
  },
  'es6-2': {
    id: 'es6-2',
    title: 'Destructuring',
    description: 'Destructuring bloklarını doğru sıraya diz.',
    type: 'dragdrop',
    startingCode: 'const sayilar = [10, 20, 30, 40, 50];\n// Destructuring kullan\n',
    dragdrop: {
      blocks: ['const kalan;', '...kalan', 'const sayilar = [10, 20, 30, 40, 50];', 'const [a, b,', '= sayilar;'],
      correctOrder: ['const sayilar = [10, 20, 30, 40, 50];', 'const [a, b,', '...kalan', '= sayilar;'],
      explanation: 'Önce diziyi tanımla, sonra destructuring ile elemanları ayır. `...kalan` ile kalan elemanları al.',
    },
    tests: `// Test
if (typeof a === 'undefined') throw new Error('a tanımlanmamış')
if (a !== 10) throw new Error('a = 10 olmalı, alınan: ' + a)
if (b !== 20) throw new Error('b = 20 olmalı')
if (kalan.length !== 3) throw new Error('kalan 3 elemanlı olmalı')
if (kalan[0] !== 30) throw new Error('kalan[0] = 30 olmalı')`,
    hint: 'const [a, b, ...kalan] = sayilar;',
    section: 'es6'
  },
  'es6-3': {
    id: 'es6-3',
    title: 'Class ve Inheritance',
    description: 'Bir `Hayvan` sınıfı oluşturun (constructor ile isim alsın, sesCikar metodu olsun). Sonra bundan miras alan `Kedi` sınıfı oluşturun (sesCikar "Miyav!" döndürsün).',
    startingCode: 'class Hayvan {\n  // Burayı doldur\n}\n\nclass Kedi extends Hayvan {\n  // Burayı doldur\n}\n',
    tests: `// Test
const kedi = new Kedi("Pamuk");
if (kedi.isim !== 'Pamuk') throw new Error('isim "Pamuk" olmalı')
if (kedi.sesCikar() !== 'Miyav!') throw new Error('Kedi "Miyav!" demeli, alınan: ' + kedi.sesCikar())
const hayvan = new Hayvan("Generic");
if (hayvan.sesCikar() !== 'Ses yok') throw new Error('Hayvan sesi "Ses yok" olmalı')`,
    hint: 'class Hayvan { constructor(isim) { this.isim = isim; } sesCikar() { return "Ses yok"; } } class Kedi extends Hayvan { sesCikar() { return "Miyav!"; } }',
    section: 'es6'
  },
}

export const SECTIONS: Section[] = [
  {
    id: 'basics',
    name: 'Temeller',
    description: 'Değişkenler, string işlemleri ve karar yapıları',
    challenges: ['basics-1', 'basics-2', 'basics-3'],
    boss: {
      id: 'boss-basics',
      name: 'Syntax Şeytanı',
      description: 'Temel syntax bilgini test edecek 3 aşamalı bir sınav!',
      stages: [
        {
          title: 'Aşama 1: Değişkenler',
          description: '`isim`, `yas`, `aktif` değişkenlerini sırasıyla "Ahmet", 25, true olarak tanımla.',
          startingCode: '// 3 değişkeni tanımla\n',
          tests: `if (typeof isim === 'undefined') throw new Error('isim tanımlanmamış')
if (isim !== 'Ahmet') throw new Error('isim = "Ahmet" olmalı')
if (typeof yas === 'undefined') throw new Error('yas tanımlanmamış')
if (yas !== 25) throw new Error('yas = 25 olmalı')
if (typeof aktif === 'undefined') throw new Error('aktif tanımlanmamış')
if (aktif !== true) throw new Error('aktif = true olmalı')`,
          hint: 'let isim = "Ahmet"; let yas = 25; let aktif = true;'
        },
        {
          title: 'Aşama 2: Koşullar',
          description: '`not` değişkeni 50\'den büyükse `durum = "Geçti"`, yoksa `"Kaldı"` yaz.',
          startingCode: 'let not = 75;\nlet durum;\n// Buraya kodunu yaz\n',
          tests: `if (typeof durum === 'undefined') throw new Error('durum tanımlanmamış')
if (durum !== 'Geçti') throw new Error('75 için durum "Geçti" olmalı')`,
          hint: 'if (not > 50) { durum = "Geçti"; } else { durum = "Kaldı"; }'
        },
        {
          title: 'Aşama 3: Toplama',
          description: '1\'den `n`\'e kadar sayıları toplayan `topla(n)` fonksiyonunu yaz.',
          startingCode: 'function topla(n) {\n  // Burayı doldur\n}\n',
          tests: `if (topla(5) !== 15) throw new Error('topla(5) = 15 olmalı')
if (topla(100) !== 5050) throw new Error('topla(100) = 5050 olmalı')`,
          hint: 'let s = 0; for (let i = 1; i <= n; i++) { s += i; } return s;'
        }
      ]
    }
  },
  {
    id: 'loops',
    name: 'Döngüler',
    description: 'For, while ve dizi işlemleri',
    challenges: ['loops-1', 'loops-2', 'loops-3'],
    boss: {
      id: 'boss-loops',
      name: 'Sonsuz Döngü Canavarı',
      description: 'Döngü bilgini sınayacak 3 aşamalı mücadele!',
      stages: [
        {
          title: 'Aşama 1: Faktöriyel',
          description: '`faktoriyel(n)` fonksiyonunu yaz.',
          startingCode: 'function faktoriyel(n) {\n  // Burayı doldur\n}\n',
          tests: `if (faktoriyel(5) !== 120) throw new Error('faktoriyel(5) = 120 olmalı')`,
          hint: 'let s = 1; for (let i = 2; i <= n; i++) { s *= i; } return s;'
        },
        {
          title: 'Aşama 2: En Büyük',
          description: 'Bir dizideki en büyük sayıyı bulan `enBuyuk(dizi)` fonksiyonunu yaz.',
          startingCode: 'function enBuyuk(dizi) {\n  // Burayı doldur\n}\n',
          tests: `if (enBuyuk([3, 7, 2, 9, 1]) !== 9) throw new Error('en büyük 9 olmalı')
if (enBuyuk([-5, -2, -10]) !== -2) throw new Error('[-5,-2,-10] en büyük -2 olmalı')`,
          hint: 'let max = dizi[0]; for (let i = 1; i < dizi.length; i++) { if (dizi[i] > max) max = dizi[i]; } return max;'
        },
        {
          title: 'Aşama 3: Palindrom',
          description: 'Bir string\'in palindrom olup olmadığını kontrol eden `palindromMu(str)` fonksiyonunu yaz.',
          startingCode: 'function palindromMu(str) {\n  // Burayı doldur\n}\n',
          tests: `if (palindromMu('kek') !== true) throw new Error('kek palindromdur')
if (palindromMu('merhaba') !== false) throw new Error('merhaba palindrom değil')`,
          hint: 'return str === str.split("").reverse().join("");'
        }
      ]
    }
  },
  {
    id: 'functions',
    name: 'Fonksiyonlar',
    description: 'Fonksiyon tanımlama ve ileri düzey konular',
    challenges: ['functions-1', 'functions-2', 'functions-3'],
    boss: {
      id: 'boss-functions',
      name: 'Kod Kralı',
      description: 'Son boss! Tüm bildiklerini kullanman gerekecek!',
      stages: [
        {
          title: 'Aşama 1: Asal Sayı',
          description: 'Bir sayının asal olup olmadığını kontrol eden `asalMi(n)` fonksiyonunu yaz.',
          startingCode: 'function asalMi(n) {\n  // Burayı doldur\n}\n',
          tests: `if (asalMi(7) !== true) throw new Error('7 asaldır')
if (asalMi(4) !== false) throw new Error('4 asal değil')`,
          hint: 'if (n < 2) return false; for (let i = 2; i < n; i++) { if (n % i === 0) return false; } return true;'
        },
        {
          title: 'Aşama 2: Sıralama',
          description: 'Bir sayı dizisini küçükten büyüğe sıralayan `sirala(dizi)` fonksiyonunu yaz. Array.sort() KULLANMA!',
          startingCode: 'function sirala(dizi) {\n  // Array.sort() kullanma!\n}\n',
          tests: `const r = sirala([3, 1, 4, 1, 5]);
if (r[0] !== 1 || r[1] !== 1 || r[2] !== 3 || r[3] !== 4 || r[4] !== 5) 
  throw new Error('[3,1,4,1,5] sıralı: [1,1,3,4,5] olmalı, alınan: ' + JSON.stringify(r))`,
          hint: 'for (let i = 0; i < dizi.length; i++) { for (let j = i + 1; j < dizi.length; j++) { if (dizi[j] < dizi[i]) { [dizi[i], dizi[j]] = [dizi[j], dizi[i]]; } } } return dizi;'
        },
        {
          title: 'Aşama 3: Fibonacci',
          description: '`n`. terime kadar Fibonacci dizisini döndüren `fibonacci(n)` fonksiyonunu yaz.',
          startingCode: 'function fibonacci(n) {\n  // Burayı doldur\n}\n',
          tests: `const f = fibonacci(8);
if (f.length !== 8) throw new Error('8 elemanlı dizi bekleniyor')
if (f[0] !== 0 || f[1] !== 1 || f[7] !== 13) 
  throw new Error('fibonacci(8) = [0,1,1,2,3,5,8,13] olmalı')`,
          hint: 'const dizi = [0, 1]; for (let i = 2; i < n; i++) { dizi[i] = dizi[i-1] + dizi[i-2]; } return dizi;'
        }
      ]
    }
  },
  {
    id: 'arrays',
    name: 'Diziler',
    description: 'Dizi metodları, map, filter ve reduce',
    challenges: ['arrays-1', 'arrays-2', 'arrays-3'],
    boss: {
      id: 'boss-arrays',
      name: 'Dizi Ustası',
      description: 'Dizi bilgini 3 aşamada test edecek!',
      stages: [
        {
          title: 'Aşama 1: Merge',
          description: 'İki diziyi birleştirip tekrarlanan elemanları temizleyen `birlestir(dizi1, dizi2)` fonksiyonunu yaz.',
          startingCode: 'function birlestir(dizi1, dizi2) {\n  // Burayı doldur\n}\n',
          tests: `const r = birlestir([1, 2, 3], [2, 3, 4]);
if (r.length !== 4) throw new Error('[1,2,3] + [2,3,4] = [1,2,3,4] olmalı (4 eleman)')
if (!r.includes(4)) throw new Error('4 içermeli')`,
          hint: 'return [...new Set([...dizi1, ...dizi2])];'
        },
        {
          title: 'Aşama 2: Flatten',
          description: 'İç içe dizileri tek katmana indiren `duzlestir(dizi)` fonksiyonunu yaz.',
          startingCode: 'function duzlestir(dizi) {\n  // flat() kullanma! Recursive çöz\n}\n',
          tests: `const r = duzlestir([1, [2, 3], [4, [5, 6]]]);
if (r.length !== 6) throw new Error('6 elemanlı dizi bekleniyor')
if (r[5] !== 6) throw new Error('Son eleman 6 olmalı')`,
          hint: 'return dizi.reduce((acc, val) => Array.isArray(val) ? [...acc, ...duzlestir(val)] : [...acc, val], []);'
        },
        {
          title: 'Aşama 3: Unique',
          description: 'Bir dizideki tekrarlanan elemanları temizleyip sadece benzersiz olanları döndüren `benzersiz(dizi)` fonksiyonunu yaz.',
          startingCode: 'function benzersiz(dizi) {\n  // Set kullanabilirsin\n}\n',
          tests: `const r = benzersiz([1, 2, 2, 3, 3, 3, 4]);
if (r.length !== 4) throw new Error('[1,2,2,3,3,3,4] benzersiz: [1,2,3,4]')
if (r[3] !== 4) throw new Error('Son eleman 4 olmalı')`,
          hint: 'return [...new Set(dizi)];'
        }
      ]
    }
  },
  {
    id: 'objects',
    name: 'Nesneler',
    description: 'Nesne oluşturma, metodlar ve JSON işlemleri',
    challenges: ['objects-1', 'objects-2', 'objects-3'],
    boss: {
      id: 'boss-objects',
      name: 'JSON Canavarı',
      description: 'Nesne ve JSON bilgini sınavacak 3 aşama!',
      stages: [
        {
          title: 'Aşama 1: Deep Clone',
          description: 'Bir nesnenin derin kopyasını alan `derinKlon(obj)` fonksiyonunu yaz.',
          startingCode: 'function derinKlon(obj) {\n  // Burayı doldur\n}\n',
          tests: `const o = { a: 1, b: { c: 2 } };
const k = derinKlon(o);
k.b.c = 99;
if (o.b.c !== 2) throw new Error('Orijinal değişmemeli')`,
          hint: 'return JSON.parse(JSON.stringify(obj));'
        },
        {
          title: 'Aşama 2: Transform',
          description: 'Bir nesneyi dönüştüren `donustur(obj, kurallar)` fonksiyonunu yaz. `kurallar` objesi anahtar:yeniAnahtar eşlemesi içerir.',
          startingCode: 'function donustur(obj, kurallar) {\n  // Burayı doldur\n}\n',
          tests: `const r = donustur({ ad: "Ali", yas: 25 }, { ad: "isim", yas: "age" });
if (r.isim !== 'Ali') throw new Error('isim = "Ali" olmalı')
if (r.age !== 25) throw new Error('age = 25 olmalı')`,
          hint: 'const sonuc = {}; for (const [key, val] of Object.entries(obj)) { sonuc[kurallar[key] || key] = val; } return sonuc;'
        },
        {
          title: 'Aşama 3: Validation',
          description: 'Bir nesnenin belirtilen anahtarlara sahip olup olmadığını kontrol eden `dogrula(obj, zorunluAlanlar)` fonksiyonunu yaz. Eksik alan varsa hata fırlatsın.',
          startingCode: 'function dogrula(obj, zorunluAlanlar) {\n  // Burayı doldur\n}\n',
          tests: `const r = dogrula({ isim: "Ali", email: "ali@test.com" }, ["isim", "email"]);
if (r !== true) throw new Error('Geçerli nesne true döndürmeli')
try { dogrula({ isim: "Ali" }, ["isim", "email"]); throw new Error('Hata fırlatmalıydı'); }
catch(e) { if (e.message !== 'Eksik alan: email') throw new Error('"Eksik alan: email" hatası bekleniyor'); }`,
          hint: 'for (const alan of zorunluAlanlar) { if (!(alan in obj)) { throw new Error("Eksik alan: " + alan); } } return true;'
        }
      ]
    }
  },
  {
    id: 'es6',
    name: 'ES6+ Modern JS',
    description: 'Arrow functions, destructuring, class ve inheritance',
    challenges: ['es6-1', 'es6-2', 'es6-3'],
    boss: {
      id: 'boss-es6',
      name: 'ES6 Titanı',
      description: 'Modern JavaScript bilgini sonuna kadar test edecek!',
      stages: [
        {
          title: 'Aşama 1: Class Hierarchy',
          description: 'Bir `Sekil` sınıfı oluşturun (renk alsın, alanHesapla metodu olsun). `Daire` ve `Dikdortgen` alt sınıflarını oluşturun.',
          startingCode: 'class Sekil {\n  constructor(renk) { this.renk = renk; }\n  alanHesapla() { return 0; }\n}\n\nclass Daire extends Sekil {\n  // yarıçap ile\n}\n\nclass Dikdortgen extends Sekil {\n  // genişlik ve yükseklik ile\n}\n',
          tests: `const d = new Daire("kırmızı", 5);
if (d.renk !== 'kırmızı') throw new Error('renk kırmızı olmalı')
if (Math.round(d.alanHesapla()) !== 79) throw new Error('Daire alanı ~79 olmalı, alınan: ' + d.alanHesapla())
const dg = new Dikdortgen("mavi", 4, 6);
if (dg.alanHesapla() !== 24) throw new Error('Dikdortgen alanı 24 olmalı')`,
          hint: 'class Daire extends Sekil { constructor(renk, r) { super(renk); this.r = r; } alanHesapla() { return Math.PI * this.r * this.r; } } class Dikdortgen extends Sekil { constructor(renk, g, y) { super(renk); this.g = g; this.y = y; } alanHesapla() { return this.g * this.y; } }'
        },
        {
          title: 'Aşama 2: Async Simulation',
          description: 'Bir sayıyı 1 saniye sonra ikiye katlayan `bekleVeKatla(sayi)` fonksiyonunu yaz. Promise döndürsün.',
          startingCode: 'function bekleVeKatla(sayi) {\n  // Promise döndür, 1sn sonra sayi*2 resolve et\n}\n',
          tests: `const p = bekleVeKatla(5);
if (!(p instanceof Promise)) throw new Error('Promise döndürmeli')
const result = await p;
if (result !== 10) throw new Error('5*2 = 10 olmalı, alınan: ' + result)`,
          hint: 'return new Promise(resolve => setTimeout(() => resolve(sayi * 2), 1000));'
        },
        {
          title: 'Aşama 3: Proxy',
          description: 'Bir nesneyi saran bir Proxy oluşturun. Var olmayan bir özelliğe erişilince hata fırlatsın.',
          startingCode: 'function guvenliNesne(obj) {\n  // Proxy ile sar, var olmayan özellikler hata fırlatsın\n}\n',
          tests: `const kullanici = guvenliNesne({ ad: "Ali", yas: 25 });
if (kullanici.ad !== 'Ali') throw new Error('ad = "Ali" olmalı')
try { kullanici.soyad; throw new Error('Hata fırlatmalıydı'); }
catch(e) { if (!e.message.includes('tanımlı değil')) throw new Error('Hata "tanımlı değil" içermeli, alınan: ' + e.message); }`,
          hint: 'return new Proxy(obj, { get(target, prop) { if (prop in target) return target[prop]; throw new Error(prop + " tanımlı değil"); } });'
        }
      ]
    }
  },
]

export const SKILLS: Skill[] = [
  { id: 'hint', name: 'İpucu Hakkı', description: 'Her challenge için 1 ipucu hakkı kazan', effect: 'hint_count', cost: 1, icon: '💡' },
  { id: 'time', name: 'Süre Bonusu', description: 'Challenge süresi 30sn uzar', effect: 'time_bonus', cost: 2, icon: '⏰' },
  { id: 'heal', name: 'Can Yenileme', description: 'Boss savaşında 1 can yenile', effect: 'heal', cost: 2, icon: '❤️' },
  { id: 'skip', name: 'Atlama Hakkı', description: '1 challenge\'ı atlayabilirsin', effect: 'skip', cost: 3, icon: '⏭️' },
  { id: 'double', name: 'Çifte Puan', description: 'Sonraki challenge\'dan 2x puan kazan', effect: 'double_xp', cost: 3, icon: '⭐' },
  { id: 'auto', name: 'Otomatik Düzeltme', description: '1 küçük syntax hatasını otomatik düzelt', effect: 'auto_fix', cost: 4, icon: '🔧' },
]

export const MAP_NODES: MapNode[] = [
  { id: 'start', x: 400, y: 50, label: 'Başlangıç', type: 'challenge', challengeId: 'basics-1', sectionId: 'basics' },
  { id: 'basics-1', x: 200, y: 150, label: 'Değişkenler', type: 'challenge', challengeId: 'basics-1', sectionId: 'basics' },
  { id: 'basics-2', x: 400, y: 150, label: 'String', type: 'challenge', challengeId: 'basics-2', sectionId: 'basics' },
  { id: 'basics-3', x: 600, y: 150, label: 'If-Else', type: 'challenge', challengeId: 'basics-3', sectionId: 'basics' },
  { id: 'boss-basics', x: 400, y: 260, label: 'Syntax Şeytanı', type: 'boss', sectionId: 'basics' },
  { id: 'gate-1', x: 400, y: 320, label: '→ Bölüm 2', type: 'challenge', sectionId: 'loops' },
  { id: 'loops-1', x: 200, y: 400, label: 'For Döngüsü', type: 'challenge', challengeId: 'loops-1', sectionId: 'loops' },
  { id: 'loops-2', x: 400, y: 400, label: 'Diziler', type: 'challenge', challengeId: 'loops-2', sectionId: 'loops' },
  { id: 'loops-3', x: 600, y: 400, label: 'While', type: 'challenge', challengeId: 'loops-3', sectionId: 'loops' },
  { id: 'boss-loops', x: 400, y: 510, label: 'Sonsuz Döngü', type: 'boss', sectionId: 'loops' },
  { id: 'gate-2', x: 400, y: 570, label: '→ Bölüm 3', type: 'challenge', sectionId: 'functions' },
  { id: 'functions-1', x: 200, y: 650, label: 'Fonksiyonlar', type: 'challenge', challengeId: 'functions-1', sectionId: 'functions' },
  { id: 'functions-2', x: 400, y: 650, label: 'Filtreleme', type: 'challenge', challengeId: 'functions-2', sectionId: 'functions' },
  { id: 'functions-3', x: 600, y: 650, label: 'Callback', type: 'challenge', challengeId: 'functions-3', sectionId: 'functions' },
  { id: 'boss-functions', x: 400, y: 760, label: 'Kod Kralı', type: 'boss', sectionId: 'functions' },
  { id: 'gate-3', x: 400, y: 870, label: '→ Bölüm 4', type: 'challenge', sectionId: 'arrays' },
  { id: 'arrays-1', x: 200, y: 950, label: 'Dizi Metodları', type: 'challenge', challengeId: 'arrays-1', sectionId: 'arrays' },
  { id: 'arrays-2', x: 400, y: 950, label: 'Map & Filter', type: 'challenge', challengeId: 'arrays-2', sectionId: 'arrays' },
  { id: 'arrays-3', x: 600, y: 950, label: 'Reduce', type: 'challenge', challengeId: 'arrays-3', sectionId: 'arrays' },
  { id: 'boss-arrays', x: 400, y: 1060, label: 'Dizi Ustası', type: 'boss', sectionId: 'arrays' },
  { id: 'gate-4', x: 400, y: 1170, label: '→ Bölüm 5', type: 'challenge', sectionId: 'objects' },
  { id: 'objects-1', x: 200, y: 1250, label: 'Nesneler', type: 'challenge', challengeId: 'objects-1', sectionId: 'objects' },
  { id: 'objects-2', x: 400, y: 1250, label: 'Object Keys', type: 'challenge', challengeId: 'objects-2', sectionId: 'objects' },
  { id: 'objects-3', x: 600, y: 1250, label: 'JSON', type: 'challenge', challengeId: 'objects-3', sectionId: 'objects' },
  { id: 'boss-objects', x: 400, y: 1360, label: 'JSON Canavarı', type: 'boss', sectionId: 'objects' },
  { id: 'gate-5', x: 400, y: 1470, label: '→ Bölüm 6', type: 'challenge', sectionId: 'es6' },
  { id: 'es6-1', x: 200, y: 1550, label: 'Arrow Functions', type: 'challenge', challengeId: 'es6-1', sectionId: 'es6' },
  { id: 'es6-2', x: 400, y: 1550, label: 'Destructuring', type: 'challenge', challengeId: 'es6-2', sectionId: 'es6' },
  { id: 'es6-3', x: 600, y: 1550, label: 'Classes', type: 'challenge', challengeId: 'es6-3', sectionId: 'es6' },
  { id: 'boss-es6', x: 400, y: 1660, label: 'ES6 Titanı', type: 'boss', sectionId: 'es6' },
  { id: 'skill-tree', x: 400, y: 1760, label: 'Yetenek Ağacı', type: 'skill', sectionId: 'es6' },
]

export function getChallenge(id: string): Challenge | undefined {
  return CHALLENGES[id]
}

export function getStageLang(stage: BossStage, lang: string): { startingCode: string; tests: string; hint: string } {
  const val = (stage as any)[lang]
  if (val && typeof val === 'object' && 'startingCode' in val) return val
  return { startingCode: stage.startingCode, tests: stage.tests, hint: stage.hint }
}

import { injectLangData, injectBossStageLangData } from './challenges/index'

for (const [id, challenge] of Object.entries(CHALLENGES)) {
  injectLangData(challenge as any, id)
}

for (const section of SECTIONS) {
  if (section.boss) {
    injectBossStageLangData(section.boss.stages, section.boss.id)
  }
}
