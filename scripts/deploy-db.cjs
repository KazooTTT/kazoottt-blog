require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check for required environment variable
if (!process.env.CLOUDFLARE_API_TOKEN) {
    console.error('❌ CLOUDFLARE_API_TOKEN environment variable is required');
    process.exit(1);
}

// Get all SQL files from migrations directory
const migrationsDir = path.join(__dirname, '..', 'migrations');
const migrations = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Sort to ensure consistent order

console.log('Found migrations:', migrations);

// Execute each migration
migrations.forEach(migration => {
    const migrationPath = path.join('migrations', migration);
    console.log(`\nExecuting migration: ${migration}`);
    
    try {
        execSync(`wrangler d1 execute blog-pageviews --file=./${migrationPath} --remote`, {
            stdio: 'inherit'
        });
        console.log(`✅ Successfully executed ${migration}`);
    } catch (error) {
        console.error(`❌ Failed to execute ${migration}`);
        process.exit(1);
    }
});
