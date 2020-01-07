const u = require('umbrellajs');

// Umbrella は軽量な分jqueryほどの機能を持っていないので自分たちで追加していく
u.prototype.hoge = () => {
  console.log( "アンブレラ！");
}

// .eq : 指定されたindexのノードを探します。
u.prototype.eq = function(index){
  console.log(this.nodes);
  console.log(index);
  return u(this.nodes[index]);
};

export = u;
// export default u;
