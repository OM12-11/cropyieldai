from prediction import predict_yield

# Test 1: Valid prediction
print(predict_yield("Wheat", 2025))

# Test 2: Unsupported crop
try:
    predict_yield("Banana", 2025)
except ValueError as error:
    print("Expected error:", error)

# Test 3: Invalid year
try:
    predict_yield("Wheat", 1980)
except ValueError as error:
    print("Expected error:", error)

# Test 4: Invalid year type
try:
    predict_yield("Wheat", "2025")
except TypeError as error:
    print("Expected error:", error)