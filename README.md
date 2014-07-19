NodExpenses
===========

Application for expenses tracking, created using Node.js, Express, MongoDB, Durandal and Knockout


Install Instructions (for windows environments)
===============================================

- clone the git repository to a local directory

``` bat
git clone https://github.com/crisfervil/NodExpenses.git C:\Users\crisfervil\Desktop\NodExpenses
```

- change dir to the path used: 

``` bat
cd c:\users\crisfervil\desktop\nodexpenses
```

- install project dependencies, typing

``` bat
npm install
```

- create the data directory, to contain the mongo database files

``` bat
md data
```

- start the mongo server typing the following command 

``` bat
mongod --dbpath data
```

- Start the node application

``` bat
npm start
```
  
- Open your prefered browser using the localhost and port 3000

[http://localhost:3000](http://localhost:3000)
