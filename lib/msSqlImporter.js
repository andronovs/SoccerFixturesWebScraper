var sql = require('mssql'); 

var config = {
    user: 'sa',
    password: '{your-password-here}',
    server: '{server-name}',
    database: '{database-name}',
};

function insertGameRecords(gameParams)
{
    var connection = new sql.Connection(config, function(err) {
		// ... error check 
		if (err) throw(err);

        var request = new sql.Request(connection);
        var tvp = new sql.Table();

        // Columns must correspond with type we have created in database.
        tvp.columns.add('Country', sql.VarChar(3));
        tvp.columns.add('Div', sql.VarChar(8));
        tvp.columns.add('Year', sql.Int);
        tvp.columns.add('Date', sql.DateTime);
        tvp.columns.add('HomeTeam', sql.VarChar(255));
        tvp.columns.add('AwayTeam', sql.VarChar(255));

		gameParams.games.forEach(function(game) {

            // Add rows - values are in the same order as columns
            tvp.rows.add(gameParams.country, gameParams.div, gameParams.year, parseDateFromString(game.date), game.homeTeam, game.awayTeam);

        });

        // Values are in same order as columns.
        request.input('Fixtures', tvp);
        request.input('Year', sql.Int, gameParams.year);

        request.execute('dbo.Fixtures_Ins', function(err, recordsets, returnValue) {
            // ... error checks
            if (err) throw(err);
        });
	});
}

// Example: dateAsString = "20140917". Resulting date would be new Date(2014,08,17).
// In the produced Javascript date (month - zero-based).
function parseDateFromString(dateAsString)
{
    var year = dateAsString.substr(0, 4);
    var month = dateAsString.substr(4, 2);
    var day = dateAsString.substr(6, 2);

    return new Date(year, month - 1, day);
}

exports.insertGameRecords = insertGameRecords; 
