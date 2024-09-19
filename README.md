# AllSpark Demo

## Requirements

Before you begin, ensure you have met the following requirements:

* You have installed [Node.js and npm](https://nodejs.org/en/download/) (Node Package Manager). 
  - To check if you have Node.js installed, run this command in your terminal:
    ```
    node --version
    ```
  - To confirm that you have npm installed you can run this command in your terminal:
    ```
    npm --version
    ```
* You have installed [Python](https://www.python.org/downloads/) (version 3.7 or later).
* You have a Windows/Linux/Mac machine with a command line interface.

## How to Run Locally

Follow these steps to get AllSpark Demo running on your local machine:

1. Clone the frontend repository:
   ```
   git clone https://github.com/sjnaik02/allspark-demo.git
   cd allspark-demo
   ```

2. Clone the server repository:
   ```
   git clone https://github.com/sjnaik02/allspark-demo-server.git
   ```

3. Set up the frontend:
   ```
   cd allspark-demo
   npm install
   ```

4. Set up the server:
   ```
   cd ../allspark-demo-server
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   mkdir uploads
   ```

5. Run the server:
   ```
   python app.py
   ```
   The server should now be running on `http://localhost:8080`.

6. In a new terminal window, run the frontend:
   ```
   cd path/to/allspark-demo
   npm run dev
   ```
   The frontend should now be accessible at `http://localhost:3000`.

⚠️ **Warning**: This setup is intended for local development only. The live instance on vercel will not work with the server. 
