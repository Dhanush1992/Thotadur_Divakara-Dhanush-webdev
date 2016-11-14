/**
 * Created by dhanush on 11/13/16.
 */
(function() {

    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);


    function jgaSortable() {


        function linker(scope, element) {

            var start = -1;
            var end = -1;

            element
                .sortable({
                    start: function (event, ui) {
                        start = $(ui.item).index();
                    },
                    stop: function (event, ui) {
                        end = $(ui.item).index();
                        scope.widgetSort.sort(start, end);
                    }
                });
        }

        return {
            scope:{},
            link: linker,
            controller: widgetSort,
            controllerAs: 'widgetSort'
        }

    }


    function widgetSort(WidgetService, $routeParams){
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {

            var pageId = $routeParams.pid;
            WidgetService
                .widgetSwap(pageId, start, end)
                .success(function () {
                })
                .error(function (err) {

                });
        }
    }




})();