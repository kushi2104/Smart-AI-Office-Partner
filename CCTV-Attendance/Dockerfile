# Base Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy current folder into Docker image
COPY . /app

# Install system dependencies for dlib
RUN apt-get update && \
    apt-get install -y \
    build-essential cmake libgtk-3-dev libboost-all-dev python3-dev libx11-dev libx264-dev libjpeg-dev libpng-dev && \
    rm -rf /var/lib/apt/lists/*

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
