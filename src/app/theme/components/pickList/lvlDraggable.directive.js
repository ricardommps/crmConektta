(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('lvlDraggable', lvlDraggable);

    /** @ngInject */
    function lvlDraggable($rootScope, uuid) {

        return {
            restrict: 'A',
            link: function(scope, el, attrs, controller) {
                angular.element(el).attr("draggable", "true");

                var id = angular.element(el).attr("id");
                if (!id) {
                    id = uuid.new()
                    angular.element(el).attr("id", id);
                }

                el.bind("dragstart", function(e) {
                    e.dataTransfer.setData('text', id);

                    $rootScope.$emit("LVL-DRAG-START");
                });

                el.bind("dragend", function(e) {
                    $rootScope.$emit("LVL-DRAG-END");
                });
            }
        }
    }

})();