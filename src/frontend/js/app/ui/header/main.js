'use strict';

const $          = require('jquery');
const Mn         = require('backbone.marionette');
const Cache      = require('../../cache');
const Controller = require('../../controller');
const Tokens     = require('../../tokens');
const template   = require('./main.ejs');

module.exports = Mn.View.extend({
    id:        'header',
    className: 'header',
    template:  template,

    ui: {
        link:     'a',
        details:  'a.edit-details',
        password: 'a.change-password'
    },

    events: {
        'click @ui.details': function (e) {
            e.preventDefault();
            Controller.showUserForm(Cache.User);
        },

        'click @ui.password': function (e) {
            e.preventDefault();
            Controller.showUserPasswordForm(Cache.User);
        },

        'click @ui.link': function (e) {
            e.preventDefault();
            let href = $(e.currentTarget).attr('href');

            switch (href) {
                case '/':
                    Controller.showDashboard();
                    break;
                case '/logout':
                    Controller.logout();
                    break;
            }
        }
    },

    templateContext: {
        getUserField: function (field, default_val) {
            return Cache.User.get(field) || default_val;
        },

        getRole: function () {
            return Cache.User.isAdmin() ? 'Administrator' : 'Apache Helicopter';
        },

        getLogoutText: function () {
            if (Tokens.getTokenCount() > 1) {
                return 'Sign back in as ' + Tokens.getNextTokenName();
            }

            return 'Sign out';
        }
    },

    initialize: function () {
        this.listenTo(Cache.User, 'change', this.render);
    }
});