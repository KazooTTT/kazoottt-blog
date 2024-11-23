-- Create pageview_logs table for detailed analytics
CREATE TABLE IF NOT EXISTS pageview_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug and created_at for efficient querying
CREATE INDEX IF NOT EXISTS idx_pageview_logs_slug ON pageview_logs(slug);
CREATE INDEX IF NOT EXISTS idx_pageview_logs_created_at ON pageview_logs(created_at);
