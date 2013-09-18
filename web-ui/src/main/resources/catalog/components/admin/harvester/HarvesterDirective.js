(function() {
    goog.provide('gn_harvester_directive');

    var module = angular.module('gn_harvester_directive', []);
    

    /**
     * Display harvester identification section with 
     * name, group and icon
     */
    module.directive('gnHarvesterIdentification', [ 
       function() {
       
       return {
           restrict : 'A',
           replace: true,
           transclude: true,
           scope: {
               harvester: '=gnHarvesterIdentification'
           },
           templateUrl: '../../catalog/components/admin/harvester/partials/' +
             'identification.html',
           link : function(scope, element, attrs) {
               
           }
       };
    }]);
    
    /**
     * Display account when remote login is used.
     */
    module.directive('gnHarvesterAccount', [ 
       function() {
       
       return {
           restrict : 'A',
           replace: true,
           transclude: true,
           scope: {
               harvester: '=gnHarvesterAccount'
           },
           templateUrl: '../../catalog/components/admin/harvester/partials/' +
             'account.html',
           link : function(scope, element, attrs) {
               
           }
       };
    }]);
    /**
     * Display harvester schedule configuration.
     */
    module.directive('gnHarvesterSchedule', ['$translate', 
       function($translate) {
       
       return {
           restrict : 'A',
           replace: true,
           transclude: true,
           scope: {
               harvester: '=gnHarvesterSchedule'
           },
           templateUrl: '../../catalog/components/admin/harvester/partials/' +
             'schedule.html',
           link : function(scope, element, attrs) {
               
           }
       };
    }]);
    
    
    /**
     * Display harvester privileges configuration with 
     * publish to all / none / custom switcher.
     * 
     * TODO: Custom mode
     */
    module.directive('gnHarvesterPrivileges', ['$http', '$translate', '$rootScope', 
        function($http, $translate, $rootScope) {
        
        return {
            restrict : 'A',
            replace: true,
            transclude: true,
            scope: {
                harvester: '=gnHarvesterPrivileges'
            },
            templateUrl: '../../catalog/components/admin/harvester/partials/' +
              'privileges.html',
            link : function(scope, element, attrs) {
                var defaultPrivileges = [{
                    "@id" : "1",
                    "operation" : [ {
                        "@name" : "view"
                    }, {
                        "@name" : "dynamic"
                }]}];
                    
                scope.visibleTo = function (who) {
                    if (who == 'all') {
                        scope.harvester.privileges = defaultPrivileges;
                    } else if (who == 'none') {
                        scope.harvester.privileges = [];
                    } else {
                        // TODO
                    }
                }
                
                var init = function () {
                    // If only one privilege config 
                    // and group name is equal to Internet (ie. 1)
                    if (scope.harvester.privileges && 
                            scope.harvester.privileges.length === 1 &&
                            scope.harvester.privileges[0]['@id'] == '1') {
                        $('#gn-harvester-visible-all').button('toggle');
                    }
                }
                
                init();

            }
        };
    }]);
})();
