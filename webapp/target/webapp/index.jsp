<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="User Registration Form for DevOps Learning">
    <meta name="theme-color" content="#667eea">
    <title>User Registration - DevOps Learning</title>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/css/styles.css" as="style">
    <link rel="preload" href="/js/app.js" as="script">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/css/styles.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- PWA manifest -->
    <link rel="manifest" href="/manifest.json">
</head>
<body>
    <form id="registrationForm" novalidate>
        <div class="container">
            <h1>New User Registration for DevOps Learning</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>
             
            <label for="name"><b>Enter your Full Name</b></label>
            <input type="text" placeholder="Enter Full Name" name="name" id="name" required>
            
            <label for="mobile"><b>Enter Mobile Number</b></label>
            <input type="tel" placeholder="Enter mobile number" name="mobile" id="mobile" required>
            
            <label for="email"><b>Enter Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" id="email" required>
            
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" id="psw" required>
            
            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
            
            <hr>
            
            <p>By creating an account you agree to our <a href="#" target="_blank" rel="noopener">Terms & Privacy</a>.</p>
            <button type="submit" class="registerbtn">Register</button>
        </div>
        
        <div class="container signin">
            <p>Already have an account? <a href="#" target="_blank" rel="noopener">Sign in</a>.</p>
        </div>
    </form>

    <!-- JavaScript -->
    <script src="/js/app.js"></script>
    
    <!-- Performance monitoring -->
    <script>
        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
                }, 0);
            });
        }
    </script>
</body>
</html>
