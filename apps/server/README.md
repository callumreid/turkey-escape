# VGF Example Server

This is a very simple game, designed to be run in the browser, so that we can write automated functional tests for VGF.

## Setup

`$ pnpm install`

## Running Locally

1. `$ pnpm dev`
2. Start the [VGF Example Client](../client/README.md)

## Running in a Cluster

### Overview

This application can also be run in a Kubernetes cluster. For local development and testing, we can use [Minikube](https://minikube.sigs.k8s.io/), which provides a single-node Kubernetes cluster that runs on your local machine.

The following Kubernetes resources will be deployed:

- **Deployment**: Manages the game server pods, ensuring the desired number of replicas are running
- **Service**: Exposes the game server internally within the cluster on port 3000
- **DatadogAgent** (Optional): Configures Datadog monitoring for logs, metrics, and APM traces

### Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/docs/start/) installed
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- [Docker](https://docs.docker.com/get-docker/) installed

### Setup Steps

1. Start Minikube:

```bash
minikube start
```

2. Ensure NPM_TOKEN environment variable is set:

```bash
export NPM_TOKEN=yourtoken
```

3. Build the Docker image:

```bash
eval $(minikube docker-env) && docker build -f apps/server/Dockerfile -t turkey-escape:latest . --secret id=npm_token,env=NPM_TOKEN
```

4. (Optional) Create a Kubernetes secret for [Datadog API key](https://docs.datadoghq.com/account_management/api-app-keys/):

```bash
kubectl create secret generic datadog-secret \
--from-literal=api-key=<YOUR_DATADOG_API_KEY>
```

5. Start up minikube and k8s:

```bash
make dev
```

6. Verify the deployment:

```bash
kubectl get pods
kubectl get services
```

You could also use a tool like [Lens](https://k8slens.dev/) to view your active pods, services, and much more.

### Monitoring

- The Datadog agent is configured to collect logs, metrics, and APM traces
- View your data in the [Datadog US5 site](https://us5.datadoghq.com)
- The cluster is tagged with `env:dev` for easy filtering
