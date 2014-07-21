var express = require('express');
var router = express.Router();
var expense = require('../models/expenses');

router.get('/',function(req, res) {

        var skip = req.query.skip || 0;
        var periodText = req.query.period || "month";
        var startDate = getStartDate(periodText);
        var filter = { date: { $gt: startDate }};

        expense
            .find(filter)
            .skip(skip)
            .limit(10)
            .sort("-date")
            .exec(function(err, expenses) {
                if (err)
                    res.send(err);

                res.json(expenses);
        });
    });

router.get('/:id', function (req, res) {

    var filter = { _id: req.params.id };
    
    expense
        .find(filter)
        .exec(function(err, expenses) {
            if (err)
                res.send(err);

            res.json(expenses);
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