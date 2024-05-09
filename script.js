// ------------------------------------------------------------------
// ONLOAD
// ------------------------------------------------------------------

window.onload = () => {
  //calcola();
}

// ------------------------------------------------------------------
// Copia
// ------------------------------------------------------------------

function copia() {
  let risultato = document.getElementById("text_risultato");
  navigator.clipboard.writeText(risultato.innerText);

  let btnCopia = document.getElementById("btnCopia");
  btnCopia.innerText = "Copied!";
}

// ------------------------------------------------------------------
// CALCOLA
// ------------------------------------------------------------------

function calcola() {

  let input_master = document.getElementById("input_master");
  let input_dove = document.getElementById("input_dove");
  let risultato = document.getElementById("text_risultato");
  let btnCopia = document.getElementById("btnCopia");
  
  btnCopia.innerText = "Copy";
  input_master.type = 'password';

  const dove = pulisciDove(input_dove.value);
  input_dove.value = dove;

  if (input_master.value.length < 8) {
    input_master.setAttribute("aria-invalid", "true");
    risultato.innerText = "-";
    return;
  } else {
    input_master.setAttribute("aria-invalid", "false");
  }

  if (input_dove.value.length < 5) {
    input_dove.setAttribute("aria-invalid", "true");
    risultato.innerText = "-";
    return;
  } else {
    input_dove.setAttribute("aria-invalid", "false");
  }

  let qt = parole.length;
  let qt_caratteri = qt.toString().length;
  let qt_max = Math.pow(10, qt_caratteri) - 1;

  let SHA512 = new Hashes.SHA512;
  let hash = SHA512.hex(input_master.value + input_dove.value);
  let numero = hexToStringInt(hash);

  let shift = 0;
  let pw = "";

  do {

    let primo = parseInt(numero.substring(0 + shift, qt_caratteri * 1 + shift));
    let secondo = parseInt(numero.substring(qt_caratteri * 1 + shift, qt_caratteri * 2 + shift));
    let terzo = parseInt(numero.substring(qt_caratteri * 2 + shift, qt_caratteri * 3 + shift));
    let quarto = parseInt(numero.substring(qt_caratteri * 3 + shift, qt_caratteri * 4 + shift));

    let primo_indice = Math.floor(primo / qt_max * qt);
    let secondo_indice = Math.floor(secondo / qt_max * qt);
    let terzo_indice = Math.floor(terzo / qt_max * qt);
    let quarto_indice = Math.floor(quarto / qt_max * qt);

    let prima_parola = parole[primo_indice];
    let seconda_parola = parole[secondo_indice];
    let terza_parola = parole[terzo_indice];
    let quarta_parola = parole[quarto_indice];

    pw = prima_parola.charAt(0).toUpperCase() + prima_parola.slice(1)
      + seconda_parola.charAt(0).toUpperCase() + seconda_parola.slice(1)
      + terza_parola.charAt(0).toUpperCase() + terza_parola.slice(1)
      + quarta_parola.charAt(0).toUpperCase() + quarta_parola.slice(1)

    pw = pw.substring(0, 16);
    pw = aggiungiNumeri(pw, parseInt(numero[shift]));
    pw = aggiungiSpeciale(pw, parseInt(numero[shift]));

    shift++;

    //console.log(shift, pw, parseInt(numero[shift]))

  } while (!verifica(pw) && ((shift * qt_caratteri * 4) < numero.length));

  risultato.innerText = pw;
  check(pw);
}

// ------------------------------------------------------------------
// aggiungiSpeciale
// ------------------------------------------------------------------
function aggiungiSpeciale(str, numero) {
  let ris = str;

  if (numero == 0) {
    ris = ris.replace(/(a|A)/, "@");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 1) {
    ris = ris.replace(/(e|E)/, "&");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 2) {
    ris = ris.replace(/(l|L)/, "!");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 3) {
    ris = ris.replace(/(r|R)/, "#");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 4) {
    ris = ris.replace(/(m|M)/, "-");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 5) {
    ris = ris.replace(/(n|N)/, "+");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 6) {
    ris = ris.replace(/(h|H)/, "=");
    if (haSpeciali(ris)) return ris;
  }
  
  if (numero <= 7) {
    ris = ris.replace(/(c|C)/, "(");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 8) {
    ris = ris.replace(/(d|D)/, ")");
    if (haSpeciali(ris)) return ris;
  }

  if (numero <= 9) {
    ris = ris.replace(/(j|J)/, "%");
    if (haSpeciali(ris)) return ris;
  }

  if (numero < 9) {
    ris = ris.replace(/(p|P)/, "[");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(q|Q)/, "]");
    if (haSpeciali(ris)) return ris;
    
    ris = ris.replace(/(y|Y)/, ",");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(x|X)/, ".");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(w|W)/, ";");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(v|V)/, "^");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(u|U)/, "_");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(f|F)/, "?");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(b|B)/, "*");
    if (haSpeciali(ris)) return ris;

    ris = ris.replace(/(k|K)/, ":");
    if (haSpeciali(ris)) return ris;
   
  }
  
  /*
  abcdefghijklmnopqrstuvwxyz
  @*()&?9=1%^!-+0[]#57_:;.,2
  
  12345678901234567890 -> 20 speciali
  @#&*-+=()_:;.,!?%[]^ 
  */

  return ris;
}

// ------------------------------------------------------------------
// aggiungiNumeri
// ------------------------------------------------------------------
function aggiungiNumeri(str, numero) {
  let ris = str;

  /*
  abcdefghijklmnopqrstuvwxyz
  4   3 9 1     068 57     2
  */

  if (numero == 0) {
    ris = ris.replace(/(o|O)/, "0");
    if (haNumeri(ris)) return ris;
  }

  if (numero <= 1) {
    ris = ris.replace(/(i|I)/, "1");
    if (haNumeri(ris)) return ris;
  }

  if (numero <= 2) {
    ris = ris.replace(/(e|E)/, "3");
    if (haNumeri(ris)) return ris;
  }

  if (numero <= 3) {
    ris = ris.replace(/(a|A)/, "4");
    if (haNumeri(ris)) return ris;
  }

  if (numero <= 4) {
    ris = ris.replace(/(z|Z)/, "2");
    if (haNumeri(ris)) return ris;
  }

  if (numero <= 5) {
    ris = ris.replace(/(s|S)/, "5");
    if (haNumeri(ris)) return ris;
  }

  if (numero <= 6) {
    ris = ris.replace(/(p|P)/, "6");
    if (haNumeri(ris)) return ris;
  }

  if (numero >= 7) {
    ris = ris.replace(/(t|T)/, "7");
    if (haNumeri(ris)) return ris;
  }

  if (numero <= 8) {
    ris = ris.replace(/(q|Q)/, "8");
    if (haNumeri(ris)) return ris;
  }
  
  if (numero <= 9) {
    ris = ris.replace(/(g|G)/, "9");
    if (haNumeri(ris)) return ris;
  }
  
  return ris;
}

// ------------------------------------------------------------------
// Verifica
// ------------------------------------------------------------------

function verifica(output) {

  if (!haLunghezzaMinima(output, 8)) {
    return false;
  }

  if (!haLunghezzaMassima(output, 16)) {
    return false;
  }

  if (!haMaiuscole(output)) {
    return false;
  }

  if (!haMinuscole(output)) {
    return false;
  }

  if (!haNumeri(output)) {
    return false;
  }

  if (!haSpeciali(output)) {
    return false;
  }

  if (!haCaratteriPermessi(output)) {
    return false;
  }

  if (haCaratteriConsecutivi(output)) {
    return false;
  }

  return true;
}

// ------------------------------------------------------------------
// CHECK
// ------------------------------------------------------------------

function check(output) {

  let check_lunghezza_minima = document.getElementById("check_lunghezza_minima");
  let check_lunghezza_massima = document.getElementById("check_lunghezza_massima");
  let check_maiuscole = document.getElementById("check_maiuscole");
  let check_minuscole = document.getElementById("check_minuscole");
  let check_numeri = document.getElementById("check_numeri");
  let check_caratteri_speciali = document.getElementById("check_caratteri_speciali");
  let check_caratteri_permessi = document.getElementById("check_caratteri_permessi");
  let check_caratteri_consecutivi = document.getElementById("check_caratteri_consecutivi");

  if (haLunghezzaMinima(output, 8)) {
    check_lunghezza_minima.innerText = "OK";
    check_lunghezza_minima.classList.value = "OK";
  } else {
    check_lunghezza_minima.innerText = "NO";
    check_lunghezza_minima.classList.value = "NO";
  }

  if (haLunghezzaMassima(output, 16)) {
    check_lunghezza_massima.innerText = "OK";
    check_lunghezza_massima.classList.value = "OK";
  } else {
    check_lunghezza_massima.innerText = "NO";
    check_lunghezza_massima.classList.value = "NO";
  }

  if (haMaiuscole(output)) {
    check_maiuscole.innerText = "OK";
    check_maiuscole.classList.value = "OK";
  } else {
    check_maiuscole.innerText = "NO";
    check_maiuscole.classList.value = "NO";
  }

  if (haMinuscole(output)) {
    check_minuscole.innerText = "OK";
    check_minuscole.classList.value = "OK";
  } else {
    check_minuscole.innerText = "NO";
    check_minuscole.classList.value = "NO";
  }

  if (haNumeri(output)) {
    check_numeri.innerText = "OK";
    check_numeri.classList.value = "OK";
  } else {
    check_numeri.innerText = "NO";
    check_numeri.classList.value = "NO";
  }

  if (haSpeciali(output)) {
    check_caratteri_speciali.innerText = "OK";
    check_caratteri_speciali.classList.value = "OK";
  } else {
    check_caratteri_speciali.innerText = "NO";
    check_caratteri_speciali.classList.value = "NO";
  }

  if (haCaratteriPermessi(output)) {
    check_caratteri_permessi.innerText = "OK";
    check_caratteri_permessi.classList.value = "OK";
  } else {
    check_caratteri_permessi.innerText = "NO";
    check_caratteri_permessi.classList.value = "NO";
  }

  if (!haCaratteriConsecutivi(output)) {
    check_caratteri_consecutivi.innerText = "OK";
    check_caratteri_consecutivi.classList.value = "OK";
  } else {
    check_caratteri_consecutivi.innerText = "NO";
    check_caratteri_consecutivi.classList.value = "NO";
  }
}

// ------------------------------------------------------------------
// pulisciDove
// ------------------------------------------------------------------
function pulisciDove(str) {
  let ris = str.replace(/^(http:\/\/|https:\/\/)/, "");
  ris = ris.replace(/(\/)+$/, "");
  ris = ris.replace(/(\/).*$/, "");
  return ris;
}

// ------------------------------------------------------------------
// haMaiuscole
// ------------------------------------------------------------------
function haMaiuscole(str) {
  return str !== str.toLowerCase();
}

// ------------------------------------------------------------------
// haMinuscole
// ------------------------------------------------------------------
function haMinuscole(str) {
  return str !== str.toUpperCase();
}

// ------------------------------------------------------------------
// haNumeri
// ------------------------------------------------------------------
function haNumeri(str) {
  return str.match(/\d+/) !== null;
}

// ------------------------------------------------------------------
// haSpeciali
// ------------------------------------------------------------------
function haSpeciali(str) {

  // @#&*-+=()_:;.,!?%[]^ 

  let permessi = "@#&*-+=()_:;.,!?%[]^";
  let arr = Array.from(permessi);

  for (var i = 0, len = arr.length; i < len; ++i) {
    if (str.indexOf(arr[i]) != -1) {
      return true;
    }
  }
  return false;
}

// ------------------------------------------------------------------
// haCaratteriPermessi
// ------------------------------------------------------------------
function haCaratteriPermessi(str) {

  let permessi = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#&*-+=()_:;.,!?%[]^";
  let arr = Array.from(permessi);

  let str_arr = Array.from(str);

  for (var j = 0, len_str_arr = str_arr.length; j < len_str_arr; ++j) {
    let check = false;
    for (var i = 0, len_arr = arr.length; i < len_arr; ++i) {
      if (str_arr[j] == arr[i]) {
        check = true;
      }
    }
    if (check == false) return false
  }
  return true;
}

// ------------------------------------------------------------------
// haCaratteriConsecutivi (>2 consecutivi)
// ------------------------------------------------------------------
function haCaratteriConsecutivi(str) {

  let str_arr = Array.from(str);

  for (var j = 0, len_str_arr = str_arr.length; j < len_str_arr; ++j) {
    if ((j > 1) && (str_arr[j] == str_arr[j - 1]) && (str_arr[j] == str_arr[j - 2])) {
      return true;
    }
  }
  return false;
}

// ------------------------------------------------------------------
// hexToStringInt
// ------------------------------------------------------------------

function hexToStringInt(s) {

  function add(x, y) {
    var c = 0, r = [];
    var x = x.split('').map(Number);
    var y = y.split('').map(Number);
    while (x.length || y.length) {
      var s = (x.pop() || 0) + (y.pop() || 0) + c;
      r.unshift(s < 10 ? s : s - 10);
      c = s < 10 ? 0 : 1;
    }
    if (c) r.unshift(c);
    return r.join('');
  }

  var dec = '0';
  s.split('').forEach(function(chr) {
    var n = parseInt(chr, 16);
    for (var t = 8; t; t >>= 1) {
      dec = add(dec, dec);
      if (n & t) dec = add(dec, '1');
    }
  });
  return dec.toString();
}

// ------------------------------------------------------------------
// haLunghezzaMinima
// ------------------------------------------------------------------
function haLunghezzaMinima(str, minimo) {
  if (str.length >= minimo) {
    return true;
  } else {
    return false;
  }
}

// ------------------------------------------------------------------
// haLunghezzaMassima
// ------------------------------------------------------------------
function haLunghezzaMassima(str, massimo) {
  if (str.length <= massimo) {
    return true;
  } else {
    return false;
  }
}