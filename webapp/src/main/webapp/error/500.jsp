<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Error - DevOps Learning</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .error-container {
            text-align: center;
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
        }
        
        .error-code {
            font-size: 6rem;
            font-weight: bold;
            color: #dc3545;
            margin: 0;
            line-height: 1;
        }
        
        .error-message {
            font-size: 1.5rem;
            color: #333;
            margin: 1rem 0;
        }
        
        .error-description {
            color: #666;
            margin-bottom: 2rem;
        }
        
        .home-link {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: transform 0.2s ease;
        }
        
        .home-link:hover {
            transform: translateY(-2px);
        }
        
        .retry-link {
            display: inline-block;
            background: #dc3545;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            margin-left: 1rem;
            transition: transform 0.2s ease;
        }
        
        .retry-link:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1 class="error-code">500</h1>
        <h2 class="error-message">Server Error</h2>
        <p class="error-description">
            Something went wrong on our end. Please try again later.
        </p>
        <div>
            <a href="/" class="home-link">Go Home</a>
            <a href="javascript:location.reload()" class="retry-link">Try Again</a>
        </div>
    </div>
</body>
</html>