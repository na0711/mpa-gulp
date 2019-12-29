import Hello from '../modules/Hello';
import $ = require('jQuery');

// 別ファイルで定義したmoduleが使えます＝機能は個別のファイルで管理して、各ページではnew Class して
const hello = new Hello("おはよう！aaaです");
hello.say();

$(()=>{
    $('a').text("jQueryで文字を書き換えてます");
});

