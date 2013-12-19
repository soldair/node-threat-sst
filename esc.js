module.exports = function(s,opts){
  if(!Buffer.isBuffer(s)) s = new Buffer(s);
 
  var state = {
    o:new Buffer(s.length),
    addlen:opts.escbuflen||s.length/2,
    oi:0,
    len:s.length,
    bufs:[]
  }

  for( var i=0; i<s.length; ++i ){
    if(s[i] == opts.delim){
      esc_w(opts.esc,state)
      esc_w(opts.replace,state)
    } else if(s[i] === opts.esc) {
      esc_w(opts.esc,state)
      esc_w(opts.esc,state)
    } else {
      esc_w(s[i],state);
    }
  }

  if(state.oi < state.o.length) state.o = state.o.slice(0,state.oi);
  state.bufs.push(state.o);

  return Buffer.concat(state.bufs);
}


function esc_w(c,s){
  s.o[s.oi++] = c;
  if(s.oi == s.len) {
    s.bufs.push(s.o);
    s.o = new Buffer(s.addlen);
    s.oi = 0;
  } 
}

