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
          "description": "Create anew category",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "categoryName": {
                    "type": "string",
                    "required": true,
                    "example": "finance"
                  },
                }
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
                      "example": "Successfully obtained data"
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
  }
});

export default documentation;