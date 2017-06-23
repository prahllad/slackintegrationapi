var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cors=require('cors');
var mongoose = require('mongoose');
var post_url;
/*mongoose.connect('mongodb://royprahllad:papai@93@ds163940.mlab.com:63940/myapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
*/
var request = require('request');
app.use(cors());
app.use(bodyParser());
app.post('/',function(req,res){
        console.log(req.body);
        res.send(req.body);
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