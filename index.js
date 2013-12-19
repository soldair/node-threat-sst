// i should wrap a block reader in such a way as i can 

var blockReader = require('block-reader')
var varint
module.exports = function(file,blockSize,cb){
  blockReader(fileblockSize,function(err,reader){
    if(err) return cb(err);

    // reading and writing.

    var r = reader.read;
    var out = {
      _delim:10,//254,// line delim.
      _replace:110,//'n',
      _esc:92,// line escape.
      _escbuflen:1024,
      _reader:r,
      read:function(){
        
      },
      write:function(key,value){
        this.serilize(key,value);
      },
      serialize:function(key,value){
        key = this.esc(key);
        value = this.esc(value);
        var arr = [this._num(key.length),key,this._num(value.length);
        return Buffer.concat([this._num(key.length),key,this._num(value.length),value,this._delimb]);
      },
      unserialize:function(){

      },
      esc:function(s){
        if(!Buffer.isBuffer(s)) s = new Buffer(s);
       
        var state = {
          o:new Buffer(s.length),
          addlen:s.length<this.escbuflen?s.length:this.escbuflen,
          oi:0,
          len:s.length
          bufs:[]
        }
 
        for( var i=0; i<s.length; ++i ){
          if(s[i] == this.delim){
            esc_w(this._esc,state)
            esc_w(this._replace,state)
          } else if(s[i] === this._esc) {
            esc_w(this._esc,state)
            esc_w(this._esc,state)
          } else {
            esc_w(s[i],state);
          }
        }

        if(state.oi < state.o.length) state.o = state.o.slice(0,oi);
        state.bufs.push(state.o);

        return Buffer.concat(state.bufs);

      },
      unesc:function(){

      },
      // this varint can only encode up to 4294967295 
      // this means sizes are limited to 4gb
      // later i can do continued values.
      _num:function(n){
        if(n > 4294967295) throw new Error('TODO: support larger values. // no reason to have a limit');
        return new Buffer(varint.encode(n));
      }
    };
    
    
    cb(false,out);
  });
}


