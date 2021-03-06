'use strict';
console.time('Время работы программы:');

// Function for inserting into 'filter' function of the array
// Finds elements that don't have '-'
// s - string element of the array
//
function filterDefis(s) {
  return s.search('-') === -1;
}

// Function that sorts the array 
// Returns the array of elements that don't include '-'
// a - array to filter
// Works slightly faster then filterDefis function
//

function filterDefis2(a) {
  let b = [];
  a.forEach(word => {
    if (word.search('-') === -1) {
      b.push(word);
    }
  });
  return b;
}

// Function for inserting into 'sort' method of the array
// Sorts the array in order of increasing the quantity of the vowels
// a, b - string elements of the array
//
function vowelQuantity(a, b) {
  return a.split(/е|у|о|а|ы|я|и|ю|ё|э/g).length - 
         b.split(/е|у|о|а|ы|я|и|ю|ё|э/g).length;
}

// Function that sorts the array in order of 
// increasing the quantity of the vowels
// a - array to sort
// Works more than 3 times faster than vowelQuantity function
//
function vowelQuantity2(a) {
  let b = [],
      c = [],
      min, 
      index, 
      tmp,
      l = a.length;
  a.forEach(elem => {
    b.push(elem.split(/е|у|о|а|ы|я|и|ю|ё|э/g).length);
    c.push(elem);
  });
  for (let i = 0; i < l; i++){
    min = b[i];
    index = i;
    for (let j = i + 1; j < l; j++){
      if (b[j] < min){
        min = b[j];
        index = j;
      }
    }
    if (index !== i){
      tmp = b[i];
      b[i] = b[index];
      b[index] = tmp;
      tmp = c[i];
      c[i] = c[index];
      c[index] = tmp;
    }
  }
  return c;
}

// Function that counts the frequensy of each symbol that are in the string
// Returns the string that looks similar to object
// a - string
//
function frequencyOfSymbols(a){
  let arr = [];
  let isThere = false;
  for (let i = 0; i < a.length; ++i){
    isThere = false;
    for (let j = 0; j < arr.length; j = j + 2){
       if (a[i] === ' '){
         isThere = true;
         break;
       }
       if (arr[j] === a[i]){
         ++arr[j+1];
         isThere = true;
         break;
       }
    }
    if (!isThere) arr.push(a[i],1);
  }
  arr = arr.map((elem,i) => i%2 === 0 ? elem+=':' : elem+='; ');
  arr[arr.length - 1] = 
    arr[arr.length - 1].substring(0,arr[arr.length - 1].length - 2);        
  return JSON.stringify(arr).replace(/(")|(,)/g,'');
}

// Function that counts the frequensy of each symbol that are in the string
// Returns the object 'symbol': quantity of it in the string
// a - string
// Works more than 1,5 times faster than frequensyOfSymbols
//
function frequencyOfSymbols2(a){
  let obj = {};
  let l = a.length;
  for (let i = 0; i < l; ++i){
    if (obj[a[i]] === undefined){
      obj[a[i]] = 1;
    }
    else {
      ++obj[a[i]];
    }
  }
  return obj;
}

// Instead of division by dyphtongs as they don't exist in Russian
// Function that returns the array of syllables (слогов) of the word
// a - string written in russian language
//
function divideBySyllables(a){
  let arr = [];
  let tmp;
  let reg = /у|е|э|о|а|ы|я|и|ю|ё/i;
  a.split(/\s|-/g).forEach(word => {
    tmp = '';
    let l = word.length;
    for (let i = 0; i < l; ++i){
      tmp += word[i];
      let aSearch = (word[i].search(reg) !== -1)
      if (aSearch &&
         !(((word[i+1] || '').search(reg) === -1) &&
         (i !== l - 1) &&
         ((word[i+2] || '').search(reg) === -1))
      || (!aSearch &&
         ((word[i+1] || '').search(reg) === -1) &&
         ((word[i-1] || '').search(reg) !== -1))){
        arr.push(tmp);
        tmp = '';
      }
    }
    if (tmp.search(/у|е|э|о|а|ы|я|и|ю|ё/i) !== -1){
      arr.push(tmp);
    }
    else if (tmp !== ''){
      arr[arr.length - 1] += tmp;
    }
  });
  return arr;
}

// Function that returns a hash of the single word
// a - string to hash
//
function hashing(a){ 
  while (a.length % 4 != 0) a += ' ';  
  a += 'соль';
  let l = a.length;
  let s = [a.charCodeAt(0), a.charCodeAt(1),
           a.charCodeAt(2), a.charCodeAt(3)]; 
  for (let i = 4; i < l; ++i){
    let h = i%4;
    s[h] = s[h]^a.charCodeAt(i);
  }  
  return ((s[0]<<24) + (s[1]<<16) + (s[2]<<8) + s[3])
}
  
// Function that hashes the array of strings
// Returns the object hash:element of the array
// arr - array of strings
//  
function hashing2(arr){  
  let hash = {};
  arr.forEach(a => {
    hash[hashing(a)] = a; 
  });
  return hash;
}
  
// Function that encrypts the word
// 1) Changes the order of letters, taking first, then each fourth letter,
// than second and each fourth etc., e.g. 1234567 => 1526374
// 2) Performs the byte XOR with each letter and the given key
// a - string to encrypt
// keyChar - key symbol, russian 'о' by default 
// if keyChar is a string the first symbol is taken
//
function encryption(a, keyChar){
  keyChar = keyChar || 'о';
  let temp = '',
      key2 = '@'.charCodeAt(0),
      key = keyChar.charCodeAt(0);
  
  // Changing the order
  while (a.length % 4 != 3) a += ' ';
  let l = a.length;
  for (let i = 0; i < l; ++i) {
    temp += a[i*4%l];
  }
  
  // Byte XOR
  let temp2 = '';
  for (let i = 0; i < l; ++i){
    temp2 += String.fromCharCode(((temp.charCodeAt(i))^key++)^key2);
  }
  return temp2;
}

// Function that deencrypts the word
// 1) Performs the byte XOR with each letter and the given key
// 2) Changes the order of letters, 
// taking first and each (length/4, rounded to next natural number) letter,
// than second etc., e.g. 1526374 => 1526374
// a - string to encrypt
// keyChar - key symbol, russian 'о' by default 
// if keyChar is a string the first symbol is taken
//
function deEncryption(a, keyChar){
  keyChar = keyChar || 'о';
  let l = a.length,
      n = Math.ceil(l/4),
      key2 = '@'.charCodeAt(0),
      key = keyChar.charCodeAt(0),
      temp2 = '';
  
  // Byte XOR
  for (let i = 0; i < l; ++i){
    temp2 += String.fromCharCode(((a.charCodeAt(i))^key++)^key2);
  }
  
  // Changing order
  let temp = '';
  for (let i = 0; i < l; ++i){
    temp += temp2[i*n%l];
  } 
  while (temp[temp.length] === ' ') temp[temp.length = '\0'];
  
  return temp;
}

let colors = ['красный','синий','зелёный','жёлтый','белый',
'черный','оранжевый','розовый','фиолетовый','коричневый',
'голубой','бежевый','малиновый','серый','пурпурный',
'синевато-зелёный','жемчужно-белый','салатовый',
'Зелёный Мичиганского государственного университета','золотистый',
'кирпично-красный','коралловый','лимонно-жёлтый','розовато-лиловый','индиго'];
let tmp = [];

console.log('Початковий масив:\n\n' + colors + '\n');
console.log('-------------------------------------------------\n');

tmp = filterDefis2(colors);
console.log('Масив без слiв, що мiстять дефiс:\n\n' + tmp + '\n')
console.log('-------------------------------------------------\n');

tmp = vowelQuantity2(colors);
console.log('Масив, вiдсортований за кiлькiстю голосних лiтер:\n\n' + 
            tmp + '\n');
console.log('-------------------------------------------------\n');

console.log('Масив частот символiв:')
for(let i = 0; i < colors.length; ++i){
  console.log('\n' + colors[i]);
  console.log(frequencyOfSymbols2(colors[i]));
}

console.log('\n-------------------------------------------------\n');
console.log('Масив складiв:')
colors.forEach(x => {
  console.log('\n' + x);
  console.log(divideBySyllables(x));
});

console.log('\n-------------------------------------------------\n');
console.log('Хешування та пошук по хешу');
let hash = {};
hash = hashing2(colors);
colors.forEach(x => {  
  let a = hashing(x);  
  console.log('\n' + a);  
  console.log(hash[a]); 
});

console.log('\n-------------------------------------------------\n');
console.log('Шифрування та дешифрування:')
colors.forEach(x => {
  let a = encryption(x);
  console.log('\n' + a);
  console.log(deEncryption(a));
});
console.timeEnd('Время работы программы:');
