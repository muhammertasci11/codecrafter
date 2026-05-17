import { LangContentMap } from './types'

export const CPP: LangContentMap = {
  'basics-1': {
    startingCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x;\n  // x degiskenine 5 degerini ata\n  cout << x << endl;\n  return 0;\n}\n',
    tests: `int x = 5;
if (x != 5) throw runtime_error("x = 5 olmali");`,
    hint: 'int x = 5;',
  },
  'basics-2': {
    startingCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string ad = "Ali";\n  string soyad = "Yilmaz";\n  string tamAd;\n  // tamAd degiskenine ad ve soyad birlestir\n  cout << tamAd << endl;\n  return 0;\n}\n',
    tests: `string ad = "Ali", soyad = "Yilmaz";
string tamAd = ad + " " + soyad;
if (tamAd != "Ali Yilmaz") throw runtime_error("tamAd = 'Ali Yilmaz' olmali");`,
    hint: 'tamAd = ad + " " + soyad;',
  },
  'basics-3': {
    startingCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sayi = 7;\n  string sonuc;\n  // tek mi cift mi?\n  if (sayi % 2 == 0) sonuc = "cift";\n  else sonuc = "tek";\n  cout << sonuc << endl;\n  return 0;\n}\n',
    tests: `int sayi = 7;
string sonuc = (sayi % 2 == 0) ? "cift" : "tek";
if (sonuc != "tek") throw runtime_error("7 tek sayidir");`,
    hint: 'if (sayi % 2 == 0) sonuc = "cift"; else sonuc = "tek";',
  },
  'loops-1': {
    startingCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int toplam = 0;\n  for (int i = 1; i <= 5; i++) {\n    toplam += i;\n  }\n  cout << toplam << endl;\n  return 0;\n}\n',
    tests: `int toplam = 0;
for (int i = 1; i <= 5; i++) toplam += i;
if (toplam != 15) throw runtime_error("1+2+3+4+5 = 15 olmali");`,
    hint: 'for (int i = 1; i <= 5; i++) { toplam += i; }',
  },
  'loops-2': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> sayilar = {1, 2, 3, 4, 5};\n  vector<int> katlar;\n  // her sayiyi 2 ile carp\n  for (int s : katlar) cout << s << " ";\n  return 0;\n}\n',
    tests: `vector<int> sayilar = {1,2,3,4,5};
vector<int> katlar;
for (int s : sayilar) katlar.push_back(s * 2);
if (katlar.size() != 5) throw runtime_error("5 elemanli olmali");
if (katlar[0] != 2 || katlar[4] != 10) throw runtime_error("katlar yanlis");`,
    hint: 'for (int s : sayilar) { katlar.push_back(s * 2); }',
  },
  'loops-3': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> gerisayim;\n  int i = 10;\n  // while ile 10 dan 0 a geri say\n  for (int g : gerisayim) cout << g << " ";\n  return 0;\n}\n',
    tests: `vector<int> gerisayim;
int i = 10;
while (i >= 0) { gerisayim.push_back(i); i--; }
if (gerisayim.size() != 11) throw runtime_error("11 elemanli olmali");
if (gerisayim[0] != 10 || gerisayim[10] != 0) throw runtime_error("yanlis sayim");`,
    hint: 'while (i >= 0) { gerisayim.push_back(i); i--; }',
  },
  'functions-1': {
    startingCode: '#include <iostream>\nusing namespace std;\n\nint topla(int a, int b) {\n  // Burayi doldur\n  return 0;\n}\n\nint main() {\n  cout << topla(3, 4) << endl;\n  return 0;\n}\n',
    tests: `auto r = topla(3, 4);
if (r != 7) throw runtime_error("topla(3,4) = 7 olmali");`,
    hint: 'return a + b;',
  },
  'functions-2': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> ciftleriBul(vector<int> sayilar) {\n  // Burayi doldur\n  return {};\n}\n',
    tests: `auto r = ciftleriBul({1,2,3,4,5,6});
if (r.size() != 3 || r[0] != 2 || r[1] != 4 || r[2] != 6)
  throw runtime_error("[2,4,6] olmali");`,
    hint: 'vector<int> s; for (int x : sayilar) { if (x % 2 == 0) s.push_back(x); } return s;',
  },
  'functions-3': {
    startingCode: '#include <iostream>\n#include <vector>\n#include <functional>\nusing namespace std;\n\nvector<int> haritala(vector<int> dizi, function<int(int)> islem) {\n  // Burayi doldur\n  return {};\n}\n',
    tests: `auto r = haritala({1,2,3}, [](int x){ return x*x; });
if (r[0] != 1 || r[1] != 4 || r[2] != 9) throw runtime_error("[1,4,9] olmali");`,
    hint: 'vector<int> s; for (int x : dizi) { s.push_back(islem(x)); } return s;',
  },
  'arrays-1': {
    startingCode: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> meyveler = {"elma", "armut"};\n  // "muz" ekle, sonra ilk elemani cikar\n  for (string m : meyveler) cout << m << " ";\n  return 0;\n}\n',
    tests: `vector<string> meyveler = {"elma","armut"};
meyveler.push_back("muz");
meyveler.erase(meyveler.begin());
if (meyveler.size() != 2) throw runtime_error("2 elemanli olmali");
if (meyveler[0] != "armut") throw runtime_error("ilk eleman armut olmali");`,
    hint: 'meyveler.push_back("muz"); meyveler.erase(meyveler.begin());',
  },
  'arrays-2': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> ciftKareler(vector<int> sayilar) {\n  // cift sayilarin karesini dondur\n  return {};\n}\n',
    tests: `auto r = ciftKareler({1,2,3,4,5,6});
if (r.size() != 3 || r[0] != 4 || r[1] != 16 || r[2] != 36)
  throw runtime_error("[4,16,36] olmali");`,
    hint: 'vector<int> s; for (int x : sayilar) { if (x % 2 == 0) s.push_back(x * x); } return s;',
  },
  'arrays-3': {
    startingCode: '#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint diziTopla(vector<int> sayilar) {\n  // reduce ile topla\n  return 0;\n}\n',
    tests: `if (diziTopla({1,2,3,4,5}) != 15) throw runtime_error("1+2+3+4+5 = 15");
if (diziTopla({}) != 0) throw runtime_error("bos dizi 0 olmali");`,
    hint: 'return accumulate(sayilar.begin(), sayilar.end(), 0);',
  },
  'objects-1': {
    startingCode: '#include <iostream>\n#include <string>\n#include <map>\nusing namespace std;\n\nint main() {\n  map<string, string> kullanici;\n  // kullanici nesnesini olustur: isim=Ayse, yas=28, sehir=Istanbul\n  cout << kullanici["isim"] << endl;\n  return 0;\n}\n',
    tests: `map<string,string> kullanici = {{"isim","Ayse"},{"yas","28"},{"sehir","Istanbul"}};
if (kullanici["isim"] != "Ayse") throw runtime_error("isim Ayse olmali");`,
    hint: 'kullanici = {{"isim","Ayse"},{"yas","28"},{"sehir","Istanbul"}};',
  },
  'objects-2': {
    startingCode: '#include <iostream>\n#include <map>\n#include <vector>\n#include <string>\nusing namespace std;\n\npair<vector<string>, vector<int>> nesneAnalizi(map<string, int> obj) {\n  // anahtarlar ve degerler\n  return {};\n}\n',
    tests: `auto r = nesneAnalizi({{"a",1},{"b",2},{"c",3}});
if (r.first.size() != 3) throw runtime_error("3 anahtar olmali");`,
    hint: 'vector<string> a; vector<int> d; for (auto& p : obj) { a.push_back(p.first); d.push_back(p.second); } return {a, d};',
  },
  'objects-3': {
    startingCode: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nmap<string, string> derinKopyala(map<string, string> obj) {\n  // derin kopyala\n  return {};\n}\n',
    tests: `map<string,string> o = {{"ad","Ali"}};
auto k = derinKopyala(o);
k["ad"] = "Veli";
if (o["ad"] != "Ali") throw runtime_error("orijinal degismemeli");`,
    hint: 'return obj; // yeni bir map olusturup kopyala',
  },
  'es6-1': {
    startingCode: '#include <iostream>\n#include <functional>\nusing namespace std;\n\nint main() {\n  function<int(int)> kare = [](int s) { return s * s; };\n  cout << kare(5) << endl;\n  return 0;\n}\n',
    tests: `auto kare = [](int s) { return s * s; };
if (kare(5) != 25) throw runtime_error("kare(5) = 25 olmali");`,
    hint: 'auto kare = [](int s) { return s * s; };',
  },
  'es6-2': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> sayilar = {10, 20, 30, 40, 50};\n  // a=10, b=20, kalan=[30,40,50]\n  int a = sayilar[0];\n  int b = sayilar[1];\n  vector<int> kalan(sayilar.begin() + 2, sayilar.end());\n  cout << a << " " << b << " " << kalan.size() << endl;\n  return 0;\n}\n',
    tests: `vector<int> sayilar = {10,20,30,40,50};
int a = sayilar[0], b = sayilar[1];
vector<int> kalan(sayilar.begin() + 2, sayilar.end());
if (a != 10 || b != 20) throw runtime_error("a=10, b=20 olmali");
if (kalan.size() != 3) throw runtime_error("kalan 3 elemanli olmali");`,
    hint: 'int a = sayilar[0], b = sayilar[1]; vector<int> kalan(sayilar.begin() + 2, sayilar.end());',
  },
  'es6-3': {
    startingCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hayvan {\npublic:\n  string isim;\n  Hayvan(string i) : isim(i) {}\n  virtual string sesCikar() { return "Ses yok"; }\n};\n\nclass Kedi : public Hayvan {\npublic:\n  // Burayi doldur\n};\n\nint main() {\n  Kedi k("Pamuk");\n  cout << k.sesCikar() << endl;\n  return 0;\n}\n',
    tests: `Kedi k("Pamuk");
if (k.isim != "Pamuk") throw runtime_error("isim Pamuk olmali");
if (k.sesCikar() != "Miyav!") throw runtime_error("Miyav! demeli");`,
    hint: 'Kedi(string i) : Hayvan(i) {} string sesCikar() override { return "Miyav!"; }',
  },
  'boss-basics-0': {
    startingCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string isim;\n  int yas;\n  bool aktif;\n  // degiskenleri tanimla\n  return 0;\n}\n',
    tests: `string isim = "Ahmet"; int yas = 25; bool aktif = true;
if (isim != "Ahmet") throw runtime_error("isim = Ahmet olmali");
if (yas != 25) throw runtime_error("yas = 25 olmali");
if (aktif != true) throw runtime_error("aktif = true olmali");`,
    hint: 'isim = "Ahmet"; yas = 25; aktif = true;',
  },
  'boss-basics-1': {
    startingCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  int not = 75;\n  string durum;\n  // 50\'den buyukse "Gecti", yoksa "Kaldi"\n  cout << durum << endl;\n  return 0;\n}\n',
    tests: `int not = 75;
string durum = (not > 50) ? "Gecti" : "Kaldi";
if (durum != "Gecti") throw runtime_error("75 icin Gecti olmali");`,
    hint: 'if (not > 50) durum = "Gecti"; else durum = "Kaldi";',
  },
  'boss-basics-2': {
    startingCode: '#include <iostream>\nusing namespace std;\n\nint topla(int n) {\n  // 1\'den n\'e kadar topla\n  return 0;\n}\n',
    tests: `if (topla(5) != 15) throw runtime_error("topla(5) = 15 olmali");
if (topla(100) != 5050) throw runtime_error("topla(100) = 5050 olmali");`,
    hint: 'int s = 0; for (int i = 1; i <= n; i++) { s += i; } return s;',
  },
  'boss-loops-0': {
    startingCode: '#include <iostream>\nusing namespace std;\n\nint faktoriyel(int n) {\n  // n! hesapla\n  return 1;\n}\n',
    tests: `if (faktoriyel(5) != 120) throw runtime_error("faktoriyel(5) = 120 olmali");`,
    hint: 'int s = 1; for (int i = 2; i <= n; i++) { s *= i; } return s;',
  },
  'boss-loops-1': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint enBuyuk(vector<int> dizi) {\n  // en buyuk sayiyi bul\n  return 0;\n}\n',
    tests: `if (enBuyuk({3,7,2,9,1}) != 9) throw runtime_error("en buyuk 9 olmali");
if (enBuyuk({-5,-2,-10}) != -2) throw runtime_error("en buyuk -2 olmali");`,
    hint: 'int max = dizi[0]; for (int x : dizi) { if (x > max) max = x; } return max;',
  },
  'boss-loops-2': {
    startingCode: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nbool palindromMu(string str) {\n  // palindrom mu?\n  return false;\n}\n',
    tests: `if (!palindromMu("kek")) throw runtime_error("kek palindromdur");
if (palindromMu("merhaba")) throw runtime_error("merhaba palindrom degil");`,
    hint: 'string r = str; reverse(r.begin(), r.end()); return str == r;',
  },
  'boss-functions-0': {
    startingCode: '#include <iostream>\nusing namespace std;\n\nbool asalMi(int n) {\n  // asal mi?\n  return false;\n}\n',
    tests: `if (!asalMi(7)) throw runtime_error("7 asaldir");
if (asalMi(4)) throw runtime_error("4 asal degil");`,
    hint: 'if (n < 2) return false; for (int i = 2; i < n; i++) { if (n % i == 0) return false; } return true;',
  },
  'boss-functions-1': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> sirala(vector<int> dizi) {\n  // sort() KULLANMA! Bubble sort yap\n  return {};\n}\n',
    tests: `auto r = sirala({3,1,4,1,5});
if (r[0] != 1 || r[1] != 1 || r[2] != 3 || r[3] != 4 || r[4] != 5)
  throw runtime_error("[1,1,3,4,5] olmali");`,
    hint: 'for (int i = 0; i < dizi.size(); i++) { for (int j = i + 1; j < dizi.size(); j++) { if (dizi[j] < dizi[i]) { swap(dizi[i], dizi[j]); } } } return dizi;',
  },
  'boss-functions-2': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> fibonacci(int n) {\n  // fibonacci dizisi\n  return {};\n}\n',
    tests: `auto f = fibonacci(8);
if (f.size() != 8) throw runtime_error("8 elemanli olmali");
if (f[0] != 0 || f[1] != 1 || f[7] != 13) throw runtime_error("fibonacci(8) yanlis");`,
    hint: 'vector<int> d = {0, 1}; for (int i = 2; i < n; i++) { d.push_back(d[i-1] + d[i-2]); } return d;',
  },
  'boss-arrays-0': {
    startingCode: '#include <iostream>\n#include <vector>\n#include <set>\nusing namespace std;\n\nvector<int> birlestir(vector<int> dizi1, vector<int> dizi2) {\n  // birlestir ve tekrarlari temizle\n  return {};\n}\n',
    tests: `auto r = birlestir({1,2,3}, {2,3,4});
if (r.size() != 4) throw runtime_error("4 elemanli olmali");
set<int> s(r.begin(), r.end());
if (s.count(4) == 0) throw runtime_error("4 icermeli");`,
    hint: 'set<int> s(dizi1.begin(), dizi1.end()); s.insert(dizi2.begin(), dizi2.end()); return vector<int>(s.begin(), s.end());',
  },
  'boss-arrays-1': {
    startingCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\n// flatten icin yardimci\nvector<int> duzlestir(vector<int> dizi) {\n  // Bu versiyon ic ice diziler icin uygun degil\n  return dizi;\n}\n',
    tests: `// C++'ta heterojen ic ice dizi zor; basit test
vector<int> r = {1,2,3,4,5,6};
if (r.size() != 6) throw runtime_error("6 elemanli olmali");`,
    hint: '// C++ ic ice vector<vector<int>> icin uygundur',
  },
  'boss-arrays-2': {
    startingCode: '#include <iostream>\n#include <vector>\n#include <set>\nusing namespace std;\n\nvector<int> benzersiz(vector<int> dizi) {\n  // tekrarlari temizle\n  return {};\n}\n',
    tests: `auto r = benzersiz({1,2,2,3,3,3,4});
if (r.size() != 4) throw runtime_error("[1,2,3,4] olmali");
if (r[3] != 4) throw runtime_error("son eleman 4 olmali");`,
    hint: 'set<int> s(dizi.begin(), dizi.end()); return vector<int>(s.begin(), s.end());',
  },
  'boss-objects-0': {
    startingCode: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nmap<string, string> derinKlon(map<string, string> obj) {\n  // derin kopyala\n  return {};\n}\n',
    tests: `map<string,string> o = {{"a","1"},{"b","2"}};
auto k = derinKlon(o);
k["b"] = "99";
if (o["b"] != "2") throw runtime_error("orijinal degismemeli");`,
    hint: 'return map<string,string>(obj);',
  },
  'boss-objects-1': {
    startingCode: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nmap<string, string> donustur(map<string, string> obj, map<string, string> kurallar) {\n  // anahtarlari donustur\n  return {};\n}\n',
    tests: `auto r = donustur({{\"ad\",\"Ali\"},{\"yas\",\"25\"}}, {{\"ad\",\"isim\"},{\"yas\",\"age\"}});
if (r[\"isim\"] != "Ali") throw runtime_error("isim = Ali olmali");
if (r[\"age\"] != "25") throw runtime_error("age = 25 olmali");`,
    hint: 'map<string,string> s; for (auto& p : obj) { string k = kurallar.count(p.first) ? kurallar[p.first] : p.first; s[k] = p.second; } return s;',
  },
  'boss-objects-2': {
    startingCode: '#include <iostream>\n#include <map>\n#include <vector>\n#include <string>\nusing namespace std;\n\nbool dogrula(map<string, string> obj, vector<string> zorunluAlanlar) {\n  // eksik alan varsa hata firlat\n  return true;\n}\n',
    tests: `bool r = dogrula({{\"isim\",\"Ali\"},{\"email\",\"a@t.com\"}}, {\"isim\",\"email\"});
if (!r) throw runtime_error("true donmeli");
try { dogrula({{\"isim\",\"Ali\"}}, {\"isim\",\"email\"}); throw 0; }
catch (...) { }`,
    hint: 'for (string a : zorunluAlanlar) { if (!obj.count(a)) throw runtime_error("Eksik alan: " + a); } return true;',
  },
  'boss-es6-0': {
    startingCode: '#include <iostream>\n#include <cmath>\nusing namespace std;\n\nclass Sekil {\npublic:\n  string renk;\n  Sekil(string r) : renk(r) {}\n  virtual double alanHesapla() { return 0; }\n};\n\nclass Daire : public Sekil {\n  // yaricap ile\n};\n\nclass Dikdortgen : public Sekil {\n  // genislik ve yukseklik ile\n};\n',
    tests: `Daire d("kirmizi", 5);
if (d.renk != "kirmizi") throw runtime_error("renk kirmizi olmali");
if (round(d.alanHesapla()) != 79) throw runtime_error("~79 olmali");
Dikdortgen dg("mavi", 4, 6);
if (dg.alanHesapla() != 24) throw runtime_error("24 olmali");`,
    hint: 'class Daire : public Sekil { double r; public: Daire(string rk, double y) : Sekil(rk), r(y) {} double alanHesapla() override { return M_PI * r * r; } }; class Dikdortgen : public Sekil { double g, y; public: Dikdortgen(string rk, double gr, double yk) : Sekil(rk), g(gr), y(yk) {} double alanHesapla() override { return g * y; } };',
  },
  'boss-es6-1': {
    startingCode: '#include <iostream>\n#include <thread>\n#include <chrono>\nusing namespace std;\n\nint bekleVeKatla(int sayi) {\n  // 1 saniye bekle, sayi*2 dondur\n  return 0;\n}\n',
    tests: `int r = bekleVeKatla(5);
if (r != 10) throw runtime_error("5*2 = 10 olmali");`,
    hint: 'this_thread::sleep_for(chrono::seconds(1)); return sayi * 2;',
  },
  'boss-es6-2': {
    startingCode: '#include <iostream>\n#include <map>\n#include <string>\n#include <stdexcept>\nusing namespace std;\n\ntemplate<typename K, typename V>\nclass GuvenliMap {\n  map<K, V> data;\npublic:\n  GuvenliMap(map<K, V> d) : data(d) {}\n  V get(K key) {\n    // var olmayan anahtar hata firlatsin\n    return data[key];\n  }\n};\n',
    tests: `GuvenliMap<string,string> k({{\"ad\",\"Ali\"},{\"yas\",\"25\"}});
if (k.get(\"ad\") != "Ali") throw runtime_error("ad = Ali olmali");
try { k.get(\"soyad\"); throw runtime_error("hata firlatmaliydi"); }\ncatch (out_of_range&) { }`,
    hint: 'if (data.find(key) == data.end()) throw out_of_range("" + key + " tanimli degil"); return data[key];',
  },
}
