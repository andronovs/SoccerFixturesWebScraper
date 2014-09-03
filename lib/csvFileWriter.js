var fs = require('fs');

function writeGames2csvFile(fullFileName, gameParams)
{
	var header = "Index,Country,Div,Year,Date,HomeTeam,AwayTeam"; 

	var stream = fs.createWriteStream(fullFileName);
	stream.once('open', function(fd) {

		stream.write(header + "\r\n");
			
		gameParams.games.forEach(function(game) {

			var body = game.index + "," + gameParams.country + "," + gameParams.div + "," + gameParams.year + "," + 
						game.date + "," + game.homeTeam + "," + game.awayTeam; 
					
			stream.write(body + "\r\n");
		});
			
		stream.end();
	});
}

exports.writeGames2csvFile = writeGames2csvFile; 
