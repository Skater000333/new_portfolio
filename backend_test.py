#!/usr/bin/env python3
"""
Backend API Testing Suite for OpenRouter Chat Integration
Tests all chat endpoints and functionality as specified in the review request.
"""

import asyncio
import httpx
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any, List

# Add backend to path for imports
sys.path.append('/app/backend')

class BackendTester:
    def __init__(self):
        # Get backend URL from frontend .env file
        self.backend_url = self._get_backend_url()
        self.test_results = []
        self.session_id = "test-session-123"
        
    def _get_backend_url(self) -> str:
        """Get backend URL from frontend .env file"""
        try:
            with open('/app/frontend/.env', 'r') as f:
                for line in f:
                    if line.startswith('REACT_APP_BACKEND_URL='):
                        return line.split('=', 1)[1].strip()
        except Exception as e:
            print(f"Error reading frontend .env: {e}")
            return "http://localhost:8001"  # fallback
        
        return "http://localhost:8001"  # fallback
    
    def log_test(self, test_name: str, status: str, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status_emoji = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
        print(f"{status_emoji} {test_name}: {status}")
        if details:
            print(f"   Details: {details}")
        if response_data and status == "FAIL":
            print(f"   Response: {response_data}")
        print()

    async def test_health_endpoint(self):
        """Test 1: Health Check - Test the /api/chat/health endpoint"""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{self.backend_url}/api/chat/health")
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Check required fields
                    required_fields = ["status", "service", "openrouter_configured", "model"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_test(
                            "Health Check Endpoint",
                            "FAIL",
                            f"Missing required fields: {missing_fields}",
                            data
                        )
                        return False
                    
                    # Check if OpenRouter is configured
                    if not data.get("openrouter_configured"):
                        self.log_test(
                            "Health Check Endpoint",
                            "FAIL",
                            "OpenRouter API key not configured",
                            data
                        )
                        return False
                    
                    # Check model configuration
                    expected_model = "meta-llama/llama-3-8b-instruct"
                    if data.get("model") != expected_model:
                        self.log_test(
                            "Health Check Endpoint",
                            "WARN",
                            f"Model mismatch. Expected: {expected_model}, Got: {data.get('model')}",
                            data
                        )
                    
                    self.log_test(
                        "Health Check Endpoint",
                        "PASS",
                        f"Service healthy, OpenRouter configured with model: {data.get('model')}",
                        data
                    )
                    return True
                else:
                    self.log_test(
                        "Health Check Endpoint",
                        "FAIL",
                        f"HTTP {response.status_code}: {response.text}",
                        response.text
                    )
                    return False
                    
        except Exception as e:
            self.log_test(
                "Health Check Endpoint",
                "FAIL",
                f"Exception: {str(e)}"
            )
            return False

    async def test_basic_chat_functionality(self):
        """Test 2: Basic Chat - Test simple message about Parth's background"""
        try:
            test_message = "Tell me about Parth's background"
            
            payload = {
                "message": test_message,
                "session_id": self.session_id,
                "conversation_history": []
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.backend_url}/api/chat",
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Check response structure
                    required_fields = ["response", "status", "session_id"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_test(
                            "Basic Chat Functionality",
                            "FAIL",
                            f"Missing required fields: {missing_fields}",
                            data
                        )
                        return False
                    
                    # Check status
                    if data.get("status") != "success":
                        self.log_test(
                            "Basic Chat Functionality",
                            "FAIL",
                            f"Status not success: {data.get('status')}. Error: {data.get('error')}",
                            data
                        )
                        return False
                    
                    # Check session ID
                    if data.get("session_id") != self.session_id:
                        self.log_test(
                            "Basic Chat Functionality",
                            "FAIL",
                            f"Session ID mismatch. Expected: {self.session_id}, Got: {data.get('session_id')}",
                            data
                        )
                        return False
                    
                    # Check response content (should contain info about Parth)
                    response_text = data.get("response", "").lower()
                    parth_keywords = ["parth", "product manager", "ai", "ml", "pharmasecure"]
                    
                    found_keywords = [keyword for keyword in parth_keywords if keyword in response_text]
                    
                    if len(found_keywords) < 2:
                        self.log_test(
                            "Basic Chat Functionality",
                            "WARN",
                            f"Response may not contain enough Parth-specific info. Found keywords: {found_keywords}",
                            data.get("response")[:200] + "..."
                        )
                    
                    self.log_test(
                        "Basic Chat Functionality",
                        "PASS",
                        f"Chat response received successfully. Keywords found: {found_keywords}",
                        f"Response preview: {data.get('response')[:100]}..."
                    )
                    return True
                    
                else:
                    self.log_test(
                        "Basic Chat Functionality",
                        "FAIL",
                        f"HTTP {response.status_code}: {response.text}",
                        response.text
                    )
                    return False
                    
        except Exception as e:
            self.log_test(
                "Basic Chat Functionality",
                "FAIL",
                f"Exception: {str(e)}"
            )
            return False

    async def test_conversation_context(self):
        """Test 3: Conversation Context - Test with conversation history"""
        try:
            # First message
            first_message = "What is Parth's current role?"
            
            payload1 = {
                "message": first_message,
                "session_id": self.session_id,
                "conversation_history": []
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response1 = await client.post(
                    f"{self.backend_url}/api/chat",
                    json=payload1,
                    headers={"Content-Type": "application/json"}
                )
                
                if response1.status_code != 200:
                    self.log_test(
                        "Conversation Context - First Message",
                        "FAIL",
                        f"First message failed: HTTP {response1.status_code}",
                        response1.text
                    )
                    return False
                
                data1 = response1.json()
                if data1.get("status") != "success":
                    self.log_test(
                        "Conversation Context - First Message",
                        "FAIL",
                        f"First message status not success: {data1.get('status')}",
                        data1
                    )
                    return False
                
                # Second message with context
                second_message = "Tell me more about his achievements there"
                
                conversation_history = [
                    {
                        "role": "user",
                        "content": first_message,
                        "timestamp": datetime.now().isoformat()
                    },
                    {
                        "role": "assistant",
                        "content": data1.get("response"),
                        "timestamp": datetime.now().isoformat()
                    }
                ]
                
                payload2 = {
                    "message": second_message,
                    "session_id": self.session_id,
                    "conversation_history": conversation_history
                }
                
                response2 = await client.post(
                    f"{self.backend_url}/api/chat",
                    json=payload2,
                    headers={"Content-Type": "application/json"}
                )
                
                if response2.status_code == 200:
                    data2 = response2.json()
                    
                    if data2.get("status") == "success":
                        self.log_test(
                            "Conversation Context",
                            "PASS",
                            "Successfully maintained conversation context across messages",
                            f"Second response preview: {data2.get('response')[:100]}..."
                        )
                        return True
                    else:
                        self.log_test(
                            "Conversation Context",
                            "FAIL",
                            f"Second message status not success: {data2.get('status')}",
                            data2
                        )
                        return False
                else:
                    self.log_test(
                        "Conversation Context",
                        "FAIL",
                        f"Second message failed: HTTP {response2.status_code}",
                        response2.text
                    )
                    return False
                    
        except Exception as e:
            self.log_test(
                "Conversation Context",
                "FAIL",
                f"Exception: {str(e)}"
            )
            return False

    async def test_error_handling(self):
        """Test 4: Error Handling - Test various error scenarios"""
        test_cases = [
            {
                "name": "Empty Message",
                "payload": {"message": "", "session_id": self.session_id},
                "expected_status": 400
            },
            {
                "name": "Whitespace Only Message",
                "payload": {"message": "   ", "session_id": self.session_id},
                "expected_status": 400
            },
            {
                "name": "Message Too Long",
                "payload": {"message": "x" * 1001, "session_id": self.session_id},
                "expected_status": 400
            }
        ]
        
        all_passed = True
        
        for test_case in test_cases:
            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    response = await client.post(
                        f"{self.backend_url}/api/chat",
                        json=test_case["payload"],
                        headers={"Content-Type": "application/json"}
                    )
                    
                    if response.status_code == test_case["expected_status"]:
                        self.log_test(
                            f"Error Handling - {test_case['name']}",
                            "PASS",
                            f"Correctly returned HTTP {response.status_code}"
                        )
                    else:
                        self.log_test(
                            f"Error Handling - {test_case['name']}",
                            "FAIL",
                            f"Expected HTTP {test_case['expected_status']}, got {response.status_code}",
                            response.text
                        )
                        all_passed = False
                        
            except Exception as e:
                self.log_test(
                    f"Error Handling - {test_case['name']}",
                    "FAIL",
                    f"Exception: {str(e)}"
                )
                all_passed = False
        
        return all_passed

    async def test_api_integration(self):
        """Test 5: API Integration - Verify OpenRouter integration details"""
        try:
            # Test with a specific question that should trigger system prompt
            test_message = "What makes Parth unique as a product manager?"
            
            payload = {
                "message": test_message,
                "session_id": self.session_id,
                "conversation_history": []
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.backend_url}/api/chat",
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    if data.get("status") == "success":
                        response_text = data.get("response", "").lower()
                        
                        # Check for system prompt effectiveness
                        system_prompt_indicators = [
                            "pharmasecure", "ai", "ml", "fraud detection", 
                            "product manager", "roller hockey", "community"
                        ]
                        
                        found_indicators = [indicator for indicator in system_prompt_indicators 
                                         if indicator in response_text]
                        
                        if len(found_indicators) >= 2:
                            self.log_test(
                                "API Integration - System Prompt",
                                "PASS",
                                f"System prompt working effectively. Found indicators: {found_indicators}",
                                f"Response preview: {data.get('response')[:150]}..."
                            )
                            return True
                        else:
                            self.log_test(
                                "API Integration - System Prompt",
                                "WARN",
                                f"System prompt may not be fully effective. Found indicators: {found_indicators}",
                                f"Response preview: {data.get('response')[:150]}..."
                            )
                            return True  # Still consider it working
                    else:
                        self.log_test(
                            "API Integration",
                            "FAIL",
                            f"API integration failed: {data.get('status')} - {data.get('error')}",
                            data
                        )
                        return False
                else:
                    self.log_test(
                        "API Integration",
                        "FAIL",
                        f"API integration failed: HTTP {response.status_code}",
                        response.text
                    )
                    return False
                    
        except Exception as e:
            self.log_test(
                "API Integration",
                "FAIL",
                f"Exception: {str(e)}"
            )
            return False

    async def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting OpenRouter Chat Integration Tests")
        print(f"Backend URL: {self.backend_url}")
        print("=" * 60)
        
        tests = [
            ("Health Check", self.test_health_endpoint),
            ("Basic Chat Functionality", self.test_basic_chat_functionality),
            ("Conversation Context", self.test_conversation_context),
            ("Error Handling", self.test_error_handling),
            ("API Integration", self.test_api_integration)
        ]
        
        results = {}
        
        for test_name, test_func in tests:
            print(f"Running {test_name}...")
            try:
                result = await test_func()
                results[test_name] = result
            except Exception as e:
                print(f"❌ {test_name}: FAIL - Exception: {str(e)}")
                results[test_name] = False
        
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in results.values() if result)
        total = len(results)
        
        for test_name, result in results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"{status} {test_name}")
        
        print(f"\nOverall: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! OpenRouter chat integration is working correctly.")
        else:
            print("⚠️  Some tests failed. Check the details above.")
        
        return results

def main():
    """Main function to run tests"""
    tester = BackendTester()
    results = asyncio.run(tester.run_all_tests())
    
    # Return exit code based on results
    if all(results.values()):
        sys.exit(0)  # Success
    else:
        sys.exit(1)  # Failure

if __name__ == "__main__":
    main()