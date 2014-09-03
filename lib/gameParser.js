
function parseGamesByCountry(gameParams, html, callback)
{
	var cheerio = require('cheerio');
	var $ = cheerio.load(html);
    var games = [];
			
	$('div[class$="is-fixture"]').each(function(index) {

		var node = $(this);

		var gameDate = node.attr('data-matchdate'); 
		var homeTeam = $('.t.home .t-nText', node).text();
		var awayTeam = $('.t.away .t-nText', node).text();

		games.push({"index": index, "date": gameDate, "homeTeam": homeTeam, "awayTeam": awayTeam});
	});

    var result = {country: gameParams.country, div: gameParams.div, year: gameParams.year, games: games};
    callback(null, result);
}

module.exports = {
	parseGamesByCountry : parseGamesByCountry
};
