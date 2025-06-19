<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>NLGFC | Website Re-Development</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6c5ce7;
            --secondary: #a29bfe;
            --dark: #2d3436;
            --light: #f5f6fa;
            --accent: #fd79a8;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--dark);
            color: var(--light);
            min-height: 100vh;
            overflow-x: hidden;
            background-image:
                radial-gradient(circle at 10% 20%, rgba(109, 89, 231, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(253, 121, 168, 0.1) 0%, transparent 20%);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .logo {
            font-size: clamp(1.8rem, 5vw, 2.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo span {
            color: var(--accent);
        }

        .logo svg {
            width: clamp(24px, 5vw, 32px);
            height: clamp(24px, 5vw, 32px);
        }

        h1 {
            font-size: clamp(2rem, 6vw, 3.5rem);
            margin-bottom: 1.5rem;
            background: linear-gradient(45deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            line-height: 1.2;
            padding: 0 0.5rem;
        }

        p {
            font-size: clamp(1rem, 3vw, 1.2rem);
            max-width: min(700px, 90vw);
            margin-bottom: clamp(2rem, 5vw, 3rem);
            opacity: 0.9;
            line-height: 1.6;
            padding: 0 0.5rem;
        }

        .countdown {
            display: flex;
            gap: clamp(0.8rem, 3vw, 1.5rem);
            margin-bottom: clamp(2rem, 5vw, 3rem);
            flex-wrap: wrap;
            justify-content: center;
        }

        .countdown-item {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: clamp(1rem, 3vw, 1.5rem);
            min-width: clamp(80px, 20vw, 120px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .countdown-number {
            font-size: clamp(2rem, 6vw, 3rem);
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }

        .countdown-label {
            font-size: clamp(0.7rem, 2.5vw, 0.9rem);
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.7;
        }

        .notify-form {
            display: flex;
            max-width: min(500px, 90vw);
            width: 100%;
            margin-bottom: 2rem;
            flex-direction: column;
            gap: 1rem;
        }

        @media (min-width: 768px) {
            .notify-form {
                flex-direction: row;
            }
        }

        .notify-input {
            flex: 1;
            padding: clamp(0.8rem, 3vw, 1rem);
            border: none;
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            color: white;
            font-size: clamp(0.9rem, 3vw, 1rem);
            outline: none;
            transition: all 0.3s ease;
        }

        .notify-input:focus {
            background: rgba(255, 255, 255, 0.2);
        }

        .notify-button {
            padding: clamp(0.8rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem);
            border: none;
            border-radius: 50px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: clamp(0.9rem, 3vw, 1rem);
        }

        .notify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(108, 92, 231, 0.4);
        }

        .social-links {
            display: flex;
            gap: clamp(1rem, 3vw, 1.5rem);
            margin-top: 2rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .social-link {
            width: clamp(40px, 10vw, 50px);
            height: clamp(40px, 10vw, 50px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: clamp(1rem, 3vw, 1.2rem);
            transition: all 0.3s ease;
        }

        .social-link:hover {
            background: var(--primary);
            transform: translateY(-3px);
        }

        .social-link svg {
            width: clamp(16px, 4vw, 20px);
            height: clamp(16px, 4vw, 20px);
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            NLGFC<span>2025</span>
        </div>

        <h1>Something Amazing Is Coming Soon</h1>
        <p>We're working hard to bring you an incredible experience. Our website will launch soon with exciting new features. Stay tuned!</p>

        <div class="countdown">
            <div class="countdown-item">
                <div class="countdown-number" id="days">00</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="hours">00</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="minutes">00</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="seconds">00</div>
                <div class="countdown-label">Seconds</div>
            </div>
        </div>

        <form class="notify-form">
            <input type="email" class="notify-input" placeholder="Enter your email for updates..." required>
            <button type="submit" class="notify-button">Notify Me</button>
        </form>

        <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            </a>
        </div>
    </div>

    <script>
        // Set the date we're counting down to (2 weeks from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 20);

        // Update the count down every 1 second
        const countdown = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result
            document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
            document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(countdown);
                document.getElementById("days").innerHTML = "00";
                document.getElementById("hours").innerHTML = "00";
                document.getElementById("minutes").innerHTML = "00";
                document.getElementById("seconds").innerHTML = "00";
            }
        }, 1000);

        // Form submission handler
        document.querySelector('.notify-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input');
            const email = emailInput.value;

            if (email && email.includes('@')) {
                alert(`Thank you! We'll notify you at ${email} when we launch.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    </script>
</body>

</html>