/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.socketService', [])
        .factory('socket', socket);

    /** @ngInject */
    function socket($rootScope, SOCKETIO) {
       // var socket = io.connect('http://localhost:8000');
        var socket = io(SOCKETIO.url);

        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if(callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }
})();
