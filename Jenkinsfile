pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        // ===================================================================================
        // FLOW 1: THE PR GATEKEEPER (Runs when a PR is opened against 'staging')
        // ===================================================================================
        stage('Run Unit Tests for Frontend') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                    args '-e HOME=/tmp'
                }
            }
            // when { 
            //     changeRequest(target: 'sandbox-staging') 
            // }
            steps {
                echo "2. Running Frontend Tests (Vitest + Happy DOM)..."
                sh '''
                    npm ci
                    npm install --no-save @vitest/coverage-v8
                    npx vitest run --coverage.enabled=true --coverage.reporter=lcov --coverage.reportsDirectory=./coverage
                '''
            }
        }

        // ===================================================================================
        // FLOW 2: SONARQUBE ANALYSIS
        // ===================================================================================  
        stage('SonarQube: Frontend') {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli:latest'
                    reuseNode true
                    args '-e HOME=/tmp'
                }
            }
            // when { 
            //     changeRequest(target: 'sandbox-staging')
            // }
            environment {
                SONAR_TOKEN = credentials('SONARQUBE_TOKEN')
                SONAR_HOST_URL = credentials('SONARQUBE_HOST_URL')
            }
            steps {
                sh '''
                    sonar-scanner \
                        -Dsonar.host.url=${SONAR_HOST_URL} \
                        -Dsonar.login=${SONAR_TOKEN} \
                        -Dsonar.projectKey="trim-frontend" \
                        -Dsonar.projectName="Trim Frontend" \
                        -Dsonar.sources=src \
                        -Dsonar.tests=src \
                        -Dsonar.test.inclusions="**/*.test.tsx,**/*.test.ts,**/*.spec.tsx,**/*.spec.ts" \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        -Dsonar.qualitygate.wait=true
                '''
            }
        }
    }
}