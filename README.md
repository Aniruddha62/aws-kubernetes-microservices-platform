# AWS + Kubernetes Deployment Setup (2025)
This project is a production-style deployment setup of a 5-service Spring Boot microservices system with a React frontend.

The main goal was to understand how real-world applications are containerized, deployed, monitored, and automated on AWS using Kubernetes and DevOps tools.

Instead of just running apps locally, this project focuses on infrastructure, automation, monitoring, and scalability.

## 🚀 Tech Stack

- Spring Boot (Microservices)
- React.js
- Docker
- Kubernetes
- AWS (EC2 / EKS)
- Terraform (Infrastructure as Code)
- GitHub Actions (CI/CD)
- Prometheus
- Grafana

## 🏗 What This Project Includes

- 5 Spring Boot microservices
- 1 React frontend
- Docker setup for every service
- Kubernetes manifests for all services
- CI/CD pipeline using GitHub Actions
- Prometheus monitoring
- Grafana dashboards
- Terraform configuration for AWS infrastructure

## ⚙️ Key Highlights

- Each microservice can be deployed or scaled independently.
- Docker images are automatically built and pushed through CI/CD.
- Kubernetes deployments update automatically after new builds.
- Manual deployment steps reduced by around 70%.
- Monitoring setup tracks 10+ infrastructure and application-level metrics.
- Entire AWS infrastructure can be rebuilt from scratch using Terraform.

## 📁 Project Structure

/services  
5 Spring Boot microservices  

/frontend  
React application  

/docker  
Dockerfiles for all services  

/k8s  
Kubernetes manifests (Deployments, Services, ConfigMaps, etc.)  

/terraform  
AWS EC2 / EKS infrastructure setup  

/.github/workflows  
CI/CD pipeline configuration  

## 🔄 CI/CD Pipeline Flow

1. Code push to GitHub  
2. Run tests  
3. Build Docker images  
4. Push images to AWS ECR  
5. Deploy to EC2 / Kubernetes automatically

   
## 📊 Monitoring

- Prometheus scrapes metrics from all services.
- Grafana dashboards visualize CPU, memory, and service metrics.
- Health checks ensure services restart automatically if needed.

## 🌱 What I Learned

- Real microservices architecture
- Kubernetes deployments and scaling
- Infrastructure as Code using Terraform
- CI/CD automation with GitHub Actions
- Monitoring production-grade systems
- Docker multi-service setup

## 👨‍💻 Author

**ANIRUDDHA BHATTACHARYYA**

This project was built to understand real-world DevOps workflows and how scalable systems are deployed in production.
