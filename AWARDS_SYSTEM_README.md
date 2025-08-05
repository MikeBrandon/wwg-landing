# WWG Awards System

A comprehensive nomination and voting platform built with Next.js and Supabase, designed for the WWG Creator Awards. This system allows users to nominate creators, vote on nominees, and provides administrative and judging capabilities.

## 🌟 Features

### User Features
- **Google OAuth Authentication** - Secure login with Google accounts
- **Creator Nominations** - Users can nominate their favorite creators in different categories
- **Creator Autocomplete** - Smart suggestions when typing creator names
- **Voting System** - Vote for approved nominees across multiple categories
- **Real-time Results** - View live voting results and final rankings

### Admin Features
- **Nomination Management** - Review and approve nominations
- **Nominee Management** - Add/remove nominees and manage approvals
- **User Role Management** - Assign admin and judge roles
- **Awards Configuration** - Create and manage awards, categories, and timelines
- **Manual Nominee Addition** - Add creators directly without nominations

### Judge Features
- **Scoring Dashboard** - Score nominees on 4 criteria (Consistency, Influence, Engagement, Quality)
- **Point Allocation** - 1-3 points per criterion with detailed guidelines
- **Submission Tracking** - Save and update scores per nominee

### Scoring System
- **Vote Points**: Ranked by community votes (5 points for 1st, 4 for 2nd, etc.)
- **Judge Points**: Average of all judge scores (max 12 points total)
- **Final Ranking**: Combined vote points + judge points

## 🗄️ Database Schema

### Tables
- `users` - User profiles with roles (user/admin/judge)
- `awards` - Award definitions with date ranges
- `categories` - Award categories 
- `creators` - Creator profiles with platform info
- `nominations` - User nominations for creators
- `nominees` - Approved nominations for voting
- `votes` - User votes for nominees
- `judge_scores` - Judge scoring data
- `final_scores` - Calculated final rankings

### Key Constraints
- One nomination per user per category
- One vote per user per nominee
- One judge score per judge per nominee
- Unique creator/category combinations for nominees

## 🚀 Setup Instructions

### 1. Database Setup
1. Create a new Supabase project
2. Run the SQL script in `supabase-schema.sql` in your Supabase SQL editor
3. Enable Google OAuth in Authentication > Providers
4. Add your domain to allowed redirect URLs

### 2. Environment Variables
Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Run Development Server
```bash
pnpm dev
```

## 📱 User Journey

### For Regular Users
1. **Sign Up/Login** - Use Google OAuth to authenticate
2. **Dashboard** - View nomination status and quick actions
3. **Nominate** - Submit nominations for favorite creators
4. **Vote** - Vote for approved nominees in each category
5. **Results** - View final rankings and scores

### For Admins
1. **Review Nominations** - Approve/reject user nominations
2. **Manage Nominees** - Control who appears in voting
3. **User Management** - Assign judge/admin roles
4. **Awards Config** - Set up categories and timelines
5. **Calculate Results** - Generate final scores and rankings

### For Judges
1. **Access Judge Panel** - Score nominees on 4 criteria
2. **Detailed Scoring** - Rate consistency, influence, engagement, quality
3. **Save Progress** - Update scores as needed
4. **Submit Final Scores** - Complete judging process

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router
- **React 19** with hooks and context
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TypeScript** for type safety

### Backend
- **Supabase** for database and authentication
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates
- **Server-side rendering** for performance

### Key Components
- `AdminDashboard` - Complete admin interface
- `JudgeDashboard` - Judge scoring interface
- `AwardsConfig` - Modular awards management
- `Scoring utilities` - Final ranking calculations

## 🔒 Security Features

- **Row Level Security** - Database-level access control
- **Role-based permissions** - Admin/judge/user role separation
- **Authentication required** - All actions require login
- **Input validation** - Form validation and sanitization
- **CSRF protection** - Built-in Next.js security

## 🎯 Key Pages

| Route | Purpose | Access Level |
|-------|---------|--------------|
| `/` | Homepage with awards info | Public |
| `/login` | Authentication page | Public |
| `/dashboard` | User dashboard | Authenticated |
| `/nominate` | Nomination form | Authenticated |
| `/vote` | Voting interface | Authenticated |
| `/judge` | Judge scoring panel | Judge/Admin |
| `/admin` | Admin management | Admin only |
| `/results` | Final rankings | Public |

## 🔧 Customization

### Adding New Categories
1. Go to Admin Dashboard → Awards tab
2. Create or edit an award
3. Add new categories with descriptions
4. Categories automatically appear in nomination/voting

### Modifying Scoring Criteria
Update the scoring logic in:
- `src/components/JudgeDashboard.tsx` - Judge interface
- `src/utils/scoring.ts` - Calculation logic
- Database schema if adding new criteria

### Changing Vote Points System
Modify the `calculateFinalScores` function in `src/utils/scoring.ts`:
```typescript
// Current: 5,4,3,2,1 points for ranks 1-5+
const votePoints = Math.max(1, Math.min(5, 5 - index))
```

## 📊 Analytics & Insights

The system tracks:
- Total nominations per category
- Vote counts and patterns
- Judge scoring consistency
- User engagement metrics
- Final ranking calculations

Access these through the admin dashboard or by querying the database directly.

## 🐛 Troubleshooting

### Common Issues

**Authentication not working:**
- Check Google OAuth setup in Supabase
- Verify redirect URLs include your domain
- Ensure environment variables are correct

**Database errors:**
- Verify RLS policies are enabled
- Check user roles are set correctly
- Ensure foreign key relationships exist

**Scoring calculations wrong:**
- Run the recalculate function in admin panel
- Check judge scores are submitted
- Verify vote counts are accurate

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Setup
- Development: Use `.env.local`
- Production: Set in hosting platform dashboard
- Staging: Use separate Supabase project

## 🔄 Future Enhancements

Potential additions:
- Email notifications for key events
- Advanced analytics dashboard
- Multi-language support
- Mobile app version
- Social media integration
- Automated award ceremonies

## 📝 License

This project is built for the WWG (Watu Wa Gaming) community. Please respect the intended use for creator awards and community building.

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ for the WWG gaming community