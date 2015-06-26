var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/customers.html'
	})
	.when('/orders', {
		templateUrl: 'partials/orders.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

myApp.factory('customerFactory', function() {
	var factory = {};
	var customers = [];

	factory.getCustomers = function(callback) {
		callback(customers);
	}
	return factory
})

myApp.factory('orderFactory', function() {
	var factory = {};
	var orders = [];

	factory.getOrders = function(callback) {
		callback(orders)
	}
	return factory
})
	
myApp.controller('customersController', function(customerFactory) {
	var that = this;
	that.customers = [];
	customerFactory.getCustomers(function(data) {
		that.customers = data;
	})
	that.addCustomer = function() {
		if(that.newCustomer.name == undefined) {
			return false
		}
		that.error=null;
		that.newCustomer.date_created = new Date();
		for (idx in that.customers) {
			if(that.newCustomer.name == that.customers[idx].name){
				that.error = "You've already added that name.";
				that.newCustomer = {};
				return false;
			}
		}
		that.customers.push(that.newCustomer);
		that.newCustomer = {};
	}

	that.removeCustomer = function(customer) {
		that.customers.splice(that.customers.indexOf(customer), 1);
	}
})

myApp.controller('ordersController', function(orderFactory) {
	var that = this;
	that.orders = [];
	orderFactory.getOrders(function(data) {
		that.orders = data;
	})
	that.addOrder = function() {
		that.newOrder.name = that.newOrder.name.name;
		that.newOrder.date = new Date();
		that.orders.push(that.newOrder);
		that.newOrder={};
	}
	that.removeOrder = function(order) {
		that.orders.splice(that.orders.indexOf(order), 1);
	}
})