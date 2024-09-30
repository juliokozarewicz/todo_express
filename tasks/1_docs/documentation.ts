const packageJson = require('../package.json');

const documentation = JSON.stringify({
  "openapi": "3.0.0",
  "info": {
    "title": packageJson.name.toUpperCase(), 
    "version": packageJson.version, 
    "description": packageJson.description
  },
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
  "paths": {
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
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "categoryName": {
                    "type": "string",
                    "example": "finance"
                  }
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
    }
  }
});

export default documentation;