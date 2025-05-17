pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yaml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Services') {
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE build'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE run --rm backend npm test || true'
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE run --rm frontend npm test || true'
            }
        }

        stage('Deploy Services') {
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE up -d'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
