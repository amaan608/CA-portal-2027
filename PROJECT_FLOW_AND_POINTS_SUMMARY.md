# CA Portal 2026 - Working Flow and Points System

This document explains how the website works end-to-end, based on the current Django codebase.

## 1) Tech Stack and Structure

- Framework: Django
- Main project module: `caportal`
- Main apps:
  - `users` -> registration, login, profile, activation, referral linkage
  - `dashboard` -> home dashboard, leaderboard, social-share verification
  - `submissions` -> tasks, quizzes, ideas, POCs, media submissions
  - `api` -> referral points endpoint and utility endpoint
- Templates are in `templates/` and static assets in `static/`.

## 2) URL and Page Flow

Top-level URL wiring in `caportal/urls.py`:

- `/admin/` -> Django admin
- `/users/...` -> user auth/profile routes
- `/` -> dashboard routes
- `/submissions/...` -> submissions routes

Major user-facing routes:

- Landing/Dashboard:
  - `/` -> `dashboard` view
  - If not logged in, user sees landing page.
  - If logged in, user sees dashboard with points/tasks/referrals summary.
- User/Auth:
  - `/users/register-single/`
  - `/users/register-group/`
  - `/users/activate/<uidb64>/<token>`
  - `/users/login/`
  - `/users/profile/`
  - `/users/scoring_system/` (points system info page)
  - `/users/logout/`
- Submissions and tasks:
  - `/submissions/tasks/`
  - `/submissions/idea/new/`
  - `/submissions/poc/new/`
  - `/submissions/poc/newcsv/`
  - `/submissions/quiz/<quiz_id>/`
- Leaderboard:
  - `/leaderboard/`

## 3) Core Data Model

### User Model (`users.NewUser`)

- Custom auth user (`AbstractBaseUser`).
- Stores profile info and game metrics:
  - `points` (default `250`)
  - `tasks` (default `0`)
  - `referrals` (default `0`)
  - `referred_by` (stores referral AlcherID used during signup)
- Unique referral-like code: `alcherid` generated automatically.

### Group Model (`users.UserGroup`)

- Team has 2 members:
  - `leader`
  - `executive`
- Group points are computed property:
  - `leader.points + executive.points`

### Submission Models (`submissions`)

- `POC`, `POCBulk`, `Idea`, `Media`, `Quiz`, `Question`, `QuizSubmission`, `Answer`
- `QuizSubmission` is unique per `(user, quiz)`.

### Dashboard Models (`dashboard`)

- `ShareablePost` (social posts users can share)
- `PostUrl` (per-user tracking URL per post)
- `Promotions`
- `Notifications`

## 4) Functional Flow (How a user moves through the system)

### A) Registration and activation flow

1. User registers (single or group).
2. System creates user records (and group record for group signup).
3. Activation email is sent with tokenized link.
4. User clicks activate link:
   - account becomes active
   - referral bonuses may be applied (see points section)

### B) Login and dashboard flow

1. User logs in via email/password.
2. Dashboard shows:
   - available shareable posts
   - promotions
   - group/solo aggregate counters
   - notifications
   - rank context

### C) Task/submission flow

From `/submissions/tasks/`, user can:
- attempt quizzes
- submit idea
- submit POC / POC bulk
- perform social-share tasks

Admin verification of POC/Idea/POCBulk changes whether points are awarded (signals read `is_verified`).

### D) Leaderboard flow

- Solo leaderboard is based on `NewUser.points` (filtered to non-staff, excludes grouped members in the current logic).
- Group leaderboard is based on `UserGroup.getPoints`.

## 5) Points System (Actual code behavior)

This section describes what the backend currently awards.

### 5.1 Starting points

- Every new `NewUser` starts with `250` points (model default).

### 5.2 Referral-related points

There are multiple referral point paths in code:

1. **At registration time**
   - Registration views call a referral API endpoint with `points=50` for the referring `alcherid`.
   - Also increments referral count in that endpoint.

2. **At activation time (`VerificationView`)**
   - If `user.referred_by` exists:
     - Referrer gets:
       - `+400` points if same college
       - `+600` points if different college
     - Referrer `referrals += 1`
     - Activated user points are set to `550`

Important outcome: referral can impact points at more than one stage.

### 5.3 Profile completion points

- In `users.profile` view:
  - If profile is being completed first time (`update_status == 0` logic), user gets `+200` points and status flips.

### 5.4 Quiz points

- On first successful `QuizSubmission.save()`:
  - user gets `+500` points.
- Duplicate quiz submission is prevented by:
  - DB unique constraint `(user, quiz)`
  - `get_or_create()` in view for idempotent POST behavior

### 5.5 Idea / POC / POCBulk points

Awarding is signal-driven:

- `Idea`
  - `points` property returns `200` only if `is_verified=True`, else `0`
  - Signal adds `instance.points` to user
- `POC`
  - `250` if verified, else `0`
- `POCBulk`
  - `250 * correct_poc` if verified, else `0`

Signals also create notifications and increment tasks when verified path is taken.

### 5.6 Social share points

In `dashboard` share verification handlers:

- Instagram share verification: `+25` points (if post supports Instagram)
- Facebook share verification: `+25` points (if post supports Facebook)
- Cookie key is used to avoid re-crediting the same share URL repeatedly.

## 6) How points affect ranking

- Individual ranking: sorted by `NewUser.points` descending.
- Group ranking: sorted by `leader.points + executive.points`.
- Dashboard and tasks pages show grouped totals when user belongs to a team.

## 7) Important Observations / Mismatches

1. **Displayed point table vs backend**
   - `templates/dashboard/points_system.html` shows lower numbers (e.g., 10/20/30/40/60 style values),
   - but backend awards are much larger in several places (e.g., 200/250/500/600).
   - So UI documentation and backend logic are not fully aligned.

2. **Referral count increments in multiple places**
   - Referral API increments `referrals`.
   - Activation flow also increments `referrals`.
   - Depending on user path, a referral may be counted more than once.

3. **Potential missing API route include**
   - Referral endpoint exists in `apps/api/urls.py`,
   - but no top-level `include('api.urls')` is currently visible in `caportal/urls.py`.
   - Registration code still attempts to call the named route URL string.

4. **Signals can run on create and update**
   - `post_save` handlers in submissions do not guard strictly on `created`.
   - If records are saved repeatedly with verified state, point side effects may repeat unless controlled operationally.

5. **Group model migration mismatch risk**
   - `register_group_user` sets `userGroup.referred_by`,
   - while current `UserGroup` model code shown does not define `referred_by`.
   - This indicates model/view drift or pending migration history differences.

## 8) Practical "Mental Model" of the System

Think of the platform as:

1. **Acquire users** (single/group registration + referrals)
2. **Activate users** (email verification)
3. **Engage users** (tasks page: quizzes, POCs, ideas, social sharing)
4. **Reward users** (points, tasks count, referral count)
5. **Rank users** (solo/group leaderboard)

The points system is intentionally gamified, but currently split across views, model save hooks, and signals. That makes behavior powerful, but also easier to desync from the UI copy.

## 9) File Map for Quick Navigation

- Core project routing: `caportal/urls.py`
- User logic: `apps/users/views.py`, `apps/users/models.py`, `apps/users/forms.py`
- Dashboard logic: `apps/dashboard/views.py`, `apps/dashboard/models.py`
- Submission logic: `apps/submissions/views.py`, `apps/submissions/models.py`, `apps/submissions/signals.py`
- API referral endpoint: `apps/api/views.py`, `apps/api/urls.py`
- Points UI page: `templates/dashboard/points_system.html`

