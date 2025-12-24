"""
Simple test script for the RAG chatbot backend
"""
import requests
import json

def test_chatbot():
    """Test the chatbot backend with a simple request"""
    url = "http://localhost:8000/api/chat"
    
    # Test request
    test_data = {
        "message": "What is physical AI?",
        "selected_text": None
    }
    
    try:
        print("Testing chatbot backend...")
        print(f"Sending request: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"Response data: {json.dumps(response_data, indent=2)}")
            
            if response_data.get("response"):
                print("✅ SUCCESS: Got a response from the chatbot!")
                print(f"Response: {response_data['response']}")
            else:
                print("❌ FAILURE: Response is empty or invalid")
        else:
            print(f"❌ FAILURE: Request failed with status {response.status_code}")
            print(f"Error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ FAILURE: Cannot connect to the backend. Make sure the FastAPI server is running on http://localhost:8000")
    except requests.exceptions.Timeout:
        print("❌ FAILURE: Request timed out. The backend might be taking too long to respond.")
    except Exception as e:
        print(f"❌ FAILURE: An error occurred: {e}")

def test_health():
    """Test the health endpoint"""
    url = "http://localhost:8000/api/health"
    
    try:
        print("\nTesting health endpoint...")
        response = requests.get(url, timeout=10)
        
        print(f"Health check status code: {response.status_code}")
        if response.status_code == 200:
            health_data = response.json()
            print(f"Health check response: {json.dumps(health_data, indent=2)}")
        else:
            print(f"Health check failed with status: {response.status_code}")
    except Exception as e:
        print(f"Health check failed: {e}")

if __name__ == "__main__":
    test_health()
    test_chatbot()