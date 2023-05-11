# Getting Started With Core App
It's a central app that handle information of our clients and users

## How to start project

Then install all dependecies by run this command in project directory

```
npm install
```

Then you need to run both frontend and json server.

To run frontend of project run this command in project directory.
 ```
 npm start
 ```

To run Json Server

Open new terminal and run change directory to server by type this command 
```
cd server
```

Then run 
```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## For create production version

run
 ```
 npm run build
 ````

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## Apis used

The following EndPoint I used and connected to server all data return in json format

### Companies

    GET /companies
        |__To Get All Companies List

    GET /companies/:id
        |__To get one company
    
    POST /companies
        |__ To Add new companies {id, companyName, companyType, creationDate, imageUpload: <BinaryString>, companyManager, companyOwner, companyDescription}

    PUT /companies/:id
        |__ To Edit one Company {companyName, companyType, creationDate, imageUpload: <BinaryString>, companyManager, companyOwner, companyDescription}

    DELETE /companies/:id
        |__ To Delete one company
        
### Departments

    GET /departments
        |__ To Get All Department

    Get /departments/:id
        |__ To Get one department

    POST /departments
        |__ To Add new department {id, departmentName, status <Active | Deactive>, departmentMngr, subDepartment, deptDescription, creationDate}
    
    PUT /departments/:id
        |__ Edit one company {departmentName, status <Active | Deactive>, departmentMngr, subDepartment, deptDescription, creationDate}

    DELETE /departments/:id
        |__ Delete One Department

### SubDepartment

    GET /sub-departments
        |__ Get all subdepartment data {id, value, label}
### Groups

    GET /groups
        |__ To Get All groups
    
    GET /groups/:id
        |__ Get One group data

    POST /groups
        |__ Add New Group {id, groupName, status, groupManager, groupDescription, creationDate, groupMembers, NoOfMembers}

    PUT /groups/:id
        |__ Edit one group {groupName, status, groupManager, groupDescription, creationDate, groupMembers, }

    DELETE /groups/:id
        |__ Delete One group

### Employees

    GET /employees
        |__ get all employees data

    GET /employees/:id
        |__ get one employee

    POST /employees
        |__ Add new employee {id, name, phone, creationDate, company, group, role, note, addressLine1, addressLine2, country, city, state, zipCode, userName, email, password, filesUploaded}
    
    PUT /employees/:id
        |__ Edit one employee {name, phone, creationDate, company, group, role, note, addressLine1, addressLine2, country, city, state, zipCode, userName, email, password, filesUploaded}

    DELETE /groups/:id
        |__ Delete One employee

### roles

    GET /roles
        |__ get roles info {id, name}

### users

    GET /users
        |__ get all roles info 

    GET /users/:id
        |__ get one user

    POST /users
        |__ Add new user {id, personal_name, phone, addressLine1, addressLine2, country, creationDate,city, state, zipCode, userName, email, password, imageUpload }
    
    PUT /users/:id
        |__ Edit one user {personal_name, phone, addressLine1, addressLine2, country, creationDate,city, state, zipCode, userName, email, password, imageUpload }


    DELETE /users/:id
        |__ Delete One user

### Notifications

    GET /notifications
        |__ get all notifications info {date, content}

### App settings

    GET /app-setting/:id
        |__ get one user setting {id <IdUser>, direction <vertical | horizontal>", themeColor, language}
