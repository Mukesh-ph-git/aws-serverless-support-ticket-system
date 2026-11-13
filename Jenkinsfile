
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checked out from GitHub'
            }
        }

        stage('Validate Frontend') {
            steps {
                sh '''
                    test -f frontend/index.html
                    test -f frontend/style.css
                    test -f frontend/script.js
                    echo "Frontend files validated successfully"
                '''
            }
        }

        stage('Validate Backend') {
            steps {
                sh '''
                    test -f backend/app.py
                    echo "Backend files validated successfully"
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Support Ticket application build completed'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                    aws s3 sync frontend/ s3://support-ticket-frontend-mukesh-2026/ --delete
                    echo "Frontend deployed successfully to S3"
                '''
            }
        }

        stage('Deploy Backend to EC2') {
            steps {
                sh '''
                    cp backend/app.py /opt/support-ticket-backend/app.py
                    sudo /usr/bin/systemctl restart support-ticket-backend
                    sleep 2
                    curl -fsS http://127.0.0.1:5000/health
                    echo "Backend deployed successfully to EC2"
                '''
            }
        }
    }
}
