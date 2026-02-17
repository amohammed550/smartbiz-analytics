# Deploy to AWS Amplify (working steps)

Follow these steps exactly to get a **working live URL**.

## 1. Create app from GitHub

1. Open: **https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/create**
2. Click **Create new app** → **Host web app**.
3. Choose **GitHub** → **Continue**.
4. Authorize **AWS Amplify** in GitHub if asked (install/authorize for your account).

## 2. Connect this repository

1. **Repository:** Select **amohammed550/smartbiz-analytics**
2. **Branch:** Select **main**
3. **Important:** Check **"My app is a monorepo"**
4. **Monorepo app root:** Enter **`frontend`** (exactly, no slash)
5. Click **Next**.

## 3. Build settings

- Leave **Build settings** as-is (the repo’s `amplify.yml` is used).
- Click **Next**, then **Save and deploy**.

## 4. Wait for the build

- First build usually takes 3–5 minutes.
- When the build is **green (succeeded)**, the app is live.

## 5. Your live URL

- In the Amplify app, open the **Hosting** tab or the main app view.
- Your public URL will look like: **`https://main.dxxxxxxxx.amplifyapp.com`**
- Use that link to open the deployed React app.

## If the build fails

- In Amplify, open the failed **Build** and check the **Build logs**.
- Ensure you selected **"My app is a monorepo"** and app root **`frontend`**.
- Ensure the branch is **main** and the repo is **amohammed550/smartbiz-analytics**.
