const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
    '/': ' ',
};

function decode(expr) {
    var result = expr;
    // replace value
    for(let i = 0; result.length > i; i++) {  
        result = result.replace('**********', ' / ').replace('1111', '--').replace('11', '-');
    }
    // replace value
    for(let i = 0; result.length > i; i++) {
        result = result.replace('10', '.');
    }
    // replace value
    for(let i = 0; result.length > i; i++) {
        result = result.replace('00', ' ');
    }

    function decrypt(element) {
        if (element.length < 5) {
          // length < 5 decode
          return MORSE_TABLE[element];
          
        } else if (element.length % 5 === 0) { 
            // length < 5 decode
            let count = element.length / 5;
            var result = '';
            iterator = 0;

            for(let i = 0; count > i; i++) {
              result += MORSE_TABLE[element.substring(iterator, iterator + 5)]
              iterator += 5;
            }

            return result;
          } else {
            // difference decode
            var result = '';
            let count = Math.floor(element.length / 5);
            let difference = element.length % 5;
            let iterator = 5;

    
            for(let i = 0; count > i; i++) {
              // init first element
              if(i === 0) {
                result = MORSE_TABLE[element.substring(element[0], difference)]
                iterator = difference + iterator
              } 

              result += MORSE_TABLE[element.substring(iterator - 5, iterator)]
              iterator += 5;
            }

            return result;
        }
      }

    return result.split(' ').filter(element => element.length !== 0).map(decrypt).join('');
}

module.exports = {
    decode
}