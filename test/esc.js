var esc = require('../esc')

process.stdout.write(esc("hihi\nhihi",{delim:"\n".charCodeAt(0),esc:'\\'.charCodeAt(0),replace:"n".charCodeAt(0)}))
