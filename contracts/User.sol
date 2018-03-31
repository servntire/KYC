pragma solidity ^0.4.4;

contract User{
	address public creatorAdmin;

	enum Type { User, Admin, SuperAdmin }
	enum State { NotExist, Pending, Approved, Rejected }
    enum Gender { Male, Female }

	struct UserDetail {
		uint userId;
		State state;
		Type level;
		uint age;
		Gender gender;
		string permanentAddress;
		address createdBy;
		uint createdAt;
	}

	mapping (address => UserDetail) public userDetails;
	mapping (uint => address) public userIds;

	event RequestedNewAdmin(address _newAdmin, uint256 _newAdminId);
	event RequestedNewUser(address _newUser, uint256 _newUserId);
	event ApprovedUser(address _approvedUser);

	function User(){
		creatorAdmin = msg.sender;
		userIds[1] = msg.sender;
		userDetails[msg.sender] = UserDetail(1, State.Approved, Type.SuperAdmin, 22, Gender.Male,"CAO@Servntire", msg.sender, now);
	}

	// Check if the caller is a Super Admin.
	modifier onlySuperAdmins() {
		require(msg.sender == creatorAdmin);
		_;
	}

	// Check if the caller is either Admin or Super Admin.
	modifier onlyAdmins() {
		require(userDetails[msg.sender].state == State.Approved);
		require(userDetails[msg.sender].level == Type.Admin || creatorAdmin == msg.sender);
		_;
	}

	// Check if the user has already not been registered.
	// This is to avoid repeated requests to add the same user.
	modifier notRegisteredUser(address _newUser, uint _newUserId) {
		require(userDetails[_newUser].state == State.NotExist);
		require(userIds[_newUserId] == address(0));
		_;
	}

	// Request to add new Admin.
	function requestNewAdmin(address _newAdmin, uint _newAdminId, uint _age, Gender _gender, string _pAddress) onlyAdmins notRegisteredUser(_newAdmin, _newAdminId) returns (bool success) {
		require(addNewUser(_newAdmin, _newAdminId, Type.Admin,_age, _gender, _pAddress ));
		RequestedNewAdmin(_newAdmin, _newAdminId);
		return true;
	}

	// Request to add new User.
	function requestNewUser(address _newUser, uint _newUserId, uint _age, Gender _gender, string _pAddress) onlyAdmins notRegisteredUser(_newUser, _newUserId) returns (bool success) {
		require(addNewUser(_newUser, _newUserId, Type.User, _age, _gender, _pAddress));
		RequestedNewUser(_newUser, _newUserId);
		return true;
	}

	// Common function to create entry in UserDetails Mapping.
	function addNewUser(address _userAddress, uint _userId, Type level, uint _age, Gender _g, string _pAddress) internal returns (bool success) {
		userIds[_userId] = _userAddress;
		userDetails[_userAddress] = UserDetail(_userId, State.Pending, level, _age, _g, _pAddress, msg.sender, now);
		return true;
	}

	// Approve pending requests.
	function approveUser(address _approvedUser) onlySuperAdmins returns (bool success) {
	  require(userDetails[_approvedUser].createdBy != msg.sender || creatorAdmin == msg.sender);
		userDetails[_approvedUser].state = State.Approved;
		userIds[userDetails[_approvedUser].userId] = _approvedUser;
		ApprovedUser(_approvedUser);
		return true;
	}

	// Get the User Details.
	function getUserDetails(address _userAddress) constant returns (uint, State, Type, uint, Gender, string) {
		UserDetail storage user = userDetails[_userAddress];
		return (user.userId, user.state, user.level, user.age, user.gender, user.permanentAddress);
	}
}
