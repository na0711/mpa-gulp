
class Hello  {
  private msg:string ;
  constructor(msg:string){
   this.msg = msg
  }
  say = ():void => {
    console.log(this.msg + "!？");
  }
}

export default Hello;