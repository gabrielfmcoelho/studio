```json
{
    "swagger": "2.0",
    "info": {
        "description": "Platform API is a RESTful API for managing ...",
        "title": "Platform API",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "Eng. Gabriel Coelho | InovaData development team",
            "url": "https://solude.tech",
            "email": "suporte@solude.tech"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "0.1.1"
    },
    "host": "api.solude.tech",
    "basePath": "/",
    "paths": {
        "/forgot-password": {
            "post": {
                "description": "Sends an email to the user with a link to reset their password",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth User"
                ],
                "summary": "Forgot Password",
                "operationId": "forgotPassword",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User email",
                        "name": "email",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Email sent successfully",
                        "schema": {
                            "$ref": "#/definitions/domain.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request - Invalid input",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found - User not found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/login": {
            "post": {
                "description": "Authenticates a user using their email and password, then returns access and refresh tokens for session management.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth User"
                ],
                "summary": "Login user",
                "operationId": "login",
                "parameters": [
                    {
                        "description": "Login Request",
                        "name": "loginRequest",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/domain.LoginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful login, returns access and refresh tokens",
                        "schema": {
                            "$ref": "#/definitions/domain.LoginResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request - Invalid input",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Incorrect email or password",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found - User not found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/login-guest": {
            "post": {
                "description": "Authenticates a guest user using their IP address, then returns access and refresh tokens for session management",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth User"
                ],
                "summary": "Login Guest",
                "operationId": "loginGuest",
                "responses": {
                    "200": {
                        "description": "Successful login, returns access and refresh tokens",
                        "schema": {
                            "$ref": "#/definitions/domain.LoginResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/refresh-token": {
            "post": {
                "description": "Refreshes the user's access token",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth User"
                ],
                "summary": "Refresh Token",
                "operationId": "refreshToken",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Refresh token",
                        "name": "refreshToken",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Access token refreshed successfully",
                        "schema": {
                            "$ref": "#/definitions/domain.RefreshTokenResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request - Invalid input",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Invalid refresh token",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/reset-password": {
            "post": {
                "description": "Resets the user's password",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth User"
                ],
                "summary": "Reset Password",
                "operationId": "resetPassword",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User email",
                        "name": "email",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "New password",
                        "name": "newPassword",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Password reset successfully",
                        "schema": {
                            "$ref": "#/definitions/domain.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request - Invalid input",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found - User not found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services": {
            "get": {
                "description": "Gets all available services",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Fetch Services",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "allOf": [
                                    {
                                        "$ref": "#/definitions/domain.SuccessResponse"
                                    },
                                    {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/definitions/domain.PublicService"
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            },
            "post": {
                "description": "Creates a new service",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Create Service",
                "parameters": [
                    {
                        "description": "Service data",
                        "name": "service",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/domain.Service"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/domain.SuccessResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/domain.PublicService"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services/heartbeat": {
            "patch": {
                "description": "Adds usage duration (in seconds) to a log record",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Heartbeat usage",
                "parameters": [
                    {
                        "description": "Heartbeat data",
                        "name": "heartbeat",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/domain.Heartbeat"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/domain.SuccessResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services/marketing": {
            "get": {
                "description": "Gets all marketing services",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Website Service"
                ],
                "summary": "Get Marketing Services",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/domain.MarketingService"
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services/organization": {
            "get": {
                "description": "Gets all services linked to an organization",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Get Services by Organization",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Organization ID",
                        "name": "organizationID",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/domain.HubService"
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services/{identifier}": {
            "get": {
                "description": "Gets service by numeric ID (e.g., /services/123) or name (/services/my-service)",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Get Service by Identifier",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Service ID or Name",
                        "name": "identifier",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/domain.SuccessResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/domain.PublicService"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services/{serviceID}": {
            "put": {
                "description": "Updates service data",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Update Service",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Service ID",
                        "name": "serviceID",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Service data",
                        "name": "service",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/domain.Service"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/domain.SuccessResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/domain.PublicService"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            },
            "delete": {
                "description": "Deletes a service",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Delete Service",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Service ID",
                        "name": "serviceID",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "204": {
                        "description": "No Content"
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services/{serviceID}/application": {
            "get": {
                "description": "Logs that a user started using a service, returns log ID and public service data",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Start using a service (create a usage log)",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Service ID",
                        "name": "serviceID",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/domain.UseService"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/services/{serviceID}/organization/{organizationID}": {
            "post": {
                "description": "Links the service to an organization",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Service"
                ],
                "summary": "Set Service Availability",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Service ID",
                        "name": "serviceID",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Organization ID",
                        "name": "organizationID",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/domain.SuccessResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/user-service-logs": {
            "get": {
                "description": "Gets all user-service log entries",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "UserServiceLog"
                ],
                "summary": "Fetch all UserServiceLogs",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "allOf": [
                                    {
                                        "$ref": "#/definitions/domain.SuccessResponse"
                                    },
                                    {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/definitions/domain.PublicUserServiceLog"
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/user-service-logs/{identifier}": {
            "get": {
                "description": "Gets a user-service log entry by a flexible identifier",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "UserServiceLog"
                ],
                "summary": "Get a UserServiceLog by ID or user:XXX or service:XXX",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Identifier",
                        "name": "identifier",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/domain.SuccessResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/domain.PublicUserServiceLog"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/user-service-logs/{logID}": {
            "delete": {
                "description": "Removes a user-service log record",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "UserServiceLog"
                ],
                "summary": "Delete a UserServiceLog",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "UserServiceLog ID",
                        "name": "logID",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "204": {
                        "description": "No Content"
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/user/create": {
            "post": {
                "description": "Create a new user account with the input payload",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Create a new user account",
                "operationId": "createUser",
                "parameters": [
                    {
                        "description": "User object",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/domain.CreateUser"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "User created successfully"
                    },
                    "400": {
                        "description": "Bad Request - Invalid input",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/user/{identifier}": {
            "get": {
                "description": "Get user by ID or email",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Get user by ID or email",
                "operationId": "getUser",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User ID or email",
                        "name": "identifier",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User object",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/domain.SuccessResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/domain.PublicUser"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "404": {
                        "description": "Not Found - User not found",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/user/{id}": {
            "put": {
                "description": "Update user by ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Update user",
                "operationId": "updateUser",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "User object",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/domain.User"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User updated successfully"
                    },
                    "400": {
                        "description": "Bad Request - Invalid input",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete user by ID",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Delete user",
                "operationId": "deleteUser",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "204": {
                        "description": "User deleted successfully"
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/users": {
            "get": {
                "description": "Get all users from the database",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "User"
                ],
                "summary": "Get all users",
                "operationId": "fetchUsers",
                "responses": {
                    "200": {
                        "description": "List of users",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/domain.SuccessResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/domain.PublicUser"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/domain.ErrorResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "domain.CreateUser": {
            "type": "object",
            "required": [
                "email",
                "organization_id",
                "password",
                "role"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "organization_id": {
                    "type": "integer"
                },
                "password": {
                    "type": "string"
                },
                "role": {
                    "type": "integer"
                }
            }
        },
        "domain.ErrorResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "domain.Heartbeat": {
            "type": "object",
            "properties": {
                "duration": {
                    "type": "integer"
                },
                "log_id": {
                    "type": "integer"
                }
            }
        },
        "domain.HubService": {
            "type": "object",
            "properties": {
                "description": {
                    "type": "string"
                },
                "icon_url": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "last_update": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "price": {
                    "type": "number"
                },
                "screenshot_url": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "domain.LoginRequest": {
            "type": "object",
            "required": [
                "email",
                "password"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "domain.LoginResponse": {
            "type": "object",
            "properties": {
                "accessToken": {
                    "type": "string"
                },
                "refreshToken": {
                    "type": "string"
                }
            }
        },
        "domain.MarketingService": {
            "type": "object",
            "properties": {
                "benefits": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "description": {
                    "type": "string"
                },
                "features": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "icon_url": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "marketing_name": {
                    "type": "string"
                },
                "screenshot_url": {
                    "type": "string"
                },
                "tag_line": {
                    "type": "string"
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "domain.PublicService": {
            "type": "object",
            "properties": {
                "app_url": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "last_update": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                },
                "version": {
                    "type": "string"
                }
            }
        },
        "domain.PublicUser": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "first_name": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "organization_id": {
                    "type": "integer"
                },
                "organization_name": {
                    "type": "string"
                },
                "role_id": {
                    "type": "integer"
                }
            }
        },
        "domain.PublicUserServiceLog": {
            "type": "object",
            "properties": {
                "duration": {
                    "type": "integer"
                },
                "id": {
                    "type": "integer"
                },
                "service_id": {
                    "type": "integer"
                },
                "user_id": {
                    "type": "integer"
                }
            }
        },
        "domain.RefreshTokenResponse": {
            "type": "object",
            "properties": {
                "accessToken": {
                    "type": "string"
                },
                "refreshToken": {
                    "type": "string"
                }
            }
        },
        "domain.Service": {
            "type": "object"
        },
        "domain.SuccessResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "description": "Omits Data field if nil"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "domain.UseService": {
            "type": "object",
            "properties": {
                "log_id": {
                    "type": "integer"
                },
                "service": {
                    "$ref": "#/definitions/domain.PublicService"
                }
            }
        },
        "domain.User": {
            "type": "object"
        }
    },
    "securityDefinitions": {
        "BasicAuth": {
            "type": "basic"
        }
    },
    "externalDocs": {
        "description": "OpenAPI",
        "url": "https://swagger.io/resources/open-api/"
    }
}
```