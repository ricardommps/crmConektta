/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inteligentWifi.dashboard')
      .controller('dashboardTableConectadostCtrl', dashboardTableConectadostCtrl);

  /** @ngInject */
  function dashboardTableConectadostCtrl($scope, baConfig, layoutPaths, baUtil) {
  	$scope.connectedUsers = [
  		{
  			user 	:'Ricardo Matta',
			age 	: 34,
			status	:'Online',
			genre	:'Masculino',
			visits	: 3

  		},
  		{
  			user 	:'João das Flores',
			age 	: 30,
			status	:'Online',
			genre	:'Masculino',
			visits	: 1

  		},
  		{
  			user 	:'Maria Cunha',
			age 	: 23,
			status	:'OffLine',
			genre	:'Feminino',
			visits	: 4

  		},
  		{
  			user 	:'Zé Maria',
			age 	: 45,
			status	:'Online',
			genre	:'Masculino',
			visits	: 14

  		},
  		{
  			user 	:'Ricardo Matta',
			age 	: 34,
			status	:'Online',
			genre	:'Masculino',
			visits	: 3

  		},
  		{
  			user 	:'João das Flores',
			age 	: 30,
			status	:'Online',
			genre	:'Masculino',
			visits	: 1

  		},
  		{
  			user 	:'Maria Cunha',
			age 	: 23,
			status	:'OffLine',
			genre	:'Feminino',
			visits	: 4

  		},
  		{
  			user 	:'Zé Maria',
			age 	: 45,
			status	:'Online',
			genre	:'Masculino',
			visits	: 14

  		},
  		{
  			user 	:'Ricardo Matta',
			age 	: 34,
			status	:'Online',
			genre	:'Masculino',
			visits	: 3

  		},
  		{
  			user 	:'João das Flores',
			age 	: 30,
			status	:'Online',
			genre	:'Masculino',
			visits	: 1

  		},
  		{
  			user 	:'Maria Cunha',
			age 	: 23,
			status	:'OffLine',
			genre	:'Feminino',
			visits	: 4

  		},
  		{
  			user 	:'Zé Maria',
			age 	: 45,
			status	:'Online',
			genre	:'Masculino',
			visits	: 14

  		}

  	]
  }
})();
