var seasonYear = 2014;
var csvOutputPath = "C:\\NodeSamples";

// Urls of supported national tournaments for the 2014-2015 soccer season;
// here, the full url would be urlTemplate + urlDate
var urlTemplates = {

	"ENG" : "http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=england-premier-league-2000000000/matches/date=",
	"FRA" : "http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=france-ligue-1-2000000018/matches/date=",
	"GER" : "http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=germany-bundesliga-2000000019/matches/date=",
	"ITA" : "http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=italy-serie-a-2000000026/matches/date=",
	"POR" : "http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=portugal-liga-2000000033/matches/date=",
	"ESP" : "http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=spain-liga-2000000037/matches/date="
	
};

var divisions = {

	"ENG" : "E0",
	"FRA" : "F1",
	"GER" : "D1",
	"ITA" : "I1",
	"POR" : "P1",
	"ESP" : "SP1"
};

var urlDates = ["20140701", "20140801", "20140901", "20141001", "20141101", "20141201",
                "20150101", "20150201", "20150301", "20150401", "20150501", "20150601"];

function getSeasonYear()
{
  return seasonYear; 
}

function getCsvOutputPath()
{
  return csvOutputPath; 
}

function getUrlTemplates()
{
	return urlTemplates;
}

function getUrlDates()
{
    return urlDates;
}

function getUrlTemplate(countryAbbrev)
{
	return urlTemplates[countryAbbrev];
}

function getDivision(countryAbbrev)
{
	return divisions[countryAbbrev];
}

module.exports = {
	getSeasonYear: getSeasonYear, 
	getCsvOutputPath: getCsvOutputPath, 
	getUrlTemplates: getUrlTemplates,
    getUrlDates: getUrlDates,
	getUrlTemplate: getUrlTemplate,
	getDivision: getDivision
};
