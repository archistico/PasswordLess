/*

SPID
I caratteri speciali ammessi sono: & % ! " ( ) ? ^ + [ ] . , _

TODO:
 - [ ] mettere la master password a type="password" 
 - [X] sito web ecc. pulire da https:// http://
 - [ ] gestione caratteri non inclusi
 - [X] funzione di verifica della password generata
    - [X] lunghezza minima 8 caratteri
    - [X] lunghezza massima 16 caratteri
    - [X] presenza di maiuscole
    - [X] presenza di minuscole
    - [X] uno o più numeri
    - [X] almeno un carattere speciale
    - [X] non più di due caratteri uguali consecutivi
 - [ ] correggi la password per rispettare tutti i parametri
*/


// ------------------------------------------------------------------
// ONLOAD
// ------------------------------------------------------------------

window.onload = () => {
  //calcola();
}

// ------------------------------------------------------------------
// CALCOLA
// ------------------------------------------------------------------

function calcola() {

  let input_master = document.getElementById("input_master");
  let input_dove = document.getElementById("input_dove");
  let risultato = document.getElementById("text_risultato");

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

  let SHA512 = new Hashes.SHA512;
  let output = vigenere(input_master.value, SHA512.hex(input_dove.value + input_master.value));
  risultato.innerText = output;
  check(output);
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

  if (output.length >= 8) {
    check_lunghezza_minima.innerText = "OK";
    check_lunghezza_minima.classList.value = "OK";
  } else {
    check_lunghezza_minima.innerText = "NO";
    check_lunghezza_minima.classList.value = "NO";
  }

  if (output.length <= 16) {
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
  let ris = str.replace(/^(http:\/\/|https:\/\/)/,"");  
  ris = ris.replace(/(\/)+$/,"");
  ris = ris.replace(/(\/).*$/,"");
  return ris;
}

// ------------------------------------------------------------------
// VIGENERE
// ------------------------------------------------------------------

function vigenere(message, keyword) {

  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ%&!()?+[].,_@#°§*/\|^=$£€\"'-*";

  message = message.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let result = "";
  let keywordIndex = 0;

  let shift = 1;

  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    const charIndex = alphabet.indexOf(char.toLowerCase());

    if (charIndex >= 0) {
      const keywordChar = keyword[keywordIndex % keyword.length];
      const keywordIndexInAlphabet = alphabet.indexOf(
        keywordChar.toLowerCase()
      );
      const isUpperCase = char === char.toUpperCase();
      const shiftedCharIndex =
        (charIndex + shift * keywordIndexInAlphabet + alphabet.length) % alphabet.length;
      let shiftedChar = alphabet[shiftedCharIndex];

      if (isUpperCase) {
        shiftedChar = shiftedChar.toUpperCase();
      }

      result += shiftedChar;

      keywordIndex++;
    } else {
      result += char;
    }
  }

  return result;
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
  // & % ! " ( ) ? ^ + [ ] . , _
 
  let arr = ["&", "%", "!", "\"", "(", ")", "?", "^", "+", "[", "]", ".", ",", "_"];
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

  let permessi = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ%&!()?+[].,_";
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
      if ((j > 1) && (str_arr[j] == str_arr[j-1]) && (str_arr[j] == str_arr[j-2])) {
          return true;
      }   
  }
  return false;
}



