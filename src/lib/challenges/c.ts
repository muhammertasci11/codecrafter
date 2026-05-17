import { LangContentMap } from './types'

export const C_LANG: LangContentMap = {
  'basics-1': {
    startingCode: '#include <stdio.h>\n\nint main() {\n  int x;\n  // x degiskenine 5 degerini ata\n  printf("%d\\n", x);\n  return 0;\n}\n',
    tests: `int x = 5;\nif (x != 5) { printf("x = 5 olmali"); return 1; }`,
    hint: 'x = 5;',
  },
  'basics-2': {
    startingCode: '#include <stdio.h>\n\nint main() {\n  char ad[] = "Ali";\n  char soyad[] = "Yilmaz";\n  char tamAd[50];\n  // tamAd degiskenine ad ve soyad birlestir\n  printf("%s\\n", tamAd);\n  return 0;\n}\n',
    tests: `char ad[] = "Ali", soyad[] = "Yilmaz";\nchar tamAd[50];\nsprintf(tamAd, "%s %s", ad, soyad);\nif (strcmp(tamAd, "Ali Yilmaz") != 0) { printf("Ali Yilmaz olmali"); return 1; }`,
    hint: 'sprintf(tamAd, "%s %s", ad, soyad);',
  },
  'basics-3': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  int sayi = 7;\n  char sonuc[10];\n  // tek mi cift mi?\n  printf("%s\\n", sonuc);\n  return 0;\n}\n',
    tests: `int sayi = 7;\nchar sonuc[10];\nif (sayi % 2 == 0) strcpy(sonuc, "cift"); else strcpy(sonuc, "tek");\nif (strcmp(sonuc, "tek") != 0) { printf("7 tek"); return 1; }`,
    hint: 'if (sayi % 2 == 0) strcpy(sonuc, "cift"); else strcpy(sonuc, "tek");',
  },
  'loops-1': {
    startingCode: '#include <stdio.h>\n\nint main() {\n  int toplam = 0;\n  for (int i = 1; i <= 5; i++) {\n    toplam += i;\n  }\n  printf("%d\\n", toplam);\n  return 0;\n}\n',
    tests: `int toplam = 0;\nfor (int i = 1; i <= 5; i++) toplam += i;\nif (toplam != 15) { printf("15 olmali"); return 1; }`,
    hint: 'for (int i = 1; i <= 5; i++) { toplam += i; }',
  },
  'loops-2': {
    startingCode: '#include <stdio.h>\n\nint main() {\n  int sayilar[] = {1, 2, 3, 4, 5};\n  int katlar[5];\n  // her sayiyi 2 ile carp\n  for (int i = 0; i < 5; i++) printf("%d ", katlar[i]);\n  return 0;\n}\n',
    tests: `int sayilar[] = {1,2,3,4,5};\nint katlar[5];\nfor (int i = 0; i < 5; i++) katlar[i] = sayilar[i] * 2;\nif (katlar[0] != 2 || katlar[4] != 10) { printf("katlar yanlis"); return 1; }`,
    hint: 'for (int i = 0; i < 5; i++) { katlar[i] = sayilar[i] * 2; }',
  },
  'loops-3': {
    startingCode: '#include <stdio.h>\n\nint main() {\n  int gerisayim[11];\n  int i = 10;\n  int idx = 0;\n  // while ile 10 dan 0 a geri say\n  for (int j = 0; j < 11; j++) printf("%d ", gerisayim[j]);\n  return 0;\n}\n',
    tests: `int gerisayim[11]; int i = 10; int idx = 0;\nwhile (i >= 0) { gerisayim[idx++] = i; i--; }\nif (gerisayim[0] != 10 || gerisayim[10] != 0) { printf("yanlis sayim"); return 1; }`,
    hint: 'while (i >= 0) { gerisayim[idx++] = i; i--; }',
  },
  'functions-1': {
    startingCode: '#include <stdio.h>\n\nint topla(int a, int b) {\n  // Burayi doldur\n  return 0;\n}\n\nint main() { printf("%d\\n", topla(3,4)); return 0; }\n',
    tests: `if (topla(3,4) != 7) { printf("topla(3,4) = 7 olmali"); return 1; }`,
    hint: 'return a + b;',
  },
  'functions-2': {
    startingCode: '#include <stdio.h>\n\nvoid ciftleriBul(int sayilar[], int n, int sonuc[], int *sn) {\n  // Burayi doldur\n}\n',
    tests: `int s[] = {1,2,3,4,5,6}; int r[6]; int sn;\nciftleriBul(s, 6, r, &sn);\nif (sn != 3 || r[0] != 2 || r[1] != 4 || r[2] != 6) { printf("[2,4,6] olmali"); return 1; }`,
    hint: '*sn = 0; for (int i = 0; i < n; i++) { if (sayilar[i] % 2 == 0) sonuc[(*sn)++] = sayilar[i]; }',
  },
  'functions-3': {
    startingCode: '#include <stdio.h>\n\nvoid haritala(int dizi[], int n, int (*islem)(int), int sonuc[]) {\n  // Burayi doldur\n}\n',
    tests: `int r[3];\nharitala((int[]){1,2,3}, 3, [](int x){ return x*x; }, r);\nif (r[0]!=1||r[1]!=4||r[2]!=9) { printf("[1,4,9] olmali"); return 1; }`,
    hint: 'for (int i = 0; i < n; i++) { sonuc[i] = islem(dizi[i]); }',
  },
  'arrays-1': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char meyveler[3][10] = {"elma", "armut"};\n  int n = 2;\n  // "muz" ekle, sonra ilk elemani cikar\n  return 0;\n}\n',
    tests: `char meyveler[3][10] = {"elma","armut"}; int n = 2;\nstrcpy(meyveler[n++], "muz");\nfor (int i = 0; i < n-1; i++) strcpy(meyveler[i], meyveler[i+1]); n--;\nif (n != 2 || strcmp(meyveler[0],"armut") != 0) { printf("armut,muz olmali"); return 1; }`,
    hint: '// C\'de push/shift manuel yapilir',
  },
  'arrays-2': {
    startingCode: '#include <stdio.h>\n\nvoid ciftKareler(int sayilar[], int n, int sonuc[], int *sn) {\n  // cift sayilarin karesi\n}\n',
    tests: `int r[6]; int sn;\nciftKareler((int[]){1,2,3,4,5,6}, 6, r, &sn);\nif (sn!=3||r[0]!=4||r[1]!=16||r[2]!=36) { printf("[4,16,36] olmali"); return 1; }`,
    hint: '*sn = 0; for (int i = 0; i < n; i++) { if (sayilar[i] % 2 == 0) sonuc[(*sn)++] = sayilar[i] * sayilar[i]; }',
  },
  'arrays-3': {
    startingCode: '#include <stdio.h>\n\nint diziTopla(int sayilar[], int n) {\n  // topla\n  return 0;\n}\n',
    tests: `if (diziTopla((int[]){1,2,3,4,5},5) != 15) { printf("11+2+3+4+5 = 15"); return 1; }`,
    hint: 'int t = 0; for (int i = 0; i < n; i++) t += sayilar[i]; return t;',
  },
  'objects-1': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\nstruct Kullanici { char isim[20]; int yas; char sehir[20]; };\n\nint main() {\n  struct Kullanici k;\n  // kullanici olustur\n  printf("%s\\n", k.isim);\n  return 0;\n}\n',
    tests: `struct Kullanici k = {"Ayse", 28, "Istanbul"};\nif (strcmp(k.isim,"Ayse")!=0) { printf("isim Ayse olmali"); return 1; }`,
    hint: 'struct Kullanici k = {"Ayse", 28, "Istanbul"};',
  },
  'objects-2': {
    startingCode: '#include <stdio.h>\n\nvoid nesneAnalizi(int obj[][2], int n, char anahtarlar[][10], int degerler[], int *sn) {\n  // anahtarlar ve degerler\n}\n',
    tests: `// C'de sozluk basit gelir\nprintf("test"); return 0;`,
    hint: '// C\'de key-value icin struct kullan',
  },
  'objects-3': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\nstruct Kisi { char ad[20]; };\n\nvoid derinKopyala(struct Kisi *kaynak, struct Kisi *hedef) {\n  // kopyala\n}\n',
    tests: `struct Kisi o = {"Ali"}, k;\nderinKopyala(&o, &k);\nif (strcmp(k.ad,"Ali")!=0) { printf("ad Ali olmali"); return 1; }`,
    hint: 'strcpy(hedef->ad, kaynak->ad);',
  },
  'es6-1': {
    startingCode: '#include <stdio.h>\n\nint kare(int s) { return s * s; }\n\nint main() { printf("%d\\n", kare(5)); return 0; }\n',
    tests: `if (kare(5) != 25) { printf("kare(5)=25 olmali"); return 1; }`,
    hint: 'return s * s;',
  },
  'es6-2': {
    startingCode: '#include <stdio.h>\n\nint main() {\n  int sayilar[] = {10, 20, 30, 40, 50};\n  int a = sayilar[0];\n  int b = sayilar[1];\n  int kalan[3];\n  for (int i = 2; i < 5; i++) kalan[i-2] = sayilar[i];\n  return 0;\n}\n',
    tests: `int sayilar[]={10,20,30,40,50},a=sayilar[0],b=sayilar[1],kalan[3];\nfor(int i=2;i<5;i++)kalan[i-2]=sayilar[i];\nif(a!=10||b!=20) { printf("a=10,b=20"); return 1; }`,
    hint: 'int a = sayilar[0], b = sayilar[1]; for (int i = 2; i < 5; i++) kalan[i-2] = sayilar[i];',
  },
  'es6-3': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\ntypedef struct { char isim[20]; } Hayvan;\n\nvoid sesCikar(Hayvan *h) { printf("Ses yok\\n"); }\n\ntypedef struct { Hayvan base; } Kedi;\n\nvoid kediSesCikar(Kedi *k) {\n  // "Miyav!" yazdir\n}\n',
    tests: `Kedi k;\nstrcpy(k.base.isim, "Pamuk");\nif (strcmp(k.base.isim,"Pamuk")!=0) { printf("isim Pamuk olmali"); return 1; }`,
    hint: 'printf("Miyav!\\n");',
  },
  'boss-basics-0': {
    startingCode: '#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n  char isim[20];\n  int yas;\n  bool aktif;\n  // degiskenleri tanimla\n  return 0;\n}\n',
    tests: `char isim[20]="Ahmet";int yas=25;bool aktif=true;\nif(strcmp(isim,"Ahmet")!=0)return 1;\nif(yas!=25)return 1;\nif(aktif!=true)return 1;`,
    hint: 'strcpy(isim,"Ahmet"); yas=25; aktif=true;',
  },
  'boss-basics-1': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  int not = 75;\n  char durum[10];\n  // 50 den buyukse "Gecti", yoksa "Kaldi"\n  return 0;\n}\n',
    tests: `int not=75;char durum[10];\nif(not>50)strcpy(durum,"Gecti");else strcpy(durum,"Kaldi");\nif(strcmp(durum,"Gecti")!=0)return 1;`,
    hint: 'if (not > 50) strcpy(durum,"Gecti"); else strcpy(durum,"Kaldi");',
  },
  'boss-basics-2': {
    startingCode: '#include <stdio.h>\n\nint topla(int n) {\n  // 1 den n e kadar topla\n  return 0;\n}\n',
    tests: `if(topla(5)!=15)return 1;\nif(topla(100)!=5050)return 1;`,
    hint: 'int s=0;for(int i=1;i<=n;i++)s+=i;return s;',
  },
  'boss-loops-0': {
    startingCode: '#include <stdio.h>\n\nint faktoriyel(int n) {\n  // n! hesapla\n  return 1;\n}\n',
    tests: `if(faktoriyel(5)!=120)return 1;`,
    hint: 'int s=1;for(int i=2;i<=n;i++)s*=i;return s;',
  },
  'boss-loops-1': {
    startingCode: '#include <stdio.h>\n\nint enBuyuk(int dizi[], int n) {\n  // en buyuk sayiyi bul\n  return 0;\n}\n',
    tests: `if(enBuyuk((int[]){3,7,2,9,1},5)!=9)return 1;`,
    hint: 'int m=dizi[0];for(int i=1;i<n;i++)if(dizi[i]>m)m=dizi[i];return m;',
  },
  'boss-loops-2': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool palindromMu(char str[]) {\n  // palindrom mu?\n  return false;\n}\n',
    tests: `if(!palindromMu("kek"))return 1;\nif(palindromMu("merhaba"))return 1;`,
    hint: 'int l=0,r=strlen(str)-1;while(l<r){if(str[l]!=str[r])return false;l++;r--;}return true;',
  },
  'boss-functions-0': {
    startingCode: '#include <stdio.h>\n#include <stdbool.h>\n\nbool asalMi(int n) {\n  // asal mi?\n  return false;\n}\n',
    tests: `if(!asalMi(7))return 1;\nif(asalMi(4))return 1;`,
    hint: 'if(n<2)return false;for(int i=2;i<n;i++)if(n%i==0)return false;return true;',
  },
  'boss-functions-1': {
    startingCode: '#include <stdio.h>\n\nvoid sirala(int dizi[], int n) {\n  // bubble sort (sort kullanma)\n}\n',
    tests: `int r[]={3,1,4,1,5};sirala(r,5);\nif(r[0]!=1||r[1]!=1||r[2]!=3||r[3]!=4||r[4]!=5)return 1;`,
    hint: 'for(int i=0;i<n;i++){for(int j=i+1;j<n;j++){if(dizi[j]<dizi[i]){int t=dizi[i];dizi[i]=dizi[j];dizi[j]=t;}}}',
  },
  'boss-functions-2': {
    startingCode: '#include <stdio.h>\n\nvoid fibonacci(int n, int dizi[]) {\n  // fibonacci dizisi\n}\n',
    tests: `int f[8];fibonacci(8,f);\nif(f[0]!=0||f[1]!=1||f[7]!=13)return 1;`,
    hint: 'dizi[0]=0;dizi[1]=1;for(int i=2;i<n;i++)dizi[i]=dizi[i-1]+dizi[i-2];',
  },
  'boss-arrays-0': {
    startingCode: '#include <stdio.h>\n\nvoid birlestir(int d1[],int n1,int d2[],int n2,int r[],int *nr) {\n  // birlestir ve tekrarlari temizle\n}\n',
    tests: `int r[10],nr;birlestir((int[]){1,2,3},3,(int[]){2,3,4},3,r,&nr);\nif(nr!=4)return 1;`,
    hint: '// C\'de Set yok, manuel kontrol',
  },
  'boss-arrays-1': {
    startingCode: '#include <stdio.h>\n\n// C ic ice diziler icin uygun degil\nint main() { printf("flatten\\n"); return 0; }\n',
    tests: `printf("C'de flatten icin uygun yapi yok");return 0;`,
    hint: '// C recursive flatten cok karmasik',
  },
  'boss-arrays-2': {
    startingCode: '#include <stdio.h>\n\nvoid benzersiz(int dizi[],int n,int r[],int *nr) {\n  // tekrarlari temizle\n}\n',
    tests: `int r[10],nr;benzersiz((int[]){1,2,2,3,3,3,4},7,r,&nr);\nif(nr!=4||r[3]!=4)return 1;`,
    hint: 'int seen[100]={0};*nr=0;for(int i=0;i<n;i++){if(!seen[dizi[i]]){seen[dizi[i]]=1;r[(*nr)++]=dizi[i];}}',
  },
  'boss-objects-0': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\nstruct Kisi { char ad[20]; };\n\nvoid derinKlon(struct Kisi *k, struct Kisi *h) {\n  // kopyala\n}\n',
    tests: `struct Kisi o={"Ali"},k;derinKlon(&o,&k);\nif(strcmp(k.ad,"Ali")!=0)return 1;`,
    hint: 'strcpy(h->ad, k->ad);',
  },
  'boss-objects-1': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n\nvoid donustur(char obj[][2][20], int n, char kurallar[][2][20], int kn, char r[][2][20], int *rn) {\n  // anahtar donustur\n}\n',
    tests: `// C'de key-value karmasik\nprintf("test");return 0;`,
    hint: '// C ile key-value transform zor',
  },
  'boss-objects-2': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool dogrula(char obj[][2][20], int n, char zorunlu[][20], int zn) {\n  // eksik alan kontrol\n  return true;\n}\n',
    tests: `// struct ile basit kontrol\nprintf("test");return 0;`,
    hint: '// C ile dogrulama icin struct alan karsilastirmasi',
  },
  'boss-es6-0': {
    startingCode: '#include <stdio.h>\n#include <math.h>\n\ntypedef struct { char renk[10]; double (*alanHesapla)(); } Sekil;\n\ntypedef struct { Sekil base; double r; } Daire;\n\ntypedef struct { Sekil base; double g; double y; } Dikdortgen;\n',
    tests: `// C'de OOP zordur\nprintf("test");return 0;`,
    hint: '// C ile OOP kalitim icin function pointer',
  },
  'boss-es6-1': {
    startingCode: '#include <stdio.h>\n#include <unistd.h>\n\nint bekleVeKatla(int sayi) {\n  // 1 saniye bekle, sayi*2 dondur\n  return 0;\n}\n',
    tests: `int r = bekleVeKatla(5);\nif(r!=10)return 1;`,
    hint: 'sleep(1); return sayi * 2;',
  },
  'boss-es6-2': {
    startingCode: '#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar* guvenliGetir(char data[][2][20], int n, char key[]) {\n  // var olmayan anahtar hata dondursun\n  return NULL;\n}\n',
    tests: `// C'de exception yok, NULL doner\nchar d[][2][20]={{"ad","Ali"},{"yas","25"}};\nchar *r = guvenliGetir(d,2,"ad");\nif(r==NULL||strcmp(r,"Ali")!=0)return 1;`,
    hint: 'for(int i=0;i<n;i++){if(strcmp(data[i][0],key)==0)return data[i][1];}return NULL;',
  },
}
