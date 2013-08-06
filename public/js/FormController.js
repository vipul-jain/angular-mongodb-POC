/**
 * Created with JetBrains WebStorm.
 * User: wa
 * Date: 7/19/13
 * Time: 3:20 PM
 * To change this template use File | Settings | File Templates.
 */

function FormCtrl($scope,sharedservice,$http,$location) {
    var LoginScope = sharedservice.broadcast();
    var currentLogin = LoginScope.currentScope.CurrentLogin;

    //console.log(currentLogin);

    if(currentLogin == ""){
        alert("You have to be Logged In to access Membership Information");
        $location.path( "/home" );
    }

    if(currentLogin.MemberType == "Admin"){
        //  Present scope variables Initialization
        $scope.memberAdd = {
            formno : "",
            surname : "",
            name : "",
            fathername : "",
            resaddress : "",
            resphno : "",
            offaddress : "",
            offphno : "",
            fax : "",
            business : "",
            website : "",
            email : "",
            vilagerescaddress : "",
            vilagepincode : "",
            vilagephno : "",
            vilagemobile : "",
            contacts : [],
            familymembers : []
        };
        $scope.showmarriagedate = false;
        $scope.formNoDisable = false;
    }
    else if(currentLogin.MemberType == "Member"){
        $scope.MemberInfo = { formno : currentLogin.formno };

        $http.post('/CRUDOper/getmemberbyformno',$scope.MemberInfo).
            success(function(post){
                if(!post.IsSuccess){
                    alert(post.msg + "Try Again");
                    return;
                }
                if(post.data.length == 0){
                    alert("Your information is not found on server");
                    return;
                }
                $scope.memberAdd = post.data[0];
                $scope.formNoDisable = true;

            }
        );
    }

    // console.log("FORm" + $scope.$AppCtrl.CurrentLogin);
    //  Start DatePicker
    $('#dob').datepicker();
    $('#marriagedt').datepicker();



    //  Variables related to Contact Info
    $scope.contactname = "";
    $scope.contactno = "";
    $scope.IsContactEditing = 0;    // Will be used as contact editing flag

    var editContactCellTemplate = '<input class="btn btn-warning" type="button" value="Edit" ng-click="OnContactEdit(row.entity)"></input>';
    var deleteContactCellTemplate = '<input class=" btn btn-inverse" type="button" value="Delete" ng-click="OnContactDelete(row.entity)"></input>';

    $scope.Contacts = {  data: "memberAdd.contacts",
        multiSelect: false,
        plugins: [new ngGridFlexibleHeightPlugin()],
        columnDefs: [{ field: "sno", width: "10%", displayName:'No' },
            { field: "contactperson", width: "30%", displayName:'Contact Person' },
            { field: "phno", width: "30%", displayName: 'Phone No'},
            { field: 'Edit', width: "15%", displayName: 'Edit', cellTemplate:editContactCellTemplate},
            { field: 'Delete', width: "15%", displayName: 'Delete', cellTemplate:deleteContactCellTemplate}]
    };

    //  Variables related to Family Info
    $scope.Fmember = {
        sno : "",
        name : "",
        fhname : "",
        gender : "",
        dob : "",
        education : "",
        maritialstatus :"",
        mdt : "",
        maternal: "",
        bloodgroup: ""
    };

    $scope.IsFamilyEditing = 0;    // Will be used as family member editing flag

    var editFmemberCellTemplate = '<input class="btn btn-warning" type="button" value="Edit" ng-click="OnFamilyMemberEdit(row.entity)"></input>';
    var deleteFmemberCellTemplate = '<input class=" btn btn-inverse" type="button" value="Delete" ng-click="OnFamilyMemberDelete(row.entity)"></input>';

    $scope.FamilyMembers = {  data: "memberAdd.familymembers",
        multiSelect: false,
        plugins: [new ngGridFlexibleHeightPlugin()],
        columnDefs: [{ field: 'gender', width: 80, displayName: 'Edit', cellTemplate:editFmemberCellTemplate},
            { field: 'Delete', width: 80, displayName: 'Delete', cellTemplate:deleteFmemberCellTemplate},
            { field: "sno", width: 50, displayName:'No' },
            { field: "name", width: 200, displayName:'Name' },
            { field: "fhname", width: 200, displayName: 'Father/Husband'},
            { field: "gender", width: 100, displayName:'Gender' },
            { field: "dob", width: 150, displayName: 'DOB'},
            { field: "education", width: 200, displayName:'Education' },
            { field: "maritialstatus", width: 150, displayName: 'Married'},
            { field: "bloodgroup", width: 150, displayName: 'Blood Group'},
            { field: "mdt", width: 150, displayName:'Married Date' },
            { field: "maternal", width: 150, displayName: 'Maternal'}]
    };


    $scope.AddContact = function(){
        if($scope.contactname.length == 0){
            alert("Enter a Valid Contact Name");
            return;
        }
        if($scope.contactno.length == 0){
            alert("Enter a Valid Contact Number");
            return;
        }
        if(isNaN($scope.contactno)){
            alert("This is not a Valid Contact Number");
            return;
        }
        if($scope.IsContactEditing != 0){
            //Edit Case
            for(var intIndex=0; intIndex<$scope.memberAdd.contacts.length; intIndex++){
                if($scope.memberAdd.contacts[intIndex].sno == $scope.IsContactEditing){
                    //Edit the Contact Information
                    $scope.memberAdd.contacts[intIndex].contactperson = $scope.contactname;
                    $scope.memberAdd.contacts[intIndex].phno = $scope.contactno;
                    break;
                }
            }
            $scope.IsContactEditing = 0;    //Reset the contact editing flag
        }
        else
        {
            var obj = {
                sno : $scope.memberAdd.contacts.length + 1,
                contactperson : $scope.contactname,
                phno : $scope.contactno
            };
            $scope.memberAdd.contacts.push(obj);
        }
        $scope.contactname = "";
        $scope.contactno = "";
    };

    $scope.OnContactEdit = function(obj){
        $scope.IsContactEditing = obj.sno;
        $scope.contactname = obj.contactperson;
        $scope.contactno = obj.phno;
    };

    $scope.OnContactDelete = function(obj){
        if(confirm("This record will be permanently deleted, Are you sure you want to continue ? ")){
            for(var intIndex=0; intIndex<$scope.memberAdd.contacts.length; intIndex++){
                if($scope.memberAdd.contacts[intIndex].sno == obj.sno){
                    //Delete the Contact Information
                    $scope.memberAdd.contacts.splice(intIndex, 1);
                    break;
                }
            }

            for(var intIndex=0; intIndex<$scope.memberAdd.contacts.length; intIndex++){
                //For each contact reset the sno
                $scope.memberAdd.contacts[intIndex].sno = intIndex + 1;
            }
        }
    };

    $scope.married = function(mstatus){
        if(mstatus == "Y")
            $scope.showmarriagedate = true;
        else
            $scope.showmarriagedate = false;
    };

    $scope.AddFamilyMember = function(){
        if($scope.Fmember.name.length == 0){
            alert("Please input Name");
            return;
        }
        if($scope.Fmember.fhname.length == 0){
            alert("Please input Father/Husband Name");
            return;
        }
        if($scope.Fmember.gender.length == 0){
            alert("Please select a gender");
            return;
        }
        $scope.Fmember.dob = $("#mdob").val();
        if($scope.Fmember.dob.length == 0){
            alert("Please input birth date");
            return;
        }
        if($scope.Fmember.education.length == 0){
            alert("Please input Education");
            return;
        }
        if($scope.Fmember.maritialstatus.length == 0){
            alert("Please input Maritial status");
            return;
        }
        if($scope.Fmember.maritialstatus == "Y"){
            $scope.Fmember.mdt = $("#marrdt").val();
            if($scope.Fmember.mdt.length == 0){
                alert("Please input Marriage Date");
                return;
            }
        }
        if($scope.Fmember.maternal.length == 0){
            alert("Please input Maternal Name");
            return;
        }

        if($scope.IsFamilyEditing != 0){
            //  Edit Case
            for(var intIndex=0; intIndex<$scope.memberAdd.familymembers.length; intIndex++){
                //For each contact reset the sno
                if($scope.memberAdd.familymembers[intIndex].sno == $scope.IsFamilyEditing){
                    $scope.memberAdd.familymembers[intIndex] = $scope.Fmember;
                    $scope.IsFamilyEditing = 0;
                }
            }
        }
        else
        {
            //  Add Case
            $scope.Fmember.sno = $scope.memberAdd.familymembers.length + 1;
            $scope.memberAdd.familymembers.push($scope.Fmember);
        }
        $scope.Fmember = {
            sno : "",
            name : "",
            fhname : "",
            gender : "",
            dob : "",
            education : "",
            maritialstatus :"",
            mdt : "",
            maternal: "",
            bloodgroup: ""
        };
        $scope.showmarriagedate = false;

    };

    $scope.OnFamilyMemberEdit = function(obj){
        $scope.IsFamilyEditing = obj.sno;
        $scope.Fmember = obj
        if($scope.Fmember.maritialstatus = 'Y')
            $scope.showmarriagedate = true;
        else
            $scope.showmarriagedate = false;
    }

    $scope.OnFamilyMemberDelete = function(obj){
        if(confirm("This record will be permanently deleted, Are you sure you want to continue ? ")){
            for(var intIndex=0; intIndex<$scope.memberAdd.familymembers.length; intIndex++){
                if($scope.memberAdd.familymembers[intIndex].sno == obj.sno){
                    //Delete the member Information
                    $scope.memberAdd.familymembers.splice(intIndex, 1);
                    break;
                }
            }

            for(var intIndex=0; intIndex<$scope.memberAdd.familymembers.length; intIndex++){
                //For each member reset the sno
                $scope.memberAdd.familymembers[intIndex].sno = intIndex + 1;
            }
        }
    };

    $scope.CancelContact = function(){
        $scope.IsContactEditing = 0;
        $scope.contactname = "";
        $scope.contactno = "";
        for(var intIndex=0; intIndex<$scope.memberAdd.contacts.length; intIndex++){
            //Remove any Highlighted row for contact grid
            $scope.Contacts.selectRow(intIndex, false);
        }
    };

    $scope.CancelFamilyMember = function(){
        $scope.IsFamilyEditing = 0;
        $scope.Fmember = {
            sno : "",
            name : "",
            fhname : "",
            gender : "",
            dob : "",
            education : "",
            maritialstatus :"",
            mdt : "",
            maternal: "",
            bloodgroup: ""
        };
        $scope.showmarriagedate = false;
        for(var intIndex=0; intIndex<$scope.memberAdd.familymembers.length; intIndex++){
            //Remove any Highlighted row for member grid
            $scope.FamilyMembers.selectRow(intIndex, false);
        }
    };

    $scope.AddMember = function(){
        if( "false" == $("#IsMemberFormValid").val().trim()){
            alert("Please Enter proper values");
            return;
        }

        if(currentLogin.MemberType == "Member"){
            $http.post('/CRUDOper/memberUpdate',$scope.memberAdd).
                success(function(post){
                    if(!post.IsSuccess){
                        alert(post.msg + "Try Again");
                        return;
                    }
                    alert("Member Updated Successfully");
                }
            );
            return;
        }


        console.log($scope.memberAdd);
        $http.post('/CRUDOper/memberInsert',$scope.memberAdd).
            success(function(post){
                if(!post.IsSuccess){
                    //console.log(post.msg + "Try Again");
                   alert(post.msg + "Try Again");
                    return;
                }
                alert("Member Added Successfully");
                var autopass = Math.random().toString(36).slice(-8);
                var passwordinsert = {formno : $scope.memberAdd.formno, password : autopass  };
                $http.post('/CRUDOper/autogeneratepassword',passwordinsert).
                    success(function(post){
                        if(!post.IsSuccess){
                            alert(post.msg + "Try Again");
                            //alert(post.msg + "Try Again");
                            return;
                        }
                        alert("Autogenerated Password for present user : " + autopass );
                    }
                );
            }
        );
    }
}
FormCtrl.$inject = ['$scope','sessionInfo','$http','$location'];