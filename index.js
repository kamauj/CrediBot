const { App } = require('@slack/bolt');

// Initialize your app with your bot token and signing secret
const app = new App({
  token: 'YOUR_SLACK_BOT_TOKEN',
  signingSecret: 'YOUR_SLACK_SIGNING_SECRET',
});

// Listen to the App Home event
app.event('app_home_opened', async ({ event, context, client }) => {
  // Retrieve user information
  const userId = event.user;

  try {
    // Call the users.info method to get user details
    const userInfo = await client.users.info({
      user: userId,
    });

    // Check if the specific field is filled
    const fieldValue = userInfo.user.profile.custom_field;

    if (!fieldValue) {
      // Send a private message to the user requesting them to fill in the field
      await client.chat.postMessage({
        channel: userId,
        text: 'Hey there! It looks like you haven\'t filled in the custom field. Please fill it in by [doing something].',
      });
    }
  } catch (error) {
    console.error(error);
  }
});

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
