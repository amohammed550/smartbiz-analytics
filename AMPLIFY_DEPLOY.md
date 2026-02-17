# Deploy to AWS Amplify

The React app is at **repo root**. No monorepo—Amplify uses default build.

1. Open: **https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/create**
2. Connect **GitHub** → select **amohammed550/smartbiz-analytics**, branch **main**.
3. **Do not** select "My app is a monorepo". Leave app root empty.
4. Click **Save and deploy**. Build uses repo `amplify.yml`: `npm ci` then `npm run build`, output `dist`.
5. Live URL: **https://main.&lt;app-id&gt;.amplifyapp.com** (see Hosting tab when build succeeds).
