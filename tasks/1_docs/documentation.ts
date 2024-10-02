const packageJson = require('../package.json');

const documentation = JSON.stringify({
  // configs
  "openapi": "3.0.0",
  "info": {
    "title": packageJson.name.toUpperCase(), 
    "version": packageJson.version, 
    "description": packageJson.description
  },
  // components, security etc...
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {
      "BearerAuth": []
    }
  ],
  // endpoints
  "paths": {
    // --------------------------------------------------
    "/tasks/category/create": {
      "post": {
        "summary": "Create a new category",
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "tags": ["CATEGORY"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "categoryName": {
                    "type": "string",
                    "example": "finance"
                  },
                },
                "required": ["categoryName"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "'category' created successfully",
            "content": {
              "application/json": {
                "examples": {
                  "successResponse": {
                    "value": {
                      "status": "success",
                      "code": 201,
                      "idCreated": "id",
                      "message": "'category' created successfully",
                      "links": {
                        "self": "/tasks/category/create",
                        "next": "/tasks/category/list-all"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // --------------------------------------------------
    "/tasks/category/list-all": {
      "get": {
        "summary": "List all categories",
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "tags": ["CATEGORY"],
        "responses": {
          "200": {
            "description": "A list of categories retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "code": {
                      "type": "integer",
                      "example": 200
                    },
                    "message": {
                      "type": "string",
                      "example": "data received successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "93e83b42-ada5-417b-b63a-a0891ba00d45"
                          },
                          "categoryName": {
                            "type": "string",
                            "example": "finance"
                          }
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "total": {
                          "type": "integer",
                          "example": 1
                        }
                      }
                    },
                    "links": {
                      "type": "object",
                      "properties": {
                        "self": {
                          "type": "string",
                          "example": "/tasks/category/list-all"
                        },
                        "next": {
                          "type": "string",
                          "example": "/tasks/category/create"
                        },
                        "prev": {
                          "type": "string",
                          "nullable": true,
                          "example": null
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // --------------------------------------------------
    "/tasks/category/delete/{categoryId}": {
      "delete": {
        "summary": "Delete a category by ID",
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "tags": ["CATEGORY"],
        "parameters": [
          {
            "name": "categoryId",
            "in": "path",
            "required": true,
            "description": "ID of the category to delete",
            "schema": {
              "type": "string",
              "example": "93e83b42-ada5-417b-b63a-a0891ba00d45"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Category deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "code": {
                      "type": "integer",
                      "example": 201
                    },
                    "message": {
                      "type": "string",
                      "example": "successfully deleted"
                    },
                    "links": {
                      "type": "object",
                      "properties": {
                        "self": {
                          "type": "string",
                          "example": "/tasks/category/delete/{categoryId}"
                        },
                        "next": {
                          "type": "string",
                          "example": "/tasks/category/list-all"
                        },
                        "prev": {
                          "type": "string",
                          "example": "/tasks/category/list-all"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // --------------------------------------------------
    "/tasks/create": {
      "post": {
        "summary": "Create a new task",
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "tags": ["TASK"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "taskName": {
                    "type": "string",
                    "description": "Name of the task",
                    "example": "Finish report"
                  },
                  "category": {
                    "type": "string",
                    "description": "Category of the task",
                    "example": "Work"
                  },
                  "description": {
                    "type": "string",
                    "description": "Detailed description of the task",
                    "example": "Complete the final report for the project"
                  },
                  "dueDate": {
                    "type": "string",
                    "description": "Due date for the task in YYYY-MM-DD format",
                    "example": "2023-10-01"
                  },
                  "statusName": {
                    "type": "string",
                    "description": "Status of the task",
                    "example": "Pending"
                  }
                },
                "required": ["taskName", "category", "dueDate", "statusName"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Task created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "code": {
                      "type": "integer",
                      "example": 201
                    },
                    "message": {
                      "type": "string",
                      "example": "'Finish report' created successfully"
                    },
                    "idCreated": {
                      "type": "string",
                      "example": "12345678-1234-1234-1234-123456789abc"
                    },
                    "links": {
                      "type": "object",
                      "properties": {
                        "self": {
                          "type": "string",
                          "example": "/tasks/create"
                        },
                        "next": {
                          "type": "string",
                          "example": "/tasks/list"
                        },
                        "prev": {
                          "type": "string",
                          "example": "/tasks/create"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "409": {
            "description": "Conflict - Task already exists",
            "content": {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error"
                    },
                    code: {
                      type: "integer",
                      example: 409
                    },
                    message: {
                      type: "string",
                      example: "'Finish report' already exists"
                    },
                    links: {
                      type: "object",
                      properties: {
                        self: {
                          type: "string",
                          example: "/tasks/create"
                        },
                        next: {
                          type: "string",
                          example: "/tasks/list"
                        },
                        prev: {
                          type: "string",
                          example: "/tasks/create"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // --------------------------------------------------
    "/tasks/list": {
      "get": {
        "summary": "List all tasks",
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "tags": ["TASK"],
        "responses": {
          "200": {
            "description": "Tasks retrieved successfully",
            "content": {
              "application/json": {
                "examples": {
                  "successResponse": {
                    "value": {
                      "status": "success",
                      "code": 200,
                      "message": "data received successfully",
                      "data": [
                        {
                          "id": "1",
                          "taskName": "Example Task",
                          "category": "Finance",
                          "description": "This is an example task.",
                          "dueDate": "2024-10-01",
                          "statusName": "Pending"
                        }
                      ],
                      "meta": {
                        "total": 1
                      },
                      "links": {
                        "self": "/tasks/list",
                        "next": "/tasks/",
                        "prev": "/tasks/list"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // --------------------------------------------------
    "/tasks/update/{updateId}": {
      "patch": {
        "summary": "Update an existing task",
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "tags": ["TASK"],
        "parameters": [
          {
            "name": "updateId",
            "in": "path",
            "required": true,
            "description": "ID of the task to be updated",
            "schema": {
              "type": "string",
              "example": "22f70783-9891-4d64-a08c-c676e385616f"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "taskName": {
                    "type": "string",
                    "example": "New Task Name"
                  },
                  "category": {
                    "type": "string",
                    "example": "finance"
                  },
                  "description": {
                    "type": "string",
                    "example": "Updated description of the task"
                  },
                  "dueDate": {
                    "type": "string",
                    "format": "date",
                    "example": "2024-10-10"
                  },
                  "statusName": {
                    "type": "string",
                    "example": "completed"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Task updated successfully",
            "content": {
              "application/json": {
                "examples": {
                  "successResponse": {
                    "value": {
                      "status": "success",
                      "code": 200,
                      "message": "'New Task Name' updated successfully",
                      "idUpdated": "22f70783-9891-4d64-a08c-c676e385616f",
                      "links": {
                        "self": "/tasks/update/22f70783-9891-4d64-a08c-c676e385616f",
                        "next": "/tasks/list",
                        "prev": "/tasks/list"
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Task not found",
            "content": {
              "application/json": {
                "example": {
                  "status": "error",
                  "statusCode": 404,
                  "message": "task not found",
                  "links": {
                    "self": "/tasks/update/22f70783-9891-4d64-a08c-c676e385616f",
                    "next": "/tasks/list",
                    "prev": "/tasks/list"
                  }
                }
              }
            }
          }
        }
      }
    },
    // --------------------------------------------------
    "/tasks/delete/{deleteId}": {
    "delete": {
      "summary": "Delete a task by ID",
      "security": [
        {
          "BearerAuth": []
        }
      ],
      "tags": ["TASK"],
      "parameters": [
        {
          "name": "deleteId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string",
            "example": "22f70783-9891-4d64-a08c-c676e385616f"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Task deleted successfully",
          "content": {
            "application/json": {
              "examples": {
                "successResponse": {
                  "value": {
                    "status": "success",
                    "code": 200,
                    "message": "successfully deleted",
                    "links": {
                      "next": "/tasks/list",
                      "prev": "/tasks/list"
                    }
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Task not found",
          "content": {
            "application/json": {
              "examples": {
                "errorResponse": {
                  "value": {
                    "status": "error",
                    "code": 404,
                    "message": "task not found",
                    "links": {
                      "next": "/tasks/list",
                      "prev": "/tasks/list"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // --------------------------------------------------
  }
});

export default documentation;