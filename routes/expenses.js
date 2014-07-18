var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('expenses');

    var skip = req.query.skip ? req.query.skip : 0;
    var periodText = req.query.period ? req.query.period : "month";
    var startDate = getStartDate(periodText);
    collection.find({ date: { $gt: startDate } }, { skip: skip, limit: 10, sort: { date: -1 }, fields: {} }, function (e, docs) {
        res.jsonp(docs);
    });
});


router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('expenses');
    var expenseId = req.params.id;
    collection.find({ _id: expenseId }, function (e, docs) {
        res.jsonp(docs);
    });
});

function getStartDate(periodText) {

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var dayOfTheWeek = now.getDay();

    if (periodText == "week") {
        day = day - dayOfTheWeek + 1;
    }
    if (periodText == "month") {
        day = 1;
    }

    return new Date(year, month, day);
}

module.exports = router;