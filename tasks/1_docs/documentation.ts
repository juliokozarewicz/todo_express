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
        "summary": "create a new category",
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
            "description": "Category created successfully",
            "content": {
              "application/json": {
                "examples": {
                  "successResponse": {
                    "value": {
                      "status": "success",
                      "code": 201,
                      "idCreated": "uuid",
                      "message": "category created successfully",
                      "links": {
                        "self": "/category/create",
                        "next": "/category/list-all"
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
        "summary": "list all categories",
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "tags": ["CATEGORY"],
      }
    },
    // --------------------------------------------------
  }
});

export default documentation;