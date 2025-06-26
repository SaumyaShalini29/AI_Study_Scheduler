# ml/train_model.py

import json
import pandas as pd
import sys
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# 1. Load data
try:
    with open('studyData.json') as f:
        data = json.load(f)
except FileNotFoundError:
    print("❌ studyData.json not found in current directory. Make sure you ran dataExport.js and you're in backend/ when you run this script.")
    sys.exit(1)

df = pd.DataFrame(data)

# 2. Drop rows missing critical fields
df = df.dropna(subset=['studyDuration', 'performance', 'priority', 'difficulty', 'studyTime'])

# 3. Check that we have enough data
n = len(df)
if n < 2:
    print(f"❌ Not enough records to train a model (need ≥2, got {n}). Collect more data via your form and re-export.")
    sys.exit(1)

# 4. Encode categories
df['priority']       = df['priority'].map({'High':2, 'Medium':1, 'Low':0})
df['difficulty']     = df['difficulty'].map({'Hard':2, 'Medium':1, 'Easy':0})
df['studyTimeOfDay'] = df['studyTime'].map({'Morning':0, 'Afternoon':1, 'Evening':2})

# 5. Define features and target
X = df[['priority', 'difficulty', 'performance', 'studyTimeOfDay']]
y = df['studyDuration']

# 6. Train/test split
# With n small, use test_size=0.5 so each side has at least 1 sample
test_size = 0.5 if n < 10 else 0.2
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=test_size, random_state=42
)

# 7. Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 8. Evaluate
preds = model.predict(X_test)
print('✅ MAE:', mean_absolute_error(y_test, preds))

# 9. Save model
joblib.dump(model, 'study_scheduler_model.pkl')
print('✅ Model saved to study_scheduler_model.pkl')
