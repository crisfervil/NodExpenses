define(['plugins/http', 'durandal/app', 'knockout', 'data/expenses'], function (http, app, ko, exp) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    var PAGE_SIZE = 10; // Number of items per page

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    function getFormattedDate(strDate, period) {

        var DAYS_OF_THE_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dec"];

        var result = null;
        if (strDate) { // ignore null values
            var date = new Date(strDate);
            if (date) {
                if (period != 'today') { // when today expenses are loaded, doesn't make sense to see the date
                    if (period == 'week') {
                        result = DAYS_OF_THE_WEEK[date.getDay()];
                    }
                    if (period == 'month') {
                        result = date.getDate()+"-"+MONTHS[date.getMonth()];
                    }
                }
            }
        }

        return result;
    }

    return {

        displayName: 'Home',
        expenses: ko.observableArray([]),
        period: ko.observable('month'), // default period
        more: ko.observable(true),

        loadExpenses: function (skip) {
            var that = this;
            exp.getExpenses(this.period(), skip).then(function (items) {
                if (!skip || skip == 0) that.expenses.removeAll();
                for (var i = 0; i < items.length; i++) {
                    var currentItem = items[i];
                    if(currentItem.date)
                        currentItem.formatedDate =
                            ko.computed(function () { return getFormattedDate(currentItem.date, that.period()) });
                    that.expenses.push(currentItem);
                }

                // Indicate that there are more items only if the maximun number
                // of items were returned
                that.more(items.length == PAGE_SIZE);
            });
        },

        activate: function () {
            //sleep(1000);
            //the router's activator calls this function and waits for it to complete before proceding
            if (this.expenses().length < 1) {
                this.loadExpenses();
            }
        },

        loadMonthExpenses: function () {
            this.period('month');
            this.loadExpenses();
        },

        loadWeekExpenses: function () {
            this.period('week');
            this.loadExpenses();
        },

        loadTodayExpenses: function () {
            this.period('today');
            this.loadExpenses();
        },

        loadMore: function () {
            var skip = this.expenses().length;
            this.loadExpenses(skip);
        }
    };
});