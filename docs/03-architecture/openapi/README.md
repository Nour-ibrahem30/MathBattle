# OpenAPI Specification — MathBattle

This directory contains the REST API specifications for the MathBattle platform.

## Specifications
- **[openapi.yaml](file:///I:/MathBattle/docs/03-architecture/openapi/openapi.yaml):** Canonical API design contract specifying authentication, learning path actions, question bank management, AI job execution, matchmaking, and admin tools.

## Validation & Rendering

To view or validate this file, you can:
1. **Redoc / Swagger UI:** Copy the YAML text and paste it into [editor.swagger.io](https://editor.swagger.io) or load it in any local Swagger UI package.
2. **VS Code Extensions:** Use **OpenAPI Swagger Editor** or **Swagger Viewer** to render and test endpoints.
3. **CLI Validation:** Run `npx @redocly/cli lint openapi.yaml` inside this folder.
