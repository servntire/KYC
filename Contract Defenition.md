//Initialize Contract
User – userId, age, gender, Permanent house address
Output
msg.sender is made as creatorAdmin
msg.sender is made as superAdmin
msg.sender is made as Approved


//Request a new admin
requestNewAdmin - address, userId, age, gender, Permanent house address
msg.sender should be admin
address and userId should not be already registered
Output – marks userId, state as pending, level as admin, age, gender, Permanent house address, createdBy as msg.sender, createdAt as current time.


//Request a new user
requestNewUser - address, userId, age, gender, Permanent house address
msg.sender should be admin
address and userId should not be already registered
Output – marks userId, state as pending, level as user, age, gender, Permanent house address, createdBy as msg.sender, createdAt as current time.


//Approve a pending request
ApproveUser – address
msg.sender should be Superadmin
Output – state as Approved


//Get a user detail
getUserDetails – address
Output – userId, state, level, age, gender, Permanent house address
