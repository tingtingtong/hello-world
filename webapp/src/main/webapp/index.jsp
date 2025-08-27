<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="DevOps Learning Registration">
    <title>DevOps Learning Registration</title>
    <link rel="stylesheet" href="css/style.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="form-wrapper">
            <h1>Join DevOps Learning</h1>
            <p class="subtitle">Create your account to start your learning journey</p>
            
            <form action="register" method="post" id="registrationForm">
                <div class="form-group">
                    <label for="Name">Full Name</label>
                    <input type="text" placeholder="Enter your full name" name="Name" id="Name" required 
                           pattern="[a-zA-Z\s]{2,50}" title="Name should contain only letters and spaces">
                </div>
                
                <div class="form-group">
                    <label for="mobile">Mobile Number</label>
                    <input type="tel" placeholder="Enter mobile number" name="mobile" id="mobile" required 
                           pattern="[0-9]{10,15}" title="Please enter a valid mobile number">
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" placeholder="Enter email address" name="email" id="email" required>
                </div>

                <div class="form-group">
                    <label for="psw">Password</label>
                    <input type="password" placeholder="Enter password" name="psw" id="psw" required 
                           minlength="8" title="Password must be at least 8 characters long">
                </div>

                <div class="form-group">
                    <label for="psw-repeat">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" name="psw-repeat" id="psw-repeat" required>
                </div>

                <div class="form-group checkbox-group">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">I agree to the <a href="#" onclick="showTerms()">Terms & Privacy Policy</a></label>
                </div>

                <button type="submit" class="btn-primary">Create Account</button>
            </form>
            
            <div class="signin-link">
                <p>Already have an account? <a href="#" onclick="showSignIn()">Sign in here</a></p>
            </div>
        </div>
        
        <div class="success-message">
            <h2>Thank you for joining us!</h2>
            <p>Welcome to your DevOps learning journey</p>
        </div>
    </div>

    <script src="js/app.min.js" defer></script>
</body>
</html>
