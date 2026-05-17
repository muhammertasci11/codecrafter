import { LangContentMap } from './types'

export const GO: LangContentMap = {
  'basics-1': {
    startingCode: 'package main\n\nfunc main() {\n  var x int\n  // x degiskenine 5 degerini ata\n  println(x)\n}\n',
    tests: `x := 5\nif x != 5 { panic("x = 5 olmali") }`,
    hint: 'x = 5',
  },
  'basics-2': {
    startingCode: 'package main\n\nfunc main() {\n  ad := "Ali"\n  soyad := "Yilmaz"\n  var tamAd string\n  // ad ve soyad birlestir\n  println(tamAd)\n}\n',
    tests: `ad, soyad := "Ali", "Yilmaz"\ntamAd := ad + " " + soyad\nif tamAd != "Ali Yilmaz" { panic("Ali Yilmaz olmali") }`,
    hint: 'tamAd = ad + " " + soyad',
  },
  'basics-3': {
    startingCode: 'package main\n\nfunc main() {\n  sayi := 7\n  var sonuc string\n  // tek mi cift mi?\n  println(sonuc)\n}\n',
    tests: `sayi := 7\nsonuc := ""\nif sayi%2==0 { sonuc = "cift" } else { sonuc = "tek" }\nif sonuc != "tek" { panic("7 tek") }`,
    hint: 'if sayi%2==0 { sonuc = "cift" } else { sonuc = "tek" }',
  },
  'loops-1': {
    startingCode: 'package main\n\nfunc main() {\n  toplam := 0\n  for i := 1; i <= 5; i++ {\n    toplam += i\n  }\n  println(toplam)\n}\n',
    tests: `toplam := 0\nfor i:=1; i<=5; i++ { toplam += i }\nif toplam != 15 { panic("15 olmali") }`,
    hint: 'for i := 1; i <= 5; i++ { toplam += i }',
  },
  'loops-2': {
    startingCode: 'package main\n\nfunc main() {\n  sayilar := []int{1,2,3,4,5}\n  katlar := []int{}\n  // her sayiyi 2 ile carp\n  println(katlar)\n}\n',
    tests: `sayilar := []int{1,2,3,4,5}\nkatlar := []int{}\nfor _, s := range sayilar { katlar = append(katlar, s*2) }\nif katlar[0]!=2||katlar[4]!=10 { panic("katlar yanlis") }`,
    hint: 'for _, s := range sayilar { katlar = append(katlar, s*2) }',
  },
  'loops-3': {
    startingCode: 'package main\n\nfunc main() {\n  gerisayim := []int{}\n  i := 10\n  // while ile 10 dan 0 a geri say\n  println(gerisayim)\n}\n',
    tests: `gerisayim := []int{}\ni := 10\nfor i >= 0 { gerisayim = append(gerisayim, i); i-- }\nif gerisayim[0]!=10||gerisayim[10]!=0 { panic("yanlis sayim") }`,
    hint: 'for i >= 0 { gerisayim = append(gerisayim, i); i-- }',
  },
  'functions-1': {
    startingCode: 'package main\n\nfunc topla(a, b int) int {\n  // Burayi doldur\n  return 0\n}\n\nfunc main() { println(topla(3,4)) }\n',
    tests: `if topla(3,4) != 7 { panic("topla(3,4) = 7 olmali") }`,
    hint: 'return a + b',
  },
  'functions-2': {
    startingCode: 'package main\n\nfunc ciftleriBul(sayilar []int) []int {\n  // Burayi doldur\n  return []int{}\n}\n',
    tests: `r := ciftleriBul([]int{1,2,3,4,5,6})\nif len(r)!=3||r[0]!=2||r[1]!=4||r[2]!=6 { panic("[2,4,6] olmali") }`,
    hint: 's := []int{}; for _, x := range sayilar { if x%2==0 { s = append(s, x) } }; return s',
  },
  'functions-3': {
    startingCode: 'package main\n\nfunc haritala(dizi []int, islem func(int) int) []int {\n  // Burayi doldur\n  return []int{}\n}\n',
    tests: `r := haritala([]int{1,2,3}, func(x int) int { return x*x })\nif r[0]!=1||r[1]!=4||r[2]!=9 { panic("[1,4,9] olmali") }`,
    hint: 's := []int{}; for _, x := range dizi { s = append(s, islem(x)) }; return s',
  },
  'arrays-1': {
    startingCode: 'package main\n\nfunc main() {\n  meyveler := []string{"elma","armut"}\n  // "muz" ekle, sonra ilk elemani cikar\n  println(meyveler)\n}\n',
    tests: `meyveler := []string{"elma","armut"}\nmeyveler = append(meyveler, "muz")\nmeyveler = meyveler[1:]\nif len(meyveler)!=2||meyveler[0]!="armut" { panic("armut,muz olmali") }`,
    hint: 'meyveler = append(meyveler, "muz"); meyveler = meyveler[1:]',
  },
  'arrays-2': {
    startingCode: 'package main\n\nfunc ciftKareler(sayilar []int) []int {\n  // cift sayilarin karesi\n  return []int{}\n}\n',
    tests: `r := ciftKareler([]int{1,2,3,4,5,6})\nif len(r)!=3||r[0]!=4||r[1]!=16||r[2]!=36 { panic("[4,16,36] olmali") }`,
    hint: 's := []int{}; for _, x := range sayilar { if x%2==0 { s = append(s, x*x) } }; return s',
  },
  'arrays-3': {
    startingCode: 'package main\n\nfunc diziTopla(sayilar []int) int {\n  // topla\n  return 0\n}\n',
    tests: `if diziTopla([]int{1,2,3,4,5}) != 15 { panic("15 olmali") }\nif diziTopla([]int{}) != 0 { panic("0 olmali") }`,
    hint: 't := 0; for _, s := range sayilar { t += s }; return t',
  },
  'objects-1': {
    startingCode: 'package main\n\ntype Kullanici struct {\n  Isim  string\n  Yas   int\n  Sehir string\n}\n\nfunc main() {\n  k := Kullanici{}\n  // kullanici olustur\n  println(k.Isim)\n}\n',
    tests: `k := Kullanici{Isim:"Ayse",Yas:28,Sehir:"Istanbul"}\nif k.Isim!="Ayse" { panic("isim Ayse olmali") }`,
    hint: 'k := Kullanici{Isim:"Ayse", Yas:28, Sehir:"Istanbul"}',
  },
  'objects-2': {
    startingCode: 'package main\n\nfunc nesneAnalizi(obj map[string]int) ([]string, []int) {\n  // anahtarlar ve degerler\n  return nil, nil\n}\n',
    tests: `a, d := nesneAnalizi(map[string]int{"a":1,"b":2,"c":3})\nif len(a)!=3 { panic("3 anahtar olmali") }`,
    hint: 'a := []string{}; d := []int{}; for k, v := range obj { a = append(a, k); d = append(d, v) }; return a, d',
  },
  'objects-3': {
    startingCode: 'package main\n\nfunc derinKopyala(obj map[string]string) map[string]string {\n  // derin kopyala\n  return nil\n}\n',
    tests: `o := map[string]string{"ad":"Ali"}\nk := derinKopyala(o)\nk["ad"] = "Veli"\nif o["ad"]!="Ali" { panic("orijinal degismemeli") }`,
    hint: 'm := make(map[string]string); for k, v := range obj { m[k] = v }; return m',
  },
  'es6-1': {
    startingCode: 'package main\n\nfunc kare(s int) int { return s * s }\n\nfunc main() { println(kare(5)) }\n',
    tests: `if kare(5) != 25 { panic("kare(5)=25 olmali") }`,
    hint: 'return s * s',
  },
  'es6-2': {
    startingCode: 'package main\n\nfunc main() {\n  sayilar := []int{10,20,30,40,50}\n  a := sayilar[0]\n  b := sayilar[1]\n  kalan := sayilar[2:]\n  println(a,b,len(kalan))\n}\n',
    tests: `sayilar:=[]int{10,20,30,40,50};a:=sayilar[0];b:=sayilar[1];kalan:=sayilar[2:]\nif a!=10||b!=20||len(kalan)!=3{panic("a=10,b=20,kalan=3")}`,
    hint: 'a, b, kalan := sayilar[0], sayilar[1], sayilar[2:]',
  },
  'es6-3': {
    startingCode: 'package main\n\nimport "fmt"\n\ntype Hayvan struct {\n  Isim string\n}\n\nfunc (h Hayvan) SesCikar() string { return "Ses yok" }\n\ntype Kedi struct { Hayvan }\n\nfunc (k Kedi) SesCikar() string {\n  // "Miyav!" dondur\n  return ""\n}\n\nfunc main() { k:=Kedi{Hayvan{Isim:"Pamuk"}}; fmt.Println(k.SesCikar()) }\n',
    tests: `k:=Kedi{Hayvan{Isim:"Pamuk"}}\nif k.Isim!="Pamuk"{panic("isim Pamuk olmali")}\nif k.SesCikar()!="Miyav!"{panic("Miyav! demeli")}`,
    hint: 'return "Miyav!"',
  },
  'boss-basics-0': {
    startingCode: 'package main\n\nfunc main() {\n  var isim string\n  var yas int\n  var aktif bool\n  // degiskenleri tanimla\n}\n',
    tests: `isim,yas,aktif:="Ahmet",25,true\nif isim!="Ahmet"||yas!=25||aktif!=true{panic("degiskenler yanlis")}`,
    hint: 'isim, yas, aktif = "Ahmet", 25, true',
  },
  'boss-basics-1': {
    startingCode: 'package main\n\nfunc main() {\n  not := 75\n  var durum string\n  // 50 den buyukse "Gecti", yoksa "Kaldi"\n  println(durum)\n}\n',
    tests: `not:=75;durum:="";if not>50{durum="Gecti"}else{durum="Kaldi"};if durum!="Gecti"{panic("Gecti olmali")}`,
    hint: 'if not > 50 { durum = "Gecti" } else { durum = "Kaldi" }',
  },
  'boss-basics-2': {
    startingCode: 'package main\n\nfunc topla(n int) int {\n  // 1 den n e kadar topla\n  return 0\n}\n',
    tests: `if topla(5)!=15{panic("15 olmali")};if topla(100)!=5050{panic("5050 olmali")}`,
    hint: 's:=0;for i:=1;i<=n;i++{s+=i};return s',
  },
  'boss-loops-0': {
    startingCode: 'package main\n\nfunc faktoriyel(n int) int {\n  // n! hesapla\n  return 1\n}\n',
    tests: `if faktoriyel(5)!=120{panic("120 olmali")}`,
    hint: 's:=1;for i:=2;i<=n;i++{s*=i};return s',
  },
  'boss-loops-1': {
    startingCode: 'package main\n\nfunc enBuyuk(dizi []int) int {\n  // en buyuk sayiyi bul\n  return 0\n}\n',
    tests: `if enBuyuk([]int{3,7,2,9,1})!=9{panic("9 olmali")}`,
    hint: 'm:=dizi[0];for _,x:=range dizi{if x>m{m=x}};return m',
  },
  'boss-loops-2': {
    startingCode: 'package main\n\nfunc palindromMu(str string) bool {\n  // palindrom mu?\n  return false\n}\n',
    tests: `if!palindromMu("kek"){panic("kek palindromdur")};if palindromMu("merhaba"){panic("merhaba degil")}`,
    hint: 'for i:=0;i<len(str)/2;i++{if str[i]!=str[len(str)-1-i]{return false}};return true',
  },
  'boss-functions-0': {
    startingCode: 'package main\n\nfunc asalMi(n int) bool {\n  // asal mi?\n  return false\n}\n',
    tests: `if!asalMi(7){panic("7 asal")};if asalMi(4){panic("4 degil")}`,
    hint: 'if n<2{return false};for i:=2;i<n;i++{if n%i==0{return false}};return true',
  },
  'boss-functions-1': {
    startingCode: 'package main\n\nfunc sirala(dizi []int) {\n  // sort kullanma, bubble sort\n}\n',
    tests: `r:=[]int{3,1,4,1,5};sirala(r);if r[0]!=1||r[1]!=1||r[2]!=3||r[3]!=4||r[4]!=5{panic("[1,1,3,4,5] olmali")}`,
    hint: 'for i:=0;i<len(dizi);i++{for j:=i+1;j<len(dizi);j++{if dizi[j]<dizi[i]{dizi[i],dizi[j]=dizi[j],dizi[i]}}}',
  },
  'boss-functions-2': {
    startingCode: 'package main\n\nfunc fibonacci(n int) []int {\n  // fibonacci dizisi\n  return nil\n}\n',
    tests: `f:=fibonacci(8);if len(f)!=8||f[0]!=0||f[1]!=1||f[7]!=13{panic("fibonacci(8) yanlis")}`,
    hint: 'd:=[]int{0,1};for i:=2;i<n;i++{d=append(d,d[i-1]+d[i-2])};return d',
  },
  'boss-arrays-0': {
    startingCode: 'package main\n\nfunc birlestir(d1,d2 []int) []int {\n  // birlestir ve tekrarlari temizle\n  return nil\n}\n',
    tests: `r:=birlestir([]int{1,2,3},[]int{2,3,4});if len(r)!=4{panic("4 elemanli olmali")}`,
    hint: 'm:=map[int]bool{};for _,x:=range d1{m[x]=true};for _,x:=range d2{m[x]=true};r:=[]int{};for k:=range m{r=append(r,k)};return r',
  },
  'boss-arrays-1': {
    startingCode: 'package main\n\nfunc duzlestir(dizi []interface{}) []int {\n  // recursive flatten\n  return nil\n}\n',
    tests: `// Go ic ice dilim icin interface{} kullan\nr:=[]int{1,2,3,4,5,6};if len(r)!=6{panic("6 elemanli olmali")}`,
    hint: '// Go recursive flatten icin type assertion',
  },
  'boss-arrays-2': {
    startingCode: 'package main\n\nfunc benzersiz(dizi []int) []int {\n  // tekrarlari temizle\n  return nil\n}\n',
    tests: `r:=benzersiz([]int{1,2,2,3,3,3,4});if len(r)!=4||r[3]!=4{panic("[1,2,3,4] olmali")}`,
    hint: 'm:=map[int]bool{};for _,x:=range dizi{m[x]=true};r:=[]int{};for k:=range m{r=append(r,k)};return r',
  },
  'boss-objects-0': {
    startingCode: 'package main\n\nfunc derinKlon(obj map[string]string) map[string]string {\n  // derin kopyala\n  return nil\n}\n',
    tests: `o:=map[string]string{"a":"1","b":"2"};k:=derinKlon(o);k["b"]="99";if o["b"]!="2"{panic("orijinal degismemeli")}`,
    hint: 'm:=map[string]string{};for k,v:=range obj{m[k]=v};return m',
  },
  'boss-objects-1': {
    startingCode: 'package main\n\nfunc donustur(obj,kurallar map[string]string) map[string]string {\n  // anahtarlari donustur\n  return nil\n}\n',
    tests: `r:=donustur(map[string]string{"ad":"Ali","yas":"25"},map[string]string{"ad":"isim","yas":"age"});if r["isim"]!="Ali"{panic("isim=Ali olmali")}`,
    hint: 'm:=map[string]string{};for k,v:=range obj{yk:=k;if nk,ok:=kurallar[k];ok{yk=nk};m[yk]=v};return m',
  },
  'boss-objects-2': {
    startingCode: 'package main\n\nfunc dogrula(obj map[string]string, zorunlu []string) (bool, error) {\n  // eksik alan varsa hata dondur\n  return true, nil\n}\n',
    tests: `r,_:=dogrula(map[string]string{"isim":"Ali","email":"a@t.com"},[]string{"isim","email"});if!r{panic("true olmali")}`,
    hint: 'for _, a := range zorunlu { if _, ok := obj[a]; !ok { return false, fmt.Errorf("Eksik alan: %s", a) } }; return true, nil',
  },
  'boss-es6-0': {
    startingCode: 'package main\n\ntype Sekil struct { Renk string }\nfunc (Sekil) AlanHesapla() float64 { return 0 }\n\ntype Daire struct { Sekil; R float64 }\ntype Dikdortgen struct { Sekil; G, Y float64 }\n',
    tests: `d:=Daire{Sekil{"kirmizi"},5};if d.Renk!="kirmizi"{panic("renk kirmizi olmali")}`,
    hint: '// Go override icin method shadowing: func (d Daire) AlanHesapla() float64 { return math.Pi * d.R * d.R }',
  },
  'boss-es6-1': {
    startingCode: 'package main\nimport "time"\n\nfunc bekleVeKatla(sayi int) int {\n  // 1 saniye bekle, sayi*2 dondur\n  return 0\n}\n',
    tests: `r:=bekleVeKatla(5);if r!=10{panic("5*2=10 olmali")}`,
    hint: 'time.Sleep(time.Second); return sayi * 2',
  },
  'boss-es6-2': {
    startingCode: 'package main\n\nfunc guvenliGetir(data map[string]string, key string) string {\n  // var olmayan anahtar hata firlatsin\n  return ""\n}\n',
    tests: `// Go'da map erisimi ok=true/false doner\nm:=map[string]string{"ad":"Ali"};\nv,_:=m["ad"];if v!="Ali"{panic("Ali olmali")}`,
    hint: 'if v, ok := data[key]; ok { return v }; panic(key + " tanimli degil")',
  },
}
