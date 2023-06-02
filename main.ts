import {log, ScanStatus, WechatyBuilder} from "wechaty";
import {PuppetPadlocal} from "wechaty-puppet-padlocal";
import {LOGPRE,getRoomMember} from "./helper";
import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';

/****************************************
 * 去掉注释，可以完全打开调试日志
 ****************************************/
// log.level("silly");

const puppet = new PuppetPadlocal({
    token: "Your Token Here"
})

const bot = WechatyBuilder.build({
  name: "PadLocalDemo",
  puppet,
})
  .on("scan", (qrcode, status) => {
    if (status === ScanStatus.Waiting && qrcode) {
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')

      log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`);

      console.log("\n==================================================================");
      console.log("\n* Two ways to sign on with qr code");
      console.log("\n1. Scan following QR code:\n");

      require('qrcode-terminal').generate(qrcode, {small: true})  // show qrcode on console

      console.log(`\n2. Or open the link in your browser: ${qrcodeImageUrl}`);
      console.log("\n==================================================================\n");
    } else {
      log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`);
    }
  })

  .on("login", (user) => {
    log.info(LOGPRE, `${user} login`);
  })

  .on("logout", (user, reason) => {
    log.info(LOGPRE, `${user} logout, reason: ${reason}`);
  })

  .on("message", async (msg) => {
    const room = msg.room()
    const text = `${msg.text()}`
    
    if(room && text){
      const topic = await room.topic()
      if (topic=="测试接口"){
        var name = '20-22届【本科生】毕业典礼返校群'
        const rooms = await bot.Room.findAll({topic: text})
        if (rooms.length >0){
          const members = await rooms[0].memberAll()
          var contact,alias
          var res=``
          for(var i=0; i < members.length;i++){
            contact = members[i]
            alias = await rooms[0].alias(contact)
            res+=`${contact.name()}|${alias}\n`
            // console.log(`${contact.name()}|${alias}`)
            
          }
          writeFileSync('members.txt',res,{
            flag: 'w',
          });
          console.log('名单已经生成')
        }
      }
    }
  })

  .on("error", (error) => {
    log.error('error')
  })

bot.start().then(() => {
  log.info(LOGPRE, "started.");
});
