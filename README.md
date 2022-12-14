# File sharing - Backend Server

run `npm start`

***Base url = "http://localhost:5000/"***

### Sign up
-------------
***end points = "/auth/register"***
<br /> request ***POST***
```json
{
    "name" : "$user_name",
    "email" : "$user_email",
    "password": "$user_password",
}
```
response
```json 
success 201
{
    "error" : "false",
    "message" : "user created successfully.",
    "token" : "$token",
}
```
```json 
error 200
{
    "error": "true",
    "message": "this email already existed. try with another one.",
}
```
```json 
error 503
{
    "error": "true",
    "message": "something went wrong try again later.",
}
```

### Login
----------
***end points = "/auth/login"***
<br /> request ***POST***
```json
{
    "email" : "String",
    "password" : "String",
}
```
<br /> response
```json
success 200
{
    "user": {
        "_id": "String",
        "name": "String",
        "email": "String",
        "password": "String",
        "createdAt": "time stamp",
        "updatedAt": "time stamp",
        "__v": "int"
    },
    "token": "String"
}
```
```json
error 404
{
    "message": "User not Found"
}
```
```json
error 401
{
    "message": "Invalid Credential"
}
```
```json
error 503
{
    "message": "Something went wrong"
}
```

### Authorization Header
------------------------
```json
{
    "Authorization" : "Bearer $token",
}
```
For wrong access token
```json
status code 401
{
    "message": "Unauthorized user."
}
```

### Get all uploaded files list
-------------------------------
***end points = "/"***
<br /> request ***GET*** with `Authorization` header
<br /> response
```json
success 200
{
    "error": false,
    "message": "File retrived successfully.",
    "files": [
        {
            "_id": "String",
            "userId": "String",
            "filename": "String",
            "savedfilename": "String",
            "filetype": "String",
            "filepath": "String",
            "filesize": "Int",
            "visibleToEveryone": "Boolean",
            "sharewith": [],
            "createdAt": "String",
            "updatedAt": "String",
            "__v": "int"
        }
    ]
}
```
```json
Error 500
{
    "error": "true",
    "message": "Something went wrong.",
    "files": "[]",
}
```

### Get a specific file information
-----------------------------------
***end points = "/<id>"***
<br /> request ***GET*** with `Authorization` header
<br /> response
```json
success 200
{
    "_id": "String file id",
    "userId": "String",
    "filename": "String",
    "savedfilename": "String",
    "filetype": "String",
    "filepath": "String",
    "filesize": "int",
    "visibleToEveryone": "boolean",
    "sharewith": "array",
    "createdAt": "time stamp",
    "updatedAt": "time stamp",
    "__v": "int"
}
```
```json
Error 500
{
    "message": "Something went wrong."
}
```

### Upload a file
-----------------
***end points = "/upload"***
<br /> request ***POST*** with `Authorization` header
```json
{
    "file": "any image and pdf file",
}
```
<br /> response
```json
success 201
{
    "result": {
        "userId": "uploader user id",
        "filename": "uploaded file name",
        "savedfilename": "saved file name",
        "filetype": "uploaded file type",
        "filepath": "saved file location",
        "filesize": "uploaded file size in KB",
        "visibleToEveryone": "initially true",
        "sharewith": [],
        "_id": "file unique id",
        "createdAt": "time stamp",
        "updatedAt": "time stamp",
        "__v": "int"
    }
}
```
```json
Error 400
{
    "message": "Only image and pdf format is allowed."
}
```

### Download a file
-------------------
***end points = "/download/:id"***
<br /> request ***GET*** with `Authorization` header

### Delete a file
-----------------
***end points = "/delete/:id"***
<br /> request ***DELETE*** with `Authorization` header


