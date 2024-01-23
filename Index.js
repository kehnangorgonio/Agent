const keep_alive = require('./keep_alive.js')

//U can make the bot reply to chats!
//Please go to line 180 of this code!
//If you mess up I can fix that by going to my FB!
// Damian Kehnan [ FB ]

/* Table of contents --

Line 43 - 74
 ••••••Port and IP

Line 191
 ••••••Reply Feature
 
|•| 24/7-BOT by Damian XD |•|

Created for hosting that suck! ATERNOS!
*/

//PLEASE OPEN THE REPOSITORY FILES AND GO TO support/index.html FOR MORE FEATURES!

const express = require("express");
const http = require("http");
const mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const { pathfinder, Movements, goals} = require('mineflayer-pathfinder')
const armorManager = require('mineflayer-armor-manager')
const mc = require('minecraft-protocol');
const AutoAuth = require('mineflayer-auto-auth');
const app = express();


app.use(express.json());

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));
app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.repl.co/`);
}, 224000);


      
// THIS IS EDITABLE SECTION   
      
      
      
      //Created by Kehnan Damian


    function createBot () {
const bot = mineflayer.createBot({
  version: false,
  
  
//Enter Username
//------------------------------
    username: 'cassy',
//---SIGN IN---------SIGN UP----
//Do not put any space or special characters except "_"
  
  
//--------------------  
  host: /*IP*/'162.55.236.53',
  port: 32595, 
//--SAVE----JOIN------
  
  
  
  
  plugins: [AutoAuth],
  AutoAuth: 'bot112022'
})

// Do not touch other code if you dont know how to code!

// Do not claim the rights! This is created by Kehnan Damian




bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)
bot.loadPlugin(pathfinder)


bot.on('playerCollect', (collector, itemDrop) => {
  if (collector !== bot.entity) return

  setTimeout(() => {
    const sword = bot.inventory.items().find(item => item.name.includes('sword'))
    if (sword) bot.equip(sword, 'hand')
  }, 150)
})

bot.on('playerCollect', (collector, itemDrop) => {
  if (collector !== bot.entity) return

  setTimeout(() => {
    const shield = bot.inventory.items().find(item => item.name.includes('shield'))
    if (shield) bot.equip(shield, 'off-hand')
  }, 250)
})

let guardPos = null

function guardArea (pos) {
  guardPos = pos.clone()

  if (!bot.pvp.target) {
    moveToGuardPos()
  }
}

function stopGuarding () {
  guardPos = null
  bot.pvp.stop()
  bot.pathfinder.setGoal(null)
}

function moveToGuardPos () {
  const mcData = require('minecraft-data')(bot.version)
  bot.pathfinder.setMovements(new Movements(bot, mcData))
  bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z))
}

bot.on('stoppedAttacking', () => {
  if (guardPos) {
    moveToGuardPos()
  }
})

bot.on('physicTick', () => {
  if (bot.pvp.target) return
  if (bot.pathfinder.isMoving()) return

  const entity = bot.nearestEntity()
  if (entity) bot.lookAt(entity.position.offset(0, entity.height, 0))
})
bot.on('physicTick', () => {
  if (!guardPos) return
  const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 &&
                      e.mobType !== 'Armor Stand' 
  const entity = bot.nearestEntity(filter)
  if (entity) {
    bot.pvp.attack(entity)
  }
})
bot.on('chat', (username, message) => {
  if (message === 'guard') /* you can replace GUARD to other keyword! If you say this word the bot will follow you! */
  {
    const player = bot.players[username]

    if (!player) {
    bot.chat('okie!')
    guardArea(player.entity.position)
    }

  }
  if (message === 'Stop guarding!') {
    bot.chat('Okay bro!')
    stopGuarding()
  }
  
  
  
  
// READ THIS!!!!!!!!!!!!
  
  
  
  /* If you need to make the bot reply to what you say please enter the following command!
  
  if (message == '[If player say this]') {
  bot.chat('[bot will also reply this]') }
  */
  
  /* example!
  if (message === 'bruh!') {
  bot.chat('nah!') }
  */
  
  /* Note!!
  == means equal
  === means strictly equal
  != means different
  
  If you put != the bot will reply for all the chats! except for specific msg you put in variable!
  */

  //YOU CAN ONLY PUT THE REPLY COMMAND HERE!

  //IF YOU EVER MESS UP CONTACT ME HERE!
  // kehnangorgonio@gmail.com
  // Damian Kehnan [ FB ]





})

bot.on('kicked', console.log)
bot.on('error', console.log)
bot.on('end', createBot)
}

createBot()
