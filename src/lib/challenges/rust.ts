import { LangContentMap } from './types'

export const RUST: LangContentMap = {
  'basics-1': {
    startingCode: 'fn main() {\n  let mut x: i32;\n  // x degiskenine 5 degerini ata\n  println!("{}", x);\n}\n',
    tests: `let x = 5;\nif x != 5 { panic!("x = 5 olmali") }`,
    hint: 'let x = 5;',
  },
  'basics-2': {
    startingCode: 'fn main() {\n  let ad = "Ali";\n  let soyad = "Yilmaz";\n  let tamAd: String;\n  // ad ve soyad birlestir\n  println!("{}", tamAd);\n}\n',
    tests: `let ad = "Ali"; let soyad = "Yilmaz";\nlet tamAd = format!("{} {}", ad, soyad);\nif tamAd != "Ali Yilmaz" { panic!("Ali Yilmaz olmali") }`,
    hint: 'tamAd = format!("{} {}", ad, soyad)',
  },
  'basics-3': {
    startingCode: 'fn main() {\n  let sayi = 7;\n  let sonuc: &str;\n  // tek mi cift mi?\n  println!("{}", sonuc);\n}\n',
    tests: `let sayi = 7;\nlet sonuc = if sayi % 2 == 0 { "cift" } else { "tek" };\nif sonuc != "tek" { panic!("7 tek") }`,
    hint: 'let sonuc = if sayi % 2 == 0 { "cift" } else { "tek" }',
  },
  'loops-1': {
    startingCode: 'fn main() {\n  let mut toplam = 0;\n  for i in 1..=5 {\n    toplam += i;\n  }\n  println!("{}", toplam);\n}\n',
    tests: `let mut toplam = 0;\nfor i in 1..=5 { toplam += i }\nif toplam != 15 { panic!("15 olmali") }`,
    hint: 'for i in 1..=5 { toplam += i }',
  },
  'loops-2': {
    startingCode: 'fn main() {\n  let sayilar = vec![1,2,3,4,5];\n  let mut katlar = vec![];\n  // her sayiyi 2 ile carp\n  println!("{:?}", katlar);\n}\n',
    tests: `let sayilar = vec![1,2,3,4,5];\nlet katlar: Vec<i32> = sayilar.iter().map(|s| s*2).collect();\nif katlar[0]!=2||katlar[4]!=10{panic!("katlar yanlis")}`,
    hint: 'let katlar: Vec<i32> = sayilar.iter().map(|s| s * 2).collect();',
  },
  'loops-3': {
    startingCode: 'fn main() {\n  let mut gerisayim = vec![];\n  let mut i = 10;\n  // while ile 10 dan 0 a geri say\n  println!("{:?}", gerisayim);\n}\n',
    tests: `let mut gerisayim=vec![];let mut i=10;\nwhile i>=0{gerisayim.push(i);i-=1}\nif gerisayim[0]!=10||gerisayim[10]!=0{panic!("yanlis sayim")}`,
    hint: 'while i >= 0 { gerisayim.push(i); i -= 1 }',
  },
  'functions-1': {
    startingCode: 'fn topla(a: i32, b: i32) -> i32 {\n  // Burayi doldur\n  0\n}\n\nfn main() { println!("{}", topla(3,4)) }\n',
    tests: `if topla(3,4) != 7 { panic!("topla(3,4)=7 olmali") }`,
    hint: 'a + b',
  },
  'functions-2': {
    startingCode: 'fn ciftleriBul(sayilar: Vec<i32>) -> Vec<i32> {\n  // Burayi doldur\n  vec![]\n}\n',
    tests: `let r = ciftleriBul(vec![1,2,3,4,5,6]);\nif r.len()!=3||r[0]!=2||r[1]!=4||r[2]!=6{panic!("[2,4,6] olmali")}`,
    hint: 'sayilar.into_iter().filter(|x| x % 2 == 0).collect()',
  },
  'functions-3': {
    startingCode: 'fn haritala(dizi: Vec<i32>, islem: fn(i32) -> i32) -> Vec<i32> {\n  // Burayi doldur\n  vec![]\n}\n',
    tests: `let r = haritala(vec![1,2,3], |x| x*x);\nif r[0]!=1||r[1]!=4||r[2]!=9{panic!("[1,4,9] olmali")}`,
    hint: 'dizi.into_iter().map(islem).collect()',
  },
  'arrays-1': {
    startingCode: 'fn main() {\n  let mut meyveler = vec!["elma","armut"];\n  // "muz" ekle, sonra ilk elemani cikar\n  println!("{:?}", meyveler);\n}\n',
    tests: `let mut meyveler = vec!["elma","armut"];\nmeyveler.push("muz");\nmeyveler.remove(0);\nif meyveler.len()!=2||meyveler[0]!="armut"{panic!("armut,muz olmali")}`,
    hint: 'meyveler.push("muz"); meyveler.remove(0);',
  },
  'arrays-2': {
    startingCode: 'fn ciftKareler(sayilar: Vec<i32>) -> Vec<i32> {\n  // cift sayilarin karesi\n  vec![]\n}\n',
    tests: `let r = ciftKareler(vec![1,2,3,4,5,6]);\nif r.len()!=3||r[0]!=4||r[1]!=16||r[2]!=36{panic!("[4,16,36] olmali")}`,
    hint: 'sayilar.into_iter().filter(|x| x%2==0).map(|x| x*x).collect()',
  },
  'arrays-3': {
    startingCode: 'fn diziTopla(sayilar: Vec<i32>) -> i32 {\n  // topla\n  0\n}\n',
    tests: `if diziTopla(vec![1,2,3,4,5])!=15{panic!("15 olmali")}\nif diziTopla(vec![])!=0{panic!("0 olmali")}`,
    hint: 'sayilar.iter().sum()',
  },
  'objects-1': {
    startingCode: 'struct Kullanici {\n  isim: String,\n  yas: i32,\n  sehir: String,\n}\n\nfn main() {\n  let k = Kullanici { isim: String::new(), yas: 0, sehir: String::new() };\n  // kullanici olustur\n  println!("{}", k.isim);\n}\n',
    tests: `let k = Kullanici { isim: "Ayse".into(), yas: 28, sehir: "Istanbul".into() };\nif k.isim != "Ayse" { panic!("isim Ayse olmali") }`,
    hint: 'let k = Kullanici { isim: "Ayse".into(), yas: 28, sehir: "Istanbul".into() }',
  },
  'objects-2': {
    startingCode: 'use std::collections::HashMap;\n\nfn nesneAnalizi(obj: HashMap<String, i32>) -> (Vec<String>, Vec<i32>) {\n  // anahtarlar ve degerler\n  (vec![], vec![])\n}\n',
    tests: `let mut m = HashMap::new(); m.insert("a".into(),1); m.insert("b".into(),2);\nlet (a,d) = nesneAnalizi(m);\nif a.len()!=3{panic!("3 anahtar olmali")}`,
    hint: '(obj.keys().cloned().collect(), obj.values().cloned().collect())',
  },
  'objects-3': {
    startingCode: 'use std::collections::HashMap;\n\nfn derinKopyala(obj: HashMap<String, String>) -> HashMap<String, String> {\n  // derin kopyala\n  obj\n}\n',
    tests: `let mut o = HashMap::new(); o.insert("ad".into(),"Ali".into());\nlet mut k = derinKopyala(o.clone());\nk.insert("ad".into(),"Veli".into());\nif o["ad"]!="Ali"{panic!("orijinal degismemeli")}`,
    hint: 'obj.clone()',
  },
  'es6-1': {
    startingCode: 'fn kare(s: i32) -> i32 { s * s }\n\nfn main() { println!("{}", kare(5)) }\n',
    tests: `if kare(5)!=25{panic!("kare(5)=25 olmali")}`,
    hint: 's * s',
  },
  'es6-2': {
    startingCode: 'fn main() {\n  let sayilar = vec![10,20,30,40,50];\n  let a = sayilar[0];\n  let b = sayilar[1];\n  let kalan = &sayilar[2..];\n  println!("{} {} {:?}", a, b, kalan);\n}\n',
    tests: `let sayilar=vec![10,20,30,40,50];let(a,b):(i32,i32)=(sayilar[0],sayilar[1]);let kalan=&sayilar[2..];\nif a!=10||b!=20||kalan.len()!=3{panic!("a=10,b=20,kalan=3")}`,
    hint: 'let (a, b) = (sayilar[0], sayilar[1]); let kalan = &sayilar[2..];',
  },
  'es6-3': {
    startingCode: 'trait Hayvan {\n  fn isim(&self) -> &str;\n  fn sesCikar(&self) -> &str { "Ses yok" }\n}\n\nstruct Kedi { isim: String }\n\nimpl Hayvan for Kedi {\n  fn isim(&self) -> &str { &self.isim }\n  fn sesCikar(&self) -> &str {\n    // "Miyav!" dondur\n    ""\n  }\n}\n\nfn main() {\n  let k = Kedi { isim: "Pamuk".into() };\n  println!("{}", k.sesCikar());\n}\n',
    tests: `let k = Kedi { isim: "Pamuk".into() };\nif k.isim()!="Pamuk"{panic!("isim Pamuk olmali")}\nif k.sesCikar()!="Miyav!"{panic!("Miyav! demeli")}`,
    hint: '"Miyav!"',
  },
  'boss-basics-0': {
    startingCode: 'fn main() {\n  let isim: &str;\n  let yas: i32;\n  let aktif: bool;\n  // degiskenleri tanimla\n}\n',
    tests: `let(isim,yas,aktif)=("Ahmet",25,true);\nif isim!="Ahmet"||yas!=25||aktif!=true{panic!("degiskenler yanlis")}`,
    hint: 'let (isim, yas, aktif) = ("Ahmet", 25, true);',
  },
  'boss-basics-1': {
    startingCode: 'fn main() {\n  let not = 75;\n  let durum: &str;\n  // 50 den buyukse "Gecti", yoksa "Kaldi"\n  println!("{}", durum);\n}\n',
    tests: `let not=75;let durum=if not>50{"Gecti"}else{"Kaldi"};\nif durum!="Gecti"{panic!("Gecti olmali")}`,
    hint: 'let durum = if not > 50 { "Gecti" } else { "Kaldi" }',
  },
  'boss-basics-2': {
    startingCode: 'fn topla(n: i32) -> i32 {\n  // 1 den n e kadar topla\n  0\n}\n',
    tests: `if topla(5)!=15{panic!("15 olmali")};if topla(100)!=5050{panic!("5050 olmali")}`,
    hint: '(1..=n).sum()',
  },
  'boss-loops-0': {
    startingCode: 'fn faktoriyel(n: i32) -> i32 {\n  // n! hesapla\n  1\n}\n',
    tests: `if faktoriyel(5)!=120{panic!("120 olmali")}`,
    hint: '(1..=n).product()',
  },
  'boss-loops-1': {
    startingCode: 'fn enBuyuk(dizi: Vec<i32>) -> i32 {\n  // en buyuk sayiyi bul\n  0\n}\n',
    tests: `if enBuyuk(vec![3,7,2,9,1])!=9{panic!("9 olmali")}`,
    hint: 'dizi.into_iter().max().unwrap()',
  },
  'boss-loops-2': {
    startingCode: 'fn palindromMu(str: &str) -> bool {\n  // palindrom mu?\n  false\n}\n',
    tests: `if!palindromMu("kek"){panic!("kek palindromdur")};if palindromMu("merhaba"){panic!("merhaba degil")}`,
    hint: 'str.chars().eq(str.chars().rev())',
  },
  'boss-functions-0': {
    startingCode: 'fn asalMi(n: i32) -> bool {\n  // asal mi?\n  false\n}\n',
    tests: `if!asalMi(7){panic!("7 asal")};if asalMi(4){panic!("4 degil")}`,
    hint: 'if n < 2 { return false }; for i in 2..n { if n % i == 0 { return false } }; true',
  },
  'boss-functions-1': {
    startingCode: 'fn sirala(mut dizi: Vec<i32>) -> Vec<i32> {\n  // sort kullanma\n  dizi\n}\n',
    tests: `let r=sirala(vec![3,1,4,1,5]);\nif r[0]!=1||r[1]!=1||r[2]!=3||r[3]!=4||r[4]!=5{panic!("[1,1,3,4,5] olmali")}`,
    hint: 'for i in 0..dizi.len() { for j in i+1..dizi.len() { if dizi[j] < dizi[i] { dizi.swap(i, j) } } }; dizi',
  },
  'boss-functions-2': {
    startingCode: 'fn fibonacci(n: usize) -> Vec<i32> {\n  // fibonacci dizisi\n  vec![]\n}\n',
    tests: `let f=fibonacci(8);\nif f.len()!=8||f[0]!=0||f[1]!=1||f[7]!=13{panic!("fibonacci(8) yanlis")}`,
    hint: 'let mut d = vec![0, 1]; for i in 2..n { d.push(d[i-1] + d[i-2]) }; d',
  },
  'boss-arrays-0': {
    startingCode: 'use std::collections::HashSet;\n\nfn birlestir(d1: Vec<i32>, d2: Vec<i32>) -> Vec<i32> {\n  // birlestir ve tekrarlari temizle\n  vec![]\n}\n',
    tests: `let r=birlestir(vec![1,2,3],vec![2,3,4]);\nif r.len()!=4{panic!("4 elemanli olmali")}`,
    hint: 'let s: HashSet<i32> = d1.into_iter().chain(d2).collect(); s.into_iter().collect()',
  },
  'boss-arrays-1': {
    startingCode: '// Rust ic ice vektorler icin\nfn duzlestir(dizi: Vec<Vec<i32>>) -> Vec<i32> {\n  // duzlestir\n  vec![]\n}\n',
    tests: `let r=duzlestir(vec![vec![1,2],vec![3,4]]);\nif r.len()!=4{panic!("4 elemanli olmali")}`,
    hint: 'dizi.into_iter().flatten().collect()',
  },
  'boss-arrays-2': {
    startingCode: 'use std::collections::HashSet;\n\nfn benzersiz(dizi: Vec<i32>) -> Vec<i32> {\n  // tekrarlari temizle\n  vec![]\n}\n',
    tests: `let r=benzersiz(vec![1,2,2,3,3,3,4]);\nif r.len()!=4||r[3]!=4{panic!("[1,2,3,4] olmali")}`,
    hint: 'let s: HashSet<i32> = dizi.into_iter().collect(); s.into_iter().collect()',
  },
  'boss-objects-0': {
    startingCode: 'use std::collections::HashMap;\n\nfn derinKlon(obj: HashMap<String, String>) -> HashMap<String, String> {\n  // derin kopyala\n  obj\n}\n',
    tests: `let mut o=HashMap::new();o.insert("a".into(),"1".into());o.insert("b".into(),"2".into());\nlet mut k=derinKlon(o.clone());k.insert("b".into(),"99".into());if o["b"]!="2"{panic!("orijinal degismemeli")}`,
    hint: 'obj.clone()',
  },
  'boss-objects-1': {
    startingCode: 'use std::collections::HashMap;\n\nfn donustur(obj: HashMap<String,String>, kurallar: HashMap<String,String>) -> HashMap<String,String> {\n  // anahtarlari donustur\n  HashMap::new()\n}\n',
    tests: `let mut o=HashMap::new();o.insert("ad".into(),"Ali".into());o.insert("yas".into(),"25".into());\nlet mut k=HashMap::new();k.insert("ad".into(),"isim".into());k.insert("yas".into(),"age".into());\nlet r=donustur(o,k);if r["isim"]!="Ali"{panic!("isim=Ali olmali")}`,
    hint: 'obj.into_iter().map(|(k,v)| (kurallar.get(&k).unwrap_or(&k).clone(), v)).collect()',
  },
  'boss-objects-2': {
    startingCode: 'use std::collections::HashMap;\n\nfn dogrula(obj: HashMap<String,String>, zorunlu: Vec<&str>) -> Result<bool, String> {\n  // eksik alan varsa hata dondur\n  Ok(true)\n}\n',
    tests: `let mut o=HashMap::new();o.insert("isim".into(),"Ali".into());o.insert("email".into(),"a@t.com".into());\nlet r=dogrula(o,vec!["isim","email"]);if r!=Ok(true){panic!("true olmali")}`,
    hint: 'for a in zorunlu { if !obj.contains_key(a) { return Err(format!("Eksik alan: {}", a)) } }; Ok(true)',
  },
  'boss-es6-0': {
    startingCode: 'trait Sekil {\n  fn renk(&self) -> &str;\n  fn alanHesapla(&self) -> f64;\n}\n\nstruct Daire { renk: String, r: f64 }\nstruct Dikdortgen { renk: String, g: f64, y: f64 }\n',
    tests: `let d=Daire{renk:"kirmizi".into(),r:5.0};\nif d.renk!="kirmizi"{panic!("renk kirmizi olmali")}`,
    hint: '// impl Sekil for Daire { fn renk(&self) -> &str { &self.renk } fn alanHesapla(&self) -> f64 { std::f64::consts::PI * self.r * self.r } }',
  },
  'boss-es6-1': {
    startingCode: 'use std::thread;\nuse std::time::Duration;\n\nfn bekleVeKatla(sayi: i32) -> i32 {\n  // 1 saniye bekle, sayi*2 dondur\n  0\n}\n',
    tests: `let r=bekleVeKatla(5);\nif r!=10{panic!("5*2=10 olmali")}`,
    hint: 'thread::sleep(Duration::from_secs(1)); sayi * 2',
  },
  'boss-es6-2': {
    startingCode: 'use std::collections::HashMap;\n\nfn guvenliGetir(data: HashMap<String,String>, key: &str) -> Result<String, String> {\n  // var olmayan anahtar hata dondursun\n  Ok("".into())\n}\n',
    tests: `let mut m=HashMap::new();m.insert("ad".into(),"Ali".into());\nlet r=guvenliGetir(m,"ad");\nif r!=Ok("Ali".into()){panic!("Ali olmali")}`,
    hint: 'data.get(key).cloned().ok_or_else(|| format!("{} tanimli degil", key))',
  },
}
