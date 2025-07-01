pipeline {
  agent any

  environment {
    BACKEND_IMAGE = "ashraf1786/devquiz-backend"
    FRONTEND_IMAGE = "ashraf1786/devquiz-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/SyedAshrafGufran/Devquiz.git'
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        dir('backend') {
          script {
            docker.build("${env.BACKEND_IMAGE}")
          }
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        dir('frontend') {
          script {
            docker.build("${env.FRONTEND_IMAGE}")
          }
        }
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
              docker.image("${env.BACKEND_IMAGE}").push()
              docker.image("${env.FRONTEND_IMAGE}").push()
            }
          }
        }
      }
    }

        stage('Deploy to Kubernetes') {
            steps {
                withEnv(["KUBECONFIG=C:\\Users\\Ashraf\\.kube\\config"]) {
    bat 'kubectl apply -f k8s\\mongo-deployment.yaml'
    bat 'kubectl apply -f k8s\\mongo-service.yaml'
    bat 'kubectl apply -f k8s\\backend-deployment.yaml'
    bat 'kubectl apply -f k8s\\backend-service.yaml'
    bat 'kubectl apply -f k8s\\frontend-deployment.yaml'
    bat 'kubectl apply -f k8s\\frontend-service.yaml'
}

        }
    }
    // stage('Expose App URL'){
    //   steps {
    //     script {
    //       bat '"C:\\Users\\Ashraf\\tools\\minikube.exe" service frontend'
    //     }
    //   }
    // }
    
  }
}