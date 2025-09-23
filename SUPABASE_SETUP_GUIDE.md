# 🎉 Your Memory Box Setup Guide!

Hey there! Let's get your **memory box** (database) set up so your Five Alike app remembers everything! 

## 🚀 Step 1: Create Your Supabase Account

1. **Go to**: https://supabase.com
2. **Click**: "Start your project" (big green button)
3. **Sign up**: Use GitHub (easiest) or email
4. **Wait**: About 2 minutes for your account to be ready

## 🏗️ Step 2: Create Your Project

1. **Click**: "New Project"
2. **Fill out**:
   - **Name**: `five-alike`
   - **Database Password**: Create a strong password (write it down!)
   - **Region**: Pick the one closest to you
3. **Click**: "Create new project"
4. **Wait**: About 2-3 minutes for your database to be ready ☕

## 🔑 Step 3: Get Your Magic Keys

Once your project is ready:

1. **Go to**: Settings → API (in the left sidebar)
2. **Copy these 3 things**:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...` but longer)

## 📝 Step 4: Add Keys to Your App

1. **Open**: The file `.env.local` in your Five Alike folder
2. **Replace** the placeholder text:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-service-key
   ```

## 🗄️ Step 5: Create Your Database T/var/folders/qc/mzxmy6k11x97_8w89c1rhj480000gn/T/TemporaryItems/NSIRD_screencaptureui_pje6Lx/Screenshot 2025-09-09 at 6.02.46 PM.pngables

1. **In Supabase**: Go to SQL Editor (in the left sidebar)
2. **Click**: "New Query"
3. **Copy and paste** everything from the file `database-setup.sql`
4. **Click**: "Run" (bottom right)
5. **Wait**: About 30 seconds for all tables to be created

## ✅ Step 6: Test Everything!

You should see these new tables in your Database section:
- ✅ users
- ✅ lists  
- ✅ votes
- ✅ comments
- ✅ saved_lists
- ✅ follows
- ✅ high_fives

## 🎊 What You Just Built!

Your memory box can now remember:
- 👤 **User accounts** - People can sign up and log in
- 📝 **Lists** - All recommendation lists are saved forever
- 👍 **Votes** - Every upvote and downvote is remembered
- 💬 **Comments** - All discussions are saved
- ⭐ **Favorites** - Saved lists for each user
- 👥 **Follows** - Who follows who
- 🙌 **High Fives** - Special likes that are limited and meaningful

## 🚨 Important Notes

- **Keep your keys safe!** Don't share them with anyone
- **The .env.local file** should never be uploaded to GitHub (it's automatically ignored)
- **Your database is free** up to 500MB and 2GB transfer per month
- **You can always upgrade** if you need more space later

## 🆘 Need Help?

If anything goes wrong:
1. **Check** that you copied the keys correctly (no extra spaces)
2. **Make sure** the database tables were created (check the Database tab in Supabase)
3. **Try refreshing** your app at http://localhost:3000

## 🎯 What's Next?

Once this is done, I'll help you
1. **Install the connection tools** (the packages that let your app talk to the database)
2. **Connect your app** to the memory box
3. **Test everything** to make sure votes and lists are saved!

Let me know when you've completed these steps and I'll help you with the next part! 🚀