App = {
  web3Provider: null,
  contracts: {},





  init: function() {
  if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
  } else {
    // If no injected web3 instance is detected, fall back to Ganache
    App.web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/yGEHQFbey55ozzDha3hf');
  //  Web3j web3 = Web3j.build(new HttpService("https://rinkeby.infura.io/<your-token>"));

  }
  web3 = new Web3(App.web3Provider);


    return App.initContract();
  },





  initContract: function() {

    var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newAdmin",
				"type": "address"
			},
			{
				"name": "_newAdminId",
				"type": "uint256"
			},
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_gender",
				"type": "uint8"
			},
			{
				"name": "_pAddress",
				"type": "string"
			}
		],
		"name": "requestNewAdmin",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userIds",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "userDetails",
		"outputs": [
			{
				"name": "userId",
				"type": "uint256"
			},
			{
				"name": "state",
				"type": "uint8"
			},
			{
				"name": "level",
				"type": "uint8"
			},
			{
				"name": "age",
				"type": "uint256"
			},
			{
				"name": "gender",
				"type": "uint8"
			},
			{
				"name": "permanentAddress",
				"type": "string"
			},
			{
				"name": "createdBy",
				"type": "address"
			},
			{
				"name": "createdAt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newUser",
				"type": "address"
			},
			{
				"name": "_newUserId",
				"type": "uint256"
			},
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_gender",
				"type": "uint8"
			},
			{
				"name": "_pAddress",
				"type": "string"
			}
		],
		"name": "requestNewUser",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "creatorAdmin",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserDetails",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_approvedUser",
				"type": "address"
			}
		],
		"name": "approveUser",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_newAdmin",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_newAdminId",
				"type": "uint256"
			}
		],
		"name": "RequestedNewAdmin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_newUser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_newUserId",
				"type": "uint256"
			}
		],
		"name": "RequestedNewUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_approvedUser",
				"type": "address"
			}
		],
		"name": "ApprovedUser",
		"type": "event"
	}
];

App.contracts.User =  web3.eth.contract(abi).at('0xF4aa05b3EA41759baDBFA9973533B63a3bfBa0F1');

var check;
 App.contracts.User.creatorAdmin(function(error, result){
  if(!error)
      console.log(JSON.stringify(result));
  else
      console.error(error);
});
alert(check);



    return App.bindEvents();

  },




bindEvents: function() {
    $(document).on('click', '#btn-adduser', App.handleAdduser);
    $(document).on('click', '#btn-addadmin', App.handleAddadmin);
    $(document).on('click', '#btn-approve', App.handleApprove);
    $(document).on('click', '#btn-search', App.handleSearch);
    },






  handleAdduser: function(event) {
    event.preventDefault();



    var newUser = $('#AddUser #useradd').val();
    var newUserId = parseInt($('#AddUser #userID').val());
    var age = parseInt($('#AddUser #userAge').val());
    var gender;
    if($('#AddUser #userGender').val() == "male")
    {gender = 0;}
    else if ($('#AddUser #userGender').val() == "female")
      {gender = 1;}

    var pAddress = $('#AddUser #paymentAddress').val();




    web3.eth.getAccounts(function(error, accounts) {
									      if (error) {
										console.log(error);
									      }

      App.contracts.User.requestNewUser(newUser, newUserId, age, gender, pAddress, function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
      });



    });

  },



  handleAddadmin: function(event) {

    event.preventDefault();
    var newUser = $('#AddUser #useradd').val();
    var newUserId = parseInt($('#AddUser #userID').val());
    var age = parseInt($('#AddUser #userAge').val());
    var gender;
    if($('#AddUser #userGender').val() == "male")
    {gender = 0;}
    else if ($('#AddUser #userGender').val() == "female")
      {gender = 1;}

    var pAddress = $('#AddUser #paymentAddress').val();




    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }


                        App.contracts.User.requestNewAdmin(newUser, newUserId, age, gender, pAddress, function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });


  });

  },


  handleApprove: function(event) {
    event.preventDefault();

    var address = $('#useraddressSearch').val();



    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }

                        App.contracts.User.approveUser(address, function(error, result){
                          if(!error)
                            {  console.log(JSON.stringify(result));

                            }
                          else
                              console.error(error);
                        });


  });

  },


  handleSearch: function() {
//    event.preventDefault();



var address = $('#useraddressSearch').val();


    var state;
    var level;
    var gender;




    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }


                                            App.contracts.User.getUserDetails(address, function(error, result){
                                              if(!error)
                                          {        console.log(JSON.stringify(result));
alert(result);
                                                  state = result[1];
                                                  level = result[2];

                                          $('#resultUserID').text(result[0]);
                                          $('#resultAge').text(result[3]);
                                          gender = result[4];

                                          if(gender == 0)
                                          {$('#resultGender').text('Male');}
                                          else if(gender == 1)
                                          {$('#resultGender').text('Female');}



                                          $('#resultAddress').text(result[5]);

                                          if(level == 0)
                                          {$('#resultUserRole').text('User');}
                                          else if(level == 1)
                                          {$('#resultUserRole').text('Admin');}
                                          else if(level == 2)
                                          {$('#resultUserRole').text('SuperAdmin');}
                                          if(state == 0)
                                          {$('#resultState').text('NotExist');
                                           $('#resultfunct #btn-approve').attr('disabled', true);}
                                          else if (state == 1)
                                          {$('#resultState').html('Pending');
                                           $('#resultfunct').html('<a href="#" id="btn-approve" class="btn btn-primary">Approve</a>');}
                                          else if(state == 2)
                                          {$('#resultState').text('Approved');
                                           $('#resultfunct #btn-approve').attr('disabled', true);}
                                          else if(state == 3)
                                          {$('#resultState').text('Rejected');
                                           $('#resultfunct #btn-approve').attr('disabled', true);}

                                        }
                                              else
                                                  console.error(error);
                                            });


      });

  }





};







$(function() {
  $(window).load(function() {

    App.init();
  });
});
