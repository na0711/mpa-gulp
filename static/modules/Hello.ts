
class Hello  {
  private msg:string ;
  constructor(msg:string){
   this.msg = msg
  }
  say = () => {
    console.log(this.msg);
  }
}


export default Hello;