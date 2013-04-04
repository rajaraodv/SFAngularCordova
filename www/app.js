/**
 * bootStrapAngular is where you setup your angular app. For example,
 * the below create 'MyOppApp' app (module) and adds 'AngularForce', 'AngularForceObjectFactory' and
 * 'Contact' modules as its dependencies
 *
 * PS: This function is called when jquery.ready is triggered in index.html
 */
function bootStrapAngular() {
    var angularApp = angular.module('MyContactApp', ['AngularForce', 'AngularForceObjectFactory', 'Contact']);
    angularApp.constant('SFConfig', {});
    angularApp.config(function ($routeProvider) {
        $routeProvider.when('/edit/:contactId', { templateUrl: '#edit', onActivate: 'getContact(contactId)'})
            .when('/', { templateUrl: '#main', onActivate: 'query()'});
    });
    //load 'contact' module
    angular.bootstrap(document, ['MyContactApp']);
}

/**
 * Describe Salesforce object to be used in the app. For example: Below AngularJS factory shows how to describe and
 * create an 'Contact' object. And then set its type, fields, where-clause etc.
 *
 *  PS: This module is injected into ListCtrl, EditCtrl etc. controllers to further consume the object.
 */
angular.module('Contact', []).factory('Contact', function (AngularForceObjectFactory) {
    var Contact = AngularForceObjectFactory({type: 'Contact', fields: ['FirstName', 'LastName', 'Title', 'Phone', 'Email', 'Id'], where: ''});
    return Contact;
});

/**
 * List Controller function controls JQM list view. It handles actions like object 'query', 'edit' & 'logout' etc
 *
 * @param $scope  AngularJS Scope Object
 * @param Contact AngularJS module that represents an actual Salesforce Object Class
 * @param $location  AngularJS Location service - Used to change JQM page
 * @param AngularForce AngularJS + forcetk glue - Used for AJAX calls
 * @constructor
 */
function ListCtrl($scope, Contact, $location, AngularForce) {
    //Set login details
    //AngularForce.setCordovaLoginCred();
    AngularForce.login(function () {
        setTimeout(function () {
            $scope.query();
        }, 0);
    });

    //Query list of Opportunities
    $scope.query = function () {
        Contact.query(function (data) {
            $scope.contacts = data.records;
            $scope.$apply();//Required coz sfdc uses jquery.ajax
        });
    };

    //Edit
    $scope.edit = function (id) {
        $location.path('/edit/' + id);
    };

    // Logout
    $scope.logout = function () {
        if (cordova) {
            var sfOAuthPlugin = cordova.require("salesforce/plugin/oauth");
            sfOAuthPlugin.logout();
        }
    };
}

/**
 *
 * @param $scope  AngularJS Scope Object
 * @param $location  AngularJS Location service - Used to change JQM page
 * @param $routeParams AngularJS Route obj - Contains route url's parameters
 * @param AngularForce AngularJS + forcetk glue - Used for AJAX calls
 * @param Contact Salesforce Object described as AngularJS Module that returns AngularForceObjectFactory
 * @constructor
 */
function EditCtrl($scope, $location, $routeParams, AngularForce, Contact) {
    var self = this;

    $scope.getContact = function () {
        $scope.contact = new Contact({});//reset old one
        if (!$routeParams.contactId)
            return;

        Contact.get({id: $routeParams.contactId}, function (contact) {
            self.original = contact;
            $scope.contact = new Contact(self.original);
            $scope.$apply();//Required coz sfdc/forcetk uses jquery.ajax
        });

        $scope.save = function () {
            if ($routeParams.contactId && $routeParams.contactId != "undefined" && $routeParams.contactId != "") {
                $scope.update();
            } else {
                $scope.saveNew();
            }
        };
    };

    //Save's a new Contact object
    $scope.saveNew = function () {
        Contact.save($scope.contact, function (contact) {
            var o = contact;
            $scope.$apply(function () {
                $location.path('/edit/' + o.id);
            });
        });
    };

    // Update an existing contact
    $scope.update = function () {
        $scope.contact.update(function () {
            $scope.$apply(function () {
                $location.path('/');
            });
        });
    };

    //check if contact is not edited
    $scope.isClean = function () {
        return angular.equals(self.original, $scope.contact);
    };

    //delete contact
    $scope.destroy = function () {
        self.original.destroy(function () {
            $scope.$apply(function () {
                $location.path('/');
            });
        });
    };
}
