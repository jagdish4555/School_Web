@echo off
echo Starting School Web Server...
echo.

set MONGODB_URI=mongodb+srv://patelkaran20cs:HMaZ8lfvOxSBeMjN@cluster0.byjsctl.mongodb.net/SchoolDb
set JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
set CORS_ORIGIN=http://localhost:5173
set PORT=5000

echo Environment variables set:
echo MONGODB_URI: %MONGODB_URI%
echo JWT_SECRET: [HIDDEN]
echo CORS_ORIGIN: %CORS_ORIGIN%
echo PORT: %PORT%
echo.

echo Starting server...
node src/server.js

echo.
echo Server stopped. Press any key to restart...
pause
goto :eof
