/* ============================================================
   FINUITY guided tour — STEP CONFIG  (edit this file to add steps)
   ------------------------------------------------------------
   Each step points at a real element in index.html through a
   data-tour="..." attribute, e.g.  <button data-tour="my-button">

   Step fields
     target       (string)  value of the element's data-tour attribute.
                            If several elements share the name (e.g. the
                            desktop sidebar link and the mobile bottom-nav
                            link), the first one that is currently visible
                            is used. If none is visible the step is
                            skipped automatically.
     selector     (string)  optional CSS selector, used instead of target.
     page         (string)  optional app page to open first: 'dashboard',
                            'income', 'balances', 'expenses', 'loans',
                            'goals', 'settings', 'export'. Give this to any
                            step that lives on a specific page.
     title        (string)  bold heading in Fin's bubble.
     description  (string)  the explanation.
     placement    (string)  'top' | 'bottom' | 'left' | 'right' | 'auto'.
                            A preference only: Fin and the bubble pick another
                            side automatically if there isn't room.
     mobilePlacement (string) optional override used on narrow screens.
     action       (string)  what moves the tour forward:
                              'click'  – the user clicks the highlighted element
                              'input'  – the user types into the highlighted field
                              'next'   – (default) the user presses Next
                            Next/Back always work too, so nobody gets stuck.
     hint         (string)  optional small line under the text; a sensible
                            default is shown for 'click' and 'input' steps.
     interactive  (boolean) let the user click things inside the highlighted
                            area. Default: true for click/input, false for next.
     padding      (number)  extra px of spotlight around the target (default 8).

     mobileCap    (number)  optional, 0-1. On phones, spotlight only this fraction of the screen height
                            for very tall targets (long forms), so the bubble never covers the fields.
     late         (boolean) optional. Keep the step even if its target is not on the page yet
                            (it is drawn after the step's page opens).
     requires     (string)  optional CSS selector. The step is only used when that element is
                            on screen, e.g. '#bottom-nav' limits a step to the phone layout.
     before       (function) optional, runs when the step opens (e.g. open the More sheet).
     after        (function) optional, runs when the step is left (e.g. close it again).

   Steps whose target is missing from the page are dropped/skipped, so it is
   safe to leave steps in here for features you might remove later. Desktop and
   phone steps live in ONE list: whichever targets are visible are the ones shown.
   ============================================================ */
window.FinTourSteps = [
  /* ---------- the basics ---------- */
  {
    target: 'hero-balance',
    page: 'dashboard',
    title: 'Your total balance',
    description: 'This is everything you have across all your wallets, updated whenever you log income or spend money.',
    placement: 'bottom',
    action: 'next'
  },
  {
    target: 'currency-switch',
    page: 'dashboard',
    title: 'Change your currency',
    description: 'Tap this to switch between peso, dollar, yen, won and more. Only the symbol changes, your numbers stay the same.',
    placement: 'bottom',
    action: 'next'
  },
  {
    target: 'language-switch',
    page: 'dashboard',
    title: 'Change the language',
    description: 'Tap the globe to pick your language. The main labels switch right away.',
    placement: 'bottom',
    action: 'next'
  },

  /* ---------- finding your way around: desktop menu ---------- */
  {
    target: 'sidebar-nav',
    page: 'dashboard',
    title: 'Your map',
    description: 'This menu is the whole app: Dashboard, Income, Balances, Expenses, Loans, Goals, Learn and Settings. I\u2019ll show you each one.',
    placement: 'right',
    action: 'next',
    padding: 4
  },

  /* ---------- finding your way around: phone bottom bar ---------- */
  {
    target: 'bottom-nav',
    page: 'dashboard',
    title: 'Your five buttons',
    description: 'These five buttons run the whole app: Home, Money, the + in the middle, Learn and More. Let\u2019s tap through them one by one.',
    placement: 'top',
    action: 'next',
    padding: 4
  },
  {
    target: 'nav-home',
    page: 'dashboard',
    title: 'Home',
    description: 'Home is your dashboard: balance, this month\u2019s snapshot, your streak and charts. Tap it any time to come back here.',
    placement: 'right',
    mobilePlacement: 'top',
    action: 'next'
  },
  {
    target: 'nav-money',
    title: 'Money',
    description: 'Everything about your money is behind this button: income, spending, loans, wallets and goals. Tap it to open.',
    placement: 'top',
    action: 'click'
  },
  {
    target: 'money-tabs',
    page: 'expenses',
    requires: '#bottom-nav',
    title: 'Five money tabs',
    description: 'Income, Spend, Loans, Wallets and Goals sit together on this bar. Tap any tab to jump between them.',
    placement: 'bottom',
    action: 'next',
    padding: 4
  },

  /* ---------- wallets ---------- */
  {
    target: 'nav-balances',
    title: 'Open Wallets',
    description: 'Every account you own lives here. Tap Wallets to see them.',
    placement: 'right',
    mobilePlacement: 'bottom',
    action: 'click'
  },
  {
    target: 'add-wallet',
    page: 'balances',
    title: 'Add an account',
    description: 'Tap Add account for each place you keep money: GCash, Maya, a bank, a card or cash. Pick it from the list and it gets its brand colors automatically.',
    placement: 'top',
    action: 'next'
  },

  /* ---------- income ---------- */
  {
    target: 'nav-income',
    title: 'Now, income',
    description: 'Tap Income to record money coming in.',
    placement: 'right',
    mobilePlacement: 'bottom',
    action: 'click'
  },
  {
    target: 'income-form',
    mobileCap: 0.36,
    page: 'income',
    title: 'Log your income',
    description: 'Pick the month, the type (salary, bonus...), the amount and which wallet it goes into. Your dashboard charts are built from these entries.',
    placement: 'bottom',
    action: 'next'
  },

  /* ---------- spending ---------- */
  {
    target: 'nav-expenses',
    title: 'Track spending',
    description: 'Tap Spend to log what you spend.',
    placement: 'right',
    mobilePlacement: 'bottom',
    action: 'click'
  },
  {
    target: 'expense-form',
    mobileCap: 0.36,
    page: 'expenses',
    title: 'Log an expense',
    description: 'Describe it, add the amount, choose a category and the wallet it came out of. That wallet\u2019s balance updates automatically.',
    placement: 'bottom',
    action: 'next'
  },
  {
    target: 'scan-receipt',
    page: 'expenses',
    title: 'Scan a receipt',
    description: 'Snap a photo of a receipt and I will read the amount, date and store for you. It runs on your device, so nothing gets uploaded.',
    placement: 'bottom',
    action: 'next'
  },
  {
    target: 'quick-log',
    page: 'expenses',
    title: 'The + button: Quick Log',
    description: 'This + logs an expense in a few seconds from any page. Just type it like a text: \u201ctaxi 500 gcash\u201d.',
    placement: 'left',
    mobilePlacement: 'top',
    action: 'next'
  },

  /* ---------- loans ---------- */
  {
    target: 'nav-loans',
    title: 'Loans',
    description: 'Tap Loans to track who you owe and who owes you.',
    placement: 'right',
    mobilePlacement: 'bottom',
    action: 'click'
  },
  {
    target: 'loan-form',
    mobileCap: 0.36,
    page: 'loans',
    title: 'Add a loan',
    description: 'Write down every utang, even small ones, with the person and the amount. When you pay or get paid back, log it here and the balance updates.',
    placement: 'top',
    action: 'next'
  },

  /* ---------- goals ---------- */
  {
    target: 'nav-goals',
    title: 'Budget and goals',
    description: 'Tap Goals to set a monthly limit and save toward things you want.',
    placement: 'right',
    mobilePlacement: 'bottom',
    action: 'click'
  },
  {
    target: 'budget-card',
    page: 'goals',
    title: 'Set a monthly limit',
    description: 'Enter how much you\u2019re comfortable spending each month. I\u2019ll warn you as you get close to it.',
    placement: 'bottom',
    action: 'next'
  },

  /* ---------- learn ---------- */
  {
    target: 'nav-learn',
    title: 'Learn',
    description: 'Short lessons that teach real money skills, with a quiz to see how much you grow. Tap Learn to open it.',
    placement: 'right',
    mobilePlacement: 'top',
    action: 'click'
  },
  {
    target: 'learn-hero',
    late: true,
    page: 'learn',
    title: 'Your learning level',
    description: 'Finish lessons to level up, from Money newbie all the way to Money Pro. Each lesson takes about two minutes.',
    placement: 'bottom',
    action: 'next'
  },
  {
    target: 'learn-quiz',
    late: true,
    page: 'learn',
    title: 'Before and after quiz',
    description: 'Take the Starter Quiz first, then the Progress Quiz after a few lessons. It shows you how much you have learned.',
    placement: 'bottom',
    action: 'next'
  },

  /* ---------- settings, streak and badges ---------- */
  {
    target: 'nav-settings',
    title: 'Settings',
    description: 'Tap Settings for your profile, security, backups and more.',
    placement: 'right',
    action: 'click'
  },
  {
    target: 'nav-more',
    title: 'More',
    description: 'Settings, exports and this tour live under More. Tap it.',
    placement: 'top',
    action: 'click'
  },
  {
    target: 'more-settings',
    requires: '#bottom-nav',
    title: 'Open Settings',
    description: 'Tap Settings to see your profile, security, backups and your streak.',
    placement: 'top',
    action: 'click',
    before: function(){ try{ if(typeof openMoreSheet === 'function') openMoreSheet(); }catch(e){} },
    after: function(){ try{ if(typeof closeMoreSheet === 'function') closeMoreSheet(); }catch(e){} }
  },
  {
    target: 'streak-card',
    page: 'settings',
    title: 'Your streak and badges',
    description: 'Log something each day to grow your streak. Miss a day and a free rest day has you covered. Tap this card to see your badges.',
    placement: 'bottom',
    action: 'next',
    before: function(){ try{ if(typeof closeSetPanel === 'function') closeSetPanel(); }catch(e){} }
  },
  {
    target: 'help-button',
    page: 'settings',
    title: 'Need me again?',
    description: 'Tap Guided tour any time to replay this. You can also tap me for tips. That\u2019s it, you\u2019re ready!',
    placement: 'bottom',
    action: 'next',
    before: function(){ try{ if(typeof closeSetPanel === 'function') closeSetPanel(); }catch(e){} }
  }
];

/* Optional tuning knobs (all have defaults inside tour.js) */
window.FinTourConfig = {
  // padding: 8,          // spotlight padding around targets (px)
  // topSafe: 72,         // px at the top hidden behind the sticky header
  // bottomSafe: 84,      // px at the bottom hidden behind the mobile nav
  // cardWidth: 320,      // max width of Fin's speech bubble
  // laterDays: 1         // "Maybe later" asks again after this many days
};
