# Room Clock

A bedside clock and alarm for a kid's room, made to run all day and night on an
old iPad. It's one self-contained HTML file (`kids-room-clock.html`) with no
network calls or dependencies. Settings are saved in Safari's local storage on
that iPad.

## What it does

- **Day face**: big clock, day, date, next alarm, "tomorrow is a school day / no
  school", bedtime countdown, birthday countdown, and Indian festival of the day.
  There are seven looks, two of them flip clocks.
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
- **Live sky** style: the background follows the real sun for your city. It
  goes from night to dawn, day, golden hour and dusk, with the sun moving
  across the screen, slowly drifting clouds, and stars in the evening. A
  sunrise/sunset card shows on any style once a city is chosen. Sun times are
  computed on the iPad (no internet). In testing they were within about a
  minute of a reference astronomy library for Delhi, Mumbai, Chennai and
  Srinagar in summer, autumn and winter.
- **Moving background** (on by default): drifting clouds and twinkling stars
  in Live sky, and a slow glow in the other styles. It is always still at
  night, and you can turn it off if the iPad runs warm.
- **Talking clock** (off by default): tap the time to hear it, for example
  *"It's 7:38 in the evening. Today is Tuesday, 27 October."* At night it says
  *"It's still night time. Stay in bed until 7 o'clock."* Alarms start with
  *"Good morning, Aarav! … It's a school day."*, and at bedtime it says good
  night. This uses the iPad's built-in text-to-speech voices, not Siri. If
  installed, it uses an Indian English voice (Settings → General →
  Accessibility → Speech → Voices on iOS 12).
- **Parental lock**: a 4-digit PIN in front of Settings. Settings also close by
  themselves after 3 minutes without a tap.

## Setting up the iPad

The page can only ring while it's **open on screen in Safari**. A web page can't
wake a sleeping iPad, so most of this setup is about never letting it sleep.

1. **Host the file somewhere Safari can open it.** Any static web host works.
   For example, if this repository is public you can turn on GitHub Pages
   (repo Settings → Pages → deploy from branch) and open
   `https://<your-user>.github.io/<repo>/kids-room-clock.html`.
   Optional: Share → **Add to Home Screen** for a full-screen icon.
2. **Settings → Display & Brightness → Auto-Lock → Never.** This is the most
   important step. If the screen locks, nothing runs and no alarm rings.
   (The page also asks for a Wake Lock, but iPadOS only supports that from
   16.4, so don't rely on it.)
3. **Keep it on the charger.**
4. **Tap the clock once** after opening or reloading the page. Safari only lets
   a page play sound after a tap. Until then a "Tap anywhere to turn on alarm
   sound" pill shows at the top.
5. **Settings → Status → Test.** It rings for 20 seconds. Use the iPad's volume
   buttons while it plays to set how loud alarms will be.
6. **Guided Access** keeps the clock in front and stops the kids leaving it:
   Settings → Accessibility → Guided Access → on, set a passcode, then open the
   clock and triple-click the Home button (or top button). If your iPadOS
   version shows a *Display Auto-Lock* option inside Guided Access settings,
   set it to Never too.
7. **Make nights darker.** A web page can only draw darker pixels; it can't
   lower the backlight. Turn the iPad's brightness down. To go below the
   lowest brightness, use Settings → Accessibility → Display & Text Size →
   **Reduce White Point**.
8. **Turn on Do Not Disturb / a Sleep Focus** so notifications don't light up
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
  Grid needs 10.3+, safe-area insets 11.2+). Wake Lock does not exist on
  iOS 12, so **Auto-Lock: Never is required**. None of this was run on a real
  iOS 12 device. On an A7-era iPad (Air 1, mini 2/3), if the moving background
  stutters or the iPad gets warm, turn off Moving background.
- **Location**: "Use this iPad's location" only works when the page is opened
  from an `https://` address (Safari's rule). Otherwise pick a city. Only
  India's main cities are listed. Times assume the iPad's clock is set to the
  local time zone.
- **Holidays**: dated festivals are preloaded for 2026 and 2027 only. After
  that, only fixed-date ones (Republic Day, Independence Day, Gandhi Jayanti,
  Christmas…) remain, so add new dates under Settings → Holidays. Only the 14
  compulsory central-government holidays count as "No school" and skip
  alarms. Regional festivals (Holi, Janmashtami, Pongal, Onam…) show on the
  clock but don't skip, because whether schools close depends on your state
  and school. Add your school's days off yourself. Lunar and Islamic dates
  can move by a day by region.
- **The PIN** keeps small children out. It is not real security.
