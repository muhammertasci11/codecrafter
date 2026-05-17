export interface CodexEntry {
  id: string
  title: string
  concept: string
  example: string
  miniChallenge: string
  color: string
}

export const CODEX_DATA: CodexEntry[] = [
  {
    id: 'basics',
    title: 'Temeller',
    color: '#00d4ff',
    concept: `Değişkenler, verileri saklamak için kullanılan konteynırlardır. JavaScript'te değişken tanımlamak için let, const veya var kullanılır.

let ile tanımlanan değişkenler yeniden atanabilir.
const ile tanımlananlar sabittir — değiştirilemez.

String metinler, number sayılar, boolean true/false değerleridir.
If-else ile koşullu kod yazılır.`,
    example: `let name = "Ali";
const age = 25;
let isActive = true;

if (age >= 18) {
  console.log("Yetişkin");
} else {
  console.log("Çocuk");
}`,
    miniChallenge: 'Bir `name` ve `age` değişkeni tanımla, sonra age 18\'den büyükse "Yetişkin" yazdır.',
  },
  {
    id: 'loops',
    title: 'Döngüler',
    color: '#7c3aed',
    concept: `Döngüler, aynı kodu birden çok kez çalıştırmak için kullanılır.

For döngüsü: Belirli sayıda tekrar için idealdir.
While döngüsü: Koşul sağlandığı sürece çalışır.

Diziler (arrays) birden çok değeri tek bir değişkende saklar.
Dizi elemanlarına index ile erişilir (0'dan başlar).`,
    example: `// For döngüsü
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While döngüsü
let j = 0;
while (j < 5) {
  console.log(j);
  j++;
}

// Dizi
let fruits = ["elma", "armut", "muz"];
console.log(fruits[0]); // "elma"`,
    miniChallenge: '1\'den 10\'a kadar sayıları toplayan bir for döngüsü yaz.',
  },
  {
    id: 'functions',
    title: 'Fonksiyonlar',
    color: '#ec4899',
    concept: `Fonksiyonlar, tekrar kullanılabilir kod bloklarıdır.

function anahtar kelimesi ile tanımlanır.
Parametre alabilir ve değer döndürebilir.
Callback fonksiyonlar, başka bir fonksiyona parametre olarak geçirilir.`,
    example: `// Fonksiyon tanımlama
function topla(a, b) {
  return a + b;
}

// Callback kullanımı
function islemYap(sayi, islem) {
  return islem(sayi);
}

let karesi = islemYap(5, x => x * x);
console.log(karesi); // 25`,
    miniChallenge: 'İki sayıyı çarpan bir fonksiyon yaz ve 3 ile 7\'yi çarp.',
  },
  {
    id: 'arrays',
    title: 'Diziler',
    color: '#22d3ee',
    concept: `JavaScript'in Array metodları dizilerle çalışmayı kolaylaştırır.

map(): Her elemanı dönüştürür, yeni dizi döndürür.
filter(): Koşulu sağlayan elemanları filtreler.
reduce(): Tüm elemanları tek bir değere indirger.`,
    example: `let sayilar = [1, 2, 3, 4, 5];

// map - her sayının karesi
let kareler = sayilar.map(s => s * s);

// filter - çift sayılar
let ciftler = sayilar.filter(s => s % 2 === 0);

// reduce - toplam
let toplam = sayilar.reduce((acc, s) => acc + s, 0);

console.log(toplam); // 15`,
    miniChallenge: 'Bir sayı dizisindeki tek sayıların karelerini döndüren kod yaz.',
  },
  {
    id: 'objects',
    title: 'Nesneler',
    color: '#f59e0b',
    concept: `Nesneler, anahtar-değer çiftleri halinde veri saklar.

{} süslü parantez ile oluşturulur.
Object.keys() tüm anahtarları döndürür.
Object.values() tüm değerleri döndürür.
JSON.stringify() nesneyi string'e çevirir.`,
    example: `let kullanici = {
  isim: "Ayşe",
  yas: 28,
  sehir: "İstanbul"
};

console.log(Object.keys(kullanici));
// ["isim", "yas", "sehir"]

console.log(Object.values(kullanici));
// ["Ayşe", 28, "İstanbul"]

let json = JSON.stringify(kullanici);
console.log(json);
// {"isim":"Ayşe","yas":28,"sehir":"İstanbul"}`,
    miniChallenge: 'Bir araba nesnesi oluştur: marka, model, yıl özellikleri ile.',
  },
  {
    id: 'es6',
    title: 'ES6+ Modern JS',
    color: '#00d4ff',
    concept: `ES6, JavaScript'e birçok modern özellik getirdi.

Arrow functions: Kısa fonksiyon yazımı (=>)
Destructuring: Dizi/nesne elemanlarını kolayca ayırma
Class: OOP tabanlı programlama
Spread operator (...): Dizileri/nesneleri birleştirme`,
    example: `// Arrow function
const kare = s => s * s;

// Destructuring
const [a, b, ...kalan] = [1, 2, 3, 4, 5];

// Class
class Hayvan {
  constructor(isim) {
    this.isim = isim;
  }
  sesCikar() {
    return "Ses yok";
  }
}

class Kedi extends Hayvan {
  sesCikar() {
    return "Miyav!";
  }
}

const pamuk = new Kedi("Pamuk");
console.log(pamuk.sesCikar()); // "Miyav!"`,
    miniChallenge: 'Bir arrow function ile iki sayıyı toplayan fonksiyon yaz.',
  },
]
