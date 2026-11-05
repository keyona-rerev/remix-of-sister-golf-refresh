# SisterGolf website (static replica)

This repo holds a static replica of the SisterGolf WordPress site that ran at sistergolfonline.com.
Netlify and GitHub Pages serve these files as they are. There is no build step.

- To refresh the replica from WordPress (while WordPress is still online): open the Actions tab, select "Mirror WordPress site", click "Run workflow".
- Do not run "Mirror WordPress site" after the domain switch. sistergolfonline.com will point at the new site, so the mirror would copy the replica onto itself. The workflow checks live DNS and stops once sistergolfonline.com points at the Netlify site (75.2.60.5).
- The previous redesign (React/Lovable) is in this repo's history at commit 09db850.
- Forms that need WordPress (contact form, site search) do not work in a static replica. Links to outside services (membership, PayPal, Amazon, Mailchimp) still work.
