# PasswordLess
[Demo](https://archistico.github.io/PasswordLess/)

voglio una frase univoca in base a masterpassword e dove (url, email, info)
di esattamente 16 caratteri, con maiuscole, minuscole, numeri, caratteri speciali, non ripetizioni > 2 consecutivi

- Calcolo sha512(masterpassworddove):
048f85aabfe01f30c430b02cf9546d89879ef390d501245d3b9d0835de875e4017b7457dfadc0277cb6631ce48e86632f64774398c7273bead7ff57e95685fe7

- Converto in intero:
238859749795112485356321291408964285188398474728126758079383791793528276335238290266011254440074995664015994705530982629722206991608796787740097510924263

## Scelta parole

parole scelte in base al numero intero, taglio oltre i 16 caratteri

Quanti diversi numeri a 4 cifre possono essere formati dalle cifre 1, 3, 5, 6, 8 e 9 se non è consentita alcuna ripetizione?
Parliamo di combinazioni senza ripetizioni, di n elementi in gruppi di 4.

Tutte le possibili combinazioni sono :

C(n,k) = n! / ( k!*(n-k)! )
dove n = 6, k = 4

Il ! Indica il fattoriale di un numero, cioè ad esempio n! = n*(n-1)*(n-2)*……*1

Quindi C(6,4) = 6!/(4!*(6–4)!) = 720/(24*2) = 720/48 = 15

In Excel
```
=COMBINAZIONE(B1;B2)

n	3000	parole
k	10	  gruppi da

Combinazioni	16.029.803.915.594.900.000.000.000.000 	
```

Come fare per non creare tutte le combinazioni ma avere un algoritmo che calcola solo quella al numero desiderato?

```
ho 6 parole
A B C D E F

devo raggrupparle in gruppi da 3 parole 6!/(3!*(6-3)!) = 20 combinazioni
01) ABC
02) ABD
03) ABE
04) ABF -> PERMUTAZIONI CON AB
05) ACB
06) ACD
07) ACE
08) ACF -> PERMUTAZIONI CON AC
09) ADB
10) ADC
11) ADE
12) ADF -> PERMUTAZIONI CON AD
13) AEB
14) AEC
15) AED
16) AEF -> PERMUTAZIONI CON AE
17) 

...

se chiedo la 3 come faccio ad avere il gruppo X
```


```
1234567890123456  
pippovaacasaoggi  
```

## Aggiunta MAIUSCOLI

```
Int numeri pari    MAIUSCOLI  
Int numeri dispari minuscoli  

1234567890123456  
PiPPovaAcasaogGI  
2388597497951124  
```

## Aggiunta numeri 

```
Se O maiuscolo -> 0  
Se I maiuscolo -> 1  
Se E maiuscolo -> 3  
Se A maiuscolo -> 4  

1234567890123456  
PiPPova4casaogG1  
```

Se non ne cambio neppure uno allora guardo le minuscole  

```
1234567890123456  
PiPPova4casaogG1  
 
abcdefghijklmnopqrstuvwxyz  
  52         98   67     

1234567890123456  
PiPPovaA5a6a8gGI  
```
## Aggiunta carattere speciale

```
1234567890abcdef  
@#&*-+=()_:;.,!?  

1234567890123456
PiPPova4casaogG1
048f85aabfe01f30
   |  |||||  |
```

Prendo il primo | e la posizione mi definisce quale carattere usare (es. 4° pos -> *)
```
1234567890123456
PiP*ova4casaogG1
```
