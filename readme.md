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
 - [X] aggiungere parole
 - [X] 

## Combinazioni di parole

Tutte le possibili combinazioni sono :
```
C(n,k) = n! / ( k!*(n-k)! )
Il ! Indica il fattoriale di un numero, cioè ad esempio n! = n*(n-1)*(n-2)*……*1

n = 9999 (numero di parole)
k = 4 (gruppi di k parole)

Quindi C(9999,4) = (9999!)/(4!*(9999-4)!) = 416.250.145.812.501 possibilità di combinazione

In Excel =COMBINAZIONE(9999;4)
```

## Send master value in url

https://www.w3schools.com/tags/ref_urlencode.ASP

```
const queryString = window.location.search;
// index.html?master=pippo

const urlParams = new URLSearchParams(queryString);

if (urlParams.has('master')) {
    const master = urlParams.get('master');
    const input_master = document.getElementById('master');
    input_master.value = master;
}
```