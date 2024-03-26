# kubernetes-in-AWS


This is a simple todo app in k8s which consist of frontend , backend , db
For achiving in your local environment you should have understanding of docker and Basic objects
of k8s i.e Deployment , services , Configs etc

First we will create mongo (database) deployment from mongo-deployment.yaml file it is using official image of mongo.


# Connecting with EKS Cluster
```
KUBECONTEXT_NAME=eks-demo # defaults to cluster ARN
aws eks update-kubeconfig --kubeconfig $OPTIONAL_PATH --name $CLUSTER_NAME --alias $KUBECONTEXT_NAME
```


## Addingg user

we can add user in EKS with two different ways one is Access 

### New Way
https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html

### Old way 
https://antonputra.com/kubernetes/add-iam-user-and-iam-role-to-eks/

## Checking access

Before checking access we need to authenticate with new credentials for that user.
k auth can-i get [OBJECT NAME]


## Ingress 
we have multiple options of setting up Ingress in EKS , one is self managed Nginx Ingress controller while other is  aws-load-balancer-controller which can be install with the following command

```

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
-n kube-system \
--set clusterName=my-eks \
--set serviceAccount.create=false \
--set serviceAccount.name=aws-load-balancer-controller \
```
Note: By default AWS load balancer controller --> create dedicated ALB for each ingress resources ,we can combine multiple ingress and use single ALB

Read more at https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.7/deploy/installation/



### Checking logs 

```
kubectl logs -f -n kube-system -l app.kubernetes.io/instance=aws-load-balancer-controller
```



##  HELM Basic commands
```
helm install my-app ./my-chart
helm uninstall my-app
```


```
helm create helloworld

helm install <FIRST_ARGUMENT_RELEASE_NAME> <SECOND_ARGUMENT_CHART_NAME>

helm install myhelloworld helloworld

helm list -a

helm uninstall releasename
```
## How to update

```
helm upgrade relasname directory
helm list -a , (it will show the revision)
```
## rooblack to previous
```
helm rollback relasname releasenumber 1
```
## validate
```
#validate with k8s api server
helm install myworld --dry-run --debug

#validate with the yml file
helm template
```

