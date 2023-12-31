# predict.py
import sys
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import json

# Specify the correct path to your '.csv' file
csv_file_path = '/Users/hochunsun/Desktop/ecommerce-main/machine_learning/dummy_customer_purchases.csv'

# Load the dataset
df = pd.read_csv(csv_file_path)

# Preprocess 'Products Purchased' into binary format
mlb = MultiLabelBinarizer()
df['Products Purchased'] = df['Products Purchased'].apply(lambda x: x.split('; '))
labels = mlb.fit_transform(df['Products Purchased'])

# Scale the budget feature
scaler = StandardScaler()
X = scaler.fit_transform(df[['Budget (HKD)']].values)

# Train the model
rf = RandomForestClassifier()
multi_target_rf = MultiOutputClassifier(rf, n_jobs=-1)
multi_target_rf.fit(X, labels)

# Predict function
def predict(budget):
    budget_scaled = scaler.transform([[budget]])
    prediction = multi_target_rf.predict(budget_scaled)
    products = mlb.inverse_transform(prediction)
    return products

# If this script is executed directly, read the budget and print the prediction
if __name__ == '__main__':
    input_budget = float(sys.argv[1]) if len(sys.argv) > 1 else 30000  # Default budget for testing
    predicted_products = predict(input_budget)
    print(json.dumps(predicted_products))  # Print as JSON