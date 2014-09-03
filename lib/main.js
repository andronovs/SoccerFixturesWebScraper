var request = require('request'); 
var path = require('path');
var async = require('async');

var urls = require('./leagueUrls'); 
var parser = require('./gameParser'); 
var csvWriter = require('./csvFileWriter');
var dbWriter = require('./msSqlImporter');  

var asyncTasks = [];
var csvPath = urls.getCsvOutputPath();
var year = urls.getSeasonYear();
var urlDates = urls.getUrlDates();

main();

function main() {

    for (country in urls.getUrlTemplates()) {
        console.log("Started downloading fixtures for " + country + "...");

        var urlTemplate = urls.getUrlTemplate(country);
        var division = urls.getDivision(country);
        var gameParams = { country: country, div: division, year: year };

        var separateReqPool = {maxSockets: 15};

        urlDates.forEach(function (urlDate) {

            var url = urlTemplate + urlDate + "/";
            var options = {url: url, pool: separateReqPool};

            asyncTasks.push((function (options, gameParams) {
                return function (callback) {

                    downloadGamesForCountryByMonth(options, gameParams, callback);

                }
            })(options, gameParams));

        });
    }

    async.parallel(asyncTasks, processGameResults);
}

function downloadGamesForCountryByMonth(options, gameParams, callback)
{
    request(options, function processResponse(error, response, html) {
        parser.parseGamesByCountry(gameParams, html, callback);
    });
}

function processGameResults(err, results)
{
    if (err) throw(err);

    var gamesByCountry = [];

    results.forEach(function(result) {
        var country = result.country;
        var games = result.games;

        if (!gamesByCountry[country])
        {
            gamesByCountry[country] = {};
            gamesByCountry[country].games = [];
            gamesByCountry[country].country = country;
            gamesByCountry[country].div = result.div;
            gamesByCountry[country].year = result.year;
        }

        gamesByCountry[country].games = gamesByCountry[country].games.concat(games);
    });

    for(country in gamesByCountry) {

        var fullCsvFileName = path.resolve(csvPath, country + ".csv");
        var games = gamesByCountry[country].games;
        var gameParams = { country: country, div: gamesByCountry[country].div, year: gamesByCountry[country].year, games: games };

        writeGamesToCsvFileAndDatabase(gameParams, fullCsvFileName);
    }
}

function writeGamesToCsvFileAndDatabase(gameParams, fullCsvFileName) {

    console.log("Writing " + gameParams.games.length + " games for " + gameParams.country + " [" + gameParams.div + "] to " + fullCsvFileName + "...");
    csvWriter.writeGames2csvFile(fullCsvFileName, gameParams);

    console.log("Inserting " + gameParams.games.length + " games for " + gameParams.country + " [" + gameParams.div + "] into database...");
    dbWriter.insertGameRecords(gameParams);
}
