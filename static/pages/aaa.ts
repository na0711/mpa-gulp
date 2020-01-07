import Hello from '../modules/Hello';
const $ = require('jQuery');

const hello = new Hello("おはよう！aaaです");
hello.say();

$(()=>{
    $('a').text("jQueryで文字を書き換えてます。");
})

