var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cors=require('cors');
var request = require('request');
app.use(cors());
app.get('/',function(req,res){
    res.send('hello world');
});
app.post('/hello',function(req,res,next){
    //var username = req.body.user_name;
    console.log(req.body);
    var bodypayload ={
        text: 'welcome '+username+' to the slack bot'
    }
    if(username!=='slackbot'){
        res.status(200).json(bodypayload);
    } else {
        res.status(200).end();
    }
    res.status(200).send('');
});
app.post('/',function(req,res,next){
        console.log(req.body);
        if(req.body) {
        res.status(200).send(questions[i]);
    }
    else {
        res.send(req.body);
    }
});
io.on('connection', function(socket){
    console.log(socket.id);
  console.log('A user connected');
 
        console.log(socket.id);
        let i=0;
        let questions=[{"text": "bot welcomes you to the conversation"},
{'text': 'what is your name','ans':''},{'text':'what is your hobby','ans':''},
{'text':'from where did you complete your graduation','ans':''}];

        function sendNumber() {
        if (i<2) {
        socket.send( questions[i]);
        setTimeout(sendNumber, 2000);
        i++;
    }
    else{
        i--;
    }
    }
    sendNumber();
   

   //socket.send(questions[1]);

  socket.on('msg', function(data){
      //Send message to everyone
      function storedata(){
      console.log(data);
        questions[i].ans = data;
        i++;
        setTimeout(sendresponse,2000);
      }
      function sendresponse() {
        if(i < questions.length) {
        socket.send(questions[i]);
    }
    else {
        console.log(questions);
        socket.send({'end':'your answeres are submited Thank you!'});
        let tmp='*New lead*\n';
        for(i=1;i< questions.length;i++) {
            tmp += questions[i].text+'?\n'+questions[i].ans+'\n';
        }
request.post({url:'https://hooks.slack.com/services/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',
json:{text: tmp}}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
         }
      }
      storedata();
  });
});
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});