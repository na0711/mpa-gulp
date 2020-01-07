import Hello from '../modules/Hello';
const u = require('../modules/Unbrella');

const hello = new Hello("こっちは！bbbです");
hello.say();

u('a').text("Unbrellaで文字を書き換えてます。"); 

u('a').each((elm)=>{
    u(elm).attr("rel","aa");
});

// Unbrellaにはないeqを実装
u('a').eq(0).addClass("is-active");



