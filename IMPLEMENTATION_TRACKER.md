# Nepali Urban Dictionary - Implementation Tracker

**Goal:** Launch a production-ready site at nepaliurbandictionary.com within the next few hours.

**Last Updated:** October 29, 2025

---

## 🎯 Quick Launch Plan (Next 2-3 Hours)

This is the absolute minimum viable product to get the site live and functional.

### Phase 1: Critical Backend (45 mins)
- [ ] **Task 3.1:** Add input validation (express-validator)
- [ ] **Task 3.2:** Test validation on all endpoints
- [ ] **Task 4.1:** Add rate limiting (express-rate-limit)
- [ ] **Task 4.2:** Add security headers (helmet)
- [ ] **Task 5.1:** Create admin authentication system (JWT)
- [ ] **Task 5.2:** Protect admin endpoints
- [ ] **Task 18.1:** Configure CORS properly

### Phase 2: Admin Panel (30 mins)
- [ ] **Task 6.1:** Create admin login page
- [ ] **Task 6.2:** Create admin dashboard for pending words
- [ ] **Task 6.3:** Add approve/reject functionality

### Phase 3: Deployment Setup (30 mins)
- [ ] **Task 8.1:** Create .env and .env.example files
- [ ] **Task 8.2:** Add health check endpoint
- [ ] **Task 8.3:** Create production build script
- [ ] **Task 22.1:** Add basic Privacy Policy page
- [ ] **Task 22.2:** Add basic Terms of Service page

### Phase 4: VPS Deployment (45 mins)
- [ ] **Task 9.1:** Set up VPS and install dependencies
- [ ] **Task 9.2:** Configure Nginx
- [ ] **Task 9.3:** Deploy app with PM2
- [ ] **Task 10.1:** Configure domain DNS
- [ ] **Task 10.2:** Set up SSL with Certbot

### Phase 5: Monitoring & Launch (15 mins)
- [ ] **Task 11.1:** Create basic backup script
- [ ] **Task 14.1:** Set up UptimeRobot monitoring
- [ ] **Task 15.1:** Run final deployment checklist
- [ ] **Task 16.1:** Document basic maintenance procedures

---

## 📋 Detailed Task Breakdown

## ✅ COMPLETED TASKS

### 1. Database Setup ✅
- [x] SQLite + Sequelize configured
- [x] Word model created
- [x] Seed script created
- [x] API controllers using database
- [ ] ⚠️ Add wordNepaliScript field (minor - can do later)
- [ ] ⚠️ Add database indexes (can do later)

### 2. Backend API Design ✅
- [x] GET /api/words (all approved words)
- [x] GET /api/words/:id (single word)
- [x] POST /api/words (submit word)
- [x] PUT /api/words/:id (update word)
- [x] DELETE /api/words/:id (delete word)
- [ ] Add GET /api/words/pending (for admin)
- [ ] Add POST /api/words/:id/approve (for admin)
- [ ] Add GET /api/words/random (for random word feature)
- [ ] Document API endpoints

### 7. Frontend Integration ⚠️
- [x] Browse page fetches from API
- [x] Submit page posts to API
- [ ] Home page random word from API
- [ ] Word detail page from API
- [ ] Add pagination to browse page

---

## 🚀 IN PROGRESS TASKS

### 3. Input Validation ✅ COMPLETED
**Priority:** HIGH - Must do before launch

- [x] Install express-validator: `npm install express-validator`
- [x] Create validation middleware in `backend/middleware/validation.js`
- [x] Add validation rules:
  - [x] wordName: required, 1-200 chars, trim
  - [x] wordMeaning: required, 1-2000 chars
  - [x] wordSentence: required, 1-1000 chars
- [x] Apply validation to POST /api/words
- [x] Apply validation to PUT /api/words/:id
- [x] Test validation with invalid data
- [x] Return clear error messages (400 status)

### 4. Anti-spam & Security ✅ COMPLETED
**Priority:** HIGH - Must do before launch

- [x] Install packages: `npm install express-rate-limit helmet cors`
- [x] Add helmet middleware for security headers
- [x] Configure CORS (see Task 18)
- [x] Add rate limiting:
  - [x] 3 submissions per hour per IP on POST /api/words
  - [x] 100 requests per 15 min on all API routes
- [x] Test rate limiting works
- [x] Add request logging with morgan
- [ ] ⚠️ CAPTCHA integration (optional for quick launch, add later)

### 5. Admin Authentication ✅ COMPLETED
**Priority:** HIGH - Must do before launch

- [x] Install: `npm install jsonwebtoken bcryptjs`
- [x] Create auth controller: `backend/controllers/authController.js`
- [x] Create POST /api/auth/login endpoint
- [x] Hash admin password and add to .env
- [x] Generate JWT on successful login
- [x] Create auth middleware: `backend/middleware/auth.js`
- [x] Protect PUT/DELETE /api/words/* with auth middleware
- [x] Add logout endpoint
- [x] Test login flow

### 6. Admin Panel UI ✅ COMPLETED
**Priority:** HIGH - Must do before launch

- [x] Create admin route: `/admin`
- [x] Create `frontend/src/pages/AdminLogin.jsx`
- [x] Create `frontend/src/pages/AdminDashboard.jsx`
- [x] Admin can view pending submissions
- [x] Admin can approve words (change status to "approved")
- [x] Admin can reject/delete words
- [ ] Admin can edit words (can add later)
- [x] Add protected route logic
- [x] Style admin panel
- [x] Test full workflow: submit → admin approve → public display

### 8. Deployment Preparation ✅ COMPLETED
**Priority:** HIGH - Must do before launch

- [x] Create `.env.example` file
- [x] Create `.env` file (don't commit!)
- [x] Add environment variables
- [x] Verify `.env` is in `.gitignore`
- [x] Update backend to use environment variables
- [x] Add GET /api/health endpoint
- [ ] Create build script in package.json:
  ```json
  "build:all": "npm run build && npm run copy:build",
  "copy:build": "cp -r frontend/dist backend/public"
  ```
- [ ] Test production build locally

### 18. CORS Configuration ✅ COMPLETED
**Priority:** HIGH - Must do before launch

- [x] Install: `npm install cors`
- [x] Configure CORS in `backend/app.js`
- [x] Test CORS from different origins

### 22. Legal Pages ✅ COMPLETED
**Priority:** HIGH - Required before launch

- [x] Create `frontend/src/pages/Privacy.jsx`
- [x] Create `frontend/src/pages/Terms.jsx`
- [x] Add routes in App.jsx
- [x] Write basic Privacy Policy (data collection, cookies, etc.)
- [x] Write basic Terms of Service (usage rules, liability, etc.)
- [x] Add links in footer

---

## 🖥️ DEPLOYMENT TASKS

### 9. VPS Hosting Setup ❌
**Priority:** HIGH - Deployment phase

- [ ] Purchase/access VPS (DigitalOcean, Hetzner, or Linode)
- [ ] SSH into server
- [ ] Set up firewall: `ufw allow 22,80,443 && ufw enable`
- [ ] Install Node.js (via nvm):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install --lts
  ```
- [ ] Install nginx: `apt install nginx`
- [ ] Install PM2: `npm install -g pm2`
- [ ] Clone repo: `git clone <repo-url> /var/www/nepali-dictionary`
- [ ] Install dependencies:
  ```bash
  cd /var/www/nepali-dictionary
  npm install
  cd frontend && npm install && cd ..
  ```
- [ ] Create .env file on server
- [ ] Build frontend: `npm run build`
- [ ] Configure nginx (see nginx config template)
- [ ] Start app: `pm2 start backend/app.js --name nepali-dict`
- [ ] Setup PM2 startup: `pm2 startup && pm2 save`
- [ ] Test site on server IP

**Nginx Config Template:**
```nginx
server {
    listen 80;
    server_name nepaliurbandictionary.com www.nepaliurbandictionary.com;

    root /var/www/nepali-dictionary/frontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # API proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend - SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 10. Domain & SSL ❌
**Priority:** HIGH - Deployment phase

- [ ] Point nepaliurbandictionary.com A record to VPS IP
- [ ] Wait for DNS propagation (check with `dig nepaliurbandictionary.com`)
- [ ] Install Certbot: `apt install certbot python3-certbot-nginx`
- [ ] Get SSL cert: `certbot --nginx -d nepaliurbandictionary.com -d www.nepaliurbandictionary.com`
- [ ] Test auto-renewal: `certbot renew --dry-run`
- [ ] Verify HTTPS works
- [ ] Test redirect HTTP → HTTPS

### 11. Backup System ❌
**Priority:** MEDIUM - Can add day 1 post-launch

- [ ] Create `backend/scripts/backup.sh`:
  ```bash
  #!/bin/bash
  DATE=$(date +%Y%m%d_%H%M%S)
  cp /var/www/nepali-dictionary/backend/database.sqlite \
     /var/www/nepali-dictionary/backups/backup_$DATE.sqlite
  # Keep only last 30 backups
  ls -tp /var/www/nepali-dictionary/backups/*.sqlite | tail -n +31 | xargs -r rm
  ```
- [ ] Make executable: `chmod +x backend/scripts/backup.sh`
- [ ] Set up cron: `crontab -e`
  ```
  0 3 * * * /var/www/nepali-dictionary/backend/scripts/backup.sh
  ```
- [ ] Test backup script
- [ ] Create restore instructions in MAINTENANCE.md

### 14. Monitoring & Uptime ❌
**Priority:** MEDIUM - Day 1 post-launch

- [ ] Set up UptimeRobot account (free)
- [ ] Add monitor for https://nepaliurbandictionary.com
- [ ] Add monitor for https://nepaliurbandictionary.com/api/health
- [ ] Configure email alerts
- [ ] Test alerts work

### 15. Final Deployment Checklist ❌
**Run this before announcing the site:**

**Security:**
- [ ] SSL certificate working (HTTPS, green lock)
- [ ] HTTP redirects to HTTPS
- [ ] Helmet.js security headers active
- [ ] Rate limiting functional
- [ ] Input validation working
- [ ] Admin routes protected
- [ ] .env not in git repo
- [ ] CORS configured correctly

**Functionality:**
- [ ] Database seeded with initial words
- [ ] Admin can log in
- [ ] Submit word → shows as pending
- [ ] Admin can approve → shows on browse page
- [ ] Browse page displays words
- [ ] Search works
- [ ] Mobile responsive

**Infrastructure:**
- [ ] PM2 running the app
- [ ] PM2 auto-starts on reboot
- [ ] Health endpoint responding
- [ ] Backup script scheduled
- [ ] Monitoring active

### 16. Maintenance Documentation ❌
**Priority:** MEDIUM - Can document after launch

- [ ] Create MAINTENANCE.md with:
  - [ ] How to approve submissions
  - [ ] How to restart server: `pm2 restart nepali-dict`
  - [ ] How to view logs: `pm2 logs nepali-dict`
  - [ ] How to restore backup
  - [ ] How to deploy updates
  - [ ] Emergency procedures

---

## 📝 POST-LAUNCH TASKS (Can do later)

### 7. Complete Frontend Integration
- [ ] Add random word feature to home page
- [ ] Add word detail page with routing
- [ ] Add pagination to browse page (50 words/page)
- [ ] Add upvote/downvote feature
- [ ] Add loading states everywhere
- [ ] Add error boundaries

### 13. Analytics
- [ ] Choose platform (Google Analytics, Plausible, or Umami)
- [ ] Add tracking code
- [ ] Configure events tracking
- [ ] Add privacy notice

### 17. SEO Optimization
- [ ] Add meta tags to index.html
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Submit to Google Search Console
- [ ] Add Open Graph tags
- [ ] Optimize page titles

### 19. Database Optimization
- [ ] Add indexes on wordName, status, dateCreated
- [ ] Add pagination to API endpoints
- [ ] Consider full-text search
- [ ] Add caching layer (optional)

### 20. Content Moderation
- [ ] Add profanity filter
- [ ] Create content guidelines
- [ ] Add report/flag feature
- [ ] Email notifications for new submissions

### 24. Performance Optimization
- [ ] Code splitting
- [ ] Lazy load routes
- [ ] Optimize images
- [ ] Add loading skeletons
- [ ] Implement virtual scrolling
- [ ] Enable response compression

---

## 🎬 Getting Started - Next Steps

1. **Start with Task 3:** Input Validation (15 mins)
2. **Then Task 4:** Security & Rate Limiting (15 mins)
3. **Then Task 5:** Admin Auth (20 mins)
4. **Then Task 6:** Admin Panel UI (30 mins)
5. **Then Task 8:** Deployment Prep (15 mins)
6. **Then Task 18:** CORS Config (5 mins)
7. **Then Task 22:** Legal Pages (15 mins)
8. **Deploy to VPS:** Tasks 9-10 (45 mins)
9. **Final Setup:** Tasks 11, 14-16 (30 mins)

**Total estimated time: 2.5-3 hours**

---

## 📊 Progress Summary

- **Completed:** 2 tasks (Database, Basic API)
- **In Progress:** 0 tasks
- **Remaining for MVP:** 9 critical tasks
- **Post-launch:** 6+ optimization tasks

---

## 🔗 Quick Links

- [Full Implementation Plan](./implement.txt)
- Repository: [Add GitHub URL]
- Domain: nepaliurbandictionary.com
- Server: [Add VPS IP when ready]

---

## 💡 Notes & Decisions

- Using SQLite (no need for complex DB for this scale)
- Using JWT for admin auth (simple, no sessions needed)
- Using PM2 for process management
- Using Nginx as reverse proxy
- Frontend built with Vite (fast builds)
- Backend using Express + Sequelize

---

**Ready to start? Let's begin with Task 3: Input Validation!**
