# Under construction

***Base url = "#"***

### Sign up
-------------
***end points = "/auth/register"***
request
```json
{
    "name" : user_name,
    "email" : user_email,
    "password": user_password,
}
```
response
```json 
success 201
{
    "error" : "false",
    "message" : "user created successfully.",
    "token" : token,
}
```
```json 
error 200
{
    error: "true",
    message: "this email already existed. try with another one.",
}
```
```json 
error 503
{
    error: "true",
    message: "something went wrong try again later.",
}
```

### Login
----------
***end points = "/auth/login"***