# Acquiring
Download this repository
For example `git clone git@github.com:Birch-san/kanji-thing.git` 

# Installing
Run `npm install` in my directory
Also [download `kanjidic.gz`](http://ftp.monash.edu.au/pub/nihongo/kanjidic.gz) and put it into my directory

# Running
Invoke `node index.js` in my directory

Or install [Visual Studio Code](https://code.visualstudio.com/), view index.js and press F5. This will run with a debugger attached, you can stop on breakpoints and ask questions, etc. 
If you run with Visual Studio Code, check `Terminal.app` to see if your program's output is being directed there.

# Output
Produces a array of objects, with their Henshall index and kanji. 

Something like this:
```js
[ { eNumber: 997, kanji: '亜' },
  { eNumber: 998, kanji: '哀' },
  { eNumber: 417, kanji: '愛' },
  { eNumber: 222, kanji: '悪' },
  { eNumber: 999, kanji: '握' },
  // and so on…
] 
```

# Next steps
Obviously you could sort these by Henshall index or something.