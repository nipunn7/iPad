# Room Clock

A bedside clock and alarm for a kid's room, made to run all day and night on an
old iPad. The clock is one HTML file (`kids-room-clock.html`) plus a few files
that sit next to it: `sw.js` (offline copy), `fonts/` (the Nunito typeface),
and the Home Screen icon and launch images. It makes no network calls to anyone
else. Settings are saved on that iPad.

## What it does

- **Living scenes**: the clock sits on an animated world. Choose **Sky** (sun,
  drifting clouds, birds, shooting stars), **Hills** (spinning windmill,
  fireflies at dusk), **Ocean** (rolling waves, a sailing boat, fish, bubbles,
  seagulls), **Space** (turning star fields, a ringed planet, rockets, comets),
  **Aurora** (big slowly flowing colours) or **Calm** (still). Every scene
  follows the real sun for your city: night, dawn, day, golden hour, dusk,
  then a starry evening, with the sun and moon moving across the sky.
- **Three clock faces**: big **Digital**, **Flip** tiles, or an **Analog**
  learning clock. On the analog clock the red hour hand matches the red hour
  numbers and the blue minute hand matches blue minute numbers (5, 10, 15…)
  around the rim. The minute numbers can be turned off.
- **Day face**: day, date, next alarm, "tomorrow is a school day / no school",
  sunrise/sunset, bedtime countdown, birthday countdown, and the Indian
  festival of the day.
- **Night mode**: from bedtime until wake-up, only the time and "Stay in bed
  until 7:00" show, in dim red, amber or grey on black. Tapping the screen
  shows everything for 15 seconds. The gear is hidden at night, so a sleepy tap
  can't open Settings.
- **"OK to get up" light**: at wake-up time the screen turns green with a sun
  for 45 minutes. Red means stay in bed, green means get up. This works with
  silent alarms too, which suits kids who don't need a sound alarm.
- **Alarms**: a separate sound per alarm (Chimes, Marimba, Beeps, or Silent /
  light only). The sound starts soft and gets louder over 40 s, with snooze
  (5 min) and auto-stop after 5–30 min. Each alarm can **skip school holidays**,
  and you can **pause all alarms until a date** (breaks, sick days, trips).
- **Reliability**: an alarm missed because the page was paused or reloaded
  still rings when the clock comes back, if that is within an hour. A pending
  snooze survives a reload. Settings → Status shows whether alarm sound is
  ready, whether the screen is being kept awake, and when the clock last
  stopped running.
- **Sun times** are computed on the iPad (no internet). In testing they were
  within about a minute of a reference astronomy library for Delhi, Mumbai,
  Chennai and Srinagar in summer, autumn and winter.
- **Moving background** (on by default). It's always still at night, and you
  can turn it off if the iPad runs warm. It ignores the iPad's *Reduce Motion*
  setting (the old version stopped moving when that was on, which is easy to
  have switched on without knowing).
- **Talking clock** (off by default): tap the time to hear it, for example
  *"It's 7:38 in the evening. Today is Tuesday, 27 October."* At night it says
  *"It's still night time. Stay in bed until 7 o'clock."* Alarms start with
  *"Good morning, Aarav! … It's a school day."*, and at bedtime it says good
  night. This uses the iPad's built-in text-to-speech voices, not Siri. If
  installed, it uses an Indian English voice (Settings → General →
  Accessibility → Speech → Voices on iOS 12).
- **Sleep sounds** (the moon button at the top): rain, ocean, fan or soft
  noise, made on the iPad (no internet) as seamless 16-second loops. Soft,
  medium or loud; plays for 15 min, 30 min, 1 hour or all night (until the
  wake-up time); can start by itself at bedtime. It drops one volume step for
  the last 2 minutes before stopping. A real alarm ends it; a timer pauses it
  and it carries on afterwards. iOS doesn't let a web page change volume
  smoothly, so the fade is a single step, not a gradual one.
- **Routine cards**: picture checklists the child taps off. The bedtime
  routine appears 45 minutes before bedtime (30 min or 1 hour if you prefer)
  and the morning routine for 1½ hours after wake-up. Each tick goes green
  with a ding. When all are done, stars burst out with "⭐ All done! 3 days
  in a row", and with the talking clock on it says "Great job". Steps (up to
  6, with emoji pictures that exist on iOS 12) are edited under Settings →
  Routines, which also has **Try it now**.
- **"Sleeps until" countdowns**: the nearest countdown shows as a card, like
  "4 sleeps until Grandma visits", or "12 sleeps until Diwali" for festivals
  in the next 3 weeks. "1 more sleep" and "It's today!" get the festive card.
  The birthday card now counts sleeps too. With the talking clock on, tapping
  the time mentions countdowns within 2 weeks.
- **Countdown timer**: the hourglass next to the gear opens big buttons
  (1 min to 1 hour) and optional labels (Tidy up, Brush teeth, Reading,
  Homework, Screen time). A ring empties as time runs out and turns amber for
  the last 10%. With the timer screen closed, the hourglass shows the time
  left. When time is up, a soft sound plays for 30 seconds (and it speaks, if
  the talking clock is on). The timer keeps running through a reload. Kids
  can use it without the PIN, and it's hidden at night.
- **Works without Wi-Fi**: once opened from an `https://` address, the page
  keeps a copy of itself, its fonts and its icon on the iPad (`sw.js`, a
  service worker). So a reload at night still opens the clock even if the
  Wi-Fi is down. It always tries for the newest version first (waiting up to
  4 seconds), so updates show up on the next reload. Settings → Status →
  *Works without Wi-Fi* shows whether it's active.
- **Parental lock**: a 4-digit PIN in front of Settings. Settings also close by
  themselves after 3 minutes without a tap.

## Setting up the iPad

The page can only ring while it's **open on screen in Safari**. A web page can't
wake a sleeping iPad, so most of this setup is about never letting it sleep.

1. **Host the whole folder at an `https://` address**, keeping the files
   together: `kids-room-clock.html`, `sw.js`, `fonts/`, `icon-180.png` and the
   two `splash-*.png` files. Any static web host works. For example, if this
   repository is public you can turn on GitHub Pages (repo Settings → Pages →
   deploy from branch) and open
   `https://<your-user>.github.io/<repo>/kids-room-clock.html`.
   Without `https://`, the clock still works but the Wi-Fi-down copy and
   "use this iPad's location" don't.
2. **Make it full screen: Add to Home Screen.** Safari on iOS 12 can't hide or
   recolour its own address bar; only Safari 15+ can tint it. The way to get
   rid of the white bar is to open the clock in Safari, tap the **Share**
   button (the square with an arrow, top right), choose **Add to Home
   Screen**, and from then on open the clock from its new icon. It then runs
   full screen with a dark launch screen and its own icon. Two things to know:
   settings made in Safari don't carry over to the Home Screen copy (set them
   once more there), and Settings → Status → *Full screen* says "On" when it
   worked.
   Common reasons it still shows the bar: the icon was added from Chrome or
   another browser (only Safari can do this on iOS 12), the page was opened
   from the Files app, Drive or an email attachment instead of a web address,
   or the clock was opened from Safari's bookmarks instead of the new icon.
   Settings → Status also shows a **Full screen now** button, but only if this
   iPad's Safari offers that (newer iPadOS does, iOS 12 may not); it lasts
   until the page reloads.
3. **Settings → Display & Brightness → Auto-Lock → Never.** This is the most
   important step. If the screen locks, nothing runs and no alarm rings.
   (The page also asks for a Wake Lock, but iPadOS only supports that from
   16.4, so don't rely on it.)
4. **Keep it on the charger.**
5. **Tap the clock once** after opening or reloading the page. Safari only lets
   a page play sound after a tap. Until then a "Tap anywhere to turn on alarm
   sound" pill shows at the top.
6. **Settings → Status → Test.** It rings for 20 seconds. Use the iPad's volume
   buttons while it plays to set how loud alarms will be.
7. **Guided Access** keeps the clock in front and stops the kids leaving it:
   Settings → Accessibility → Guided Access → on, set a passcode, then open the
   clock and triple-click the Home button (or top button). If your iPadOS
   version shows a *Display Auto-Lock* option inside Guided Access settings,
   set it to Never too.
8. **Make nights darker.** A web page can only draw darker pixels; it can't
   lower the backlight. Turn the iPad's brightness down. To go below the
   lowest brightness, use Settings → Accessibility → Display & Text Size →
   **Reduce White Point**.
9. **Turn on Do Not Disturb / a Sleep Focus** so notifications don't light up
   the screen at night.

## Siri (iOS 12)

**A web page can't add Siri commands**, on iOS 12 or on today's iPadOS. Siri
can't read or control what's on a Safari page. That's why the talking clock
uses the built-in speech voices instead. What does work on that iPad:

- **Native alarms as a backup**: *"Hey Siri, set an alarm for 7 AM."* These are
  the Clock app's alarms. They ring even if this page has stopped or the screen
  locked, which this page can't do. They are worth having on exam days, or if
  Settings → Status ever shows a pause. Either alarm can be switched off on
  the iPad as normal.
- **Timers**: *"Hey Siri, set a timer for 15 minutes"* for tidy-up or reading
  time.
- **Reopening the clock by voice**: the free **Shortcuts** app (made for
  iOS 12) can run an "Open URLs" shortcut with the clock's address, given a
  phrase like *"Room clock"*. After it reopens, tap the clock once so alarm
  sound and speech work again.
- On iPads stuck on iOS 12 (iPad Air 1st gen, iPad mini 2 and 3), *"Hey Siri"*
  only listens while the iPad is charging. That's fine for a bedside clock on
  its charger.
- **Guided Access probably blocks Siri.** As far as I know, Siri can't be
  started while Guided Access is on, so you trade kid-proofing for voice
  control. I couldn't check this on a device. Also test whether Clock-app
  alarms still ring during Guided Access on your iPad.

## Honest limits

- **Not tested on a real iPad.** I tested it in Chromium with a simulated
  clock: day/night/morning switching, alarms, holiday skipping, catch-up
  after a reload, snooze across a reload, the PIN flow, and the blocked-sound
  fallback. I couldn't test Safari's audio rules or the silent switch.
  Alarms play through an `<audio>` element, which on iOS normally ignores the
  ring/silent switch (Web Audio doesn't, so it's only the fallback). Check this
  on your iPad with **Test**, with the silent switch on. Also try **Speak**
  under Talking clock with the switch on, because I don't know whether iOS 12
  mutes speech with the switch.
- **iOS 12 / older iPads**: the script is written in ES5 (no `let`, arrow
  functions and so on), and everything it uses exists in iOS 12 Safari (CSS
  Grid needs 10.3+, safe-area insets 11.2+, `max()` 11.3+). Wake Lock does not
  exist on iOS 12, so **Auto-Lock: Never is required**. None of this was run on
  a real iOS 12 device. The scenes only animate position and transparency,
  which old iPads handle well, but I couldn't measure smoothness or heat on an
  A7-era iPad (Air 1, mini 2/3). If a scene stutters or the iPad gets warm,
  pick **Calm** or turn off Moving background.
- **Home Screen mode** was checked by simulating it in Chromium (layout leaves
  room for the status bar, Status reports "On"), not on an iPad. The launch
  images are sized for 768×1024-point iPads (Air 1, mini 2/3, and similar);
  other iPads show a plain launch screen.
- **Offline copy**: tested in Chromium by stopping the web server and
  reloading. Safari supports the same feature from iOS 11.3, but I haven't
  run it on iOS 12. Safari can delete a site's saved data if the site isn't
  used for weeks. A clock that runs every day shouldn't hit that, but check
  Status if you ever see Safari's "can't open page" error.
- **Location**: "Use this iPad's location" only works when the page is opened
  from an `https://` address (Safari's rule). Otherwise pick a city. Only
  India's main cities are listed. Times assume the iPad's clock is set to the
  local time zone.
- **Sleep sounds on the iPad**: the sound and its seamless loop were checked
  in Chromium (the clip decodes, loops, and the loop point has no click).
  Safari can leave a tiny gap each time an audio loop restarts. With a
  16-second loop that would be a brief hiccup every 16 seconds, if it happens
  at all; I couldn't check it on an iPad. Sleep sounds stop if the page is
  reloaded, and need one tap (like alarms) before they can start by
  themselves.
- **Routine and countdown emoji** were shown in Chromium using Google's emoji;
  the iPad draws Apple's versions.
- **Holidays**: dated festivals are preloaded for 2026 and 2027 only. After
  that, only fixed-date ones (Republic Day, Independence Day, Gandhi Jayanti,
  Christmas…) remain, so add new dates under Settings → Holidays. Only the 14
  compulsory central-government holidays count as "No school" and skip
  alarms. Regional festivals (Holi, Janmashtami, Pongal, Onam…) show on the
  clock but don't skip, because whether schools close depends on your state
  and school. Add your school's days off yourself. Lunar and Islamic dates
  can move by a day by region.
- **The PIN** keeps small children out. It is not real security.
- **Font**: Nunito, by the Nunito Project Authors, under the SIL Open Font
  License 1.1 (`fonts/OFL.txt`).
