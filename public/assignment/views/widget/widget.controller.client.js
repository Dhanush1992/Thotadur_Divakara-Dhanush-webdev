(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce,$routeParams,WidgetService,$location) {

        var vm = this;
        vm.pageId = $routeParams['pid'];
        vm.websiteId = $routeParams['wid'];
        vm.userId = $routeParams['uid'];
        //vm.widgetId = $routeParams['wgid'];

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (page) {
                    console.log("In Init");
                    console.log(page.widgets);
                    vm.widgets = page.widgets;
                    //$location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                    
                })
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
        vm.pageId = $routeParams['pid'];
        vm.websiteId = $routeParams['wid'];
        vm.userId = $routeParams['uid'];
        vm.HeadingWidget = HeadingWidget;
        vm.ImageWidget = ImageWidget;
        vm.YoutubeWidget = YoutubeWidget;




        function HeadingWidget(){
            var widgetSize = parseInt(vm.widget.size);
            var widget = { type: "HEADER", size: widgetSize, text: vm.widget.text };
            console.log(widget.size);
            if(!vm.widget||!vm.widget.name){
                vm.condition = true;
                vm.error = "Widget name";
                return;
            }
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function(widgets){

                    vm.widgets = widgets; // Check if needed
                    $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function(){});
            
        }

        function ImageWidget() {
            var widget = {name:vm.widget.name, type: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            if(!vm.widget||!vm.widget.name){
                vm.condition = true;
                vm.error = "Widget name";
                return;
            }
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function(widgets){
                    vm.widgets = widgets; // check if needed
                    $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function(){
                    
                });
            
        }

        function YoutubeWidget() {
            var widget = {name:vm.widget.name, type: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            if(!vm.widget||!vm.widget.name){
                vm.condition = true;
                vm.error = "Widget name";
                return;
            }
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function(widgets){
                    vm.widgets = widgets; // check if needed
                    $location.url("/user/" + vm.userId + "/website/"+vm.widgetId + "/page/" + vm.pageId + "/widget");
                })
                .error(function(){
                    
                });
            
        }

    }
    function EditWidgetController($location,$routeParams,WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        function init(){
            vm.widget = WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    
                })
                .error(function () {
                    
                })
        }
        init();
        vm.HeadingWidget = HeadingWidget;
        vm.ImageWidget = ImageWidget;
        vm.YoutubeWidget = YoutubeWidget;
        vm.deleteWidget = deleteWidget;


        function HeadingWidget() {


            if(!vm.widget||!vm.widget.name){
                vm.condition = true;
                vm.error = "Widget name";
                return;
            }else{
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function () {

                        $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {

                    });
            }

            
        }

        function ImageWidget() {
            if(!vm.widget||!vm.widget.name){
                vm.condition = true;
                vm.error = "Widget name";
                return;
            }else{
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {

                    });
            }

            
        }

        function YoutubeWidget() {
            if(!vm.widget||!vm.widget.name){
                vm.condition = true;
                vm.error = "Widget name";
                return;
            }else{
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {

                    });
            }

        }

        function deleteWidget(){
            if(!vm.widget||!vm.widget.name){
                vm.condition = true;
                vm.error = "Widget name";
                return;
            }else{
                WidgetService
                    .deleteWidget(vm.widgetId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    })
                    .error(function () {

                    });

            }


        }

    }
})();






