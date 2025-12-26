"""
Test script to verify Urdu language support in chatbot
"""
import requests
import json

# API endpoint
url = "http://localhost:8000/api/chat"

# Test 1: English request
print("=" * 60)
print("TEST 1: English Request")
print("=" * 60)

english_request = {
    "message": "What is Physical AI?",
    "language": "en"
}

try:
    response = requests.post(url, json=english_request)
    result = response.json()
    print(f"Status: {response.status_code}")
    print(f"Response: {result['response'][:200]}...")
    print()
except Exception as e:
    print(f"Error: {e}")
    print()

# Test 2: Urdu request
print("=" * 60)
print("TEST 2: Urdu Request")
print("=" * 60)

urdu_request = {
    "message": "Physical AI کیا ہے؟",
    "language": "ur"
}

try:
    response = requests.post(url, json=urdu_request)
    result = response.json()
    print(f"Status: {response.status_code}")
    print(f"Response: {result['response'][:200]}...")
    print()

    # Check if response contains Urdu characters
    urdu_chars = sum(1 for c in result['response'] if ord(c) > 1536 and ord(c) < 1791)
    total_chars = len(result['response'])
    urdu_percentage = (urdu_chars / total_chars * 100) if total_chars > 0 else 0

    print(f"Urdu character percentage: {urdu_percentage:.1f}%")

    if urdu_percentage > 50:
        print("✅ Response is in URDU!")
    else:
        print("❌ Response is NOT in Urdu!")

except Exception as e:
    print(f"Error: {e}")
    print()

print("=" * 60)
print("Testing complete! Check backend logs for [DEBUG] messages")
print("=" * 60)

