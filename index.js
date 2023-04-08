// importing libraries 
const { Telegraf } = require('telegraf');
const bot = new Telegraf('6157165674:AAGJc4rGlPKfqWAn1gARO6Zkv-tHBlEX1VU');
const axios = require('axios');


// start command
bot.start( (ctx)=>{

    ctx.reply("your Sarthi is ready to share the knowledge ");

});

// help command

bot.help( (ctx) =>{

    let s = "";
    
    s = "here are list of commands you can use" + "\n" + "\n";
    
    s = "\quote - for random motivational quotes" + "\n";
    s = "\shlok - for random gita shlokes in sanskrit , hindi and english" + "\n";
    s = "\contests - for recent upcoming contests under 7 days" + "\n";
    s = "\joke - for random programming jokes" + "\n";
    s = "\advice- for random life adivices" + "\n";
    
    ctx.reply(s);

});

// response for custom words 
bot.hears('hello', (ctx) =>{
    ctx.reply("hi, you are the biggest personality ever born in this universe")
});

// calculating random random numbers

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// quotes command

bot.command('quote', (ctx)=>{
    
    let url = "https://api.quotable.io/random";

    axios.get(url).then( (res) =>{

        ctx.reply(res.data.content);

    });

});

// shlok command

bot.command('shlok', (ctx) =>{

    let url = "https://bhagavadgitaapi.in/slok/";

let chapter = randomInteger(1, 18);
let shlok = randomInteger(1 , 20);

url = url + chapter;
url = url + "/";
url = url + shlok + "/";

    axios.get(url).then( (res) =>{

let arr = [];

let s = "";

arr.push("chapter:" + res.data.chapter)
arr.push("verse:" + res.data.verse);
arr.push(res.data.slok);
arr.push(res.data.tej.ht);
arr.push(res.data.purohit.et);

for(let i=0; i<arr.length; i++){
    s = s + arr[i] + "\n" + "\n";
}

        ctx.reply(s);

    });

});

// joke command

bot.command('joke', (ctx)=>{
    
    let url = "https://backend-omega-seven.vercel.app/api/getjoke";

    axios.get(url).then( (res) =>{

        let s = res.data[0].question + "\n" + "\n" + res.data[0].punchline;
        ctx.reply(s);
    });

});

// roast

bot.command('roast', (ctx)=>{
    
    let url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";

    axios.get(url).then( (res) =>{
        ctx.reply(res.data.insult);
    });

});

// advice

bot.command('advice', (ctx)=>{
    
    let url = "https://api.adviceslip.com/advice";

    axios.get(url).then( (res) =>{
        ctx.reply(res.data.slip.advice);
    });

});

// code for contests

bot.command('contests', (ctx)=>{

    let url = "https://kontests.net/api/v1/all";
    let s = "";

    axios.get(url).then( (res) =>{
        
        const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

        // Filter contests that start within 7 days from the current date, and are from LeetCode, CodeForces, or CodeChef
        const filteredContests = res.data.filter((contest) => {
          const startDate = new Date(contest.start_time);
          const timeDiff = startDate.getTime() - new Date().getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
          return daysDiff <= 7 && ['LeetCode', 'CodeForces', 'CodeChef'].includes(contest.site);
        });
    
        // Format the filtered contests as a string with proper spacing and contest URLs
        let s = '';
        for (const contest of filteredContests) {
          const startDate = new Date(contest.start_time).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
          s += `[${contest.site}](${contest.url})\nStarts on: ${startDate}\n\n`;
        }
    
        // Send the formatted contests string as a reply
        ctx.replyWithMarkdown(`*Contests within the next 7 days from LeetCode, CodeForces, and CodeChef (IST):*\nCurrent IST: ${now}\n\n${s}`);
    });

});

    // launching our bot
// module.exports = bot;
bot.launch();
