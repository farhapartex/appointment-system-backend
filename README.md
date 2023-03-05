## Appointment System backend

* User can creater account (who will be admin for their scope) to manage their appointments
* Other user can create appointment for a specific user
* Admin can approve/disapprove the appointment

### Setup:

* Run `yarn` to install packages
* Create a `.env` file and copy all from `.sample.env`
* Create a database in MongoDB mongodb.com/atlas/database
* Copy the MONGO_URI and put in `.env`
* Run `yarn dev` to start the server
* This repo has a postman collection, so take a look to all APIs

### API flow

1. First have to register (A user could be a admin or general)
2. Second user have to login to have the JWT token
3. Admin user have to create appointment places
4. After, admin user have to create weekly slots for appointments
5. Other registered user can use the appointment create API to create a appointment with a admin user
6. Admin user can approve/disapprove any of their own appointment 
7. Admin user can have a look of all appointments for current day


#### More features are comming ... 