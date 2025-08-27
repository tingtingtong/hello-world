<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="User registration form for DevOps Learning">
    <meta name="keywords" content="devops, learning, registration, user account">
    <meta name="author" content="DevOps Learning Platform">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="css/styles.css" as="style">
    <link rel="preload" href="js/validation.js" as="script">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    
    <title>DevOps Learning - User Registration</title>
    
    <!-- Critical CSS inline for above-the-fold content -->
    <style>
        /* Critical CSS for immediate rendering */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 500px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 1.5rem;
            font-size: 2rem;
            font-weight: 600;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #555;
        }
        
        input[type="text"],
        input[type="password"],
        input[type="email"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
            box-sizing: border-box;
        }
        
        input[type="text"]:focus,
        input[type="password"]:focus,
        input[type="email"]:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .registerbtn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 28px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            width: 100%;
            transition: transform 0.2s ease;
        }
        
        .registerbtn:hover {
            transform: translateY(-2px);
        }
        
        .signin {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e1e5e9;
        }
        
        .signin a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        
        .signin a:hover {
            text-decoration: underline;
        }
        
        .thankyou {
            text-align: center;
            margin-top: 2rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            color: #28a745;
        }
        
        /* Responsive design */
        @media (max-width: 600px) {
            .container {
                margin: 1rem;
                padding: 1.5rem;
            }
            
            h1 {
                font-size: 1.5rem;
            }
        }
    </style>
    
    <!-- Non-critical CSS loaded asynchronously -->
    <link rel="stylesheet" href="css/styles.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="css/styles.css"></noscript>
</head>
<body>
    <form action="action_page.php" method="post" id="registrationForm" novalidate>
        <div class="container">
            <h1>New User Registration for DevOps Learning</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>
            
            <div class="form-group">
                <label for="Name">Enter your Full Name</label>
                <input type="text" 
                       placeholder="Enter Full Name" 
                       name="Name" 
                       id="Name" 
                       required 
                       autocomplete="name"
                       pattern="[A-Za-z\s]{2,50}"
                       title="Please enter a valid name (2-50 characters, letters and spaces only)">
            </div>
            
            <div class="form-group">
                <label for="mobile">Enter Mobile Number</label>
                <input type="tel" 
                       placeholder="Enter mobile number" 
                       name="mobile" 
                       id="mobile" 
                       required 
                       autocomplete="tel"
                       pattern="[0-9]{10,15}"
                       title="Please enter a valid mobile number (10-15 digits)">
            </div>

            <div class="form-group">
                <label for="email">Enter Email</label>
                <input type="email" 
                       placeholder="Enter Email" 
                       name="email" 
                       id="email" 
                       required 
                       autocomplete="email"
                       title="Please enter a valid email address">
            </div>

            <div class="form-group">
                <label for="psw">Password</label>
                <input type="password" 
                       placeholder="Enter Password" 
                       name="psw" 
                       id="psw" 
                       required 
                       autocomplete="new-password"
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                       title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character">
            </div>

            <div class="form-group">
                <label for="psw-repeat">Repeat Password</label>
                <input type="password" 
                       placeholder="Repeat Password" 
                       name="psw-repeat" 
                       id="psw-repeat" 
                       required 
                       autocomplete="new-password"
                       title="Please repeat your password">
            </div>
            
            <hr>
            <br>
            <p>By creating an account you agree to our <a href="#" target="_blank" rel="noopener">Terms & Privacy</a>.</p>
            <button type="submit" class="registerbtn">Register</button>
        </div>
        
        <div class="container signin">
            <p>Already have an account? <a href="#" target="_blank" rel="noopener">Sign in</a>.</p>
        </div>

        <div class="thankyou">
            <h2>Thank you, Happy Learning!</h2>
        </div>
    </form>

    <!-- JavaScript loaded asynchronously for better performance -->
    <script src="js/validation.js" defer></script>
    
    <!-- Performance monitoring -->
    <script>
        // Performance monitoring
        window.addEventListener('load', function() {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('DOM content loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            }
        });
        
        // Form validation enhancement
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            const password = document.getElementById('psw').value;
            const confirmPassword = document.getElementById('psw-repeat').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Passwords do not match!');
                return false;
            }
            
            // Additional validation can be added here
            return true;
        });
    </script>
</body>
</html>
