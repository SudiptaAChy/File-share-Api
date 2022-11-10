# File sharing - Backend Server

***Base url = "localhost:5000"***

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
<br /> response
```json
```

### Authorization Header
```json
{
    "Authorization" : "Bearer $token",
}
```

### Get all uploaded files list
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
            "__v": "Int"
        }
    ]
}
```
```json
Error 500
{
    error: true,
    message: "Something went wrong.",
    files: [],
}
```

### Upload a file
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
        "__v": 0
    }
}
```
```json
Error 400
"message": "Only image and pdf format is allowed.",
```