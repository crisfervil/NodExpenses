define(['plugins/http', 'durandal/app', 'knockout', 'data/expenses'], function (http, app, ko, exp) {

    return {
        displayName: 'Expense details',
        expenseId: ko.observable(''),
        description: ko.observable(''),
        date: ko.observable(''),
        amount: ko.observable(''),

        activate: function (expenseId) {
            this.expenseId(expenseId);
            var that = this;
            exp.getById(expenseId).then(function (item) {
                that.description(item.description);
                that.date(item.date);
                that.amount(item.amount);
            });
        }
    };
});