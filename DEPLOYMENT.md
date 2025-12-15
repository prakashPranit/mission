# Deployment Guide

This guide covers running the Digital Mandapa app locally, deploying to Vercel, and deploying to Amazon EC2 using Docker.

## 1. Local Development

### Prerequisites
- Node.js 18+
- npm
- Supabase Project (PostgreSQL database)

### Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd digital-mandapa
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Update `.env` with your Supabase credentials.
        - `DATABASE_URL`: Transaction pooler URL (port 6543)
        - `DIRECT_URL`: Session pooler URL (port 5432)

4.  **Initialize Database**:
    - Build dependencies, run migrations, and seed the database:
    ```bash
    npx prisma migrate dev --name init
    npm run db:seed
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 2. Deploy to Vercel (Recommended)

The easiest way to deploy your Next.js app.

1.  **Push to GitHub/GitLab/Bitbucket**.
2.  **Import Project in Vercel**:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Checks "Add New..." > "Project".
    - Select your repository.
3.  **Configure Project**:
    - **Framework Preset**: Next.js
    - **Build Command**: `npm run build` (This runs our custom chain: generate -> migrate -> seed -> build)
    - **Environment Variables**: Add the variables from your `.env` file (`DATABASE_URL`, `DIRECT_URL`).
4.  **Deploy**: Click "Deploy".

> **Note**: Our custom `build` script in `package.json` ensures migrations and seeds are applied automatically during deployment.

---

## 3. Deploy to Amazon EC2 with Docker

### Prerequisites
- AWS Account
- EC2 Instance (t2.micro or larger recommended) with Docker installed.

### Step A: Build Docker Image

You can build the image locally and push to a registry (like Docker Hub or ECR), or build it directly on the EC2 instance.

**Build Command**:
```bash
docker build \
  --build-arg DATABASE_URL="<YOUR_DATABASE_URL>" \
  --build-arg DIRECT_URL="<YOUR_DIRECT_URL>" \
  -t digital-mandapa .
```
*Note: We pass build args because `next build` requires connecting to the DB to generate the Prisma client (and potentially check valid usage).*

### Step B: Run Container

Run the container mapping port 3000.

```bash
docker run -d \
  -p 3000:3000 \
  --name digital-mandapa-app \
  -e DATABASE_URL="<YOUR_DATABASE_URL>" \
  -e DIRECT_URL="<YOUR_DIRECT_URL>" \
  digital-mandapa
```

### Step C: AWS EC2 Setup (Quick Start)

1.  **Launch Instance**: Amazon Linux 2 or Ubuntu.
2.  **Security Group**: Open port `22` (SSH) and `3000` (App).
3.  **SSH into Instance**:
    ```bash
    ssh -i KeyPair.pem user@ec2-ip-address
    ```
4.  **Install Docker** (Amazon Linux 2):
    ```bash
    sudo amazon-linux-extras install docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    # Log out and log back in
    ```
5.  **Get Code & Run**:
    - Clone repo or pull docker image.
    - Run the `docker build` and `docker run` commands above.

### Step D: Access

Visit `http://<EC2-Public-IP>:3000`.

---
