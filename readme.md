# PasswordLess
[Demo](https://archistico.github.io/PasswordLess/)

One masterpassword + website or email address or ... -> unique password

## Da fare
TODO
 - [X] per il push su github configurare il repository e poi usare il tool sulla sx su replit "git"
 - [X] sito web ecc. pulire da https:// http://
 - [X] funzione di verifica della password generata
    - [X] lunghezza minima 8 caratteri
    - [X] lunghezza massima 16 caratteri
    - [X] presenza di maiuscole
    - [X] presenza di minuscole
    - [X] uno o più numeri
    - [X] almeno un carattere speciale
    - [X] non più di due caratteri uguali consecutivi
 - [X] cicla se la password non rispetta tutti i parametri e shift++
 - [X] aggiungere favicon
 - [X] inizio a prendere i numeri e le lettere speciali dal numero[shift]
 - [X] tasto copia
 - [ ] aggiungere parole

## Combinazioni di parole

Tutte le possibili combinazioni sono :

C(n,k) = n! / ( k!*(n-k)! )
dove n = 6, k = 4

Il ! Indica il fattoriale di un numero, cioè ad esempio n! = n*(n-1)*(n-2)*……*1

Quindi C(6,4) = 6!/(4!*(6–4)!) = 720/(24*2) = 720/48 = 15

In Excel
```
=COMBINAZIONE(B3;B4)

n	1000	parole
k	4	  gruppi da k parole
Combinazioni       41.417.124.750

n	3000	parole
k	4	  gruppi da k parole
Combinazioni -> 3.368.254.124.250
```