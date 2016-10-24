(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    function WidgetListController($routeParams,WidgetService) {


    }
    function NewWidgetController($location,$routeParams,WidgetService) {
        var vm = this;
        vm.pageId = parseInt($routeParams['pid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);
        vm.createHeadingWidget = createHeadingWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;




        function createHeadingWidget(){
            var id = Math.floor((Math.random() * 1000) + 1).toString();
            while(true){
                if(WidgetService.findWidgetById(id) === null)
                    break;
                else
                    id = Math.floor((Math.random() * 1000) + 1).toString();
            }
            var widget = {_id:id, name:vm.widget.name, widgetType: "HEADING", size: vm.widget.size, text: vm.widget.text };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function createImageWidget() {
            var id = Math.floor((Math.random() * 1000) + 1).toString();
            while(true){
                if(WidgetService.findWidgetById(id) === null)
                    break;
                else
                    id = Math.floor((Math.random() * 1000) + 1).toString();
            }
            var widget = {_id:id, name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pageId+"", widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function createYoutubeWidget() {
            var id = Math.floor((Math.random() * 1000) + 1).toString();
            while(true){
                if(WidgetService.findWidgetById(id) === null)
                    break;
                else
                    id = Math.floor((Math.random() * 1000) + 1).toString();
            }
            var widget = {_id:id, name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.widgetId + "/page/" + vm.pageId + "/widget");
        }

    }
    function EditWidgetController($location,$routeParams,WidgetService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routePArams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);

        function init(){
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(){
            WidgetService.updateWidget(vm.widgetId,vm.widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+pageId+"/widget");
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page/"+vm.pageId+"/widget");

        }

    }
})();






