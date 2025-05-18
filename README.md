# Devquiz

To start kubernetes:
----> in cmd -----> "minikube start"


connecting mongo db to backend:
 run command in terminal inside k8s folder---> "kubectl logs -l app=backend"



for port forwading the request to port 5000:
run "kubectl port-forward service/backend 5000:5000"


to start the frontend

run-----> "minikube service frontend"



make sure jenkins, docker desktop(docker hub services are running)

webhooks triggers the jenkins to build when any git push happens