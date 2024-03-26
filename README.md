# kubernetes-mern-App

This is a simple todo app in k8s which consist of frontend , backend , db
For achiving in your local environment you should have understanding of docker and Basic objects
of k8s i.e Deployment , services , Configs etc

First we will create mongo (database) deployment from mongo-deployment.yaml file it is using official image of mongo.


# Connecting with EKS Cluster
KUBECONTEXT_NAME=eks-demo # defaults to cluster ARN
aws eks update-kubeconfig --kubeconfig $OPTIONAL_PATH --name $CLUSTER_NAME --alias $KUBECONTEXT_NAME



## Addingg user

we can add user in EKS with two different ways one is Access 

### New Way
https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html

### Old way 
https://antonputra.com/kubernetes/add-iam-user-and-iam-role-to-eks/

## Checking access

Before checking access we need to authenticate with new credentials for that user.
k auth can-i get [OBJECT NAME]
