
'use strict';
 // The main controller where Cookies are created and destroyed, session is managed
 // Dependency       :  FormController, LoginController
 // Associated Views :  index.html

 function AppCtrl($scope,sharedService1,sharedService2,sharedService3,$http,$location) {

     // Factory services initiated by Admin Login Successful through LoginController --> $scope.AdminLogin
     $scope.$on('NewMemberShow', function(event, message) {
        $scope.AllMember = true;
        $scope.WelcomePanel = true;
        $scope.LoginPanelShow = false;
        $scope.ActiveMemberUserType = "Admin";
        var tempobj = JSON.parse(message);
        $scope.CurrentLogin = tempobj;
        $scope.ActiveMemberUserName = tempobj.username;
        $scope.setCookie("AuthCookie", message ,365);
    });

     // Factory services initiated by Member Login Successful through LoginController --> $scope.MemberLogin
     $scope.$on('MemberLoginShow', function(event, message) {
         $scope.AllMember = false;
         $scope.WelcomePanel = true;
         $scope.LoginPanelShow = false;
         $scope.ActiveMemberUserType = "Member";
         var tempobj = JSON.parse(message);
         $scope.CurrentLogin = tempobj;
         $scope.ActiveMemberUserName = tempobj.username;
         $scope.setCookie("AuthCookie", message ,365);
     });

     // Factory services initiated by on load LoginController to get Session Information
    $scope.$on('getSessionInformation',function(event, message){
        return ($scope.CurrentLogin)
    });

     /********************************* COOKIE SETTER AND GETTER METHODS [START] *************************************/

     $scope.getCookie = function(c_name){

        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1)
        {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1)
        {
            c_value = null;
        }
        else
        {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = c_value.length;
            }
            c_value = decodeURI((c_value.substring(c_start,c_end)));
        }
        return c_value;
    };

    $scope.setCookie = function(c_name,value,exdays){

        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=encodeURI((value)) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    };

    $scope.checkCookie = function(){

        var CurrCookie = $scope.getCookie("AuthCookie");
        if (CurrCookie!=null && CurrCookie!="")
        {
            var objCookie = JSON.parse(CurrCookie);
            if(objCookie.MemberType == "Admin"){
                $scope.AllMember = true;
                $scope.WelcomePanel = true;
                $scope.LoginPanelShow = false;
                $scope.ActiveMemberUserType = "Admin";
                $scope.ActiveMemberUserName = objCookie.username;
                alert("already visited");
            }
            else if(objCookie.MemberType == "Member"){
                $scope.AllMember = false;
                $scope.WelcomePanel = true;
                $scope.LoginPanelShow = false;
                $scope.ActiveMemberUserType = "Member";
                $scope.ActiveMemberUserName = objCookie.username;
                alert("already visited");
            }
            //alert("Welcome again " + username);
            return true;
        }
        else
        {
            $scope.CurrentLogin = "";
            $scope.ActiveMemberUserType = "";
            $scope.ActiveMemberUserName = "";
            $scope.AllMember = false;
            $scope.WelcomePanel = false;
            $scope.LoginPanelShow = true;
           return false;
        }
    };

     /********************************* COOKIE SETTER AND GETTER METHODS [END] *************************************/

    //  Local function fires on LogOut
    $scope.logout = function(){
        $scope.CurrentLogin = "";
        $scope.ActiveMemberUserType = "";
        $scope.ActiveMemberUserName = "";
        $scope.AllMember = false;
        $scope.WelcomePanel = false;
        $scope.LoginPanelShow = true;
        $scope.setCookie("AuthCookie", "" ,-1);
        $location.path( "/home" );
    };

    // IMPORTANT : On every page Load checks for the Cookie information [checks for session]
    var IsSession = $scope.checkCookie();
    console.log("Session" + IsSession);

	/*
	$scope.form = {};
	
 	$scope.submitPost=function(){
  	$http.post('/CRUDOper/addInfo',$scope.form).
	  	success(function(post){
	  	$location.path('/');
	  	alert('Thank you...!');
	  	
	  	})
    };*/
}

AppCtrl.$inject = ['$scope','AdminMemberForm','sessionInfo','MemberLogin','$http','$location'];


$(document).ready(function () {
        //  To synchronize navigation bar active css
        $('ul.nav > li').click(function (e) {
            e.preventDefault();
            $('ul.nav > li').removeClass('active');
            $(this).addClass('active');                
        });            
    });
