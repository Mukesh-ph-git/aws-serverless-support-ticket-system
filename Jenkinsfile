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

        stage('Build') {
            steps {
                echo 'Support Ticket application build completed'
            }
        }
    }
}
