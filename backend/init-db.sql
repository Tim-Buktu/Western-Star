-- Initialize database with proper permissions
-- This script runs automatically when the PostgreSQL container starts

-- Grant CREATEDB permission to the westernstar user
ALTER USER westernstar CREATEDB;

-- Ensure the user has all necessary permissions
GRANT ALL PRIVILEGES ON DATABASE westernstar_db TO westernstar;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES FOR USER westernstar IN SCHEMA public GRANT ALL ON TABLES TO westernstar;
ALTER DEFAULT PRIVILEGES FOR USER westernstar IN SCHEMA public GRANT ALL ON SEQUENCES TO westernstar;
ALTER DEFAULT PRIVILEGES FOR USER westernstar IN SCHEMA public GRANT ALL ON FUNCTIONS TO westernstar;
