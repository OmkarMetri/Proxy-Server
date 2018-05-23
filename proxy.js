console.log("started");//to notify the process has started
request = require('sync-request');
http = require('http');
url = require('url');
fs = require('fs');

//these are 4 servers deployed, but not yet started to listen from the ports
h1 = http.createServer(app1);
h2 = http.createServer(app2);
h3 = http.createServer(app3);
h4 = http.createServer(app4);

//the first server starts listening from the port assigned as proxy to browser
h1.listen(8080);

//the remaining servers will start listening as soon as the port is free off the traffic
//the following are the servers callback function called as soon as the request comes to the particular server
// all the servers below  work the same way described for the first one

//first server callback function
function app1(req, res) {
	//url parsed to extract request's data
	myurl = url.parse(req.url);
	if(myurl.path[myurl.path.length-1] != '/') { myurl.path =  myurl.path + '/' } //border case handling

	if(myurl.host == "www.espncricinfo.com" && req.url != 'http://www.espncricinfo.com/favicon.ico' ){
		h1.close(); //first server clears the port
		h2.listen(8080);//second server starts listening
		i1 = 0;
		flag1 = 0;
		var contents = fs.readFileSync('log.txt', 'utf8'); //file that keeps record of addresses already visited
		array = contents.split("\n");
		if(array[0] != '')
		{	array.forEach(function (entry) {
				i1  = i1 + 1;
				//to check if the requested url already exists in the log
				if(entry == myurl.path){
					//renders html page from cache
					console.log('rendering from cache.....................\n');
					res.writeHead(200, {'Content-Type': 'text/html'});
					var stream = fs.readFileSync('./'+i1+'.html');
					flag1 = 1;
					res.end(stream);
				}
			});
			i1=i1-1;
		}
		//comes here only if requested url doesn't exist in the server cache
		if(flag1 == 0){
		var content = request('GET', req.url); //get the html data from the requested site
		console.log('rendering from internet.............\n')
		var file = "./"+(i1+1)+".html";
		saved = fs.writeFileSync(file, content.body.toString('utf-8'), 'utf8'); //store the html data in the cache
		fs.appendFileSync('log.txt', myurl.path+"\n"); //add the url to log file 
		console.log('wrote' +'  '+ file+"\n"); 
		res.end(content.body.toString('utf-8')); //render the html data aquired already to client
		}
	}
	else{res.end();}
};

//second server callback function
function app2(req, res) {

	myurl = url.parse(req.url);
	if(myurl.path[myurl.path.length-1] != '/') { myurl.path =  myurl.path +'/' }

	
	if(myurl.host == "www.espncricinfo.com" && req.url != 'http://www.espncricinfo.com/favicon.ico' ){
		
		h2.close();
		h3.listen(8080);
		
		i2 = 0;
		flag2 = 0;
		var contents = fs.readFileSync('log.txt', 'utf8');
		array = contents.split("\n");
		
		if(array[0] != '')
		{	array.forEach(function (entry) {
				i2 = i2 + 1;
				if(entry == myurl.path){
					console.log('rendering from cache.....................\n');
					res.writeHead(200, {'Content-Type': 'text/html'});
					var stream = fs.readFileSync('./'+i2+'.html');
					flag2 = 1;
					res.end(stream);
				}
			});
			i2=i2-1;
		}
		if(flag2 == 0){
		var content = request('GET', req.url);
		console.log('rendering from internet.............\n')
		var file = "./"+(i2+1)+".html";
		saved = fs.writeFileSync(file, content.body.toString('utf-8'), 'utf8');
		fs.appendFileSync('log.txt', myurl.path+"\n");
		console.log('wrote' +'  '+ file+"\n");
		res.end(content.body.toString('utf-8'));
		}
	}
	else{res.end();}
};

//third server callback function
function app3(req, res) {
	myurl = url.parse(req.url);
	if(myurl.path[myurl.path.length-1] != '/') { myurl.path =  myurl.path +"/" }
	
	
	if(myurl.host == "www.espncricinfo.com" && req.url != 'http://www.espncricinfo.com/favicon.ico' ){
		
		h3.close();
		h4.listen(8080);
		
		i3 = 0;
		flag3 = 0;
		var contents = fs.readFileSync('log.txt', 'utf8');
		array = contents.split("\n");
		
		if(array[0] != '')
		{	array.forEach(function (entry) {
				i3  = i3 + 1;
				if(entry == myurl.path){
					console.log('rendering from cache.....................\n');
					res.writeHead(200, {'Content-Type': 'text/html'});
					var stream = fs.readFileSync('./'+i3+'.html');
					flag3 = 1;
					res.end(stream);
				}
			});
			i3=i3-1;
		}
		if(flag3 == 0){
		var content = request('GET', req.url);
		console.log('rendering from internet.............\n')
		var file = "./"+(i3+1)+".html";
		saved = fs.writeFileSync(file, content.body.toString('utf-8'), 'utf8');
		fs.appendFileSync('log.txt', myurl.path+"\n");
		console.log('wrote' +'  '+ file+"\n");
		res.end(content.body.toString('utf-8'));
		}
	}
	else{res.end();}
};

//forth server callback function
function app4(req, res) {
	myurl = url.parse(req.url);
	if(myurl.path[myurl.path.length-1] != '/') { myurl.path =  myurl.path +'/' }
	
	
	if(myurl.host == "www.espncricinfo.com" && req.url != 'http://www.espncricinfo.com/favicon.ico' ){
		
		h4.close();
		h1.listen(8080);
		
		i4 = 0;
		flag4 = 0;
		var contents = fs.readFileSync('log.txt', 'utf8');
		array = contents.split("\n");
		
		if(array[0] != '')
		{	array.forEach(function (entry) {
				i4  = i4 + 1;
				if(entry == myurl.path){
					console.log('rendering from cache.....................\n');
					res.writeHead(200, {'Content-Type': 'text/html'});
					var stream = fs.readFileSync('./'+i4+'.html');
					flag4 = 1;
					res.end(stream);
				}
			});
			i4=i4-1;
		}
		if(flag4 == 0){
		var content = request('GET', req.url);
		console.log('rendering from internet.............\n')
		var file = "./"+(i4+1)+".html";
		saved = fs.writeFileSync(file, content.body.toString('utf-8'), 'utf8');
		fs.appendFileSync('log.txt', myurl.path+"\n");
		console.log('wrote' +'  '+ file+"\n");
		res.end(content.body.toString('utf-8'));
		}
	}
	else{res.end();}
};
