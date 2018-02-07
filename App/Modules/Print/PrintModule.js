import {
    NativeModules,
} from 'react-native';
export default  {
  async printContent(data){

      // data={
      //   type:1,
      //   merchantName:"Dahuaishu Inc.",
      //   merchantAddress:"111 Granton Dr.",
      //   merchantPhoneNumber:"+1(905)382-2182",
      //   refId:"112",
      //   date:"2015-08-15 15:55:27",
      //   method: "WeChat Pay",
      //   rate:"5.2",
      //   totalAmount:"32.44",
      //   CNYamount:"3752.34",
      //   QRCode:"www.google.com",
      // }
      // data={
      //   type:2,
      //   merchantName:"Dahuaishu Inc.",
      //   merchantAddress:"111 Granton Dr.",
      //   merchantPhoneNumber:"+1(905)382-2182",
      //   refId:"112",
      //   start:"2017-02-15",
      //   end:"2017-02-28",
      //   transaction:[
      //     {
      //       number:"1888",
      //       time:"2015-08-15 15:55:27",
      //       amount:"17.99"
      //     },
      //     {
      //
      //         number:"1888",
      //         time:"2015-08-15 15:55:27",
      //         amount:"17.99"
      //     }
      //   ],
      // }
      if (data.type==1) {this._printReceipt(data); }
      else if (data.type==2) {this._printTransaction(data);}
      else if (data.type==3){this._printRefundReceipt(data);}
      else if (data.type==4){this._printTodayTransaction(data);}
    },
    async _printReceipt(data)
    {

      let logo = "data:image/bmp;base64,Qk1oEAAAAAAAAD4AAAAoAAAAUQEAAF4AAAABAAEAAAAAACoQAAASCwAAEgsAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXd3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1d3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3AAAAAAAAAAAAAAAAAAAAAAAAAqoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAd3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHQAAAAAAAAAAAAAAAAAAAAAAA////gAAAAAAAAAAAAAAAAAAAAAqAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAF3d3dAAAAAAAAAAAAAAAAAAAAAV3AAAAAAB3AAAAAAAAAD//wAAAAP//gAD/////gAD//4AAAAAP4AAAAAAAL//gH8AAAH8AAAAAAAAAHd3AAAAAXd2AAd3d3d3AAN3dAAAAAAXAAAAAAABd3dwdwAAAXQAAAAAAAAA//8AAAAD//4AH//////gA//+AAAAAD+AAAAAAAP///h+AAAD/gAAAAAAAAB3dwAAAAF3dgA3d3d3d3ADd3QAAAAAFwAAAAAAB3d3dHcAAAd2AAAAAAAAAP//AAAAA//+AP//////+AP//gAAAAA/gAAAAAAP/iL+fgAAB/4AAAAAAAAA3d0AAAAB3dwB3d3d3d3cAd3cAAAAAB2AAAAAAB3QAF1dAAAF3QAAAAAAAAD//wAAAAP//gP///////4D//4AAAAAP4AAAAAAP+AAD/4AAA//gAAAAAAAAN3dAAAAAd3cBd3d3d3d3QHd3AAAAAAdgAAAAABdwAAF3QAADd0AAAAAAAAA//8AAAAD//4P////////g//+AAAAAD+AAAAAAD+AAAP+AAAfn4AAAAAAAAB3dwAAAAF3dgd3d3d3d3dDd3QAAAAAFwAAAAAAdwAAAXcAABcXQAAAAAAAAP//AAAAA//+H////////+P//gAAAAA/gAAAAAD/AAAA/gAAP4/AAAAAAAAAd3cAAQABd3QXd3d3d3d3YXd0AAAAABcAAAAAAHcAAAB3AAA3B0AAAAAAAAD//wADgAP//j/////////h//4AAAAAP4AAAAAA/gAAAP4AAD8P4AAAAAAAAN3dAAWAAd3cXd3d3d3d3dDd3AAAAAAdgAAAAABcAAAAXQAAXQXAAAAAAAAA//8AD8AD//j/////////+P/+AAAAAD+AAAAAAP4AAAB+AAD+B+AAAAAAAADd3QANwAHd2N3d3d3d3d3cXdwAAAAAHYAAAAAAXQAAAF0AANwF0AAAAAAAAP//AB/gA//4///6qqqqqqz//gAAAAA/gAAAAAB/gAAAPgAA/gP4AAAAAAAAd3cAF3ABd3F3d0AAAAAAAHd0AAAAABcAAAAAAHcAAAB3AAF0AXAAAAAAAAD//wA/+AP/8///wAAAAAAAP/4AAAAAP4AAAAAAP4AAAH4AA/gD+AAAAAAAAHd3AHdwAXdxd3dAAAAAAAA3dAAAAAAXAAAAAAAXQAAAdwABcAF0AAAAAAAA//8Af/wD/+P//8AAAAAAAD/+AAAAAD+iIgAAAB/4AAL+AAP4APwAAAAAAADd3QBd3AHdxd3dwAAAAAAAHd1VVVVAHd3d1AAADdwAFd0ABdAA3AAAAAAAAP//AP/+A//n///AAAAAA/g//////+A/////4AAP/////gAP4AD+AAAAAAAA3d0B3d0B3cXd3cAAAAAF0B3d3d3dwB3d3d3QAAHd3d3dAAXAAFwAAAAAAAD//wP//4P/z///gAAAAAP4H//////gP/////4AAP////4AD+AAfwAAAAAAAHd3B3d3AXdHd3dAAAAAAVAXd3d3d0AXd3d3dwAAF3d1dwAXQAB3AAAAAAAA//8P///D/8///8AAAAAAAA//////4D//////gAAL/+h+AB/AAD+AAAAAAAB3dwd3d0F3R3d3QAAAAAAAF3d3d3dAFwAABXdAAAAAAHcAFwAAFwAAAAAAAP//D///4//P///AAAAAAAAP/////+A/gAAA/+AAAAAAfgA/gAA/gAAAAAAA3d0d3d3R3cXd3cAAAAAAAA3d3d3dwB2AAAAd0AAAAABcAB0AAB3AAAAAAAD//z////v/z///wAAAAAAAD//////gP4AAAA/4AAAAAP4AfwAAD+AAAAAAAN3dXd3d2d3F3d3AAAAAAAAN3d3d3cAdgAAABdgAAAAAXABdAAANwAAAAAAA///////5/4///4AAAAAAAA//////4D+AAAAD+AAAAAD+AP4AAA/gAAAAAAB3d3d3d3V3R3d3QAAAAAAAF3d3d3dAFwAAAAF0AAAAAXQAdAAAB2AAAAAAAP/////////P///AAAAAAAAP/////+A/gAAAAf4AAAAD/gH+AAAP8AAAAAAAd3d3d3d3d0d3d0AAAAAAABd0AAAAABcAAAABdAAAAAN0AXQAAAdwAAAAAAD/////////5///6qqqqqqqD/4AAAAAP4AAAAD+A4AAD/gD+AAAA/gAAAAAAN3d3dxd3d3F3d3d3d3d3dwd3AAAAAAdgAAAAFwB0AAd0AHYAAAB0AAAAAAA/////v///+f//////////j/+AAAAAD+AAAAA/gP+qv/wA/gAAAP4AAAAAADd3d3cXd3dxd3d3d3d3d3cHdwAAAAAHYAAAABcBd3d3cAF0AAAAdwAAAAAAP////g////j///qqqqqqqo//gAAAAA/gAAAAP4P////wA/wAAAB/AAAAAAAd3d3cBd3d2F3d0AAAAAAABd0AAAAABcAAAAAdgF3d3cAB2AAAAB0AAAAAAD////wH///4///wAAAAAAAP/4AAAAAP4AAAAD+AP///gAP4AAAAP4AAAAAAHd3d2AHd3dxd3dAAAAAAAB3dAAAAAAXAAAAAHYAF3dwABVAAAAAVwAAAAAA////4A////D//+AAAAAAAn/+AAAAAD+AAAAA/gAAqoAAAAAAAAAAAAAAAADd3d3ABd3d0N3d3VVVVVVcXd1VVVVUHYAAAAHcAAAAAAAAAAAAAAAAAAAAAP///4AD///4//////////j///////w/gAAAA/4AAAAAAAAAAAAAAAAAAAAA3d3dAAHd3dxd3d3d3d3d0N3d3d3d3B2AAAAB3AAAAAAAAAAAAAAAAAAAAAD///8AAf///D/////////x///////4P4AAAAP4AAAAAAAAAAAAAAAAAAAAAHd3dwABd3d0N3d3d3d3d2F3d3d3d3QXAAAAB3AAAAAAAAAAAAAAAAAAAAAA///+AAD///4/////////4///////+D+AAAAf+AAAAAAAAAAAAAAAAAAAAAB3d3QAAHd3dhd3d3d3d3dDd3d3d3d0FwAAAHdwAAAAAAAAAAAAAAAAAAAAAP//+AAAP//+D////////4P///////g/gAAC/+AAAAAAAAAAAAAAAAAAAAAA3d3QAAAd3dwF3d3d3d3dAd3d3d3d3B3VVVXdwAAAAAAAAAAAAAAAAAAAAAD///gAAD///gP///////4D///////8P/////+AAAAAAAAAAAAAAAAAAAAAAN3d0AAAHd3cAd3d3d3d3AHd3d3d3dwd3d3d3QAAAAAAAAAAAAAAAAAAAAAA///gAAAP//4A///////4A///////+D/////6AAAAAAAAAAAAAAAAAAAAAAB3d0AAAAd3dgB3d3d3d3ADd3d3d3d0F3d3d3AAAAAAAAAAAAAAAAAAAAAAAP//wAAAB//+AD//////4AP///////w/////gAAAAAAAAAAAAAAAAAAAAAAAVVUAAAABVVQAB3d3d3cAAVVVVVVVUBVVVVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3d3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
       //ensure the base64 string without URI Scheme
       let logobase64 = logo.replace("data:image/bmp;base64,","");
         try {


            await NativeModules.MCFPrinter.printOriginalText("        ");

             await NativeModules.MCFPrinter.printBitmap(logobase64, 200/*width*/, 150/*height*/);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText(data.merchantName);

             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printOriginalText(data.merchantAddress);

             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText(data.merchantPhoneNumber);
             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText("________________________________");
             await NativeModules.MCFPrinter.lineWrap(2);
             await NativeModules.MCFPrinter.printOriginalText("#"+data.refId);
             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText("Date: "+data.date);
             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText("Channel: "+data.method);
             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText("________________________________");
             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText("Exchange Rate: "+data.rate);
             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printOriginalText("Amount: $"+data.totalAmount);
             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printOriginalText("CNY Amount: ￥"+data.CNYamount);
             await NativeModules.MCFPrinter.lineWrap(2);
             await NativeModules.MCFPrinter.printQr(data.QRCode,10,1)




         }catch(e){
             console.log(e)
             alert("print error."+e.message);
         }
    },
    async _printTransaction(data)
    {
      let logo = "data:image/bmp;base64,Qk1oEAAAAAAAAD4AAAAoAAAAUQEAAF4AAAABAAEAAAAAACoQAAASCwAAEgsAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXd3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1d3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3AAAAAAAAAAAAAAAAAAAAAAAAAqoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAd3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHQAAAAAAAAAAAAAAAAAAAAAAA////gAAAAAAAAAAAAAAAAAAAAAqAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAF3d3dAAAAAAAAAAAAAAAAAAAAAV3AAAAAAB3AAAAAAAAAD//wAAAAP//gAD/////gAD//4AAAAAP4AAAAAAAL//gH8AAAH8AAAAAAAAAHd3AAAAAXd2AAd3d3d3AAN3dAAAAAAXAAAAAAABd3dwdwAAAXQAAAAAAAAA//8AAAAD//4AH//////gA//+AAAAAD+AAAAAAAP///h+AAAD/gAAAAAAAAB3dwAAAAF3dgA3d3d3d3ADd3QAAAAAFwAAAAAAB3d3dHcAAAd2AAAAAAAAAP//AAAAA//+AP//////+AP//gAAAAA/gAAAAAAP/iL+fgAAB/4AAAAAAAAA3d0AAAAB3dwB3d3d3d3cAd3cAAAAAB2AAAAAAB3QAF1dAAAF3QAAAAAAAAD//wAAAAP//gP///////4D//4AAAAAP4AAAAAAP+AAD/4AAA//gAAAAAAAAN3dAAAAAd3cBd3d3d3d3QHd3AAAAAAdgAAAAABdwAAF3QAADd0AAAAAAAAA//8AAAAD//4P////////g//+AAAAAD+AAAAAAD+AAAP+AAAfn4AAAAAAAAB3dwAAAAF3dgd3d3d3d3dDd3QAAAAAFwAAAAAAdwAAAXcAABcXQAAAAAAAAP//AAAAA//+H////////+P//gAAAAA/gAAAAAD/AAAA/gAAP4/AAAAAAAAAd3cAAQABd3QXd3d3d3d3YXd0AAAAABcAAAAAAHcAAAB3AAA3B0AAAAAAAAD//wADgAP//j/////////h//4AAAAAP4AAAAAA/gAAAP4AAD8P4AAAAAAAAN3dAAWAAd3cXd3d3d3d3dDd3AAAAAAdgAAAAABcAAAAXQAAXQXAAAAAAAAA//8AD8AD//j/////////+P/+AAAAAD+AAAAAAP4AAAB+AAD+B+AAAAAAAADd3QANwAHd2N3d3d3d3d3cXdwAAAAAHYAAAAAAXQAAAF0AANwF0AAAAAAAAP//AB/gA//4///6qqqqqqz//gAAAAA/gAAAAAB/gAAAPgAA/gP4AAAAAAAAd3cAF3ABd3F3d0AAAAAAAHd0AAAAABcAAAAAAHcAAAB3AAF0AXAAAAAAAAD//wA/+AP/8///wAAAAAAAP/4AAAAAP4AAAAAAP4AAAH4AA/gD+AAAAAAAAHd3AHdwAXdxd3dAAAAAAAA3dAAAAAAXAAAAAAAXQAAAdwABcAF0AAAAAAAA//8Af/wD/+P//8AAAAAAAD/+AAAAAD+iIgAAAB/4AAL+AAP4APwAAAAAAADd3QBd3AHdxd3dwAAAAAAAHd1VVVVAHd3d1AAADdwAFd0ABdAA3AAAAAAAAP//AP/+A//n///AAAAAA/g//////+A/////4AAP/////gAP4AD+AAAAAAAA3d0B3d0B3cXd3cAAAAAF0B3d3d3dwB3d3d3QAAHd3d3dAAXAAFwAAAAAAAD//wP//4P/z///gAAAAAP4H//////gP/////4AAP////4AD+AAfwAAAAAAAHd3B3d3AXdHd3dAAAAAAVAXd3d3d0AXd3d3dwAAF3d1dwAXQAB3AAAAAAAA//8P///D/8///8AAAAAAAA//////4D//////gAAL/+h+AB/AAD+AAAAAAAB3dwd3d0F3R3d3QAAAAAAAF3d3d3dAFwAABXdAAAAAAHcAFwAAFwAAAAAAAP//D///4//P///AAAAAAAAP/////+A/gAAA/+AAAAAAfgA/gAA/gAAAAAAA3d0d3d3R3cXd3cAAAAAAAA3d3d3dwB2AAAAd0AAAAABcAB0AAB3AAAAAAAD//z////v/z///wAAAAAAAD//////gP4AAAA/4AAAAAP4AfwAAD+AAAAAAAN3dXd3d2d3F3d3AAAAAAAAN3d3d3cAdgAAABdgAAAAAXABdAAANwAAAAAAA///////5/4///4AAAAAAAA//////4D+AAAAD+AAAAAD+AP4AAA/gAAAAAAB3d3d3d3V3R3d3QAAAAAAAF3d3d3dAFwAAAAF0AAAAAXQAdAAAB2AAAAAAAP/////////P///AAAAAAAAP/////+A/gAAAAf4AAAAD/gH+AAAP8AAAAAAAd3d3d3d3d0d3d0AAAAAAABd0AAAAABcAAAABdAAAAAN0AXQAAAdwAAAAAAD/////////5///6qqqqqqqD/4AAAAAP4AAAAD+A4AAD/gD+AAAA/gAAAAAAN3d3dxd3d3F3d3d3d3d3dwd3AAAAAAdgAAAAFwB0AAd0AHYAAAB0AAAAAAA/////v///+f//////////j/+AAAAAD+AAAAA/gP+qv/wA/gAAAP4AAAAAADd3d3cXd3dxd3d3d3d3d3cHdwAAAAAHYAAAABcBd3d3cAF0AAAAdwAAAAAAP////g////j///qqqqqqqo//gAAAAA/gAAAAP4P////wA/wAAAB/AAAAAAAd3d3cBd3d2F3d0AAAAAAABd0AAAAABcAAAAAdgF3d3cAB2AAAAB0AAAAAAD////wH///4///wAAAAAAAP/4AAAAAP4AAAAD+AP///gAP4AAAAP4AAAAAAHd3d2AHd3dxd3dAAAAAAAB3dAAAAAAXAAAAAHYAF3dwABVAAAAAVwAAAAAA////4A////D//+AAAAAAAn/+AAAAAD+AAAAA/gAAqoAAAAAAAAAAAAAAAADd3d3ABd3d0N3d3VVVVVVcXd1VVVVUHYAAAAHcAAAAAAAAAAAAAAAAAAAAAP///4AD///4//////////j///////w/gAAAA/4AAAAAAAAAAAAAAAAAAAAA3d3dAAHd3dxd3d3d3d3d0N3d3d3d3B2AAAAB3AAAAAAAAAAAAAAAAAAAAAD///8AAf///D/////////x///////4P4AAAAP4AAAAAAAAAAAAAAAAAAAAAHd3dwABd3d0N3d3d3d3d2F3d3d3d3QXAAAAB3AAAAAAAAAAAAAAAAAAAAAA///+AAD///4/////////4///////+D+AAAAf+AAAAAAAAAAAAAAAAAAAAAB3d3QAAHd3dhd3d3d3d3dDd3d3d3d0FwAAAHdwAAAAAAAAAAAAAAAAAAAAAP//+AAAP//+D////////4P///////g/gAAC/+AAAAAAAAAAAAAAAAAAAAAA3d3QAAAd3dwF3d3d3d3dAd3d3d3d3B3VVVXdwAAAAAAAAAAAAAAAAAAAAAD///gAAD///gP///////4D///////8P/////+AAAAAAAAAAAAAAAAAAAAAAN3d0AAAHd3cAd3d3d3d3AHd3d3d3dwd3d3d3QAAAAAAAAAAAAAAAAAAAAAA///gAAAP//4A///////4A///////+D/////6AAAAAAAAAAAAAAAAAAAAAAB3d0AAAAd3dgB3d3d3d3ADd3d3d3d0F3d3d3AAAAAAAAAAAAAAAAAAAAAAAP//wAAAB//+AD//////4AP///////w/////gAAAAAAAAAAAAAAAAAAAAAAAVVUAAAABVVQAB3d3d3cAAVVVVVVVUBVVVVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3d3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
       //ensure the base64 string without URI Scheme
       let logobase64 = logo.replace("data:image/bmp;base64,","");
         try {


            await NativeModules.MCFPrinter.printOriginalText("        ");

             await NativeModules.MCFPrinter.printBitmap(logobase64, 200/*width*/, 150/*height*/);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText(data.merchantName);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText(data.merchantAddress);

             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText(data.merchantPhoneNumber);
             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText("Date: "+data.start+" ~ "+data.end);
             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText("________________________________");
             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText("No.   Time                Amount");

             await NativeModules.MCFPrinter.lineWrap(2);

             for (var i=0;i<data.transaction.length;i++)
             {
               await NativeModules.MCFPrinter.printOriginalText(data.transaction[i].number+"  "+data.transaction[i].time+" $"+data.transaction[i].totalAmount);
               await NativeModules.MCFPrinter.lineWrap(2);
             }

             await NativeModules.MCFPrinter.lineWrap(5);



         }catch(e){
             console.log(e)
             alert("print error."+e.message);
         }
    },
    _setLine(title, data){
      let titleLen = title.length;
      let dataLen = data.length;
      let space = "";
      if((titleLen + dataLen) < 30){
        for(let i = 0; i < (30-titleLen-dataLen); i++){
          space += " ";
        }
      }
      return title + space  +data;
    },
    async _printTodayTransaction(data)
    {
      let logo = "data:image/bmp;base64,Qk1oEAAAAAAAAD4AAAAoAAAAUQEAAF4AAAABAAEAAAAAACoQAAASCwAAEgsAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXd3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1d3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3AAAAAAAAAAAAAAAAAAAAAAAAAqoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAd3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHQAAAAAAAAAAAAAAAAAAAAAAA////gAAAAAAAAAAAAAAAAAAAAAqAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAF3d3dAAAAAAAAAAAAAAAAAAAAAV3AAAAAAB3AAAAAAAAAD//wAAAAP//gAD/////gAD//4AAAAAP4AAAAAAAL//gH8AAAH8AAAAAAAAAHd3AAAAAXd2AAd3d3d3AAN3dAAAAAAXAAAAAAABd3dwdwAAAXQAAAAAAAAA//8AAAAD//4AH//////gA//+AAAAAD+AAAAAAAP///h+AAAD/gAAAAAAAAB3dwAAAAF3dgA3d3d3d3ADd3QAAAAAFwAAAAAAB3d3dHcAAAd2AAAAAAAAAP//AAAAA//+AP//////+AP//gAAAAA/gAAAAAAP/iL+fgAAB/4AAAAAAAAA3d0AAAAB3dwB3d3d3d3cAd3cAAAAAB2AAAAAAB3QAF1dAAAF3QAAAAAAAAD//wAAAAP//gP///////4D//4AAAAAP4AAAAAAP+AAD/4AAA//gAAAAAAAAN3dAAAAAd3cBd3d3d3d3QHd3AAAAAAdgAAAAABdwAAF3QAADd0AAAAAAAAA//8AAAAD//4P////////g//+AAAAAD+AAAAAAD+AAAP+AAAfn4AAAAAAAAB3dwAAAAF3dgd3d3d3d3dDd3QAAAAAFwAAAAAAdwAAAXcAABcXQAAAAAAAAP//AAAAA//+H////////+P//gAAAAA/gAAAAAD/AAAA/gAAP4/AAAAAAAAAd3cAAQABd3QXd3d3d3d3YXd0AAAAABcAAAAAAHcAAAB3AAA3B0AAAAAAAAD//wADgAP//j/////////h//4AAAAAP4AAAAAA/gAAAP4AAD8P4AAAAAAAAN3dAAWAAd3cXd3d3d3d3dDd3AAAAAAdgAAAAABcAAAAXQAAXQXAAAAAAAAA//8AD8AD//j/////////+P/+AAAAAD+AAAAAAP4AAAB+AAD+B+AAAAAAAADd3QANwAHd2N3d3d3d3d3cXdwAAAAAHYAAAAAAXQAAAF0AANwF0AAAAAAAAP//AB/gA//4///6qqqqqqz//gAAAAA/gAAAAAB/gAAAPgAA/gP4AAAAAAAAd3cAF3ABd3F3d0AAAAAAAHd0AAAAABcAAAAAAHcAAAB3AAF0AXAAAAAAAAD//wA/+AP/8///wAAAAAAAP/4AAAAAP4AAAAAAP4AAAH4AA/gD+AAAAAAAAHd3AHdwAXdxd3dAAAAAAAA3dAAAAAAXAAAAAAAXQAAAdwABcAF0AAAAAAAA//8Af/wD/+P//8AAAAAAAD/+AAAAAD+iIgAAAB/4AAL+AAP4APwAAAAAAADd3QBd3AHdxd3dwAAAAAAAHd1VVVVAHd3d1AAADdwAFd0ABdAA3AAAAAAAAP//AP/+A//n///AAAAAA/g//////+A/////4AAP/////gAP4AD+AAAAAAAA3d0B3d0B3cXd3cAAAAAF0B3d3d3dwB3d3d3QAAHd3d3dAAXAAFwAAAAAAAD//wP//4P/z///gAAAAAP4H//////gP/////4AAP////4AD+AAfwAAAAAAAHd3B3d3AXdHd3dAAAAAAVAXd3d3d0AXd3d3dwAAF3d1dwAXQAB3AAAAAAAA//8P///D/8///8AAAAAAAA//////4D//////gAAL/+h+AB/AAD+AAAAAAAB3dwd3d0F3R3d3QAAAAAAAF3d3d3dAFwAABXdAAAAAAHcAFwAAFwAAAAAAAP//D///4//P///AAAAAAAAP/////+A/gAAA/+AAAAAAfgA/gAA/gAAAAAAA3d0d3d3R3cXd3cAAAAAAAA3d3d3dwB2AAAAd0AAAAABcAB0AAB3AAAAAAAD//z////v/z///wAAAAAAAD//////gP4AAAA/4AAAAAP4AfwAAD+AAAAAAAN3dXd3d2d3F3d3AAAAAAAAN3d3d3cAdgAAABdgAAAAAXABdAAANwAAAAAAA///////5/4///4AAAAAAAA//////4D+AAAAD+AAAAAD+AP4AAA/gAAAAAAB3d3d3d3V3R3d3QAAAAAAAF3d3d3dAFwAAAAF0AAAAAXQAdAAAB2AAAAAAAP/////////P///AAAAAAAAP/////+A/gAAAAf4AAAAD/gH+AAAP8AAAAAAAd3d3d3d3d0d3d0AAAAAAABd0AAAAABcAAAABdAAAAAN0AXQAAAdwAAAAAAD/////////5///6qqqqqqqD/4AAAAAP4AAAAD+A4AAD/gD+AAAA/gAAAAAAN3d3dxd3d3F3d3d3d3d3dwd3AAAAAAdgAAAAFwB0AAd0AHYAAAB0AAAAAAA/////v///+f//////////j/+AAAAAD+AAAAA/gP+qv/wA/gAAAP4AAAAAADd3d3cXd3dxd3d3d3d3d3cHdwAAAAAHYAAAABcBd3d3cAF0AAAAdwAAAAAAP////g////j///qqqqqqqo//gAAAAA/gAAAAP4P////wA/wAAAB/AAAAAAAd3d3cBd3d2F3d0AAAAAAABd0AAAAABcAAAAAdgF3d3cAB2AAAAB0AAAAAAD////wH///4///wAAAAAAAP/4AAAAAP4AAAAD+AP///gAP4AAAAP4AAAAAAHd3d2AHd3dxd3dAAAAAAAB3dAAAAAAXAAAAAHYAF3dwABVAAAAAVwAAAAAA////4A////D//+AAAAAAAn/+AAAAAD+AAAAA/gAAqoAAAAAAAAAAAAAAAADd3d3ABd3d0N3d3VVVVVVcXd1VVVVUHYAAAAHcAAAAAAAAAAAAAAAAAAAAAP///4AD///4//////////j///////w/gAAAA/4AAAAAAAAAAAAAAAAAAAAA3d3dAAHd3dxd3d3d3d3d0N3d3d3d3B2AAAAB3AAAAAAAAAAAAAAAAAAAAAD///8AAf///D/////////x///////4P4AAAAP4AAAAAAAAAAAAAAAAAAAAAHd3dwABd3d0N3d3d3d3d2F3d3d3d3QXAAAAB3AAAAAAAAAAAAAAAAAAAAAA///+AAD///4/////////4///////+D+AAAAf+AAAAAAAAAAAAAAAAAAAAAB3d3QAAHd3dhd3d3d3d3dDd3d3d3d0FwAAAHdwAAAAAAAAAAAAAAAAAAAAAP//+AAAP//+D////////4P///////g/gAAC/+AAAAAAAAAAAAAAAAAAAAAA3d3QAAAd3dwF3d3d3d3dAd3d3d3d3B3VVVXdwAAAAAAAAAAAAAAAAAAAAAD///gAAD///gP///////4D///////8P/////+AAAAAAAAAAAAAAAAAAAAAAN3d0AAAHd3cAd3d3d3d3AHd3d3d3dwd3d3d3QAAAAAAAAAAAAAAAAAAAAAA///gAAAP//4A///////4A///////+D/////6AAAAAAAAAAAAAAAAAAAAAAB3d0AAAAd3dgB3d3d3d3ADd3d3d3d0F3d3d3AAAAAAAAAAAAAAAAAAAAAAAP//wAAAB//+AD//////4AP///////w/////gAAAAAAAAAAAAAAAAAAAAAAAVVUAAAABVVQAB3d3d3cAAVVVVVVVUBVVVVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3d3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
       //ensure the base64 string without URI Scheme
       let logobase64 = logo.replace("data:image/bmp;base64,","");
         try {


            await NativeModules.MCFPrinter.printOriginalText("        ");

             await NativeModules.MCFPrinter.printBitmap(logobase64, 200/*width*/, 150/*height*/);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText(data.merchantName);

             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printOriginalText(data.merchantPhoneNumber);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText("Current Time: ");
             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText(data.currentDate);

             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printOriginalText("________________________________");
             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printText("   ***TOTALS REPORT***  ",30);

             await NativeModules.MCFPrinter.printOriginalText("Transactions Since");
             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printOriginalText(data.startTime);

             await NativeModules.MCFPrinter.lineWrap(2);

             let totalStr = await this._setLine("TOTAL", "$" + data.total)
             await NativeModules.MCFPrinter.printOriginalText(totalStr);
             await NativeModules.MCFPrinter.lineWrap(1);

             let countStr = await this._setLine("COUNT", data.count)
             await NativeModules.MCFPrinter.printOriginalText(countStr);
             await NativeModules.MCFPrinter.lineWrap(1);

             let refundStr = await this._setLine("REFUNDS", "($"+ data.refund+ ")")
             await NativeModules.MCFPrinter.printOriginalText(refundStr);
             await NativeModules.MCFPrinter.lineWrap(1);

             let purchaseStr = await this._setLine("PURCHASE RECEIVED", "$" + data.purchase)
             await NativeModules.MCFPrinter.printOriginalText(purchaseStr);
             await NativeModules.MCFPrinter.lineWrap(1);

             let tipStr = await this._setLine("TIPS RECEIVED", "$" + data.tips)
             await NativeModules.MCFPrinter.printOriginalText(tipStr);
             await NativeModules.MCFPrinter.lineWrap(1);

             let amountDueStr = await this._setLine("AMOUNT DUE", "$" + data.amountDue)
             await NativeModules.MCFPrinter.printOriginalText(amountDueStr);
             await NativeModules.MCFPrinter.lineWrap(3);

             await NativeModules.MCFPrinter.printOriginalText("       APPROVED-THANK YOU     ");
             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printText("  Retain this copy for your records",20);

             await NativeModules.MCFPrinter.lineWrap(3);



         }catch(e){
             console.log(e)
             alert("print error."+e.message);
         }
    },


    async _printRefundReceipt(data)
    {

      let logo =
       "data:image/bmp;base64,Qk1oEAAAAAAAAD4AAAAoAAAAUQEAAF4AAAABAAEAAAAAACoQAAASCwAAEgsAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXd3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1d3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3AAAAAAAAAAAAAAAAAAAAAAAAAqoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAd3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHQAAAAAAAAAAAAAAAAAAAAAAA////gAAAAAAAAAAAAAAAAAAAAAqAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAF3d3dAAAAAAAAAAAAAAAAAAAAAV3AAAAAAB3AAAAAAAAAD//wAAAAP//gAD/////gAD//4AAAAAP4AAAAAAAL//gH8AAAH8AAAAAAAAAHd3AAAAAXd2AAd3d3d3AAN3dAAAAAAXAAAAAAABd3dwdwAAAXQAAAAAAAAA//8AAAAD//4AH//////gA//+AAAAAD+AAAAAAAP///h+AAAD/gAAAAAAAAB3dwAAAAF3dgA3d3d3d3ADd3QAAAAAFwAAAAAAB3d3dHcAAAd2AAAAAAAAAP//AAAAA//+AP//////+AP//gAAAAA/gAAAAAAP/iL+fgAAB/4AAAAAAAAA3d0AAAAB3dwB3d3d3d3cAd3cAAAAAB2AAAAAAB3QAF1dAAAF3QAAAAAAAAD//wAAAAP//gP///////4D//4AAAAAP4AAAAAAP+AAD/4AAA//gAAAAAAAAN3dAAAAAd3cBd3d3d3d3QHd3AAAAAAdgAAAAABdwAAF3QAADd0AAAAAAAAA//8AAAAD//4P////////g//+AAAAAD+AAAAAAD+AAAP+AAAfn4AAAAAAAAB3dwAAAAF3dgd3d3d3d3dDd3QAAAAAFwAAAAAAdwAAAXcAABcXQAAAAAAAAP//AAAAA//+H////////+P//gAAAAA/gAAAAAD/AAAA/gAAP4/AAAAAAAAAd3cAAQABd3QXd3d3d3d3YXd0AAAAABcAAAAAAHcAAAB3AAA3B0AAAAAAAAD//wADgAP//j/////////h//4AAAAAP4AAAAAA/gAAAP4AAD8P4AAAAAAAAN3dAAWAAd3cXd3d3d3d3dDd3AAAAAAdgAAAAABcAAAAXQAAXQXAAAAAAAAA//8AD8AD//j/////////+P/+AAAAAD+AAAAAAP4AAAB+AAD+B+AAAAAAAADd3QANwAHd2N3d3d3d3d3cXdwAAAAAHYAAAAAAXQAAAF0AANwF0AAAAAAAAP//AB/gA//4///6qqqqqqz//gAAAAA/gAAAAAB/gAAAPgAA/gP4AAAAAAAAd3cAF3ABd3F3d0AAAAAAAHd0AAAAABcAAAAAAHcAAAB3AAF0AXAAAAAAAAD//wA/+AP/8///wAAAAAAAP/4AAAAAP4AAAAAAP4AAAH4AA/gD+AAAAAAAAHd3AHdwAXdxd3dAAAAAAAA3dAAAAAAXAAAAAAAXQAAAdwABcAF0AAAAAAAA//8Af/wD/+P//8AAAAAAAD/+AAAAAD+iIgAAAB/4AAL+AAP4APwAAAAAAADd3QBd3AHdxd3dwAAAAAAAHd1VVVVAHd3d1AAADdwAFd0ABdAA3AAAAAAAAP//AP/+A//n///AAAAAA/g//////+A/////4AAP/////gAP4AD+AAAAAAAA3d0B3d0B3cXd3cAAAAAF0B3d3d3dwB3d3d3QAAHd3d3dAAXAAFwAAAAAAAD//wP//4P/z///gAAAAAP4H//////gP/////4AAP////4AD+AAfwAAAAAAAHd3B3d3AXdHd3dAAAAAAVAXd3d3d0AXd3d3dwAAF3d1dwAXQAB3AAAAAAAA//8P///D/8///8AAAAAAAA//////4D//////gAAL/+h+AB/AAD+AAAAAAAB3dwd3d0F3R3d3QAAAAAAAF3d3d3dAFwAABXdAAAAAAHcAFwAAFwAAAAAAAP//D///4//P///AAAAAAAAP/////+A/gAAA/+AAAAAAfgA/gAA/gAAAAAAA3d0d3d3R3cXd3cAAAAAAAA3d3d3dwB2AAAAd0AAAAABcAB0AAB3AAAAAAAD//z////v/z///wAAAAAAAD//////gP4AAAA/4AAAAAP4AfwAAD+AAAAAAAN3dXd3d2d3F3d3AAAAAAAAN3d3d3cAdgAAABdgAAAAAXABdAAANwAAAAAAA///////5/4///4AAAAAAAA//////4D+AAAAD+AAAAAD+AP4AAA/gAAAAAAB3d3d3d3V3R3d3QAAAAAAAF3d3d3dAFwAAAAF0AAAAAXQAdAAAB2AAAAAAAP/////////P///AAAAAAAAP/////+A/gAAAAf4AAAAD/gH+AAAP8AAAAAAAd3d3d3d3d0d3d0AAAAAAABd0AAAAABcAAAABdAAAAAN0AXQAAAdwAAAAAAD/////////5///6qqqqqqqD/4AAAAAP4AAAAD+A4AAD/gD+AAAA/gAAAAAAN3d3dxd3d3F3d3d3d3d3dwd3AAAAAAdgAAAAFwB0AAd0AHYAAAB0AAAAAAA/////v///+f//////////j/+AAAAAD+AAAAA/gP+qv/wA/gAAAP4AAAAAADd3d3cXd3dxd3d3d3d3d3cHdwAAAAAHYAAAABcBd3d3cAF0AAAAdwAAAAAAP////g////j///qqqqqqqo//gAAAAA/gAAAAP4P////wA/wAAAB/AAAAAAAd3d3cBd3d2F3d0AAAAAAABd0AAAAABcAAAAAdgF3d3cAB2AAAAB0AAAAAAD////wH///4///wAAAAAAAP/4AAAAAP4AAAAD+AP///gAP4AAAAP4AAAAAAHd3d2AHd3dxd3dAAAAAAAB3dAAAAAAXAAAAAHYAF3dwABVAAAAAVwAAAAAA////4A////D//+AAAAAAAn/+AAAAAD+AAAAA/gAAqoAAAAAAAAAAAAAAAADd3d3ABd3d0N3d3VVVVVVcXd1VVVVUHYAAAAHcAAAAAAAAAAAAAAAAAAAAAP///4AD///4//////////j///////w/gAAAA/4AAAAAAAAAAAAAAAAAAAAA3d3dAAHd3dxd3d3d3d3d0N3d3d3d3B2AAAAB3AAAAAAAAAAAAAAAAAAAAAD///8AAf///D/////////x///////4P4AAAAP4AAAAAAAAAAAAAAAAAAAAAHd3dwABd3d0N3d3d3d3d2F3d3d3d3QXAAAAB3AAAAAAAAAAAAAAAAAAAAAA///+AAD///4/////////4///////+D+AAAAf+AAAAAAAAAAAAAAAAAAAAAB3d3QAAHd3dhd3d3d3d3dDd3d3d3d0FwAAAHdwAAAAAAAAAAAAAAAAAAAAAP//+AAAP//+D////////4P///////g/gAAC/+AAAAAAAAAAAAAAAAAAAAAA3d3QAAAd3dwF3d3d3d3dAd3d3d3d3B3VVVXdwAAAAAAAAAAAAAAAAAAAAAD///gAAD///gP///////4D///////8P/////+AAAAAAAAAAAAAAAAAAAAAAN3d0AAAHd3cAd3d3d3d3AHd3d3d3dwd3d3d3QAAAAAAAAAAAAAAAAAAAAAA///gAAAP//4A///////4A///////+D/////6AAAAAAAAAAAAAAAAAAAAAAB3d0AAAAd3dgB3d3d3d3ADd3d3d3d0F3d3d3AAAAAAAAAAAAAAAAAAAAAAAP//wAAAB//+AD//////4AP///////w/////gAAAAAAAAAAAAAAAAAAAAAAAVVUAAAABVVQAB3d3d3cAAVVVVVVVUBVVVVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3d3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd3dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
       //ensure the base64 string without URI Scheme
       let logobase64 = logo.replace("data:image/bmp;base64,","");
         try {


            await NativeModules.MCFPrinter.printOriginalText("        ");

             await NativeModules.MCFPrinter.printBitmap(logobase64, 200/*width*/, 150/*height*/);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText(data.merchantName);
             await NativeModules.MCFPrinter.lineWrap(1);
             await NativeModules.MCFPrinter.printOriginalText("Date: "+data.date);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText("Order Number:");

             await NativeModules.MCFPrinter.lineWrap(1);

             await NativeModules.MCFPrinter.printOriginalText(data.refId);

             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText("Amount: $"+data.totalAmount);


             await NativeModules.MCFPrinter.lineWrap(2);

             await NativeModules.MCFPrinter.printOriginalText("Refunded");
             await NativeModules.MCFPrinter.lineWrap(3);



         }catch(e){
             console.log(e)
             alert("print error."+e.message);
         }
    }



}
