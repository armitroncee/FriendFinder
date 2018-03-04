var friendsTable = require("../data/friends.js")

module.exports = function(app) {
  app.get("/api/friends", function(req,res){
    res.json(friendsTable)
  })

  app.post("/api/friends", function(req,res){
    var userInput = req.body;

		var userResponses = userInput.scores;

		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000;

		for (var i = 0; i < friendsTable.length; i++) {

			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friendsTable[i].scores[j] - userResponses[j]);
			}

			if (diff < totalDifference) {
				console.log('Closest match found = ' + diff);
				console.log('Friend name = ' + friendsTable[i].name);

				totalDifference = diff;
				matchName = friendsTable[i].name;
				matchImage = friendsTable[i].link;
			}
		}
		friendsTable.push(userInput);
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  })
}
