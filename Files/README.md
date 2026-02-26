# AWS + Kubernetes DevOps Platform 2025

A production-ready 5-service containerized application deployed on AWS EKS with full CI/CD automation, Prometheus/Grafana monitoring, and Terraform-provisioned infrastructure.

## Architecture

```
                        ┌─────────────────────────────────────────────┐
                        │              AWS EKS Cluster                │
                        │                                             │
Internet ─► ALB ─► API Gateway ─►  User Service  ─► PostgreSQL (RDS) │
                             ├──► Product Service ─► PostgreSQL (RDS) │
                             ├──► Order Service   ─► PostgreSQL (RDS) │
                             └──► Notification Service                │
                        │                                             │
                        │  Monitoring: Prometheus + Grafana           │
                        └─────────────────────────────────────────────┘
                             ↑
               GitHub Actions CI/CD Pipeline
```

## Services

| Service               | Port  | Description                          |
|-----------------------|-------|--------------------------------------|
| api-gateway           | 8080  | Spring Cloud Gateway - route all APIs |
| user-service          | 8081  | User auth, JWT, registration          |
| product-service       | 8082  | Product catalog CRUD                  |
| order-service         | 8083  | Order management, status tracking     |
| notification-service  | 8084  | Email/SMS/Push notifications          |
| frontend              | 3000  | React dashboard                       |

## Quick Start (Local with Docker Compose)

```bash
# 1. Clone the project
git clone <your-repo>
cd aws-k8s-devops-2025

# 2. Copy environment file
cp .env.example .env
# Edit .env with your values

# 3. Start all services
docker-compose up --build -d

# 4. Access services
# Frontend:   http://localhost:3000
# API Gateway: http://localhost:8080
# Prometheus: http://localhost:9090
# Grafana:    http://localhost:3001  (admin/admin123)
```

## AWS Deployment

### Prerequisites
- AWS CLI configured
- Terraform >= 1.6
- kubectl
- Docker

### Step 1: Provision Infrastructure with Terraform

```bash
cd terraform

# Initialize Terraform
terraform init

# Plan the deployment
terraform plan -out=tfplan

# Apply infrastructure
terraform apply tfplan
```

This provisions:
- VPC with public/private subnets across 3 AZs
- EKS cluster (Kubernetes 1.28) with managed node groups
- EC2 bastion host
- Security groups
- NAT Gateways

### Step 2: Configure kubectl

```bash
aws eks update-kubeconfig --region us-east-1 --name devops-platform-cluster
kubectl get nodes
```

### Step 3: Create ECR Repositories

```bash
for service in api-gateway user-service product-service order-service notification-service frontend; do
  aws ecr create-repository --repository-name $service --region us-east-1
done
```

### Step 4: Build & Push Docker Images

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY

# Build and push each service
for service in api-gateway user-service product-service order-service notification-service; do
  docker build -t $ECR_REGISTRY/$service:latest services/$service/
  docker push $ECR_REGISTRY/$service:latest
done

# Frontend
docker build -t $ECR_REGISTRY/frontend:latest frontend/
docker push $ECR_REGISTRY/frontend:latest
```

### Step 5: Deploy to Kubernetes

```bash
# Create namespace
kubectl apply -f k8s/namespaces/

# Create secrets (update values first!)
kubectl apply -f k8s/secrets-template.yaml

# Deploy all services
kubectl apply -f k8s/configmaps/
kubectl apply -f k8s/deployments/
kubectl apply -f k8s/services/
kubectl apply -f k8s/ingress/
kubectl apply -f k8s/hpa/

# Check status
kubectl get pods -n devops-platform
kubectl get services -n devops-platform
```

### Step 6: Deploy Monitoring Stack

```bash
kubectl create namespace monitoring

# Prometheus
kubectl apply -f monitoring/prometheus/k8s-deployment.yaml
kubectl create configmap prometheus-config \
  --from-file=monitoring/prometheus/prometheus.yml \
  --from-file=monitoring/prometheus/alert_rules.yml \
  -n monitoring

# Grafana
kubectl apply -f monitoring/grafana/datasource.yaml
kubectl apply -f monitoring/grafana/k8s-deployment.yaml
```

## CI/CD Pipeline (GitHub Actions)

The pipeline in `.github/workflows/ci-cd.yml` automates:

1. **Test & Build** — Maven builds + unit tests for all 5 services
2. **Docker Build & Push** — Images pushed to ECR with git SHA tags
3. **EKS Deploy** — Rolling deployment to Kubernetes
4. **Health Check** — Waits for all rollouts to complete

### Required GitHub Secrets

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_ACCOUNT_ID
```

## Monitoring (10+ Metrics)

| Metric                       | Source          |
|------------------------------|-----------------|
| JVM Heap Memory              | Spring Actuator |
| CPU Usage per Service        | Spring Actuator |
| HTTP Request Rate            | Spring Actuator |
| HTTP Error Rate (5xx)        | Spring Actuator |
| Response Time (p95)          | Spring Actuator |
| Active DB Connections        | HikariCP        |
| Pod Count                    | kube-state      |
| Node CPU/Memory              | node-exporter   |
| Network I/O                  | node-exporter   |
| Kubernetes Pod Restarts      | kube-state      |

Access Grafana at: `http://<grafana-service>:3000`  
Default login: `admin / admin123`

## Scaling Services Independently

```bash
# Scale a specific service
kubectl scale deployment user-service --replicas=5 -n devops-platform

# HPA will auto-scale based on CPU > 70%
kubectl get hpa -n devops-platform
```

## Project Structure

```
aws-k8s-devops-2025/
├── services/
│   ├── api-gateway/         # Spring Cloud Gateway
│   ├── user-service/        # User management + JWT auth
│   ├── product-service/     # Product catalog
│   ├── order-service/       # Order management
│   └── notification-service/# Email/SMS notifications
├── frontend/                # React dashboard
├── k8s/
│   ├── namespaces/          # Kubernetes namespaces
│   ├── deployments/         # Service deployments
│   ├── services/            # ClusterIP services
│   ├── ingress/             # NGINX ingress
│   ├── hpa/                 # Horizontal Pod Autoscaler
│   └── configmaps/          # App configuration
├── terraform/
│   ├── main.tf              # Root module
│   ├── variables.tf         # Input variables
│   ├── outputs.tf           # Output values
│   └── modules/
│       ├── vpc/             # VPC, subnets, gateways
│       ├── eks/             # EKS cluster + node groups
│       ├── ec2/             # Bastion host
│       └── security-groups/ # SGs
├── monitoring/
│   ├── prometheus/          # Prometheus config + alerts
│   └── grafana/             # Grafana datasources + dashboards
├── .github/workflows/       # GitHub Actions CI/CD
├── docker-compose.yml       # Local development
└── .env.example             # Environment variables template
```

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.2, Spring Cloud 2023
- **Frontend**: React 18, React Router, React Query
- **Database**: PostgreSQL 15
- **Container**: Docker, Kubernetes 1.28
- **Cloud**: AWS EKS, EC2, ECR, VPC
- **IaC**: Terraform 1.6
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Service Discovery**: Eureka Server
