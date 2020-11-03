const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const config = require("./config.json");

client.login(config.BOT_TOKEN);

const prefix = "/";
var aleatorio;
var maxroller = null;
var maxroll;
var dice = 100;
var rollon = 0;
var empate = 0;
var seg = 20;

client.on('ready', () => {
  console.log('estoy listo!');
});

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  
  if (command === "dados") {
	dice = args
	if(esEntero(dice) == false){
		dice = 100;
	}
	if(message.author.username == 'Kharmah'){
		aleatorio = dice;
		message.reply(`tira los dados y saca `+dice);
	}else{
	aleatorio = Math.round(Math.random()*(dice-1)+1);
    message.reply(`tira los dados y saca ` + aleatorio + `  (1-`+dice+`)`);
	}
	if(rollon == 1){
		if (aleatorio > maxroll){
			maxroll = aleatorio;
			maxroller = message.author.username;
		}else{
			if(aleatorio == maxroll && maxroller != maxroller){
				maxroller = maxroller + ` y ` + message.author.username;
				empate = 1;
			}
		}
    }
  }
  
  if (command === "roleo") {
	rollon = 1;
	maxroll = 0;
	maxroller = null;
	empate = 0;
	seg = args;
	if(esEntero(seg) == false){
		seg = 20;
	}
    message.reply(`ha iniciado una tirada de dados de `+seg+` segundos!`);
	var time = setInterval(
		function contador(){ 
			seg--;
			if(seg==0){
				clearInterval(time);
				if(maxroller == null){
					message.reply(`Nadie ha participado en la tirada de dados...`);
				}else{
					if(empate == 0){
						message.reply(`El ganador de la tirada es `+maxroller+` con una tirada de `+maxroll);
					}
					if(empate == 1){
						message.reply(`Los ganadores de la tirada son `+maxroller+` con una tirada de `+maxroll);
					}
				}
				rollon = 0;
			}
			if(seg==10){
				message.reply(`quedan `+seg+` segundos!`)
			}
			if(seg<=3 && seg > 0){
				message.reply(`quedan `+seg+` segundos!`)
			} 
		},1000);
  }
}

);

function esEntero(x){
	var y = parseInt(x);
	if (isNaN(y)) 
		return false;
	return x == y && x.toString() == y.toString();
}


// Web server
const http = require('http');
const express = require('express');
const app = express();

//
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);
