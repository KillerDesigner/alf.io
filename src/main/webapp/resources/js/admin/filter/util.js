(function () {
    "use strict";
    var filters = angular.module('utilFilters', []);

    filters.filter('printSelectedOrganization', function() {
        return function(organizations, id) {
            var existing = _.find(organizations, function(organization) {
                return id && organization.id == id;
            }) || {};
            return existing.name;
        }
    });

    filters.filter('formatDate' , function() {
        return function(dateAsString, pattern) {
            var formatPattern = angular.isDefined(pattern) ? pattern : 'DD.MM.YYYY HH:mm';
            var date = moment(dateAsString);
            if(date.isValid()) {
                return date.format(formatPattern);
            }
            return dateAsString;
        };
    });

    filters.filter('statusText', function() {
        return function(status) {
            if(!status) {
                return '';
            }
            return status.replace(/_/g, ' ').toLowerCase();
        };
    });

    filters.filter('mailSettingsFilter', function() {
        return function(list, mailType) {
            if(angular.isUndefined(mailType) || mailType === null) {
                return [];
            }
            var referenceKey = mailType.toUpperCase();
            return _.filter(list, function(e) {
                return e.key.toUpperCase().indexOf(referenceKey) > -1;
            });
        };
    });

    filters.filter('showSelectedCategories', function() {
        return function(categories, criteria) {
            if(criteria.active && criteria.expired && criteria.freeText === '') {
                return categories;
            }
            return _.filter(categories, function(category) {
                var result = ((criteria.active && !category.expired) || (criteria.expired && category.expired));
                if(result && criteria.freeText !== '') {
                    return category.name.toLowerCase().indexOf(criteria.freeText.toLowerCase()) > -1;
                }
                return result;
            });
        };
    });
})();