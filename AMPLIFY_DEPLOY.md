# Deploy to AWS Amplify – Working UI

## Step 1: Build (already in repo)

The repo uses a **simple build**: `npm install` then `npm run build`. Output is in `dist/`. No monorepo.

## Step 2: In Amplify Console – Add SPA redirect (required for React Router)

Without this, the app may load once but **refresh or direct URLs show 404**.

1. Open your app: **https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1**
2. Click the app **smartbiz-analytics** (or your app name).
3. In the left sidebar: **Hosting** → **Rewrites and redirects** (or **App settings** → **Rewrites and redirects**).
4. Click **Edit**.
5. Add this rule (or append if you have others):

   - **Source address:** `/<*>`
   - **Target address:** `/index.html`
   - **Type:** **Rewrite (200)** (not Redirect 301/302)

   Or paste this JSON in the editor (replace existing rules if needed):

   ```json
   [
     {
       "source": "/<*>",
       "status": "200",
       "target": "/index.html",
       "condition": null
     }
   ]
   ```

6. **Save**.

## Step 3: Redeploy

- Go to the **main** branch view and click **Redeploy this version** on the latest commit,  
  **or** push a small commit to `main` to trigger a new build.

## Your live URL

After a successful build and deploy:

**https://main.d3gc2o7564equw.amplifyapp.com**

(Replace with your app’s URL from the Hosting tab if different.)

## If build still fails

1. In Amplify, open the failed **Build** and open **Build logs**.
2. Check the **Provision** and **Build** steps for the first error line.
3. Ensure **Build settings** use the repo’s `amplify.yml` (no override that points to a wrong folder).
4. Ensure **Monorepo** is **off** and **App root** is **empty**.
