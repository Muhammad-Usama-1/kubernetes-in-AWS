# kubernetes-in-AWS
This is a simple todo app in k8s which consist of frontend , backend , db
For achiving in your local environment you should have understanding of docker and Basic objects
of k8s i.e Deployment , services , Configs etc

## Basic of K8s 
There are two major  components in k8s
###Control plane 
  1. Kube api server —> expose apis
  2. Etcd -> key values pairs, 
  3. Kube-schedular—> assigning pods ,
  4. Kube-controller—> controller process , (match running state with desire state )
 
### Data Plane
Kubelet for communication
Kube-proxy for network communication
Container Runtime  (Docker , Podman ,etc )


In AWS Data Plane (Worker node ) can be EC2 or [AWS Fargate](https://aws.amazon.com/fargate/) , 

In simple words think of Fargate as a Serverless but only for containers .



## Launch your instance using terraform

update your variables.tf with the following 
```
variable "vpc_cidr" {
  description = "Vpc CIDR"
  type        = string
}

variable "public_subnets" {
  description = "public_subnets CIDR"
  type        = list(string)
}

variable "private_subnets" {
  description = "private_subnets CIDR"
  type        = list(string)
}

variable "instance_types" {
  description = "Node Instances"
  type        = list(string)
}
```
your main.tf file    
```
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "eks_cluster_vpc"
  cidr = var.vpc_cidr

  azs             = data.aws_availability_zones.azs.names
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets


  enable_dns_hostnames = true
  enable_nat_gateway   = true
  single_nat_gateway   = true

  tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
  }
  public_subnet_tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    "kubernetes.io/role/elb"               = 1

  }
  private_subnet_tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    "kubernetes.io/role/private_elb"       = 1

  }
}

module "eks" {
  source                         = "terraform-aws-modules/eks/aws"
  cluster_name                   = "my-eks-cluster"
  cluster_version                = "1.29"
  cluster_endpoint_public_access = true
  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets

  eks_managed_node_groups = {
    nodes = {
      min_size       = 1
      max_size       = 3
      desired_size   = 1
      instance_types = var.instance_types
    }
  }
  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}
```


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
we have multiple options of setting up Ingress in EKS , 

1.self managed Nginx Ingress controller
2. AWS Managed aws-load-balancer-controller 

### slef Managed

https://kubernetes.github.io/ingress-nginx/deploy/#aws

### aws-load-balancer-controller
```
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
-n kube-system \
--set clusterName=my-eks \
--set serviceAccount.create=false \
--set serviceAccount.name=aws-load-balancer-controller \
```
Note: By default AWS load balancer controller --> create dedicated ALB for each ingress resources,we can combine multiple ingress using class  and use a single Application Load Balancer

Read more at https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.7/deploy/installation/



### Checking logs 

```
kubectl logs -f -n kube-system -l app.kubernetes.io/instance=aws-load-balancer-controller
```



##  HELM Basic commands

It is a package manager for k8s Manifests

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

