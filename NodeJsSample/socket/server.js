var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

socket_list = {};


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "deepak",
  password: "123456",
  database: "voteworthy_db"
});

io.on('connection', function(socket){

  	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);


    	var time         = msg['time'];
        var score        = msg['score'];
        var question_id  = msg['question_id'];
        var challenge_id = msg['challenge_id'];
        var answer_id    = msg['answer_id'];
        var index        = msg['index'];
        var user_id      = msg['user_id'];
        var opponent_id  = msg['opponent_id'];
    	
    	con.connect(function(err) {
	    	var sql = "SELECT * FROM push_detail_table WHERE id = "+msg['challenge_id']+"";

        	con.query(sql, function (err, data, fields) {
	          
	          	if (data.length > 0) {
	                
	          		//console.log(data[0].user_id_push);

	          		con.connect(function(err) {

			      		var sql_1 = "SELECT * FROM game_info WHERE game_id = "+challenge_id+" AND q_id = "+question_id+"";

			      		con.query(sql_1, function (err, data_1, fields) {
			          		
			          		var g_data = data_1;
			          		
			          		if (g_data.length == 0){
								
								console.log('game_info insert');
								
								if(data[0].user_id_push == msg['user_id']){
				                	console.log('user');
				                	var insert = "INSERT INTO game_info (game_id, q_id, user1_ans, user1, user1_score, user1_index) VALUES ("+challenge_id+", "+question_id+", "+answer_id+", "+user_id+", "+score+", "+index+")";
								}else{
									console.log('oponent');
				                	var insert = "INSERT INTO game_info (game_id, q_id, user2_ans, user2, user2_score, user2_index) VALUES ("+challenge_id+", "+question_id+", "+answer_id+", "+user_id+", "+score+", "+index+")";
				                }


				                console.log(insert);

				                con.connect(function(err) {
	      							con.query(insert, function (err, result, fields) {
	      								console.log('insert done');
							        });
							    });
				            
				            }else{
				            	
				            	console.log('game_info update');
				            	if(data[0].user_id_push == msg['user_id']){
				                	console.log('user');
				                	var insert = "UPDATE game_info SET user1_ans = "+answer_id+", user1 = "+user_id+", user1_score = "+score+", user1_index = "+index+" WHERE game_info.id = "+g_data[0].id+"";
								}else{
				                	var insert = "UPDATE game_info SET user2_ans = "+answer_id+", user2 = "+user_id+", user2_score = "+score+", user2_index = "+index+" WHERE game_info.id = "+g_data[0].id+"";
				                	console.log('oponent');
				                }

				                console.log(insert);
				                con.connect(function(err) {
	      							con.query(insert, function (err, result, fields) {
	      								console.log('update done');
							        });
							    });
				            
				            }
			        
			        	});
			    	});
	                
	                
	                
		        }else{
		            var res = {'status':'challenge_id not available in database...!'};
		            console.log(res);
		        }
	        
	        });
	    });


    	con.connect(function(err) {
	      	var q_11 = "SELECT * FROM game_info WHERE game_id = "+msg['challenge_id']+"";

      		con.query(q_11, function (err, result_q_11, fields) {
	          	
				var res = {'status':result_q_11};

				if(socket_list[msg['user_id']]){
	          		socket_list[msg['user_id']].emit('chat message', res);
	          		console.log(result_q_11);
	          	}else{
	          		var res = {'status':'user not available'};
	          		io.emit('chat message', res);
	          	}

	          	/*if(socket_list[msg['opponent_id']]){
	          		socket_list[msg['opponent_id']].emit('chat message', res);
	          		console.log(result_q_11);
	          	}else{
	          		var res = {'status':'opponent not available'};
	          		io.emit('chat message', res);
	          	}*/
	          	
        	});
	    });
	    
    	/*if(socket_list[msg['id']]){
    		socket_list[msg['id']].emit('chat message', res);
    	}else{
    		socket_list[msg['id']].emit('chat message', res);
    	}*/
    	
  	});
  
	socket.on('add-user', function(msg){
  	
    	socket_list[msg['id']] = socket;

	    con.connect(function(err) {
	      var q = "SELECT id,username FROM users WHERE id = "+msg['id']+"  LIMIT 1";

	      con.query(q, function (err, result, fields) {
	          if (result){
				var res = {'status':'connection create successfully..!'};
	            //console.log(res);
	            socket_list[msg['id']].emit('add-user', res);
	          }else{
	            var res = {'status':'user not available in database...!'};
	            //console.log(res);
	            socket_list[msg['id']].emit('add-user', res);
	          }
	        
	        });
	    });
	});

	socket.on('send_mess', function(msg){
  	socket_list[msg['id']].emit('send_mess', msg);
	});
});

http.listen(81);