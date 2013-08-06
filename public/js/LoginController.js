/**
 * Created with JetBrains WebStorm.
 * User: wa
 * Date: 7/19/13
 * Time: 12:43 PM
 * To change this template use File | Settings | File Templates.
 */

// The Login controller which handles Admin and Member Login
// Dependency       :  controller, CRUDOper
// Associated Views :  index.html

function LoginCtrl($scope,sharedService1,sharedService2,$http,$location) {

    //  Global Variables for Admin Login
    $scope.AdminUserName = "";
    $scope.AdminPassword = "";

    //  Global Variables for Member Login
    $scope.MemberUserName = "";
    $scope.MemberPassword = "";

    /*
    $scope.SaveLogin = function(obj){
        $scope.adminActive = obj;
        $scope.NewMember = true;
    };
    */
    //  Admin Login function checks for valid Admin
    $scope.AdminLogin = function(){

       // Basic Validations
       if($scope.AdminUserName.length == 0 ){
           alert("Invalid UserName");
           return;
       }
       if($scope.AdminPassword.length == 0 ){
           alert("Invalid Password");
           return;
       }

       // creating an object to be searched in database
       $scope.AdminCredentials = { username : $scope.AdminUserName, password : $scope.AdminPassword };

        //An HTTP Call to check for Valid Admin Login
        $http.post('/CRUDOper/adminlogin',$scope.AdminCredentials).
           success(function(post){
               if(!post.IsSuccess){
                   // Here its hard Error by server or some connection Problem
                   alert(post.msg + "Try Again");
                   return;
               }
               if(post.data.length == 0){
                   // Indicates successful check but No value retrieved
                   alert("Incorrect Username Or Password");
                   return;
               }
               $scope.adminActive = post.data[0];                        //Get the Object related to active Admin
               post.data[0].MemberType = "Admin";                        //Add type locally for reference as Admin
               sharedService1. broadcast(JSON.stringify(post.data[0]));  //BroadCast to controller.js
               $scope.AdminUserName = "";
               $scope.AdminPassword = "";
               console.log($scope.adminActive);
           }
        );
    };

    $scope.MemberLogin = function(){
        if($scope.MemberUserName.length == 0 ){
            alert("Invalid UserName");
            return;
        }
        if($scope.MemberPassword.length == 0 ){
            alert("Invalid Password");
            return;
        }

        $scope.MemberCredentials = { formno : $scope.MemberUserName, password : $scope.MemberPassword };

        $http.post('/CRUDOper/memberlogin',$scope.MemberCredentials).
            success(function(post){
                if(!post.IsSuccess){
                    alert(post.msg + "Try Again");
                    return;
                }
                if(post.data.length == 0){
                    alert("Incorrect Username Or Password");
                    return;
                }
                $scope.memberActive = post.data[0];
                post.data[0].MemberType = "Member";
                sharedService2. broadcast(JSON.stringify(post.data[0]));
                $scope.MemberUserName = "";
                $scope.MemberPassword = "";
                console.log($scope.memberActive);
            }
        );
    };
}


LoginCtrl.$inject = ['$scope','AdminMemberForm','MemberLogin','$http','$location'];
