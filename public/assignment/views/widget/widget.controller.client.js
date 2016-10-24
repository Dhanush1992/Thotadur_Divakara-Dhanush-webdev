(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce,$routeParams,WidgetService) {

        var vm = this;
        vm.pageId = parseInt($routeParams['pid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);
        vm.widgetId = parseInt($routeParams['wgid']);

        function init(){
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId+"");
        }
        init();

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeImage = checkSafeImage;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeImage(url){
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }


    }
    function NewWidgetController($location,$routeParams,WidgetService) {
        var vm = this;
        vm.pageId = parseInt($routeParams['pid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);
        vm.HeadingWidget = HeadingWidget;
        vm.ImageWidget = ImageWidget;
        vm.YoutubeWidget = YoutubeWidget;




        function HeadingWidget(){
            var id = Math.floor((Math.random() * 1000) + 1).toString();
            while(true){
                if(WidgetService.findWidgetById(id+"") === false)
                    break;
                else
                    id = Math.floor((Math.random() * 1000) + 1).toString();
            }
            var widget = {_id:id+"", name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
            WidgetService.createWidget(vm.pageId+"", widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function ImageWidget() {
            var id = Math.floor((Math.random() * 1000) + 1).toString();
            while(true){
                if(WidgetService.findWidgetById(id+"") === false)
                    break;
                else
                    id = Math.floor((Math.random() * 1000) + 1).toString();
            }
            var widget = {_id:id+"", name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pageId+"", widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function YoutubeWidget() {
            var id = Math.floor((Math.random() * 1000) + 1).toString();
            while(true){
                if(WidgetService.findWidgetById(id+"") === false)
                    break;
                else
                    id = Math.floor((Math.random() * 1000) + 1).toString();
            }
            var widget = {_id:id+"", name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pageId+"", widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.widgetId + "/page/" + vm.pageId + "/widget");
        }

    }
    function EditWidgetController($location,$routeParams,WidgetService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);

        function init(){
            vm.widget = WidgetService.findWidgetById(vm.widgetId+"");
        }
        init();
        vm.HeadingWidget = HeadingWidget;
        vm.ImageWidget = ImageWidget;
        vm.YoutubeWidget = YoutubeWidget;
        vm.deleteWidget = deleteWidget;


        function HeadingWidget() {


            WidgetService.updateWidget(vm.widgetId+"", vm.widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function ImageWidget() {

            WidgetService.updateWidget(vm.widgetId+"", vm.widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function YoutubeWidget() {

            WidgetService.updateWidget(vm.widgetId+"", vm.widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId+"");
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }

    }
})();






